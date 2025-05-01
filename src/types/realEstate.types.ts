import { RealEstate } from '@prisma/client'

export interface Premise {
  id: string
  key: string
  label: string
  name: string
  value?: number | string
}

export interface Equipment {
  id: string
  key: string
  label: string
  name?: string
}

export interface Fee {
  id: string
  key: string
  value: string
  title: string
  descriptions: string
}

export interface MonthlyCost {
  id: string
  key: string
  title: string
  descriptions: string
  cost: string
}

export interface RealEstateResponse {
  id: string
  images: Array<{
    id: string
    url: string | null
    estateId: string
    createdAt: Date
  }>
  favoredBy: string[]
  [key: string]: any
}

export interface RealEstateWithRelations extends RealEstate {
  images: Array<{
    id: string
    url: string | null
    estateId: number
    createdAt: Date
  }>
  favoredBy: Array<{
    id: string
  }>
  premises?: Array<{
    id: string
    label: string
    name: string
    key: string
    value: string
    realEstateId: number
  }>
  equipments?: Array<{
    id: string
    label: string
    name?: string
    key: string
    realEstateId: number
  }>
  fees?: Array<{
    id: string
    key: string
    value: string
    title: string
    descriptions: string
    realEstateId: number
  }>
  monthlyCosts?: Array<{
    id: string
    key: string
    title: string
    descriptions: string
    cost: string
    realEstateId: number
  }>
}

export interface CreateRealEstateInput {
  userId: string
  images: string[]
  bathroomsTotal: string
  permittedRentForm: boolean
  typeKey: string
  yearBuilt: string
  label: string
  cellar: string
  postCode: string
  visibleDetailedAddress: string
  city: string
  addressLat: string
  addressLng: string
  rooms: string
  livingAreaM2: string
  price: string
  [key: string]: any
}

export const ERROR_MESSAGES = {
  ESTATES_NOT_FOUND: 'estates not found',
  ADS_NOT_FOUND: 'ads not found',
  AD_NOT_FOUND: 'Ad not found',
  ESTATE_NOT_FOUND: 'Estate not found',
  MISSING_ESTATE_ID: 'Estate ID is required',
  SERVER_ERROR: 'Server error',
  NOTHING_CHANGED: 'Nothing to update',
  ESTATE_DELETED: 'Estate deleted successfully',
  ESTATE_UPDATED: 'Estate updated successfully',
  ESTATE_CREATED: 'Estate created successfully',
  FEES_FIELDS_NOT_FOUND: 'Fees fields not found'
} as const

export const ESTATE_TYPES = {
  APARTMENT: 'apartment',
  HOUSE: 'house',
  SEMI_DETACHED_HOUSE: 'semi-detached-house',
  RETAIL_PROPERTY: 'retail-property'
} as const

export const ESTATE_TYPE_VALUES = {
  [ESTATE_TYPES.APARTMENT]: 'real-estate.type.apartment',
  [ESTATE_TYPES.HOUSE]: 'real-estate.type.house',
  [ESTATE_TYPES.SEMI_DETACHED_HOUSE]: 'real-estate.type.semi-detached-house',
  [ESTATE_TYPES.RETAIL_PROPERTY]: 'real-estate.type.retail-property'
} as const

export const OPERATION_TYPES = {
  RENT: 'rent',
  BUY: 'buy'
} as const

export const OPERATION_VALUES = {
  [OPERATION_TYPES.RENT]: 'real-estate.operations.rent',
  [OPERATION_TYPES.BUY]: 'real-estate.operations.buy'
} as const 