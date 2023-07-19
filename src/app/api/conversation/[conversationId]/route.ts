import getConversations from '@/actions/getConversations'
import getCurrentUser from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import { pusherServer } from '@/libs/pusher'

interface IParams {
  conversationId: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params
    const currentUser = await getCurrentUser()

    if (!currentUser?.email) {
      return new NextResponse('can not found currentUser', { status: 401 })
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    })

    if (!existingConversation) {
      return new NextResponse('can not found conversation', { status: 400 })
    }

    const deleteConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: { hasSome: [currentUser.id] },
      },
    })

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:remove', existingConversation)
      }
    })

    return NextResponse.json(deleteConversation)
  } catch (error: any) {
    return new NextResponse('InternalError', { status: 500 })
  }
}
