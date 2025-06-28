import { AppError } from "../errors/appError"
import {
    validateField,
    validateString,
    validaetNumber
} from "./validation"

export const validateJobForm = (data: any) => {
    const { title, description, minSalary, maxSalary, tags } = data

    validateField(validateString, title, "title")
    validateField(validateString, description, "description")
    validateField(validaetNumber, minSalary, "min-salary")
    validateField(validaetNumber, maxSalary, "max-salary")
    validateField(validateString, tags, "tags")

    if (minSalary >= maxSalary) throw new AppError("Max salary can less or equal min salary", 400)

    return { title, description, minSalary, maxSalary, tags }
}

export const getAllowedField = (data: any) => {
    const allowedFields = ['title', 'description', 'tags', 'minSalary', 'maxSalary', 'status']
    const dataToUpdate: { [key: string]: any } = {};

    for (const key of allowedFields) {
        if (data[key]) {
            dataToUpdate[key] = data[key];
        }
    }
    return dataToUpdate
}