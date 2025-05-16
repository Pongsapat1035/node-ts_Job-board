import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";
import { validateApplicantForm } from "../utils/user.validate";

const prisma = new PrismaClient()

export const createApplicantHanler = async (req: Request, res: Response) => {
    try {
        const userId = (req.user?.userId ?? 0)
        const userInputData = req.body
        validateApplicantForm(userInputData)

        const userData = await prisma.auth.findUnique({ where: { id: userId } })
        if (!userData) return res.status(404).json({ message: "User does not exist" })

        const { title, description, jobId } = userInputData

        const jobData = await prisma.job.findUnique({ where: { id: jobId } })
        if (!jobData) return res.status(404).json({ message: "Job does not exist" })

        const response = await prisma.applicant.create({
            data: {
                jobId: jobData.id,
                userId: userData.id,
                title,
                description
            }
        })
        res.status(200).json({ message: 'create applicant success', data: response })
    } catch (error) {
        console.log('create applicant error : ', error)
        if (error instanceof Error) {
            const errorMsg = error.message
            const code = errorMsg.includes('incorrect format') ? 400 : 500
            res.status(code).json({ error: error.message })
        }
    }
}

export const getAllJobsHanler = async (req: Request, res: Response) => {
    try {
        const response = await prisma.job.findMany({
            where: {
                status: true
            }
        })
        res.status(200).json({ data: response })
    } catch (error) {
        console.log('create applicant error : ', error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const getJobHanler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const response = await prisma.job.findUnique({ where: { id: parseInt(id) } })
        if (!response) return res.status(404).json({ message: "Job does not exist" })
        res.status(200).json({ data: response })
    } catch (error) {
        console.log('create applicant error : ', error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const getAllApplicantsHanler = async (req: Request, res: Response) => {
    try {
        const userId = (req.user?.userId ?? 0)
        const applicants = await prisma.applicant.findMany({ where: { userId } })
        res.status(200).json({ data: applicants })
    } catch (error) {
        console.log('create applicant error : ', error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const getApplicantHanler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const response = await prisma.applicant.findUnique({
            where: { id: parseInt(id) },
            select: {
                id: true,
                title: true,
                description: true,
                job: true
            }
        })
        if (!response) return res.status(404).json({ message: "Applicant does not exist" })

        res.status(200).json({ data: response })
    } catch (error) {
        console.log('create applicant error : ', error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const deleteAplicantHanler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const response = await prisma.applicant.delete({ where: { id: parseInt(id) } })
        res.status(200).json({ message: "delete success", data: response })
    } catch (error) {
        console.log('create applicant error : ', error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const getBookmarkListHanler = async (req: Request, res: Response) => {
    try {
        const userId = (req.user?.userId ?? 0)
        const response = await prisma.bookmark.findMany({
            where: {
                userId
            }, select: {
                id: true,
                job: true
            }
        })
        if (!response) return res.status(404).json({ message: "Bookmark does not exist" })

        res.status(200).json({ message: "load bookmark list success", data: response })
    } catch (error) {
        console.log('load all bookmark error : ', error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const addBookmarkHanler = async (req: Request, res: Response) => {
    try {
        const { jobId, userId } = req.body
        const bookmarkData = await prisma.bookmark.findFirst({
            where: {
                jobId: parseInt(jobId),
                userId: parseInt(userId)
            }
        })
        if (bookmarkData) res.status(409).json({ message: "this job is already exist" })

        const response = await prisma.bookmark.create({
            data: {
                jobId: parseInt(jobId),
                userId: parseInt(userId)
            }
        })
        res.status(200).json({ message: "create bookmark success", data: response })
    } catch (error) {
        console.log('create applicant error : ', error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export const removeBookmarkHanler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const response = await prisma.bookmark.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({ message: "remove bookmark success", data: response })
    } catch (error) {
        console.log('create applicant error : ', error)
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
        }
    }
}