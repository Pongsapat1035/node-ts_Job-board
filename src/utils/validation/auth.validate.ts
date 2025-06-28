import { RegisterForm } from "../../types"
import {
    validateField,
    validateEmail,
    validatePassword,
    validateRole,
    validateString
} from "./validation"

export const validateRegister = (data: any): RegisterForm => {
    const { email, password, name, role } = data

    validateField(validateEmail, email, "email")
    validateField(validatePassword, password, "password")
    validateField(validateString, name, "name")
    validateField(validateRole, role, "role")
    return { email, password, name, role }
}