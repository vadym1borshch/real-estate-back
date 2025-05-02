import { Router } from 'express'
import type { Request, Response } from 'express'
import { uploadImages } from '../controllers/uploadImages.controller'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const router = Router()

router.post('/', upload.array('images', 10), async (req: Request, res: Response) => {
  await uploadImages(req, res)
})


export default router
