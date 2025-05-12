import express from 'express'
import { registerHanler, loginHanler } from '../controllers/auth.controller';

const router = express.Router()

router.post('/login', loginHanler)
router.post("/register", registerHanler)

export default router
