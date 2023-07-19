import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'
import { pusherServer } from '@/libs/pusher'

interface IParams {
  conversationId: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.email || !currentUser?.id) {
      return new NextResponse('Can not get current user', { status: 401 })
    }

    //TODO Find the existing conversation
    const { conversationId } = params
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: { include: { seen: true } },
        users: true,
      },
    })
    if (!conversation) {
      return new NextResponse('Invalid conversationId', { status: 404 })
    }

    //TODO Find the last message
    const lastMessage = conversation.messages[conversation.messages.length - 1]
    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    //TODO If have the lastMessage. Update seen of lastMessage
    const updateMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: { sender: true, seen: true },
      data: { seen: { connect: { id: currentUser.id } } },
    })

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversation.id,
      messages: [updateMessage],
    })

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation)
    }

    await pusherServer.trigger(conversationId!, 'message:update', updateMessage)

    return NextResponse.json(updateMessage)
  } catch (error: any) {
    return new NextResponse('InernalError', { status: 500 })
  }
}
