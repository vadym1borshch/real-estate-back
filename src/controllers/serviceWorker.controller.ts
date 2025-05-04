import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'

export const serviceWorker = async (req: Request, res: Response) => {

  try {
    const servicesWorkers = await prisma.serviceWorker.findMany()

    if (!servicesWorkers || servicesWorkers.length === 0) {
      return res.status(404).json({ error: 'serviceWorkers not found' })
    }

    const workersProfessions = await prisma.profession.findMany()

    const newWorkers = servicesWorkers.map((serviceWorker) => ({
      ...serviceWorker,
      profession: workersProfessions.find(
        (profession) => profession.id === serviceWorker.professionId
      ),
    }))

    res.json({ workers: newWorkers })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
