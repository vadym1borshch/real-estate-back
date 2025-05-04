import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

const prismaMock = mockDeep<PrismaClient>()

export default prismaMock as unknown as DeepMockProxy<PrismaClient>
