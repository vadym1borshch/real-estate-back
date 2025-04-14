import { Router } from 'express'
import type { Request, Response } from 'express'
import { getRealEstates, getUserAds, toggleFavorite } from '../controllers/realEstates.controller'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await getRealEstates(req, res)
})

router.get('/user-ads', async (req: Request, res: Response) => {
  await getUserAds(req, res)
})

router.patch('/user-ads', async (req: Request, res: Response) => {
  await toggleFavorite(req, res)
})


export default router
