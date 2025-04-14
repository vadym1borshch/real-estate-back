import { PrismaClient } from '@prisma/client'
import { professionsSeed } from './seedProfessions'
import { servicesSeed } from './seedServices'
import { serviceWorkersSeed } from './seedServiceWorkers'
import { estateSeed } from './seedEstates'
import { estateImagesSeed } from './seedEstateImages'

const prisma = new PrismaClient()

async function main() {

  await professionsSeed()
  await servicesSeed()
  await serviceWorkersSeed()
  await estateSeed()
  await estateImagesSeed()
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
