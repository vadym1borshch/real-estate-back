import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'

export const getRealEstates = async (req: Request, res: Response) => {

  try {
    const estates = await prisma.realEstate.findMany({
      include: {
        images: true,
        favoredBy:{
          select: {
            id: true,
          },
        }
      },
    })
    if (!estates) return res.status(404).json({ error: 'estates not found' })

    const formatEstates = estates.map((estate) => {
      return {
        ...estate,
        id: estate.id.toString(),
        images: estate.images.map(image => {
          return {
            ...image,
            estateId: image.estateId.toString(),
          }
        }),
        favoredBy: estate.favoredBy.map(el => el.id)
      }
    })

    res.json({ estates: formatEstates })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}


export const getUserAds = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string }
  try {
    const ads = await prisma.realEstate.findMany({
      include: {
        images: true,
        favoredBy: true,
      }, where: { ownerId: id },
    })
    if (!ads) return res.status(404).json({ error: 'ads not found' })

    const formatEstates = ads.map((estate) => {
      return {
        ...estate,
        id: estate.id.toString(),
        images: estate.images.map(image => {
          return {
            ...image,
            estateId: image.estateId.toString(),
          }
        }),
      }
    })

    res.json({ estates: formatEstates })

  } catch (err) {

  }
}

export const toggleFavorite = async (req: Request, res: Response) => {
  const { estateId, userId } = req.body

  try {
    const estate = await prisma.realEstate.findUnique({
      where: { id: +estateId },
      include: { favoredBy: true },
    })

    if (!estate) return res.status(404).json({ error: 'Ad not found' })

    const isAlreadyFavorite = estate.favoredBy.some((user) => user.id === userId)

    const resEstate = await prisma.realEstate.update({
      where: { id: Number(estateId) },
      data: {
        favoredBy: {
          [isAlreadyFavorite ? 'disconnect' : 'connect']: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        favoredBy: {
          select: {
            id: true,
          },
        },
      },
    })

    const data = {
      ...resEstate,
      favoredBy: resEstate.favoredBy.map(el => el.id),
    }

    res.json({ estate: data, toggled: isAlreadyFavorite ? 'removed' : 'added' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}