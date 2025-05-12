import { validateEmail, validatePassword, validateRole, validateString } from "./validation"

const validateField = (validator: (value: any) => string | null, value: any, fieldName: string) => {
    const errorMsg = validator(value)
    if (errorMsg) throw new Error(`${fieldName}: ${errorMsg}`)
}

export const validateRegister = (data: any) => {
    try {
        const { email, password, confirmPassword, name, role } = data

        validateField(validateEmail, email, "email")

        if (confirmPassword !== password) throw new Error("Password is not match !")
        validateField(validatePassword, password, "password")
        validateField(validateString, name, "name")
        validateField(validateRole, role, "role")
        
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}