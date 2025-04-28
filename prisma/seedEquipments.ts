import { v4 } from 'uuid'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Equipment {
  id: string
  label: string
  key: string
  category: string
  categoryTitle: string
}

interface EquipmentData {
  id: string
  title: string
  data: Equipment[]
  key: string
}

const outlookData: Equipment[] = [
  {
    id: v4(),
    label: 'details.equipments.outlook.mountain',
    key: 'mountain',
    category: 'outlook',
    categoryTitle: 'details.equipments.outlook.title',
  },
  {
    id: v4(),
    label: 'details.equipments.outlook.lake',
    key: 'lake',
    category: 'outlook',
    categoryTitle: 'details.equipments.outlook.title',
  },
  {
    id: v4(),
    label: 'details.equipments.outlook.sea',
    key: 'sea',
    category: 'outlook',
    categoryTitle: 'details.equipments.outlook.title',
  },
  {
    id: v4(),
    label: 'details.equipments.outlook.green',
    key: 'green',
    category: 'outlook',
    categoryTitle: 'details.equipments.outlook.title',
  },
  {
    id: v4(),
    label: 'details.equipments.outlook.long-distance',
    key: 'long-distance',
    category: 'outlook',
    categoryTitle: 'details.equipments.outlook.title',
  },
  {
    id: v4(),
    label: 'details.equipments.outlook.city',
    key: 'city',
    category: 'outlook',
    categoryTitle: 'details.equipments.outlook.title',
  },
]

const freeSpaceData: Equipment[] = [
  {
    id: v4(),
    label: 'details.equipments.free-space.north',
    key: 'north',
    category: 'free-space',
    categoryTitle: 'details.equipments.free-space.title',
  },
  {
    id: v4(),
    label: 'details.equipments.free-space.eats',
    key: 'eats',
    category: 'free-space',
    categoryTitle: 'details.equipments.free-space.title',
  },
  {
    id: v4(),
    label: 'details.equipments.free-space.south',
    key: 'south',
    category: 'free-space',
    categoryTitle: 'details.equipments.free-space.title',
  },
  {
    id: v4(),
    label: 'details.equipments.free-space.west',
    key: 'west',
    category: 'free-space',
    categoryTitle: 'details.equipments.free-space.title',
  },
  {
    id: v4(),
    label: 'details.equipments.free-space.northeast',
    key: 'northeast',
    category: 'free-space',
    categoryTitle: 'details.equipments.free-space.title',
  },
  {
    id: v4(),
    label: 'details.equipments.free-space.southeast',
    key: 'southeast',
    category: 'free-space',
    categoryTitle: 'details.equipments.free-space.title',
  },
  {
    id: v4(),
    label: 'details.equipments.free-space.southwest',
    key: 'southwest',
    category: 'free-space',
    categoryTitle: 'details.equipments.free-space.title',
  },
  {
    id: v4(),
    label: 'details.equipments.free-space.northwest',
    key: 'northwest',
    category: 'free-space',
    categoryTitle: 'details.equipments.free-space.title',
  },
]

const kitchenData: Equipment[] = [
  {
    id: v4(),
    label: 'details.equipments.kitchen.fit-kitchen',
    key: 'fit-kitchen',
    category: 'kitchen',
    categoryTitle: 'details.equipments.kitchen.title',
  },
  {
    id: v4(),
    label: 'details.equipments.kitchen.compact-kitchen',
    key: 'compact-kitchen',
    category: 'kitchen',
    categoryTitle: 'details.equipments.kitchen.title',
  },
  {
    id: v4(),
    label: 'details.equipments.kitchen.tea-kitchen',
    key: 'tea-kitchen',
    category: 'kitchen',
    categoryTitle: 'details.equipments.kitchen.title',
  },
  {
    id: v4(),
    label: 'details.equipments.kitchen.eat-in-kitchen',
    key: 'eat-in-kitchen',
    category: 'kitchen',
    categoryTitle: 'details.equipments.kitchen.title',
  },
]

