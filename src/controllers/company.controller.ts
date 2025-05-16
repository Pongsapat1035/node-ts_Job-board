import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";
import { validateString } from "../utils/validation";
import { validateJobForm, getAllowedField } from "../utils/job.validate";
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

export const createJobHanler = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const userData = req.body
        validateJobForm(userData)
        const { title, description, minSalary, maxSalary, tags } = userData

        const response = await prisma.job.create({
            data: {
                companyId: (userId ?? 0),
                title,
                tags,
                description,
                minSalary,
                maxSalary,
                status: true
            }
        })
        res.status(200).json({ message: "create job post success !", response })
    } catch (error) {
        console.log('error create job : ', error)
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export const getAllJobsHanler = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId

        const response = await prisma.job.findMany({
            where: {
                companyId: userId
            }
        })
        res.status(200).json({ data: response })
    } catch (error) {
        console.log('error load jobs : ', error)
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export const getJobHanler = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const { id } = req.params
        const response = await prisma.job.findUnique({
            where: {
                id: parseInt(id),
                companyId: userId
            }
        })
        if (!response) {
            res.status(403).json({ message: "Forbiden" })
        }
        // load applicant 

        res.status(200).json({ data: response })
    } catch (error) {
        console.log('error load jobs : ', error)
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export const updateJobHanler = async (req: Request, res: Response) => {
    try {
        const updateData = req.body
        const { id } = req.params

        const allowedFields = getAllowedField(updateData)
        const response = await prisma.job.update({
            where: {
                id: parseInt(id)
            }, data: allowedFields
        })
        res.status(200).json({ message: "update job success!", newData: response })
    } catch (error) {
        console.log('error update job : ', error)
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export const deleteJobHanler = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId
        const { id } = req.params
        const response = await prisma.job.delete({
            where: {
                id: parseInt(id),
                companyId: userId
            }
        })
        if (!response) {
            res.status(403).json({ message: "Not found job" })
        }

        res.status(200).json({ message: "Delete job success", data: response })
    } catch (error) {
        console.log('error delete job : ', error)
        if (error instanceof Error) {
            res.status(400).json({ message: error.message })
        }
    }
}