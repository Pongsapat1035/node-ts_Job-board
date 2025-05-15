import bcrypt from 'bcrypt'

const saltRounds = 0

export const getHashedPassword = async (plainTextPassword:string) : Promise<string> => {
   const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds)
   return hashedPassword
}

export const comparePassword = async (plainTextPassword:string, hashedPassword:string): Promise<boolean> => {
    const result = await bcrypt.compare(plainTextPassword, hashedPassword);
    return result
}