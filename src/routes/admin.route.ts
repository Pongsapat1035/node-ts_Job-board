import express from 'express'
import { loadUserHanler, loadUserDetail, updateUserDetail, deleteHanler } from '../controllers/admin.controller'

const router = express.Router()

router.get('/users', loadUserHanler)
router.get('/user/:id', loadUserDetail)

router.patch('/user/:id', updateUserDetail)
router.delete('/user/:id', deleteHanler)

export default router
