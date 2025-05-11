import express from 'express'
import { Request, Response } from 'express'
import { z } from "zod";
import { PrismaClient } from '../generated/prisma';

const router = express.Router()

router.post('/login', (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
    } catch (error) {

    }
    console.log('check login')
    res.json({ message: "ok" })
})



router.post("/register", (req: Request, res: Response)=>{
    try{
        const { email, pasword, confirmPassword, role } = req.body
        const emailValidate = z.string().min(1, { message: "email is missing" })
        emailValidate.parse(email)
        console.log(email)
    } catch(error){
        console.log(error)
    }
})

export default router
