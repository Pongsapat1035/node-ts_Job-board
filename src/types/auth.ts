export interface RegisterForm {
    email: string,
    password: string,
    name: string
    role: Role
}

export enum Role {
    Company = "company",
    User = "user",
    Admin = "admin"
}