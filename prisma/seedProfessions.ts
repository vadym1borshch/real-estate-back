import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const professionSeeds = [
  { id: 'estate-taxation', title: 'service-around.services.estate-taxation' },
  { id: 'law-firm-estate', title: 'service-around.services.law-firm-estate' },
  { id: 'expert', title: 'service-around.services.expert' },
  { id: 'builder', title: 'service-around.services.builder' },
  { id: 'architect', title: 'service-around.services.architect' },
  { id: 'roofers', title: 'service-around.services.roofers' },
  { id: 'kitchen-installation', title: 'service-around.services.kitchen-installation' },
  { id: 'cleaning-staff', title: 'service-around.services.cleaning-staff' },
  { id: 'electrician', title: 'service-around.services.electrician' },
  { id: 'floor-layer', title: 'service-around.services.floor-layer' },
  { id: 'housekeeper', title: 'service-around.services.housekeeper' },
  { id: 'property-management', title: 'service-around.services.property-management' },
  { id: 'installer', title: 'service-around.services.installer' },
  { id: 'doors', title: 'service-around.services.doors' },
  { id: 'windows', title: 'service-around.services.windows' },
  { id: 'terrace-design', title: 'service-around.services.terrace-design' },
  { id: 'louver', title: 'service-around.services.louver' },
  { id: 'notary', title: 'service-around.services.notary' },
  { id: 'various', title: 'service-around.services.various' },
  { id: 'tiler', title: 'service-around.services.tiler' },
  { id: 'interior-design', title: 'service-around.services.interior-design' },
  { id: 'carpenter', title: 'service-around.services.carpenter' },
]

export const professionsSeed = async () => {

  await prisma.profession.createMany({
    data: professionSeeds.map((prof) => ({
      key: prof.id,
      title: prof.title,
    })),
    skipDuplicates: true,
  })
}
