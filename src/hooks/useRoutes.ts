import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HiChat, HiUsers } from 'react-icons/hi'
import { HiArrowLeftOnRectangle } from 'react-icons/hi2'
import { signOut } from 'next-auth/react'
import useConversation from './useConversation'

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useConversation()
  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversation',
        icon: HiChat,
        active: pathname === '/conversation' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users',
      },
      {
        label: 'Logout',
        href: '#',
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [conversationId, pathname],
  )

  return routes
}

export default useRoutes
