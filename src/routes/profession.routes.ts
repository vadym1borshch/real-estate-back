import { Router } from 'express'
import type { Request, Response } from 'express'
import { profession } from '../controllers/profession.controller'

const router = Router()

router.get('/professions', async (req: Request, res: Response) => {
  await profession(req, res)
})


export default router
