import express from 'express'
import { getProfileHanler, updateProfileHanler, createJobHanler, getAllJobsHanler, getJobHanler, deleteJobHanler, updateJobHanler } from '../controllers/company.controller'

const router = express.Router()

router.get("/profile", getProfileHanler)
router.patch("/profile", updateProfileHanler)

router.get("/jobs", getAllJobsHanler)
router.get("/job/:id", getJobHanler)
router.post("/job", createJobHanler)
router.patch("/job/:id", updateJobHanler)
router.delete("/job/:id", deleteJobHanler)

export default router
