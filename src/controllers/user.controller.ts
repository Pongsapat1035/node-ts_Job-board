import { NextFunction, Request, Response } from "express";
import { validateApplicantForm } from "../utils/validation/user.validate";
import { AppError } from "../utils/errors/appError";
import * as jobService from '../services/job.service'
import * as BookmarkService from '../services/bookmark.service'

export const createApplicantHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user?.userId ?? 0)
        const validData = validateApplicantForm(req.body)
        const response = await jobService.createApplicant(userId, validData)

        res.status(200).json({ message: 'create applicant success', data: response })
    } catch (error) {
        next(error)
    }
}

export const getAllJobsHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await jobService.getJobs()
        res.status(200).json({ success: true, data: response })
    } catch (error) {
        next(error)
    }
}

export const getJobHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (isNaN(parseInt(id))) throw new AppError("Invalid id", 400)

        const response = await jobService.getJob(parseInt(id))
        res.status(200).json({ data: response })
    } catch (error) {
        next(error)
    }
}

export const getAllApplicantsHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user?.userId ?? 0)
        const applicants = await jobService.getApplicants(userId)

        res.status(200).json({ success: true, data: applicants })
    } catch (error) {
        next(error)
    }
}

export const getApplicantHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const applicantId = parseInt(id);

        if (isNaN(applicantId)) throw new AppError("Invalid applicant id", 400)
        const response = await jobService.getApplicant(applicantId)

        res.status(200).json({ data: response })
    } catch (error) {
        next(error)
    }
}

export const deleteAplicantHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const applicantId = parseInt(id)
        if (isNaN(applicantId)) throw new AppError("Invalid applicant id", 400)

        const response = await jobService.deleteApplicant(applicantId)

        res.status(200).json({ success: true, message: "delete success", data: response })
    } catch (error) {
        next(error)
    }
}

export const getBookmarkListHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user?.userId ?? 0)
        const bookmarks = await BookmarkService.getBookmarks(userId)

        res.status(200).json({ success: true, message: "load bookmark list success", data: bookmarks })
    } catch (error) {
        next(error)
    }
}

export const addBookmarkHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user?.userId ?? 0)
        const { jobId } = req.body
        const convertedIJobId = parseInt(jobId)

        if (isNaN(jobId)) throw new AppError("Invalid job id", 400)

        const response = await BookmarkService.createBookmark(userId, convertedIJobId)

        res.status(200).json({ message: "create bookmark success", data: response })
    } catch (error) {
        next(error)
    }
}

export const removeBookmarkHanler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const bookmarkId = parseInt(id)

        if (isNaN(bookmarkId)) throw new AppError("Invalid user id", 400)

        const response = await BookmarkService.removeBookmark(bookmarkId)
        res.status(200).json({ success: true, message: "remove bookmark success", data: response })
    } catch (error) {
        next(error)
    }
}