import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from '@/actions/getCurrentUser'
import { pusherServer } from '@/libs/pusher'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { conversationId, image, message } = body

    const currentUser = await getCurrentUser()
    if (!currentUser?.email) {
      return new NextResponse('Can ont found user', { status: 401 })
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: { connect: { id: conversationId } },
        sender: { connect: { id: currentUser.id } },
        seen: { connect: { id: currentUser.id } },
      },
      include: { seen: true, sender: true },
    })

    const updataConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageAt: new Date(),
        messages: { connect: { id: newMessage.id } },
      },
      include: {
        users: true,
        messages: { include: { seen: true } },
      },
    })

    await pusherServer.trigger(conversationId, 'message:new', newMessage)

    const lastMessage =
      updataConversation.messages[updataConversation.messages.length - 1]

    updataConversation.users.forEach((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: user.id,
        message: [lastMessage],
      })
    })

    return NextResponse.json(newMessage)
  } catch (err: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
