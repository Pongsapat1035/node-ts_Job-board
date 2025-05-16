import { z } from "zod"
import { Role } from "../types"

export const validateEmail = (email: string): string | null => {
    const emailFormat = z.string({ message: "email in in correct" })
        .min(1, { message: "email is missing" })
        .email({ message: "email is incorrect format (ex. example@mail.com)" })
    const result = emailFormat.safeParse(email)

    if (!result.success) {
        const errMsg = result.error.issues[0].message
        return errMsg
    }
    return null
}

export const validatePassword = (password: string): string | null => {
    const passwordRex = /^(?=.*[A-Z]).+$/
    const passwordFormat = z.string({ message: "password is missing" })
        .min(8, { message: "password is at least 8 digit" })
        .regex(passwordRex, "Password is incorrect format")

    const result = passwordFormat.safeParse(password)

    if (!result.success) {
        const errMsg = result.error.issues[0].message
        return errMsg
    }
    return null
}

export const validateString = (text: string): string | null => {
    const stringFormat = z.string({ message: ` is missing` }).min(1, { message: ` must have at least one charactor` })
    const result = stringFormat.safeParse(text)

    if (!result.success) {
        const errMsg = result.error.issues[0].message
        return errMsg
    }
    return null
}

export const validaetNumber = (number: string): string | null => {
    const numberFormat = z.number({ message: "Wrong type" }).min(0, { message: "can't less than 0" })
    const result = numberFormat.safeParse(number)

    if (!result.success) {
        const errMsg = result.error.issues[0].message
        return errMsg
    }
    return null
}

export const validateRole = (role:string): string | null => {
    const roleFormat = z.nativeEnum(Role)
    const result = roleFormat.safeParse(role)

     if (!result.success) {
        const errMsg = result.error.issues[0].message
        return errMsg
    }
    return null
}