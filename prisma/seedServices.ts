import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'

const prisma = new PrismaClient()

export const servicesSeed = async () => {
  await prisma.service.deleteMany()
  await prisma.service.createMany({
    data: [
      {
        id: 'law-firm-estate',
        title: 'service-around.services.law-firm-estate',
        checked: false,
      },
      {
        id: 'expert',
        title: 'service-around.services.expert',
        checked: false,
      },
      {
        id: 'builder',
        title: 'service-around.services.builder',
        checked: false,
      },
      {
        id: 'electrician',
        title: 'service-around.services.electrician',
        checked: false,
      },
      {
        id: 'garden-design',
        title: 'service-around.services.garden-design',
        checked: false,
      },
      {
        id: 'installer',
        title: 'service-around.services.installer',
        checked: false,
      },
      {
        id: 'cleaning-staff',
        title: 'service-around.services.cleaning-staff',
        checked: false,
      },
      {
        id: 'doors',
        title: 'service-around.services.doors',
        checked: false,
      },
      {
        id: 'property-management',
        title: 'service-around.services.property-management',
        checked: false,
      },
      {
        id: 'estate-taxation',
        title: 'service-around.services.estate-taxation',
        checked: false,
      },
      {
        id: 'floor-layer',
        title: 'service-around.services.floor-layer',
        checked: false,
      },
      {
        id: 'windows',
        title: 'service-around.services.windows',
        checked: false,
      },
      {
        id: 'housekeeper',
        title: 'service-around.services.housekeeper',
        checked: false,
      },
      {
        id: 'louver',
        title: 'service-around.services.louver',
        checked: false,
      },
      {
        id: 'terrace-design',
        title: 'service-around.services.terrace-design',
        checked: false,
      },
      {
        id: 'various',
        title: 'service-around.services.various',
        checked: false,
      },
      {
        id: 'notary',
        title: 'service-around.services.notary',
        checked: false,
      },
      {
        id: 'architect',
        title: 'service-around.services.architect',
        checked: false,
      },
      {
        id: 'roofers',
        title: 'service-around.services.roofers',
        checked: false,
      },
      {
        id: 'tiler',
        title: 'service-around.services.tiler',
        checked: false,
      },
      {
        id: 'interior-design',
        title: 'service-around.services.interior-design',
        checked: false,
      },
      {
        id: 'carpenter',
        title: 'service-around.services.carpenter',
        checked: false,
      },
      {
        id: 'kitchen-installation',
        title: 'service-around.services.kitchen-installation',
        checked: false,
      },
    ],
    skipDuplicates: true,
  })

}
