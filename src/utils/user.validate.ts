import { validateString } from "./validation"

export const validateApplicantForm = (data: any) => {
    const { title, description } = data
    const validateTitle = validateString(title)
    const validateDesc = validateString(description)
    if (validateTitle) {
        throw new Error("Title field is incorrect format")
    } else if (validateDesc) {
        throw new Error("Description field is incorrect format")
    }
}