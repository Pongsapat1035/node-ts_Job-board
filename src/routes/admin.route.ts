import express from 'express'
import {
    loadUserHanler,
    loadUserDetailHandler,
    updateUserDetailHanler,
    deleteUserHanler
} from '../controllers/admin.controller'

const router = express.Router()

router.get('/users', loadUserHanler)
router.get('/user/:id', loadUserDetailHandler)

router.patch('/user/:id', updateUserDetailHanler)
router.delete('/user/:id', deleteUserHanler)

export default router
