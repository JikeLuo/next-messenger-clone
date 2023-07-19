'use client'

import { User } from '@prisma/client'
import { useMemo } from 'react'
import Image from 'next/image'

interface AvatarGroupProps {
  users?: User[]
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const sliceUsers = useMemo(() => users.slice(0, 3), [users])
  const positionMap = { 0: 'top-0 left-[12px]', 1: 'bottom-0', 2: 'bottom-0 right-0' }

  return (
    <div className='relative h-11 w-11'>
      {sliceUsers.map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute 
            inline-block 
            rounded-full 
            overflow-hidden 
            h-[21px] 
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}`}
        >
          <Image alt='avatar' fill src={user.image || '/image/placegolder.jpg'} />
        </div>
      ))}
    </div>
  )
}

export default AvatarGroup
