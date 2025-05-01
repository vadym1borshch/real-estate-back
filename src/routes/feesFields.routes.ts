import { Router } from 'express'
import type { Request, Response } from 'express'
import { getFeesFields } from '../controllers/feesFields.controller'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await getFeesFields(req, res)
})


export default router
