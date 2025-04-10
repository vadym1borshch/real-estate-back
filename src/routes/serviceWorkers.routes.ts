import { Router } from 'express'
import type { Request, Response } from 'express'
import { serviceWorker } from '../controllers/serviceWorker.controller'

const router = Router()

router.get('/service-workers', async (req: Request, res: Response) => {
  await serviceWorker(req, res)
})


export default router
