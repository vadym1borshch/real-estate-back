import { Router } from 'express'
import type { Request, Response } from 'express'
import { getPremisesFields } from '../controllers/premisesFields.controller'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await getPremisesFields(req, res)
})


export default router
