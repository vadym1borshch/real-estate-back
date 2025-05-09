import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'


export const getProfessions = async (req: Request, res: Response) => {
  const { id } = req.query as { id?: string }

  try {
    if (!id) {
      return res.status(400).json({ error: 'Missing id in query' })
    }

    const profession = await prisma.profession.findUnique({ where: { id } })

    if (!profession) {
      return res.status(404).json({ error: 'profession not found' })
    }

    res.json({ profession })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
