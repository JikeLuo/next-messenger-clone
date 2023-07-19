'use client'

import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import useConversation from '@/hooks/useConversation'
import { pusherClient } from '@/libs/pusher'
import { FullMessageType } from '@/types'
import MessageBox from './MessageBox'
import _ from 'lodash'

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()

  //* every time when open the chat room, It will send a seen record to db
  useEffect(() => {
    axios.post(`/api/conversation/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversation/${conversationId}/seen`)
      setMessages((current) =>
        _.find(current, { id: message.id }) ? current : [...current, message],
      )
      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) return newMessage
          return currentMessage
        }),
      )
    }

    pusherClient.bind('message:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('message:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId])

  return (
    <div className='flex-1 overflow-y-auto '>
      {messages.map((message, index) => (
        <MessageBox
          key={message.id}
          isLast={index === messages.length - 1}
          data={message}
        />
      ))}
      <div ref={bottomRef} className='pt-24' />
    </div>
  )
}

export default Body
