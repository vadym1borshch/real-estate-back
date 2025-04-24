import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'
import { RealEstate } from '@prisma/client'

export const getRealEstates = async (req: Request, res: Response) => {

  try {
    const estates = await prisma.realEstate.findMany({
      include: {
        images: true,
        favoredBy: {
          select: {
            id: true,
          },
        },
        premises: true,
        equipments: true,
        fees: true,
        monthlyCosts: true,
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
        favoredBy: estate.favoredBy.map(el => el.id),
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

export const createRealEstate = async (req: Request, res: Response) => {
  const {
    userId,
    images,
    bathroomsTotal,
    permittedRentForm,
    typeKey,
    yearBuilt,
    label,
    cellar,
    postCode,
    visibleDetailedAddress,
    city,
    addressLat,
    addressLng,
    ...params
  } = req.body

  const setTypeValue = (typeKey: string) => {
    if (typeKey === 'apartment') {
      return 'real-estate.type.apartment'
    } else if (typeKey === 'house') {
      return 'real-estate.type.house'
    } else if (typeKey === 'semi-detached-house') {
      return 'real-estate.type.semi-detached-house'
    }
    return 'real-estate.type.retail-property'
  }

  const newEstate = await prisma.realEstate.create({
    data: {
      ...params,
      label,
      typeKey,
      addressLocation: `${postCode} ${city}`,
      visibleDetailedAddress: visibleDetailedAddress !== 'no',
      cellar: cellar !== 'no',
      yearBuilt: +yearBuilt,
      bathroomsTotal: +bathroomsTotal,
      addressLat: parseFloat(addressLat),
      addressLng: parseFloat(addressLng),
      owner: {
        connect: { id: userId },
      },
      images: {
        create: images.map((url: string) => ({
          url,
          createdAt: new Date(),
        })),
      },
      operationKey: permittedRentForm ? 'rent' : 'buy',
      operationValue: permittedRentForm ? 'real-estate.operations.rent' : 'real-estate.operations.buy',
      typeValue: setTypeValue(typeKey),
    },
    include: {
      images: true,
    },
  })
  res.json({ estate: newEstate })
}
export const updateRealEstateAdditionalInfo = async (req: Request, res: Response) => {
  const { id, premises, equipments, fees, monthlyCosts } = req.body

  try {
    const updated = await prisma.realEstate.update({
      where: { id },
      data: {
       /* livingAreaM2:`${premises[0].value} m²`,*/
        ...(premises && {
          premises: {
            deleteMany: {},
            create: premises
          },
        }),
        ...(equipments && {
          equipments: {
            deleteMany: {},
            create: equipments,
          },
        }),
        ...(fees && {
          fees: {
            deleteMany: {},
            create: fees,
          },
        }),
        ...(monthlyCosts && {
          monthlyCosts: {
            deleteMany: {},
            create: monthlyCosts,
          },
        }),
      },
      include: { images: true, premises: true, equipments: true, fees: true, monthlyCosts: true },
    })
    res.status(200).json({ message: 'Estate updated', estate: updated })
  } catch (err) {
    console.error('[UPDATE ESTATE ERROR]', err)
    res.status(500).json({ error: 'Server error' })
  }
}


export const updateRealEstate = async (req: Request<RealEstate>, res: Response) => {
  try {
    const { id, ...updates } = req.body

    if (!id) {
      return res.status(400).json({ error: 'Missing estate ID' })
    }

    const existing = await prisma.realEstate.findUnique({
      where: { id },
      include: { images: true },
    })

    if (!existing) {
      return res.status(404).json({ error: 'Real estate not found' })
    }


    const isEqual = Object.entries(updates).every(([key, value]) => {

      if (key === 'images' && Array.isArray(value)) {
        const existingUrls = existing.images.map((img) => img.url)
        return JSON.stringify(existingUrls) === JSON.stringify(value)
      }

      return (existing as any)[key] === value
    })

    if (isEqual) {
      return res.status(200).json({ message: 'Nothing changed', estate: existing })
    }
    const key = 'real-estate.type.'
    const typeV = existing.typeValue.split('.')
    const estateTypeValue = typeV[typeV.length - 1]

    const { images, postCode, city, visibleDetailedAddress, cellar, number, typeKey, ...restUpdates } = updates

    const updated = await prisma.realEstate.update({
      where: { id },
      data: {
        addressLocation: `${postCode} ${city}`,
        visibleDetailedAddress: visibleDetailedAddress !== 'no',
        typeValue: estateTypeValue !== typeKey ? `${key}${typeKey}` : `${key}${estateTypeValue}`,
        cellar: cellar !== 'no',
        number: number !== 'no' ? number : null,
        typeKey,
        ...restUpdates,
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((url: string) => ({
              url,
              createdAt: new Date(),
            })),
          },
        }),
      },
      include: { images: true, premises: true, equipments: true, fees: true, monthlyCosts: true },
    })

    res.status(200).json({ message: 'Estate updated', estate: updated })
  } catch (err) {
    console.error('[UPDATE ESTATE ERROR]', err)
    res.status(500).json({ error: 'Server error' })
  }
}

export const deleteRealEstate = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string }
  const estate = await prisma.realEstate.findUnique({ where: { id: +id } })
  if (!estate) return res.status(404).json({ error: 'Estate not found' })
  await prisma.realEstate.delete({ where: { id: +id } })
  res.status(200).json({ message: 'real estate delete successfully' })
}