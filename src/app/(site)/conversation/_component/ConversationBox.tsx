'use client'

import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'
import clsx from 'clsx'
import Avatar from '@/app/_component/Avatar'
import useOtherUser from '@/hooks/useOtherUser'
import { FullConversationType } from '@/types'
import AvatarGroup from '@/app/_component/AvatarGroup'

interface ConversationBoxProps {
  data: FullConversationType
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()

  //TODO enter the chat room
  const handleCilck = useCallback(() => {
    router.push(`/conversation/${data.id}`)
  }, [data.id, router])

  //TODO get the message, which is the lastest message
  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])

  //TODO get the email of user
  const userEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email])

  //TODO is the message be seen?
  const hasSeen = useMemo(() => {
    if (!lastMessage) return false
    const seenArray = lastMessage.seen || []
    if (!userEmail) return false
    return seenArray.filter((user) => user.email === userEmail).length !== 0
  }, [lastMessage, userEmail])

  //TODO show the latest message or image, if not, 'start a conversation'
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return 'Sent a image'
    if (lastMessage?.body) return lastMessage.body
    return 'Started a conversation'
  }, [lastMessage])

  return (
    <div
      onClick={handleCilck}
      className={clsx(
        `w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        hover:bg-neutral-100 
        rounded-lg 
        transition 
        cursor-pointer 
        p-3
        `,
        selected ? 'bg-neutral-100' : 'bg-white',
      )}
    >
      {data.isGroup ? <AvatarGroup users={data.users} /> : <Avatar user={otherUser} />}

      <div className=' min-w-0 flex-1'>
        <div className=' focus:outline-none'>
          <div className='flex justify-between items-center mb-1'>
            <p className='text-md font-medium text-gray-900'>
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className='text-xs text-gray-400 font-light'>
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? 'text-gray-500' : 'text-black font-medium',
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox
