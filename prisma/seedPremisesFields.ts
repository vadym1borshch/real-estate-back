import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'
const prisma = new PrismaClient()

export type PremisesField = {
  id: string
  key:string
  label:string
  name: string
  value: string
}

export const initialFields: PremisesField[] = [
  {
    id: v4(),
    key: 'living-space',
    label: 'real-estate.details.detail-info.premises.living-space',
    name: '',
    value: '',
  },
  {
    id: v4(),
    key: 'bathroom',
    label: 'real-estate.details.detail-info.premises.bathroom',
    name: '',
    value: '',
  },
  {
    id: v4(),
    key: 'wc',
    label: 'real-estate.details.detail-info.premises.wc',
    name: '',
    value: '',
  },
  {
    id: v4(),
    key: 'kitchen',
    label: 'real-estate.details.detail-info.premises.kitchen',
    name: '',
    value: '',
  },
  {
    id: v4(),
    key: 'storage',
    label: 'real-estate.details.detail-info.premises.storage',
    name: '',
    value: '',
  },
  {
    id: v4(),
    key: 'cellar',
    label: 'real-estate.details.detail-info.premises.cellar',
    name: '',
    value: '',
  },
  {
    id: v4(),
    key: 'adjoining-room',
    label: 'real-estate.details.detail-info.premises.adjoining-room',
    name: '',
    value: '',
  },
  {
    id: v4(),
    key: 'outdoor-area',
    label: 'real-estate.details.detail-info.premises.outdoor-area',
    name: '',
    value: '',
  },
]

export const premisesFieldsSeed = async () => {
  const existingFields = await prisma.feesField.findMany({
    select: { key: true }
  })
  const existingKeys = new Set(existingFields.map(field => field.key))

  const newFields = initialFields.filter(field => !existingKeys.has(field.key))

  if (newFields.length > 0) {
    await prisma.premisesField.createMany({
      data: newFields,
    })
  }
}
