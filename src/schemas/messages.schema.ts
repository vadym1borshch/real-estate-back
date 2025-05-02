import { z } from 'zod'


export const MessagesSchema = z
  .array(z.object({
    id: z.string().uuid(),
    stats: z.string(),
    email: z.string(),
    isArchived: z.boolean(),
    userId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    replies: z.array(z.object({
      id: z.string().uuid(),
      senderEmail: z.string(),
      message: z.string(),
      senderName: z.string(),
      senderLastName: z.string(),
      timestamp: z.date(),
      threadId: z.string().uuid(),
    }))
  }))
  .openapi({
    title: 'Messages',
  })

export type Messages = z.infer<typeof MessagesSchema>