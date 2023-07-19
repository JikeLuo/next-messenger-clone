import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/actions/getCurrentUser'
import { pusherServer } from '@/libs/pusher'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.email || !currentUser?.id) {
      return new NextResponse('unauthentication', { status: 401 })
    }

    const body = await request.json()
    const { userId, isGroup, members, name } = body

    //TODO If the Group is exist, but no member. Sending the error back
    if (isGroup && (!members || members?.length < 2 || !name)) {
      return new NextResponse('invalid group', { status: 400 })
    }

    //TODO If the Group is exsit. Return new conversation
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({ id: member.value })),
              { id: currentUser.id },
            ],
          },
        },
        include: { users: true },
      })
      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation)
        }
      })
      return NextResponse.json(newConversation)
    }

    //TODO
    const existingConversation = await prisma.conversation.findMany({
      where: {
        OR: [
          { userIds: { equals: [currentUser.id, userId] } },
          { userIds: { equals: [userId, currentUser.id] } },
        ],
      },
    })
    const singleConversation = existingConversation[0]
    if (singleConversation) {
      return NextResponse.json(singleConversation)
    }

    //TODO If the...
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: { users: true },
    })

    newConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation)
      }
    })

    return NextResponse.json(newConversation)
  } catch (error: any) {
    return new NextResponse('Conversation API internal Error', { status: 500 })
  }
}
