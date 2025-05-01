import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'

export const getPremisesFields = async (req: Request, res: Response) => {
  const { estateId } = req.query

  try {
    // First check if estate exists and get its cellar status
    const estate = estateId ? await prisma.realEstate.findUnique({
      where: { id: Number(estateId) },
      select: { cellar: true }
    }) : null

    // Get all premises fields
    const fields = await prisma.premisesField.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

    if (!fields) {
      return res.status(404).json({ error: 'Fields not found' })
    }

    // If estate exists and has no cellar, filter out cellar field
    const filteredFields = estate !== null && !estate.cellar
      ? fields.filter(field => field.key !== 'cellar')
      : fields

    res.json(filteredFields)
  } catch (err) {
    console.error('[GET PREMISES FIELDS ERROR]', err)
    res.status(500).json({ error: 'Server error' })
  }
}
