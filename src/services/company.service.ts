import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/errors/appError";
import { JobFormData } from "../types";

const prisma = new PrismaClient()

export const getProfile = async (id: number) => {
    const response = await prisma.company.findUnique({
        where: { authId: id }
    })
    if (!response) throw new AppError("user does not exist", 404)
    return response
}

export const updateProfile = async (userId: number, data: any) => {
    const { name, description } = data
    const response = await prisma.company.update({
        where: {
            authId: userId
        }, data: {
            name,
            description
        }
    })
    return response
}

export const createJob = async (userId: number, data: JobFormData) => {
    const { title, description, minSalary, maxSalary, tags } = data

    const checkTitle = await prisma.job.findFirst({ where: { title, companyId: userId } })
    if (checkTitle) throw new AppError("Title is already exist", 409)

    const response = await prisma.job.create({
        data: {
            companyId: userId,
            title,
            tags,
            description,
            minSalary,
            maxSalary,
            status: true
        }
    })

    return response
}

export const getJobs = async (companyId: number) => {
    const response = await prisma.job.findMany({
        where: {
            companyId
        }
    })
    return response
}

export const getJob = async (id: number, companyId: number) => {
    const response = await prisma.job.findUnique({
        where: {
            id,
            companyId
        }, select: {
            id: true,
            title: true,
            description: true,
            tags: true,
            minSalary: true,
            maxSalary: true,
            status: true,
            applicant: {
                select: {
                    title: true
                }
            }
        }
    })
    if (!response) throw new AppError("Job not found", 404)

    return response
}

export const updateJob = async (jobId: number, data: any) => {
    const response = await prisma.job.update({
        where: {
            id: jobId
        }, data
    })
    return response
}

export const deleteJob = async (jobId: number, companyId: number) => {
    const response = await prisma.job.delete({
        where: {
            id: jobId,
            companyId
        }
    })
    return response
}