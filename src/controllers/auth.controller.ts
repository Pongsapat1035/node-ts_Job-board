import { NextFunction, Request, Response } from "express";
import { validateRegister } from "../utils/validation/auth.validate";
import * as authService from '../services/auth.service'

export const loginHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body
        const token = await authService.login(userData)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ success: true, message: "Login success !" })
    } catch (error) {
        next(error)
    }
}

export const registerHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = validateRegister(req.body)
        const token = await authService.createUser(userData)

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ success: true, message: "create new user success" })
    } catch (error) {
        next(error)
    }
}