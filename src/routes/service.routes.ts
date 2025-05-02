import { Router } from 'express'
import type { Request, Response } from 'express'
import { getService, updateService } from '../controllers/service.controller'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await getService(req, res)
})

router.patch('/', async (req: Request, res: Response) => {
  await updateService(req, res)
})


export default router
