import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { signToken } from '../utils/jwt'
import { prisma } from '../prisma/client'
import { v4 } from 'uuid'

export const register = async (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
    lastName,
    phone,
    address,
    photo,
  } = req.body
  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ error: 'User already exists' })

    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        lastName,
        phone,
        address,
        photo,
        /*  profession: {
            create: {
              title: 'real-estate.real-estate-agent.title',
              key: 'real-estate-agent',
            }
          },*/
        verified: {
          create: {
            title: 'real-estate.real-estate-agent.verified-title',
            value: false,
          },
        },
      },
    })

    res.status(201).json({ user })
  } catch (err) {
    console.error('[REGISTER ERROR]', err)
    res.status(500).json({ error: 'Server error', detail: err })
  }
}


export const update = async (req: Request, res: Response) => {
  const {
    id,
    email,
    password,
    name,
    lastName,
    phone,
    address,
    province,
    photo,
    agency,
    userType,
  } = req.body

  try {
    const existing = await prisma.user.findUnique({
      where: { id },
      include: { agency: true, profession: true },
    })

    if (!existing) return res.status(404).json({ error: 'User not found' })

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined

    let updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email,
        ...(hashedPassword && { password: hashedPassword }),
        name,
        lastName,
        phone,
        address,
        photo,
        ...(province && { province }),
      },
    })

    if (userType === 'agency') {
      let agencyId = existing.agencyId

      if (agencyId) {
        await prisma.agency.update({
          where: { id: agencyId },
          data: {
            name: agency,
            type: 'real-estate-agency',
            address,
            phone,
            email,
            website: '',
          },
        })
      } else {
        const newAgency = await prisma.agency.create({
          data: {
            name: agency,
            type: 'real-estate-agency',
            address,
            phone,
            email,
            website: '',
          },
        })

        updatedUser = await prisma.user.update({
          where: { id },
          data: { agencyId: newAgency.id },
        })
        agencyId = newAgency.id
      }

      await prisma.user.update({
        where: { id },
        data: {
          profession: {
            connectOrCreate: {
              where: { key: 'real-estate-agent' },
              create: {
                title: 'real-estate.real-estate-agent.title',
                key: 'real-estate-agent',
              },
            },
          },
        },
      })
    } else {

      await prisma.user.update({
        where: { id },
        data: {
          agency: { disconnect: true },
          profession: { disconnect: true },
        },
      })

      if (existing.agencyId) {
        await prisma.agency.delete({ where: { id: existing.agencyId } })
      }
      if (existing.professionId) {
        await prisma.profession.delete({ where: { id: existing.professionId } })
      }
    }

    const finalUser = await prisma.user.findUnique({
      where: { id },
      include: { agency: true, profession: true },
    })

    res.status(200).json({ user: finalUser })
  } catch (err) {
    console.error('[UPDATE ERROR]', err)
    res.status(500).json({ error: 'Server error', detail: err })
  }
}


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ error: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })
    const verified = await prisma.verified.findMany()

    const changedUser = {
      ...user,
      verified: verified.find(ver => ver.id === user.verifiedId),
      agency: await prisma.agency.findUnique({ where: { id: user.agencyId ? user.agencyId : user.id } }),
      profession: await prisma.profession.findUnique({ where: { id: user.professionId ? user.professionId : user.id } }),

    }
    const token = signToken({ userId: user.id })
    res.json({ token, user: changedUser })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
