import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/',
    signOut: '/auth',
  },
})

export const config = {
  matcher: ['/users/:path*', '/conversation/:path*'],
}