const floorData: Equipment[] = [
  {
    id: v4(),
    label: 'details.equipments.floor.floorboards',
    key: 'floorboards',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.tiles',
    key: 'tiles',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.linoleum',
    key: 'linoleum',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.carpet-floor',
    key: 'carpet-floor',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.granite',
    key: 'granite',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.marble',
    key: 'marble',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.screed',
    key: 'screed',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.plastic-floor',
    key: 'plastic-floor',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.parquet',
    key: 'parquet',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.terracotta',
    key: 'terracotta',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.laminate',
    key: 'laminate',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
  {
    id: v4(),
    label: 'details.equipments.floor.stone-floor',
    key: 'stone-floor',
    category: 'floor',
    categoryTitle: 'details.equipments.floor.title',
  },
]

const windowsData: Equipment[] = [
  {
    id: v4(),
    label: 'details.equipments.windows.external-sun-protection',
    key: 'external-sun-protection',
    category: 'windows',
    categoryTitle: 'details.equipments.windows.title',
  },
  {
    id: v4(),
    label: 'details.equipments.windows.internal-sun-protection',
    key: 'internal-sun-protection',
    category: 'windows',
    categoryTitle: 'details.equipments.windows.title',
  },
  {
    id: v4(),
    label: 'details.equipments.windows.roller-shutters',
    key: 'roller-shutters',
    category: 'windows',
    categoryTitle: 'details.equipments.windows.title',
  },
  {
    id: v4(),
    label: 'details.equipments.windows.glare-protection',
    key: 'glare-protection',
    category: 'windows',
    categoryTitle: 'details.equipments.windows.title',
  },
  {
    id: v4(),
    label: 'details.equipments.windows.double-glazing',
    key: 'double-glazing',
    category: 'windows',
    categoryTitle: 'details.equipments.windows.title',
  },
  {
    id: v4(),
    label: 'details.equipments.windows.multiple-glazing',
    key: 'multiple-glazing',
    category: 'windows',
    categoryTitle: 'details.equipments.windows.title',
  },
  {
    id: v4(),
    label: 'details.equipments.windows.plastic-windows',
    key: 'plastic-windows',
    category: 'windows',
    categoryTitle: 'details.equipments.windows.title',
  },
]

const extraData: Equipment[] = [
  {
    id: v4(),
    label: 'details.equipments.extras.furnished',
    key: 'furnished',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.outdoor-shower',
    key: 'outdoor-shower',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.fitness-room',
    key: 'fitness-room',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.playground',
    key: 'playground',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.lake-access',
    key: 'lake-access',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.laundry-drying-room',
    key: 'laundry-drying-room',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.alarm-system',
    key: 'alarm-system',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.bike-room',
    key: 'bike-room',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.sauna',
    key: 'sauna',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.wine-cellar',
    key: 'wine-cellar',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.winter-garden',
    key: 'winter-garden',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.bathtub',
    key: 'bathtub',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.storage-room',
    key: 'storage-room',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.steam-bath',
    key: 'steam-bath',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.grill-area',
    key: 'grill-area',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.wheelchair-accessible',
    key: 'wheelchair-accessible',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.swimming-pool',
    key: 'swimming-pool',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.whirlpool',
    key: 'whirlpool',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.library',
    key: 'library',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.garden-use',
    key: 'garden-use',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.near-subway',
    key: 'near-subway',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.wellness-area',
    key: 'wellness-area',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
  {
    id: v4(),
    label: 'details.equipments.extras.bath-with-window',
    key: 'bath-with-window',
    category: 'extras',
    categoryTitle: 'details.equipments.extras.title',
  },
]

const equipmentData: EquipmentData[] = [
  {
    id: v4(),
    title: 'details.equipments.outlook.title',
    key: 'outlook',
    data: outlookData,
  },
  {
    id: v4(),
    title: 'details.equipments.free-space.title',
    key: 'free-space',
    data: freeSpaceData,
  },
  {
    id: v4(),
    title: 'details.equipments.kitchen.title',
    key: 'kitchen',
    data: kitchenData,
  },
  {
    id: v4(),
    title: 'details.equipments.floor.title',
    key: 'floor',
    data: floorData,
  },
  {
    id: v4(),
    title: 'details.equipments.windows.title',
    key: 'windows',
    data: windowsData,
  },
  {
    id: v4(),
    title: 'details.equipments.extras.title',
    key: 'extras',
    data: extraData,
  },
]

export const seedEquipment = async () => {
  await prisma.equipment.deleteMany()

  for (const category of equipmentData) {
    await prisma.equipment.createMany({
      data: category.data.map(equipment => ({
        id: equipment.id,
        label: equipment.label,
        key: equipment.key,
        category: category.key,
        categoryTitle: category.title,
      })),
    })
  }
  console.log('Equipment seeded successfully')
} 