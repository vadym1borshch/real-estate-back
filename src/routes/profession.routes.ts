import { Router } from 'express'
import type { Request, Response } from 'express'
import { getProfessions } from '../controllers/profession.controller'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await getProfessions(req, res)
})


export default router
