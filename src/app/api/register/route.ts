import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password)
      return new NextResponse('missing email, name, or password', { status: 400 })
    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    })

    return NextResponse.json(newUser)
  } catch (error: any) {
    console.warn(error, 'REGISTER ERROR')
    return new NextResponse(error, { status: 400 })
  }
}
