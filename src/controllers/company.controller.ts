import { NextFunction, Request, Response } from "express";
import { validateString, validateField } from "../utils/validation/validation";
import { validateJobForm, getAllowedField } from "../utils/validation/job.validate";
import { AppError } from "../utils/errors/appError";
import { JobFormData } from "../types";

import * as companyService from '../services/company.service'

export const getProfileHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = (req.user?.userId ?? 0)
        const response = await companyService.getProfile(id)
        res.json({ success: true, data: response })
    } catch (error) {
        next(error)
    }
}

export const updateProfileHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body
        const userId = (req.user?.userId || 0)
        validateField(validateString, name, "Name")
        validateField(validateString, description, "Description")

        const response = await companyService.updateProfile(userId, { name, description })

        res.json({ success: true, resule: response })
    } catch (error) {
        next(error)
    }
}

export const createJobHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user?.userId ?? 0)
        const jobForm: JobFormData = validateJobForm(req.body)

        const response = await companyService.createJob(userId, jobForm)
        res.json({ success: true, message: "create job post success !", response })
    } catch (error) {
        next(error)
    }
}

export const getAllJobsHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user?.userId || 0)

        const response = await companyService.getJobs(userId)
        res.json({ success: true, data: response })
    } catch (error) {
        next(error)
    }
}

export const getJobHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user?.userId || 0)
        const { id } = req.params
        const jobId = parseInt(id)
        console.log(!isNaN(jobId))
        if (isNaN(jobId)) throw new AppError("Invalid user id", 400)

        const response = await companyService.getJob(jobId, userId)
        res.json({ success: true, data: response })
    } catch (error) {
        next(error)
    }
}

export const updateJobHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateData = req.body
        const { id } = req.params
        const jobId = parseInt(id)

        if (isNaN(jobId)) throw new AppError("Invalid user id", 400)

        const allowedFields = getAllowedField(updateData)
        const response = await companyService.updateJob(jobId, allowedFields)

        res.json({ success: true, message: "update job success!", newData: response })
    } catch (error) {
        next(error)
    }
}

export const deleteJobHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user?.userId || 0)
        const { id } = req.params
        const jobId = parseInt(id)

        if (isNaN(jobId)) throw new AppError("Invalid user id", 400)

        const response = await companyService.deleteJob(jobId, userId)

        res.json({ success: true, message: "Delete job success", data: response })
    } catch (error) {
        next(error)
    }
}