import express from 'express'
import { addBookmarkHanler, createApplicantHanler, deleteAplicantHanler, getAllApplicantsHanler, getAllJobsHanler, getApplicantHanler, getBookmarkListHanler, getJobHanler, removeBookmarkHanler } from '../controllers/user.controller'

const router = express.Router()

router.get('/jobs', getAllJobsHanler)
router.get('/job/:id', getJobHanler)

router.get('/applicants', getAllApplicantsHanler)
router.get('/applicant/:id', getApplicantHanler)
router.post('/applicant', createApplicantHanler)
router.delete('/applicant/:id', deleteAplicantHanler)

router.get('/bookmark', getBookmarkListHanler)
router.post('/bookmark', addBookmarkHanler)
router.delete('/bookmark/:id', removeBookmarkHanler)

export default router


