import { PrismaClient } from "../generated/prisma";
import { validateRegister } from "../utils/auth.validate";
import { Request, Response } from "express";
import { getJwt } from "../utils/jwt";
import { getHashedPassword, comparePassword } from "../utils/password";

const prisma = new PrismaClient()

export const loginHanler = async (req: Request, res: Response) => {
    try {
        const userData = req.body
        const { email, password, role } = userData
        const user = await prisma.auth.findUnique({
            where: {
                email,
            },
        })

        if (!user) throw new Error("User does not exist !")

        const hashedPassword = user.password
        const checkPassword = await comparePassword(password, hashedPassword)

        if (!checkPassword) throw new Error("Password does not match")
            const userId = user.id
        const token = getJwt({ email, role, userId })
        res.status(200).json({ token })

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export const registerHanler = async (req: Request, res: Response) => {
    try {
        const userData = req.body
        validateRegister(userData)
        const { email, password, name, role } = userData

        const user = await prisma.auth.findUnique({
            where: {
                email,
            },
        })

        if (user) throw new Error("User is already exist")
        const hashedPassword = await getHashedPassword(password)

        const response = await prisma.auth.create({
            data: {
                email,
                password: hashedPassword,
                role
            }
        })

        const userId = response.id
        if (role === 'user') {
            await prisma.user.create({
                data: {
                    authId: userId,
                    name
                }
            })
        } else {
            await prisma.company.create({
                data: {
                    authId: userId,
                    name
                }
            })
        }


        const token = getJwt({ email, role, userId })
        res.status(200).json({ token })

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        }

    }
}