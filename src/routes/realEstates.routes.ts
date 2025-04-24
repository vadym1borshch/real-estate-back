import { Router } from 'express'
import type { Request, Response } from 'express'
import {
  createRealEstate, deleteRealEstate,
  getRealEstates,
  getUserAds,
  toggleFavorite,
  updateRealEstate, updateRealEstateAdditionalInfo,
} from '../controllers/realEstates.controller'
import { RealEstate } from '@prisma/client'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await getRealEstates(req, res)
})

router.get('/user-ads', async (req: Request, res: Response) => {
  await getUserAds(req, res)
})

router.patch('/toggle-favorite', async (req: Request, res: Response) => {
  await toggleFavorite(req, res)
})
router.patch('/update-estate-info', async (req: Request, res: Response) => {
  await updateRealEstateAdditionalInfo(req, res)
})
router.patch('/update-estate', async (req: Request<RealEstate>, res: Response) => {
  await updateRealEstate(req, res)
})

router.post('/', async (req: Request, res: Response) => {
  await createRealEstate(req, res)
})
router.delete('/', async (req: Request, res: Response) => {
  await deleteRealEstate(req, res)
})


export default router
