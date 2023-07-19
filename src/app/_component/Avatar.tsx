'use client'

import useActiveList from '@/hooks/useActiveList'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  user: User
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList()
  const isActive = members.indexOf(user.email!) !== -1
  return (
    <div className='relative'>
      <div
        className='
          relative
          inline-block 
          rounded-full 
          overflow-hidden 
          h-9 
          w-9 
          md:h-11 
          md:w-11'
      >
        <Image
          src={user?.image || '/image/placeholder.jpg'}
          alt='Avatar'
          fill
          sizes='(min-width: 768px) 2.75rem, 2.25rem'
        />
      </div>
      {isActive && (
        <span
          className='
            block
            absolute
            rounded-full
            bg-green-500
            top-0
            right-0
            ring-2
            ring-white
            h-2
            w-2    
            md:h-3   
            md:w-3'
        />
      )}
    </div>
  )
}

export default Avatar
