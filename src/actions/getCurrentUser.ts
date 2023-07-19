import getSession from './getSession'
import prisma from '@/libs/prismadb'

//TODO get the status of current user from Next-auth then use Prisma to get the data of user
export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }
    const currentUser = prisma.user.findUnique({
      where: { email: session.user.email as string },
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error) {
    return null
  }
}
