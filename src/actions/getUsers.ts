import prisma from '@/libs/prismadb'
import getSession from './getSession'

const getUser = async () => {
  const session = await getSession()

  if (!session?.user?.email) {
    return []
  }

  try {
    const users = prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      where: { NOT: { email: session.user.email } },
    })

    return users
  } catch (error: any) {
    return []
  }
}

export default getUser
