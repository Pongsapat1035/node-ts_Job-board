import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/errors/appError";
import { ApplicantForm } from "../types";

const prisma = new PrismaClient()

export const getJobs = async () => {
    const jobs = await prisma.job.findMany({
        where: {
            status: true
        }
    })
    return jobs
}

export const getJob = async (id: number) => {
    const jobData = await prisma.job.findUnique({ where: { id } })
    if (!jobData) throw new AppError("Job not found", 404)

    return jobData
}

export const createApplicant = async (userId: number, data: ApplicantForm) => {
    const userData = await prisma.auth.findUnique({ where: { id: userId } })
    if (!userData) throw new AppError("User not found", 404)

    const { title, description, jobId } = data

    const jobData = await prisma.job.findUnique({ where: { id: jobId } })
    if (!jobData) throw new AppError("Job does not exist", 404)

    const checkApplicant = await prisma.applicant.findFirst({
        where: {
            jobId: jobData.id,
            userId: userData.id,
        }
    })

    if (checkApplicant) throw new AppError("applicant is already exits", 409)

    const response = await prisma.applicant.create({
        data: {
            jobId: jobData.id,
            userId: userData.id,
            title,
            description
        }
    })

    return response
}

export const getApplicants = async (userId: number) => {
    const applicants = await prisma.applicant.findMany({ where: { userId } })
    return applicants
}

export const getApplicant = async (id: number) => {
    const response = await prisma.applicant.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            description: true,
            job: true
        }
    })

    if (!response) throw new AppError("Applicant does not exist", 404)
    return response
}

export const deleteApplicant = async (id: number) => {
    const response = await prisma.applicant.delete({ where: { id } })
    return response
}
