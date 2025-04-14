import { RealEstate } from '@prisma/client'
import { prisma } from '../src/prisma/client'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

const estates: RealEstate[] = [
  {
    id: 10025,
    label: 'EXKLUSIVE WOHNPROJEKTE IM ZENTRUM WIENS',
    isTop: true,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'apartment',
    typeValue: 'real-estate.type.apartment',
    addressLocation: '3400 Klosterneuburg',
    addressLat: 48.3,
    addressLng: 16.3167,
    rooms: 6,
    bathroomsTotal: 3,
    bathroomsDesc: '2 Bad | 1 WC',
    operationKey: 'buy',
    operationValue: 'real-estate.operations.buy',
    livingAreaM2: '215.96 m²',
    landAreaM2: '350 m²',
    price: '6.500.000,00 €',
    views: 152,
    yearBuilt: 2006,
    floors: '3 | 5 Etagen',
    garage: 'Garage',
    heating: 'Gas Zentralheizung | HWB: 63,4 C | fGEE: 1C',
    condition: 'Gepflegt',
    commissionFree: 'provisionsfrei',
    additionalFeatures: null,
    kitchen: null,
    loungeArea: null,
    furnished: null,
    availability: null,
    additionalInfo: null,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10506,
    label: 'ERSTKLASSIGE WOHNUNGEN IN WIENER TOP-LAGE',
    isTop: true,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'apartment',
    typeValue: 'real-estate.type.apartment',
    addressLocation: '1070 Mariahilfer Straße',
    addressLat: 48.199,
    addressLng: 16.349,
    rooms: 4,
    bathroomsTotal: 2,
    bathroomsDesc: '1 Bad | 1 WC',
    operationKey: 'rent',
    operationValue: 'real-estate.operations.rent',
    livingAreaM2: '142.26 m²',
    landAreaM2: '',
    price: '1.235 €',
    views: 139,
    yearBuilt: 2015,
    floors: '1 | 9 Etagen',
    garage: 'Parkplatz',
    heating: 'Zentralheizung',
    condition: 'Neu',
    commissionFree: 'provisionspflichtig',
    additionalFeatures: null,
    kitchen: null,
    loungeArea: null,
    furnished: null,
    availability: null,
    additionalInfo: null,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10125,
    label: 'MODERNE APARTMENTS MIT PANORAMABLICK',
    isTop: true,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'apartment',
    typeValue: 'real-estate.type.apartment',
    addressLocation: '1170 Hernalser Hauptstraße',
    addressLat: 48.2333,
    addressLng: 16.2667,
    rooms: 3,
    bathroomsTotal: 1,
    bathroomsDesc: '1 Bad | 1 WC',
    operationKey: 'buy',
    operationValue: 'real-estate.operations.buy',
    livingAreaM2: '215.96 m²',
    landAreaM2: '',
    price: '380.000,00 €',
    views: 98,
    yearBuilt: 2010,
    floors: '1 | 10 Etagen',
    garage: '',
    heating: 'Fernwärme',
    condition: 'Sehr gut',
    commissionFree: 'provisionsfrei',
    additionalFeatures: null,
    kitchen: null,
    loungeArea: null,
    furnished: null,
    availability: null,
    additionalInfo: null,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 100251,
    label: 'JAHRHUNDERTVILLA MIT AUSBAUPOTENZIAL IN KLOSTERNEUBURG',
    isTop: false,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'house',
    typeValue: 'real-estate.type.house',
    addressLocation: '3400 Klosterneuburg',
    addressLat: 48.3015,
    addressLng: 16.3198,
    rooms: 6,
    bathroomsTotal: 3,
    bathroomsDesc: '2 Bad | 1 WC',
    operationKey: 'buy',
    operationValue: 'real-estate.operations.buy',
    livingAreaM2: '215.96 m²',
    landAreaM2: '1200 m²',
    price: '750.000,00 €',
    views: 171,
    yearBuilt: 2001,
    floors: '- | 2 Etagen',
    garage: 'Garage',
    heating: 'Gas Zentralheizung',
    condition: 'Sanierungsbedürftig',
    commissionFree: 'provisionspflichtig',
    additionalFeatures: null,
    kitchen: null,
    loungeArea: null,
    furnished: null,
    availability: null,
    additionalInfo: null,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 100252,
    label: 'DACHGESCHOSSWOHNUNG MIT BALKON NAHE COTTAGE VIERTEL',
    isTop: false,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'apartment',
    typeValue: 'real-estate.type.apartment',
    addressLocation: '1180 Wien',
    addressLat: 48.233,
    addressLng: 16.318,
    rooms: 4,
    bathroomsTotal: 1,
    bathroomsDesc: '1 Bad | 1 WC',
    operationKey: 'rent',
    operationValue: 'real-estate.operations.rent',
    livingAreaM2: '98.51 m²',
    landAreaM2: '',
    price: '1.606,00 €',
    views: 152,
    yearBuilt: 2007,
    floors: '1 | 7 Etagen',
    garage: '',
    heating: 'Fernwärme',
    condition: 'Gepflegt',
    commissionFree: 'provisionsfrei',
    additionalFeatures: null,
    kitchen: null,
    loungeArea: null,
    furnished: null,
    availability: null,
    additionalInfo: null,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 100253,
    label: 'MODERNE DG-MAISONETTE MIT BALKON AM AUMANNPLATZ',
    isTop: false,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'apartment',
    typeValue: 'real-estate.type.apartment',
    addressLocation: '1180 Wien',
    addressLat: 48.2345,
    addressLng: 16.32,
    rooms: 2,
    bathroomsTotal: 1,
    bathroomsDesc: '1 Bad | 1 WC',
    operationKey: 'buy',
    operationValue: 'real-estate.operations.buy',
    livingAreaM2: '61.68 m²',
    landAreaM2: '',
    price: '650.000,00 €',
    views: 152,
    yearBuilt: 2010,
    floors: '2 | 4 Etagen',
    garage: '',
    heating: 'Fußbodenheizung',
    condition: 'Neuwertig',
    commissionFree: 'provisionspflichtig',
    additionalFeatures: null,
    kitchen: null,
    loungeArea: null,
    furnished: null,
    availability: null,
    additionalInfo: null,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 100001,
    label: 'MODERNE DACHGESCHOSSWOHNUNG NÄHE AKH WIEN UND KUTSCHKERMARKT',
    isTop: false,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'apartment',
    typeValue: 'real-estate.type.apartment',
    addressLocation: '1180 Wien',
    addressLat: 48.2355,
    addressLng: 16.3155,
    rooms: 4,
    bathroomsTotal: 1,
    bathroomsDesc: '1 Bad | 1 WC',
    operationKey: 'rent',
    operationValue: 'real-estate.operations.rent',
    livingAreaM2: '111.2 m²',
    landAreaM2: '',
    price: '2.690,00 €',
    views: 53,
    yearBuilt: 2005,
    floors: '1 | 20 Etagen',
    garage: '',
    heating: 'Fernwärme',
    condition: 'Gepflegt',
    commissionFree: 'provisionsfrei',
    additionalFeatures: null,
    kitchen: null,
    loungeArea: null,
    furnished: null,
    availability: null,
    additionalInfo: null,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10004,
    label: 'GARTEN-MAISONETTE MIT EIGENEM POOL IN DÖBLING',
    isTop: false,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'apartment',
    typeValue: 'real-estate.type.apartment',
    addressLocation: '1180 Wien',
    addressLat: 48.236,
    addressLng: 16.3125,
    rooms: 5,
    bathroomsTotal: 5,
    bathroomsDesc: '3 Bad | 2 WC',
    operationKey: 'buy',
    operationValue: 'real-estate.operations.buy',
    livingAreaM2: '200.00 m²',
    landAreaM2: '',
    price: '2.300.000,00 €',
    views: 49,
    yearBuilt: 2018,
    floors: '2 | 12 Etagen',
    garage: 'Parkplatz',
    heating: 'Wärmepumpe',
    condition: 'Neuwertig',
    commissionFree: 'provisionsfrei',
    additionalFeatures: null,
    kitchen: null,
    loungeArea: null,
    furnished: null,
    availability: null,
    additionalInfo: null,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 10023,
    label: 'EXQUISITE VILLA MIT WELLNESSBEREICH UND INDOOR-POOL',
    isTop: false,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'house',
    typeValue: 'real-estate.type.house',
    addressLocation: '3400 Klosterneuburg',
    addressLat: 48.3025,
    addressLng: 16.3212,
    rooms: 7,
    bathroomsTotal: 4,
    bathroomsDesc: '2 Bad | 2 WC',
    operationKey: 'buy',
    operationValue: 'real-estate.operations.buy',
    livingAreaM2: '460.07 m²',
    landAreaM2: '1500 m²',
    price: '2.900.000,00 €',
    views: 37,
    yearBuilt: 2005,
    floors: '- | 3 Etagen',
    garage: 'Garage',
    heating: 'Gas Zentralheizung',
    condition: 'Gepflegt',
    commissionFree: 'provisionspflichtig',
    additionalFeatures: null,
    kitchen: null,
    loungeArea: null,
    furnished: null,
    availability: null,
    additionalInfo: null,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 100255,
    label: 'EXKLUSIVES PENTHOUSE MIT BLICK AUF DEN STEPHANSDOM',
    isTop: false,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'house',
    typeValue: 'real-estate.type.house',
    addressLocation: '3400 Klosterneuburg',
    addressLat: 48.3035,
    addressLng: 16.324,
    rooms: 6,
    bathroomsTotal: 3,
    bathroomsDesc: '2 Bad | 1 WC',
    operationKey: 'rent',
    operationValue: 'real-estate.operations.rent',
    livingAreaM2: '215.96 m²',
    landAreaM2: '506  m²',
    price: '7.900,00 €',
    views: 152,
    yearBuilt: 2010,
    floors: '- | 2 Etagen',
    garage: 'Garage',
    heating: 'Fußbodenheizung',
    condition: 'Neuwertig',
    commissionFree: 'provisionspflichtig',
    additionalFeatures: null,
    kitchen: null,
    loungeArea: null,
    furnished: null,
    availability: null,
    additionalInfo: null,
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 100256,
    label: 'CHARMANTE ALTBAUWOHNUNG IM HERZEN WIENS',
    isTop: false,
    favorite: true,
    selectedOnMap: false,
    typeKey: 'apartment',
    typeValue: 'real-estate.type.apartment',
    addressLocation: '1180 Wien',
    addressLat: 48.2375,
    addressLng: 16.31,
    rooms: 4,
    bathroomsTotal: 1,
    bathroomsDesc: '1 Bad | 1 WC',
    operationKey: 'rent',
    operationValue: 'real-estate.operations.rent',
    livingAreaM2: '98.51 m²',
    landAreaM2: '',
    price: '1.400,00 €',
    views: 114,
    yearBuilt: 2000,
    floors: '2 | 5 Etagen',
    garage: '',
    heating: 'Gasetagenheizung',
    condition: 'Gepflegt',
    commissionFree: 'provisionsfrei',
    additionalFeatures: 'Hohe Decken, Stuck, Parkettboden',
    kitchen: 'Separate Küche mit Speisekammer',
    loungeArea: 'Helles Wohnzimmer mit Flügeltüren',
    furnished: 'Unmöbliert',
    availability: 'Nach Vereinbarung',
    additionalInfo: 'Altbauwohnung mit historischem Flair und modernen Annehmlichkeiten',
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 100257,
    label: 'GROßZÜGIGES EINFAMILIENHAUS IN RUHIGER WOHNGEGEND',
    isTop: false,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'apartment',
    typeValue: 'real-estate.type.apartment',
    addressLocation: '1180 Wien',
    addressLat: 48.238,
    addressLng: 16.308,
    rooms: 2,
    bathroomsTotal: 1,
    bathroomsDesc: '1 Bad | 1 WC',
    operationKey: 'rent',
    operationValue: 'real-estate.operations.rent',
    livingAreaM2: '61.68 m²',
    landAreaM2: '',
    price: '5.200,00 €',
    views: 89,
    yearBuilt: 2008,
    floors: '1 | 4 Etagen',
    garage: 'Parkplatz',
    heating: 'Gas Zentralheizung',
    condition: 'Gepflegt',
    commissionFree: 'provisionspflichtig',
    additionalFeatures: 'Großer Garten, Terrasse',
    kitchen: 'Separate Küche mit Speisekammer',
    loungeArea: 'Helles Wohnzimmer mit Gartenblick',
    furnished: 'Teilweise möbliert',
    availability: 'Nach Vereinbarung',
    additionalInfo:
      'Ruhige Wohnlage mit guter Anbindung an öffentliche Verkehrsmittel',
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 100258,
    label: 'LUXURIÖSE VILLA MIT PRIVATGARTEN UND POOL',
    isTop: false,
    favorite: false,
    selectedOnMap: false,
    typeKey: 'house',
    typeValue: 'real-estate.type.house',
    addressLocation: '1180 Wien',
    addressLat: 48.2395,
    addressLng: 16.3075,
    rooms: 4,
    bathroomsTotal: 1,
    bathroomsDesc: '1 Bad | 1 WC',
    operationKey: 'rent',
    operationValue: 'real-estate.operations.rent',
    livingAreaM2: '350.2 m²',
    landAreaM2: '607 m²',
    price: '2.600,00 €',
    views: 78,
    yearBuilt: 2015,
    floors: '2 | 9 Etagen',
    garage: '',
    heating: 'Fußbodenheizung',
    condition: 'Neuwertig',
    commissionFree: 'provisionsfrei',
    additionalFeatures: 'Privater Pool, Große Terrasse, Wintergarten',
    kitchen: 'Luxuriöse Wohnküche',
    loungeArea: 'Großzügiger Wohnbereich mit Kamin',
    furnished: 'Voll möbliert',
    availability: 'Sofort verfügbar',
    additionalInfo:
      'Exklusive Villa mit hochwertigen Materialien und großzügigem Außenbereich',
    ownerId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]


export const estateSeed = async () => {

  const initialUserForEstates = await prisma.user.create({
    data: {
      id: v4(),
      name: 'Seeded',
      lastName: 'User',
      email: 'seed@example.com',
      phone: '123456789',
      address: 'Seed Street',
      password: await bcrypt.hash('qwerty1234', 10),
    }
  })

  const res = await prisma.realEstate.createMany({
    data: estates.map(estate => {
      return {
        ...estate,
        ownerId: initialUserForEstates.id,
      }
    }),
    skipDuplicates: true,

  })

}
