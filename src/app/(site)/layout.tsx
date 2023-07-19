import '@/style/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToasterContext from '@/app/_component/context/ToasterContext'
import AuthContext from '@/app/_component/context/AuthContext'
import ActiveStatus from '@/app/_component/ActiveStatus'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'Messenger Clone Project',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
