import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'

export const getFeesFields = async (req: Request, res: Response) => {
  try {
    const fields = await prisma.feesField.findMany()
    
    if (!fields) {
      return res.status(404).json({ error: 'Fields not found' })
    }


    res.json(fields)

  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
