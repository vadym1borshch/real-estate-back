import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'
import { v4 } from 'uuid'

export const getEquipments = async (req: Request, res: Response) => {
  try {
    const equipments = await prisma.equipment.findMany()
    
    if (!equipments) {
      return res.status(404).json({ error: 'Equipments not found' })
    }

    // Group equipments by category
    const groupedEquipments = equipments.reduce((acc, equipment) => {
      if (!acc[equipment.category]) {
        acc[equipment.category] = []
      }
      acc[equipment.category].push({
        id: equipment.id,
        label: equipment.label,
        key: equipment.key,
        title: equipment.categoryTitle,
      })
      return acc
    }, {} as Record<string, any[]>)

    // Format the response
    const response = [
      {
        id: v4(),
        title: 'details.equipments.outlook.title',
        data: groupedEquipments['outlook'] || [],
        key: 'outlook',
      },
      {
        id: v4(),
        title: 'details.equipments.free-space.title',
        data: groupedEquipments['free-space'] || [],
        key: 'free-space',
      },
      {
        id: v4(),
        title: 'details.equipments.kitchen.title',
        data: groupedEquipments['kitchen'] || [],
        key: 'kitchen',
      },
      {
        id: v4(),
        title: 'details.equipments.floor.title',
        data: groupedEquipments['floor'] || [],
        key: 'floor',
      },
      {
        id: v4(),
        title: 'details.equipments.windows.title',
        data: groupedEquipments['windows'] || [],
        key: 'windows',
      },
      {
        id: v4(),
        title: 'details.equipments.extras.title',
        data: groupedEquipments['extras'] || [],
        key: 'extras',
      },
    ]

    res.json(response)

  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
