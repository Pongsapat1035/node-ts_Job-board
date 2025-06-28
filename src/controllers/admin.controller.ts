import { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { validateRole } from "../utils/validation/validation"
import * as adminService from '../services/admin.service'
import { AppError } from "../utils/errors/appError"

const prisma = new PrismaClient()


export const loadUserHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userLists = await adminService.loadUsers()
        res.json({ success: true, lists: userLists })
    } catch (error) {
        next(error)
    }
}

export const loadUserDetailHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const userId = parseInt(id);

        if (isNaN(userId)) throw new AppError("Id is invalid", 400)

        const result = await adminService.loadUserDetail(parseInt(id))
        res.json({ success: true, data: result })
    } catch (error) {
        next(error)
    }
}

export const deleteUserHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const validId = parseInt(id);

        if (isNaN(validId)) throw new AppError("Invalid user id", 400)

        await adminService.deleteUser(validId)
        res.json({ success: true, message: "delete user success !" })
    } catch (error) {
        next(error)
    }
}

export const updateUserDetailHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { role } = req.body
        const userId = parseInt(id);

        if (isNaN(userId)) throw new AppError("Invalid user id", 400)
        if (validateRole(role)) throw new AppError("incorrect Role", 400)

        const response = await adminService.updateRole(parseInt(id), role)

        res.status(200).json({ message: "update role success!", newData: response })
    } catch (error) {
        next(error)
    }
}

