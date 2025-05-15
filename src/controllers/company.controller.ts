import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";
import { validateString } from "../utils/validation";

const prisma = new PrismaClient

export const getProfileHanler = async (req: Request, res: Response) => {
    try {
        const id = req.user?.userId
        const response = await prisma.company.findUnique({
            where: {
                authId: id
            }
        })
        res.json({ data: response })
    } catch (error) {
        console.log('get profile detail error : ', error)
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export const updateProfileHanler = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body
        const validateName = validateString(name)
        const validateDesc = validateString(description)
        if (validateName || validateDesc) throw new Error("incorrect input")

        const userId = req.user?.userId
        const response = await prisma.company.update({
            where: {
                authId: userId
            }, data: {
                name,
                description
            }
        })
        res.status(200).json({ resule: response })
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export const createJobHanler = async(req:Request, res:Response) =>{
    try{

    } catch(error){
        console.log('error create job : ', error)
    }
}