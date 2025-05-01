import { PrismaClient } from '@prisma/client'
import { professionsSeed } from './seedProfessions'
import { servicesSeed } from './seedServices'
import { serviceWorkersSeed } from './seedServiceWorkers'
import { estateSeed } from './seedEstates'
import { estateImagesSeed } from './seedEstateImages'
import { seedEquipment } from './seedEquipments'
import { feesFieldsSeed } from './seedFeesFields'
import { premisesFieldsSeed } from './seedPremisesFields'

const prisma = new PrismaClient()

async function main() {

  await professionsSeed()
  await servicesSeed()
  await serviceWorkersSeed()
  await estateSeed()
  await estateImagesSeed()
  await seedEquipment()
  await feesFieldsSeed()
  await premisesFieldsSeed()
}

main()
  .then(() => console.log('✅ Seed completed'))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
