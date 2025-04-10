import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'


export const service = async (req: Request, res: Response) => {

  try {
    const services = await prisma.service.findMany()
    if (!services) return res.status(404).json({ error: 'services not found' })

    res.json({ services })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const update = async (req: Request, res: Response) => {
  const { id, checked } = req.body
  try {
    const service = await prisma.service.findUnique({ where: { id } })
    if (!service) return res.status(404).json({ error: 'services not found' })

    const updatedService = await prisma.service.update({
      where: { id },
      data: { checked },
    })

    res.json({ updatedService })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
