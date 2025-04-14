import { prisma } from '../src/prisma/client'
import { v4 } from 'uuid'

const images = [
  {
    id: v4(),
    url: 'https://images.pexels.com/photos/6538934/pexels-photo-6538934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10025,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/7393980/pexels-photo-7393980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10025,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/6480205/pexels-photo-6480205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10025,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/6444268/pexels-photo-6444268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10025,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/6438750/pexels-photo-6438750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10025,
    createdAt: new Date(),
  },

  {
    id: v4(),
    url: 'https://images.pexels.com/photos/4568741/pexels-photo-4568741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10506,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/6373528/pexels-photo-6373528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10506,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/7061071/pexels-photo-7061071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10506,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/5825527/pexels-photo-5825527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10506,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10506,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/6758778/pexels-photo-6758778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10506,
    createdAt: new Date(),
  },

  {
    id: v4(),
    url: 'https://images.pexels.com/photos/6489115/pexels-photo-6489115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10125,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/6480199/pexels-photo-6480199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10125,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/5825543/pexels-photo-5825543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10125,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/6782465/pexels-photo-6782465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10125,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/5716713/pexels-photo-5716713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10125,
    createdAt: new Date(),
  },

  {
    id: v4(),
    url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100251,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100251,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100251,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100251,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100251,
    createdAt: new Date(),
  },


  {
    id: v4(),
    url: 'https://media.istockphoto.com/id/1446754769/photo/modern-elements-in-contemporary-architecture.jpg?s=2048x2048&w=is&k=20&c=S3Y0GParqJCcc-doHwgosfKSqdw2P7KCaomptRqvpcM=',
    estateId: 100252,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/6580227/pexels-photo-6580227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100252,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/6758776/pexels-photo-6758776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100252,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/5825413/pexels-photo-5825413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100252,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/4846106/pexels-photo-4846106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100252,
    createdAt: new Date(),
  },


  {
    id: v4(),
    url: 'https://images.pexels.com/photos/129494/pexels-photo-129494.jpeg',
    estateId: 100253,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100253,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100253,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100253,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100253,
    createdAt: new Date(),
  },


  {
    id: v4(),
    url: 'https://images.pexels.com/photos/434139/pexels-photo-434139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100001,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1776574/pexels-photo-1776574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100001,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/265004/pexels-photo-265004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100001,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100001,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100001,
    createdAt: new Date(),
  },

  {
    id: v4(),
    url: 'https://images.pexels.com/photos/280212/pexels-photo-280212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10004,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10004,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2826787/pexels-photo-2826787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10004,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10004,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2820153/pexels-photo-2820153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10004,
    createdAt: new Date(),
  },


  {
    id: v4(),
    url: 'https://images.pexels.com/photos/262405/pexels-photo-262405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10023,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10023,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10023,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/462205/pexels-photo-462205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10023,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 10023,
    createdAt: new Date(),
  },


  {
    id: v4(),
    url: 'https://images.pexels.com/photos/221024/pexels-photo-221024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100255,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100255,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100255,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2098913/pexels-photo-2098913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100255,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100255,
    createdAt: new Date(),
  },


  {
    id: v4(),
    url: 'https://images.pexels.com/photos/276593/pexels-photo-276593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100256,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100256,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100256,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100256,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100256,
    createdAt: new Date(),
  },


  {
    id: v4(),
    url: 'https://images.pexels.com/photos/379940/pexels-photo-379940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100257,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100257,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1827054/pexels-photo-1827054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100257,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/245032/pexels-photo-245032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100257,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1457844/pexels-photo-1457844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100257,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/3190541/pexels-photo-3190541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100257,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100257,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1125130/pexels-photo-1125130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100257,
    createdAt: new Date(),
  },

  {
    id: v4(),
    url: 'https://images.pexels.com/photos/158730/new-home-construction-retro-design-158730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100258,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100258,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2079695/pexels-photo-2079695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100258,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2179214/pexels-photo-2179214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100258,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/3016430/pexels-photo-3016430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100258,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100258,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/269262/pexels-photo-269262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100258,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2506986/pexels-photo-2506986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    estateId: 100258,
    createdAt: new Date(),
  }, {
    id: v4(),
    url: 'https://images.pexels.com/photos/2121345/pexels-photo-2121345.jpeg?auto=compress&cs=tinysrgb&w=600',
    estateId: 100258,
    createdAt: new Date(),
  },

]

export const estateImagesSeed = async () => {
  const estates = await prisma.realEstate.findMany()

  if (!estates.length) return
  await prisma.realEstateImages.createMany({
    data: images,
  })
}
