import { Router } from 'express'
import type { Request, Response } from 'express'
import { getMessages, postMessage } from '../controllers/messages.controller'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await getMessages(req, res)
})

router.post('/add', async (req: Request, res: Response) => {
  await postMessage(req, res)
})


export default router
