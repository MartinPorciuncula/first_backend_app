import { Router } from 'express'
import { router as usersRouter } from '../users/users.route.js'

export const router = Router()

router.use('/users',usersRouter)
