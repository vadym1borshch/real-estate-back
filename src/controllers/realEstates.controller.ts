import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'
import {
  RealEstateWithRelations,
  RealEstateResponse,
  CreateRealEstateInput,
  ERROR_MESSAGES,
  ESTATE_TYPE_VALUES,
  OPERATION_TYPES,
  OPERATION_VALUES,
  Premise,
  MonthlyCost
} from '../types/realEstate.types'
import { log } from 'console'
import { Equipment, FeesField, Prisma } from '@prisma/client'

/**
 * Formats the estate response to ensure consistent data structure
 * Converts numeric IDs to strings and formats nested objects
 */
const formatEstateResponse = (estate: RealEstateWithRelations): RealEstateResponse => ({
  ...estate,
  id: estate.id.toString(),
  images: estate.images.map(image => ({
    ...image,
    estateId: image.estateId.toString(),
  })),
  favoredBy: estate.favoredBy?.map(el => el.id) || [],
})

export const getRealEstates = async (req: Request, res: Response) => {
  try {
    const estates = await prisma.realEstate.findMany({
      include: {
        images: true,
        favoredBy: {
          select: { id: true },
        },
        premises: true,
        equipments: true,
        fees: true,
        monthlyCosts: true,
      },
    })

    if (!estates) {
      return res.status(404).json({ error: ERROR_MESSAGES.ESTATES_NOT_FOUND })
    }

    const formattedEstates = estates.map(formatEstateResponse)
    res.json({ estates: formattedEstates })
  } catch (err) {
    console.error('[GET REAL ESTATES ERROR]', err)
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR })
  }
}

export const getUserAds = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string }

  try {
    const ads = await prisma.realEstate.findMany({
      include: {
        images: true,
        favoredBy: true,
        premises: true,
        equipments: true,
        fees: true,
        monthlyCosts: true,
      },
      where: { ownerId: id },
    })

    if (!ads) {
      return res.status(404).json({ error: ERROR_MESSAGES.ADS_NOT_FOUND })
    }

    const formattedEstates = ads.map(formatEstateResponse)
    res.json({ estates: formattedEstates })
  } catch (err) {
    console.error('[GET USER ADS ERROR]', err)
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR })
  }
}

export const toggleFavorite = async (req: Request, res: Response) => {
  const { estateId, userId } = req.body

  try {
    const estate = await prisma.realEstate.findUnique({
      where: { id: +estateId },
      include: { favoredBy: true },
    })

    if (!estate) {
      return res.status(404).json({ error: ERROR_MESSAGES.AD_NOT_FOUND })
    }

    const isAlreadyFavorite = estate.favoredBy.some((user) => user.id === userId)

    const updatedEstate = await prisma.realEstate.update({
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
      ...updatedEstate,
      favoredBy: updatedEstate.favoredBy.map(el => el.id),
    }

    res.json({ estate: data, toggled: isAlreadyFavorite ? 'removed' : 'added' })
  } catch (err) {
    console.error('[TOGGLE FAVORITE ERROR]', err)
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR })
  }
}

export const createRealEstate = async (req: Request, res: Response) => {
  try {
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
      rooms,
      livingAreaM2,
      landAreaM2,
      price,
      ...params
    } = req.body as CreateRealEstateInput

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
        rooms: +rooms,
        livingAreaM2: +livingAreaM2,
        landAreaM2: +landAreaM2,
        price: price,
        owner: {
          connect: { id: userId },
        },
        images: {
          create: images.map((url: string) => ({
            url,
            createdAt: new Date(),
          })),
        },
        operationKey: permittedRentForm ? OPERATION_TYPES.RENT : OPERATION_TYPES.BUY,
        operationValue: permittedRentForm ? OPERATION_VALUES.rent : OPERATION_VALUES.buy,
        typeValue: ESTATE_TYPE_VALUES[typeKey as keyof typeof ESTATE_TYPE_VALUES] || ESTATE_TYPE_VALUES['retail-property'],
      },
      include: {
        images: true,
        favoredBy: true,
      },
    })

    res.status(201).json({ 
      message: ERROR_MESSAGES.ESTATE_CREATED, 
      estate: formatEstateResponse(newEstate as RealEstateWithRelations)
    })
  } catch (err) {
    console.error('[CREATE ESTATE ERROR]', err)
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR })
  }
}

