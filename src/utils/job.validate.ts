import { validateString, validaetNumber } from "./validation"

const validateField = (validator: (value: any) => string | null, value: any, fieldName: string) => {
    const errorMsg = validator(value)
    if (errorMsg) throw new Error(`${fieldName}: ${errorMsg}`)
}

export const validateJobForm = (data: any) => {
    try {
        const { title, description, minSalary, maxSalary, tags } = data

        validateField(validateString, title, "title")
        validateField(validateString, description, "description")
        validateField(validaetNumber, minSalary, "min-salary")
        validateField(validaetNumber, maxSalary, "max-salary")
        validateField(validateString, tags, "tags")

        if (minSalary >= maxSalary) throw new Error("Max salary can less or equal min salary")

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
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