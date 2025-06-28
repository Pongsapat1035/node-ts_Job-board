import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/errors/appError";

const prisma = new PrismaClient()

export const getBookmarks = async (userId: number) => {
    const response = await prisma.bookmark.findMany({
        where: {
            userId
        }, select: {
            id: true,
            job: true
        }
    })
    if (!response) throw new AppError("Bookmark does not exist", 404)
    return response
}


export const createBookmark = async (userId: number, jobId: number) => {
    const bookmarkData = await prisma.bookmark.findFirst({
        where: {
            jobId,
            userId
        }
    })

    if (bookmarkData) throw new AppError("Job is already exist", 409)


    const response = await prisma.bookmark.create({
        data: {
            jobId,
            userId
        }
    })
    return response
}

export const removeBookmark = async (id: number) => {
    const response = await prisma.bookmark.delete({
        where: {
            id
        }
    })

    return response
}