/**
 * Updates additional information for a real estate including:
 * - Premises (rooms, areas, etc.)
 * - Equipment
 * - Fees
 * - Monthly costs
 */
export const updateRealEstateAdditionalInfo = async (req: Request, res: Response) => {
  const { id, premises, equipments, fees, monthlyCosts } = req.body

  try {
    // Calculate total living area from premises
    let totalLivingArea = 0
    let wcCount = 0
    let bathroomCount = 0
    
    if (premises) {
      // Calculate living area
      const livingSpacePremises = premises.filter((premise: Premise) => premise.key === 'living-space')
      totalLivingArea = livingSpacePremises.reduce((sum: number, premise: Premise) => {
        const value = parseFloat(premise.value?.toString() || '0')
        return sum + (isNaN(value) ? 0 : value)
      }, 0)

      // Count bathrooms and WCs by their keys
      wcCount = premises.filter((premise: Premise) => premise.key === 'wc').length
      bathroomCount = premises.filter((premise: Premise) => premise.key === 'bathroom').length
    }

    // Create bathroom description string
    const bathroomsDesc = [
      wcCount > 0 ? `${wcCount} WC` : '',
      bathroomCount > 0 ? `${bathroomCount} Bath` : ''
    ].filter(Boolean).join(' | ')

    // Update basic estate information and related data
    const updated = await prisma.realEstate.update({
      where: { id },
      data: {
        ...(premises && {
          premises: {
            deleteMany: {},
            create: premises.map((premise: Premise) => ({
              ...premise,
              value: premise.value?.toString() || ''
            })),
          },
        }),
        ...(fees && {
          fees: {
            deleteMany: {},
            create: fees.map((fee: FeesField) => ({
              ...fee,
              descriptions: fee.value ? `${fee.value} ${fee.descriptions}` : fee.descriptions
            })),
          },
        }),
        ...(monthlyCosts && {
          monthlyCosts: {
            deleteMany: {},
            create: monthlyCosts.map((cost: MonthlyCost) => ({
              ...cost,
              descriptions: cost.cost ? `${cost.cost} ${cost.descriptions}` : cost.descriptions
            })),
          },
        }),
        ...(premises && { 
          livingAreaM2: totalLivingArea,
          bathroomsTotal: wcCount + bathroomCount,
          bathroomsDesc: bathroomsDesc || undefined
        }),
      },
      include: { 
        images: true, 
        premises: true, 
        equipments: true, 
        fees: true, 
        monthlyCosts: true,
        favoredBy: true
      },
    })

    // Handle equipment updates
    if (equipments) {
      // Get existing equipment IDs for this estate
      const existingEquipments = await prisma.realEstateEquipments.findMany({
        where: { realEstateId: id },
        select: { id: true }
      })

      // Find equipment to delete (not present in new list)
      const newEquipmentIds = equipments.map((eq: Equipment) => eq.id)
      const equipmentsToDelete = existingEquipments
        .filter(eq => !newEquipmentIds.includes(eq.id))
        .map(eq => eq.id)

      // Delete removed equipment
      if (equipmentsToDelete.length > 0) {
        await prisma.realEstateEquipments.deleteMany({
          where: {
            id: { in: equipmentsToDelete }
          }
        })
      }

      // Split equipment into existing and new ones
      const existingEquipmentIds = existingEquipments.map(eq => eq.id)
      const equipmentsToUpdate = equipments.filter((eq: Equipment) => existingEquipmentIds.includes(eq.id))
      const equipmentsToCreate = equipments.filter((eq: Equipment) => !existingEquipmentIds.includes(eq.id))

      // Update existing equipment
      for (const equipment of equipmentsToUpdate) {
        await prisma.realEstateEquipments.updateMany({
          where: { id: equipment.id },
          data: {
            key: equipment.key,
            label: equipment.label
          }
        })
      }

      // Create new equipment
      if (equipmentsToCreate.length > 0) {
        for (const equipment of equipmentsToCreate) {
          try {
            await prisma.realEstateEquipments.create({
              data: {
                id: equipment.id,
                realEstateId: id,
                key: equipment.key,
                label: equipment.label
              }
            })
          } catch (error) {
            // Skip if equipment already exists
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
              continue
            }
            throw error
          }
        }
      }
    }

    // Get final estate state with all relations
    const finalEstate = await prisma.realEstate.findUnique({
      where: { id },
      include: {
        images: true,
        premises: true,
        equipments: true,
        fees: true,
        monthlyCosts: true,
        favoredBy: true
      }
    })

    res.json({ 
      message: ERROR_MESSAGES.ESTATE_UPDATED, 
      estate: formatEstateResponse(finalEstate as RealEstateWithRelations)
    })
  } catch (err) {
    console.error('[UPDATE ESTATE ADDITIONAL INFO ERROR]', err)
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR })
  }
}

