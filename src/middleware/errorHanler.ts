import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors/appError";
import { Prisma } from "@prisma/client";

export const errorHanler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    if (err instanceof AppError) {
        res.status(statusCode).json({
            success: false,
            message: err.message
        });
        return
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('prisma error : ', err)
    }

    console.error('Unexpected Error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong' });
    return
}