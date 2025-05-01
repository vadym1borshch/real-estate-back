import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'
const prisma = new PrismaClient()

export type FeeField = {
  id: string
  title: string
  value: string
  descriptions: string
  key: string
}

export const initialFields: FeeField[] = [
  {
    id: v4(),
    title: 'real-estate.details.detail-info.fees.broker-fee',
    key: 'broker-fee',
    value: '3,00%',
    descriptions: 'zzgl. UST 20%',
  },
  {
    id: v4(),
    title: 'real-estate.details.detail-info.fees.transfer-tax',
    key: 'transfer-tax',
    value: '3,50%',
    descriptions: '',
  },
  {
    id: v4(),
    title: 'real-estate.details.detail-info.fees.land-registry',
    key: 'land-registry',
    value: '1,10%',
    descriptions: '',
  },
  {
    id: v4(),
    title: 'real-estate.details.detail-info.fees.purchase-agreement',
    key: 'purchase-agreement',
    value: '',
    descriptions: 'nach dem Tarif des jeweiligen Urkundenrichters',
  },
  { 
    id: v4(), 
    title: '', 
    key: 'user-field', 
    value: '', 
    descriptions: '',
  },
]

export const feesFieldsSeed = async () => {
  const existingFields = await prisma.feesField.findMany({
    select: { key: true }
  })
  const existingKeys = new Set(existingFields.map(field => field.key))

  const newFields = initialFields.filter(field => !existingKeys.has(field.key))

  if (newFields.length > 0) {
    await prisma.feesField.createMany({
      data: newFields,
    })
  }
}
