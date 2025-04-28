import { Router } from 'express'
import type { Request, Response } from 'express'
import { getEquipments } from '../controllers/equipments.controller'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await getEquipments(req, res)
})


export default router