/**
 * Updates basic information for a real estate
 */
export const updateRealEstate = async (req: Request, res: Response) => {
  try {
    const { id, ...updates } = req.body

    if (!id) {
      return res.status(400).json({ error: ERROR_MESSAGES.MISSING_ESTATE_ID })
    }

    const existing = await prisma.realEstate.findUnique({
      where: { id },
      include: { images: true, favoredBy: true },
    })

    if (!existing) {
      return res.status(404).json({ error: ERROR_MESSAGES.ESTATE_NOT_FOUND })
    }

    // Check if there are any actual changes
    const isEqual = Object.entries(updates).every(([key, value]) => {
      if (key === 'images' && Array.isArray(value)) {
        const existingUrls = existing.images.map((img) => img.url)
        return JSON.stringify(existingUrls) === JSON.stringify(value)
      }
      return (existing as any)[key] === value
    })

    if (isEqual) {
      return res.status(200).json({ 
        message: ERROR_MESSAGES.NOTHING_CHANGED, 
        estate: formatEstateResponse(existing as RealEstateWithRelations)
      })
    }

    const key = 'real-estate.type.'
    const typeV = existing.typeValue.split('.')
    const estateTypeValue = typeV[typeV.length - 1]

    const { images, postCode, city, visibleDetailedAddress, cellar, number, typeKey, landAreaM2, wc, ...restUpdates } = updates

    const updated = await prisma.realEstate.update({
      where: { id },
      data: {
        addressLocation: `${postCode} ${city}`,
        visibleDetailedAddress: visibleDetailedAddress !== 'no',
        typeValue: estateTypeValue !== typeKey ? `${key}${typeKey}` : `${key}${estateTypeValue}`,
        cellar: cellar !== 'no',
        number: number !== 'no' ? number : null,
        landAreaM2: landAreaM2 ? landAreaM2 : null,
        bathroomsTotal: wc ? wc : 1,
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
      include: { 
        images: true, 
        premises: true, 
        equipments: true, 
        fees: true, 
        monthlyCosts: true,
        favoredBy: true
      },
    })

    res.status(200).json({ 
      message: ERROR_MESSAGES.ESTATE_UPDATED, 
      estate: formatEstateResponse(updated as RealEstateWithRelations)
    })
  } catch (err) {
    console.error('[UPDATE ESTATE ERROR]', err)
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR })
  }
}

export const deleteRealEstate = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string }

  try {
    const estate = await prisma.realEstate.findUnique({ where: { id: +id } })
    
    if (!estate) {
      return res.status(404).json({ error: ERROR_MESSAGES.ESTATE_NOT_FOUND })
    }

    await prisma.realEstate.delete({ where: { id: +id } })
    res.status(200).json({ message: ERROR_MESSAGES.ESTATE_DELETED })
  } catch (err) {
    console.error('[DELETE ESTATE ERROR]', err)
    res.status(500).json({ error: ERROR_MESSAGES.SERVER_ERROR })
  }
}