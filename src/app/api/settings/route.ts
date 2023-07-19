import getCurrentUser from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser?.email) {
      return new NextResponse('can not found currentUser', { status: 401 })
    }

    const body = await request.json()
    const { name, image } = body

    const updateUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { image: image, name: name },
    })

    return NextResponse.json(updateUser)
  } catch (error: any) {
    return new NextResponse('InternalError', { status: 500 })
  }
}
