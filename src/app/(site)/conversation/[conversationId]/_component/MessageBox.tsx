'use client'

import Avatar from '@/app/_component/Avatar'
import { FullMessageType } from '@/types'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import ImageModal from './ImageModal'

interface MessageBoxProps {
  isLast: boolean
  data: FullMessageType
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, data }) => {
  const session = useSession()
  const [imageModalOpen, setImageModalOpen] = useState(false)

  const isMyMessage = useMemo(
    () => session?.data?.user?.email === data?.sender?.email,
    [data?.sender, session?.data?.user],
  )

  const seenList = useMemo(() => {
    return (data.seen || [])
      .filter((user) => user.email !== data?.sender?.email)
      .map((user) => user.name)
      .join(', ')
  }, [data])

  return (
    <div className={clsx('flex gap-3 p-4', isMyMessage && 'justify-end')}>
      <div className={clsx(isMyMessage && 'order-2')}>
        <Avatar user={data.sender} />
      </div>
      <div className={clsx('flex flex-col gap-2', isMyMessage && 'items-end')}>
        <div className='flex items-center gap-1'>
          <div className='text-sm text-gray-500'>{data.sender?.name}</div>
          <div className='text-xs text-gray-400'>
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>

        <div
          className={clsx(
            'text-sm w-fit overflow-hidden',
            isMyMessage ? 'bg-sky-500 text-white' : 'bg-gray-100',
            data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3',
          )}
        >
          {data?.image ? (
            <>
              <ImageModal
                isOpen={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
                src={data.image}
              />
              <Image
                onClick={() => setImageModalOpen(true)}
                alt='image'
                src={data.image}
                width={288}
                height={288}
                className=' object-cover cursor-pointer hover:scale-110 transition translate'
              />
            </>
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isMyMessage && seenList.length > 0 && (
          <div className=' text-xs font-light text-gray-500'>{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  )
}

export default MessageBox
