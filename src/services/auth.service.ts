import { PrismaClient } from "@prisma/client";

import { AppError } from "../utils/errors/appError";
import { getHashedPassword, comparePassword } from "../utils/password";
import { getJwt } from "../utils/jwt";
import type { Role, RegisterForm } from "../types";

const prisma = new PrismaClient()

interface LoginData {
    email: string,
    password: string,
    role: Role
}

export const login = async (userData: LoginData): Promise<string> => {
    const { email, password, role } = userData
    const user = await prisma.auth.findUnique({
        where: {
            email,
            role
        },
    })

    if (!user) {
        throw new AppError("User not found", 404)
    }

    const hashedPassword = user.password
    const checkPassword = await comparePassword(password, hashedPassword)

    if (!checkPassword) {
        throw new AppError("Password does not match", 400)
    }
    const userId = user.id
    const token = getJwt({ email, role, userId })
    return token
}

export const createUser = async (userData: RegisterForm): Promise<string> => {
    const { email, password, name, role } = userData

    const user = await prisma.auth.findUnique({ where: { email } })

    if (user) throw new AppError("User is already exist", 409)

    const hashedPassword = await getHashedPassword(password)

    const response = await prisma.auth.create({
        data: {
            email,
            password: hashedPassword,
            role
        }
    })

    const userId = response.id

    switch (role) {
        case 'user':
            await prisma.user.create({
                data: {
                    authId: userId,
                    name
                }
            })
            break
        default:
            await prisma.company.create({
                data: {
                    authId: userId,
                    name
                }
            })
    }

    const token = getJwt({ email, role, userId })
    return token
}
