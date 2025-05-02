import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { signToken } from '../utils/jwt'
import { prisma } from '../prisma/client'

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
        phone: phone || '',
        address: address || '',
        photo: photo || '',
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

    //only for testing
    await prisma.messageThread.create({
      data: {
        status: 'new',
        isArchived: false,
        email: 'support@yourapp.com',
        userId: user.id,
        replies: {
          create: [
            {
              message: '👋 Welcome to the platform!',
              senderName: 'Support',
              senderLastName: 'Team',
              senderEmail: 'support@yourapp.com',
            },
          ],
        },
      },
    })
    const token = signToken({ userId: user.id })
    res.status(201).json({ token, user })
  } catch (err) {
    console.error('[REGISTER ERROR]', err)
    res.status(500).json({ error: 'Server error', detail: err })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ error: 'errors.login-failed' })
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
