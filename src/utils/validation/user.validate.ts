import {
    validateField,
    validaetNumber,
    validateString
} from "./validation"

export const validateApplicantForm = (data: any) => {
    const { title, description, jobId } = data

    validateField(validateString, title, "title")
    validateField(validateString, description, "Description")
    validateField(validaetNumber, jobId, "Job id")

    return { title, description, jobId }
}