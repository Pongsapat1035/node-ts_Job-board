import { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"
import { validateRole } from "../utils/validation"

const prisma = new PrismaClient()

const findUserWithId = async (id: number) => {
    const response = await prisma.auth.findUnique({
        where: {
            id: id
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

        const response = await findUserWithId(parseInt(id))
        if (!response) return res.status(404).json({ message: "user not found" })
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

export const deleteHanler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const response = await findUserWithId(parseInt(id))
        if (!response) return res.status(404).json({ message: "user not found" })

        const userId = response.id
        const userRole = response.role
        if (userRole === 'user') {
            await prisma.user.delete({
                where: {
                    authId: userId
                }
            })
        } else if (userRole === 'company') {
            await prisma.company.delete({
                where: {
                    authId: userId
                }
            })
        }
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
        if (validateRole(role)) res.status(400).json({ message: "incorrect Role" })

        const response = await prisma.auth.update({
            where: { id: parseInt(id) },
            data: { role }
        })
        res.status(200).json({ message: "update role success!", newData: response })

    } catch (error) {
        console.log('update role error : ', error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

