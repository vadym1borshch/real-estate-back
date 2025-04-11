import type { Request, Response } from 'express'
import { prisma } from '../prisma/client'
import { uploadToCloudinary } from '../utils/cloudinary'
import { createHash } from 'crypto'
import { readFile } from 'fs/promises'
import bcrypt from 'bcrypt'


export const me = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string }

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  return res.status(200).json({ user })
}

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const file = req.file
    const { id } = req.body

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const buffer = await readFile(file.path)
    const hash = createHash('sha256').update(buffer).digest('hex')

    const existingUserWithSamePhoto = await prisma.user.findFirst({
      where: {
        photo: {
          contains: hash,
        },
        NOT: { id },
      },
    })

    if (existingUserWithSamePhoto) {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          photo: existingUserWithSamePhoto.photo,
        },
      })

      return res.status(200).json({ user: updatedUser })
    }

    const uploadResult = await uploadToCloudinary(file.path, hash)

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        photo: `${uploadResult.secure_url}?hash=${hash}`,
      },
    })

    return res.status(200).json({ user: updatedUser })
  } catch (err) {
    console.error('[UPLOAD AVATAR ERROR]', err)
    return res.status(500).json({ error: 'Server error' })
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

    const dataToUpdate: any = {}

    if (email) dataToUpdate.email = email
    if (password) dataToUpdate.password = await bcrypt.hash(password, 10)
    if (name) dataToUpdate.name = name
    if (lastName) dataToUpdate.lastName = lastName
    if (phone) dataToUpdate.phone = phone
    if (address) dataToUpdate.address = address
    if (province) dataToUpdate.province = province
    if (photo) dataToUpdate.photo = photo

    let updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    })

    if (userType === 'agency') {
      let agencyId = existing.agencyId

      if (agencyId) {
        await prisma.agency.update({
          where: { id: agencyId },
          data: {
            ...(agency && { name: agency }),
            type: 'real-estate-agency',
            ...(address && { address }),
            ...(phone && { phone }),
            ...(email && { email }),
            website: '',
          },
        })
      } else {
        const newAgency = await prisma.agency.create({
          data: {
            name: agency || 'New Agency',
            type: 'real-estate-agency',
            address: address || '',
            phone: phone || '',
            email: email || '',
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
    } else if (userType === 'individual') {
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