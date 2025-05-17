import { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"
import { validateRole } from "../utils/validation"

const prisma = new PrismaClient()

const findUserWithId = async (id: number) => {
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

export const loadUserHanler = async (req: Request, res: Response) => {
    try {
        const usersWithAuth = await prisma.auth.findMany({
            select: {
                id: true,
                role: true,
                email: true
            }
        });
        res.json({ lists: usersWithAuth })
    } catch (error) {
        console.log(error)
    }
}

export const loadUserDetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userId = parseInt(id);

        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user id" });
            return
        }

        const response = await findUserWithId(parseInt(id))
        if (!response) {
            res.status(404).json({ message: "user not found" })
            return
        }
        const userRole = response.role
        let userInfo = {}

        if (userRole === 'user') {
            const result = await prisma.user.findUnique({
                where: {
                    authId: parseInt(id)
                }, select: {
                    name: true
                }
            })
            Object.assign(userInfo, result)

        } else if (userRole === 'company') {
            const result = await prisma.company.findUnique({
                where: {
                    authId: parseInt(id)
                }, select: {
                    name: true
                }
            })
            Object.assign(userInfo, result)
        }

        const result = Object.assign({}, response, userInfo)

        res.status(200).json({ data: result })
    } catch (error) {
        console.log("load user detail error : ", error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
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

export const deleteHanler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const recievedId = parseInt(id);

        if (isNaN(recievedId)) {
            res.status(400).json({ message: "Invalid user id" });
            return
        }

        const response = await findUserWithId(recievedId)
        if (!response) {
            res.status(404).json({ message: "user not found" })
            return
        }

        const userId = response.id
        const userRole = response.role

        await clearRecord(userId, userRole)
        await prisma.auth.delete({ where: { id: userId, } })

        res.status(200).json({ message: "delete user success !", data: response })
    } catch (error) {
        console.log('delete user error : ', error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const updateUserDetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { role } = req.body
        const userId = parseInt(id);

        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user id" });
            return
        }

        if (validateRole(role)) {
            res.status(400).json({ message: "incorrect Role" })
            return
        }

        const response = await prisma.auth.update({
            where: { id: parseInt(id) },
            data: { role }
        })

        res.status(200).json({ message: "update role success!", newData: response })

    } catch (error) {
        console.log('update role error : ', error)
        if (error instanceof Error) {
            const errorMsg = error.message
            if (errorMsg.includes("Record to update not found")) {
                res.status(404).json({ message: "User not found" })
            }
            res.status(500).json({ message: errorMsg })
        }
    }
}

