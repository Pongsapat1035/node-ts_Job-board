import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/errors/appError";
import { Role, UserDetail } from "../types";

const prisma = new PrismaClient()

const findUserDetailWithId = async (id: number): Promise<UserDetail | null> => {
    const response = await prisma.auth.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            email: true,
            role: true,
            createAt: true
        }
    })
    return response
}

const clearRecord = async (id: number, role: string) => {
    if (role === 'user') {
        await prisma.user.delete({ where: { authId: id } })
        await prisma.applicant.deleteMany({ where: { id } })
        await prisma.bookmark.deleteMany({ where: { id } })
    }
    else if (role === 'company') {
        await prisma.company.delete({ where: { authId: id } })
        await prisma.job.deleteMany({ where: { companyId: id } })
    }
}

export const findUserWithId = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            authId: id
        }, select: {
            name: true
        }
    })
    return result
}

export const loadUsers = async () => {
    const userList = await prisma.auth.findMany({
        select: {
            id: true,
            role: true,
            email: true
        }
    });
    return userList
}

export const loadUserDetail = async (id: number) => {
    const response = await findUserDetailWithId(id)
    if (!response) throw new AppError("User not found", 404)

    let userInfo = {}

    switch (response.role) {
        case 'user':
            userInfo = await prisma.user.findUnique({
                where: { authId: id },
                select: { name: true }
            }) || {};
            break;
        case 'company':
            userInfo = await prisma.company.findUnique({
                where: { authId: id },
                select: { name: true }
            }) || {};
            break;
    }

    return { ...response, userInfo }
}

export const deleteUser = async (id: number) => {
    const response = await findUserDetailWithId(id)
    if (!response) throw new AppError("User not found", 404)

    const userId = response.id
    const userRole = response.role

    await clearRecord(userId, userRole)
    await prisma.auth.delete({ where: { id: userId, } })
}

export const updateRole = async (id: number, newRole: Role) => {
    const response = await prisma.auth.update({
        where: { id },
        data: { role: newRole }
    })
    return response
}