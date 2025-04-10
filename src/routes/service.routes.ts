import { Router } from 'express'
import type { Request, Response } from 'express'
import { service, update } from '../controllers/service.controller'

const router = Router()

router.get('/services', async (req: Request, res: Response) => {
  await service(req, res)
})

router.patch('/services', async (req: Request, res: Response) => {
  await update(req, res)
})


export default router
