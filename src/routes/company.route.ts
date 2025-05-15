import express from 'express'
import { getProfileHanler, updateProfileHanler, createJobHanler } from '../controllers/company.controller'

const router = express.Router()

router.get("/profile", getProfileHanler)
router.patch("/profile", updateProfileHanler)

router.post("/job", createJobHanler)

export default router
