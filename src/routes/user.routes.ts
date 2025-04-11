import { Router } from 'express'
import type { Request, Response } from 'express'
import { me, update, uploadAvatar } from '../controllers/user.controller'
import { upload } from '../middlewares/upload'


const router = Router()

router.patch('/update-photo', upload.single('file'), async (req: Request, res: Response) => {
  await uploadAvatar(req, res)
})

router.patch('/update', async (req: Request, res: Response) => {
  await update(req, res)
})

router.get('/me', async (req: Request, res: Response) => {
  await me(req, res)
})




export default router
