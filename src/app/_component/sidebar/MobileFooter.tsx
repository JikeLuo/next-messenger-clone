'use client'

import React from 'react'
import useRoutes from '@/hooks/useRoutes'
import useConversation from '@/hooks/useConversation'
import MobileItem from './MobileItem'

const MobileFooter = () => {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if (isOpen) return null

  return (
    <div
      className=' 
        fixed 
        flex
        items-center
        justify-between 
        w-full 
        bottom-0
        z-40 
        bg-white
        border-t-[1px] 
        lg:hidden 
        '
    >
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          onClick={route.onClick}
          active={route.active}
          href={route.href}
          icon={route.icon}
        />
      ))}
    </div>
  )
}

export default MobileFooter
