import { z } from 'zod'

export const PremiseSchema = z.object({
  id: z.string().uuid(),
  key: z.string().openapi({ example: 'wc' }),
  label: z.string().openapi({ example: 'Toilet' }),
  value: z.string().openapi({ example: '1.5' }),
  name: z.string(),
})

export const EquipmentSchema = z.object({
  id: z.string().uuid(),
  key: z.string().openapi({ example: 'air-conditioning' }),
  label: z.string().openapi({ example: 'Air Conditioning' }),
})

export const FeeSchema = z.object({
  title: z.string().openapi({ example: 'Water fee' }),
  value: z.string().openapi({ example: '150' }),
  key: z.string().openapi({ example: 'air-conditioning' }),
  descriptions: z.string().optional().openapi({ example: 'monthly' }),
})

export const MonthlyCostSchema = z.object({
  title: z.string().openapi({ example: 'Internet' }),
  cost: z.string().optional().openapi({ example: '30' }),
  key: z.string().openapi({ example: 'internet' }),
  descriptions: z.string().optional().openapi({ example: 'per month' }),
})

export const EstateSchema = z
  .object({
    id: z.number().int(),
    label: z.string(),
    isTop: z.boolean(),
    typeKey: z.string(),
    typeValue: z.string(),
    addressLocation: z.string(),
    addressLat: z.number(),
    addressLng: z.number(),
    rooms: z.number().int(),
    bathroomsTotal: z.number().int().optional(),
    bathroomsDesc: z.string().optional(),
    operationKey: z.string(),
    operationValue: z.string(),
    livingAreaM2: z.number().int(),
    landAreaM2: z.number().int().optional(),
    price: z.string(),
    views: z.number().int(),
    yearBuilt: z.number().int(),
    floors: z.string().optional(),
    garage: z.string().optional(),
    heating: z.string().optional(),
    commissionFree: z.string().optional(),
    additionalFeatures: z.string().optional(),
    kitchen: z.string().optional(),
    loungeArea: z.string().optional(),
    furnished: z.string().optional(),
    availability: z.string().optional(),
    additionalInfo: z.string().optional(),
    ownerId: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    number: z.string().optional(),
    rentFormation: z.string().optional(),
    street: z.string().optional(),
    visibleDetailedAddress: z.boolean(),
    status: z.string(),
    country: z.string().optional(),
    state: z.string().optional(),
    HBW: z.string().optional(),
    HBWEnergyClass: z.string().optional(),
    balcony: z.string().optional(),
    brokerCommissions: z.string().optional(),
    brokerCommissionsPercentage: z.string().optional(),
    cellar: z.boolean(),
    energyCertificate: z.string().optional(),
    fGEE: z.string().optional(),
    fGEEEnergyClass: z.string().optional(),
    isFavorite: z.boolean(),
    isSelectedOnMap: z.boolean(),
    locationDescriptions: z.string().optional(),
    netOperationCosts: z.string().optional(),
    parkPlacePrice: z.string().optional(),
    propertyDescriptions: z.string().optional(),
    terrace: z.string().optional(),
    owner: z.string(),
    equipments: z.array(EquipmentSchema.extend({
      realEstateId: z.number(),
    })),
    fees: z.array(FeeSchema.extend({
      id: z.string().uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
      realEstateId: z.number(),
    })),
    images: z.array(z.object({
      id: z.string().uuid(),
      url: z.string(),
      estateId: z.number(),
      createdAt: z.string().datetime(),
    })),
    monthlyCosts: z.array(MonthlyCostSchema.extend({
      id: z.string().uuid().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
      realEstateId: z.number(),
    })),
    premises: z.array(PremiseSchema.extend({
      realEstateId: z.number(),
    })),
    favoredBy: z.array(z.string()),
  })
  .openapi({
    title: 'Estate',
    description: 'Estate fields',
  })

export const CreateOrUpdateEstateSchema = z.object({
  typeKey: z.string().openapi({ example: 'apartment' }),
  label: z.string().openapi({ example: 'Cozy apartment in center' }),
  country: z.string().openapi({ example: 'Germany' }),
  city: z.string().openapi({ example: 'Berlin' }),
  postCode: z.string().openapi({ example: '10115' }),
  visibleDetailedAddress: z.enum(['yes', 'no']).openapi({ example: 'yes' }),
  street: z.string().openapi({ example: 'Main Street' }),
  number: z.string().openapi({ example: '12B' }),
  rentFormation: z.string().optional().openapi({ example: 'cold' }),
  yearBuilt: z.string().openapi({ example: '2005' }),
  floors: z.string().optional().openapi({ example: '3' }),
  livingAreaM2: z.string().openapi({ example: '80' }),
  balcony: z.string().optional().openapi({ example: 'yes' }),
  terrace: z.string().optional().openapi({ example: 'no' }),
  landAreaM2: z.string().optional().openapi({ example: '120' }),
  heating: z.string().optional().openapi({ example: 'gas' }),
  energyCertificate: z.string().optional().openapi({ example: 'available' }),
  HBW: z.string().optional().openapi({ example: 'A' }),
  HBWEnergyClass: z.string().optional().openapi({ example: 'A+' }),
  fGEE: z.string().optional().openapi({ example: '1.1' }),
  fGEEEnergyClass: z.string().optional().openapi({ example: 'B' }),
  cellar: z.enum(['yes', 'no']).openapi({ example: 'yes' }),
  price: z.string().openapi({ example: '300000' }),
  parkPlacePrice: z.string().optional().openapi({ example: '15000' }),
  garage: z.string().optional().openapi({ example: 'underground' }),
  rooms: z.string().openapi({ example: '3' }),
  bathroomsTotal: z.string().openapi({ example: '2' }),
  state: z.string().optional().openapi({ example: 'Berlin' }),
  netOperationCosts: z.string().optional().openapi({ example: '200' }),
  brokerCommissions: z.string().optional().openapi({ example: '3%' }),
  brokerCommissionsPercentage: z.string().optional().openapi({ example: '3' }),
  propertyDescriptions: z.string().optional().openapi({ example: 'Spacious and well-located' }),
  locationDescriptions: z.string().optional().openapi({ example: 'Near subway and park' }),
  addressLat: z.string().openapi({ example: '52.5200' }),
  addressLng: z.string().openapi({ example: '13.4050' }),
  images: z.array(z.string().url()).openapi({ example: ['https://example.com/img.jpg'] }),
})


export const UpdateRealEstateAdditionalInfoSchema = z.object({
  estateId: z.number().openapi({ example: 123456 }),
  premises: z.array(PremiseSchema).optional(),
  equipments: z.array(EquipmentSchema).optional(),
  fees: z.array(FeeSchema).optional(),
  monthlyCosts: z.array(MonthlyCostSchema).optional(),
})

export type Estate = z.infer<typeof EstateSchema>