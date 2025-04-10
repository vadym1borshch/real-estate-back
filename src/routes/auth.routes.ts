import { Router } from 'express'
import type { Request, Response } from 'express'
import { login, register, update } from '../controllers/auth.controller'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
  await register(req, res)
})

router.post('/login', async (req: Request, res: Response) => {
  await login(req, res)
})

router.put('/update', async (req: Request, res: Response) => {
  await update(req, res)
})


export default router
