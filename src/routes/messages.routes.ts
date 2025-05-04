import { Router } from 'express'
import type { Request, Response } from 'express'
import { deleteMessage, getMessages, updateMessage } from '../controllers/messages.controller'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  await getMessages(req, res)
})

router.patch('/', async (req: Request, res: Response) => {
  await updateMessage(req, res)
})

router.delete('/', async (req: Request, res: Response) => {
  await deleteMessage(req, res)
})

export default router
