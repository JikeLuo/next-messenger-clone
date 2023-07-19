import React from 'react'
import getMessages from '@/actions/getMessages'
import getConversationById from '@/actions/getConversationById'
import EmptyState from '@/app/_component/EmptyState'
import Header from './_component/Header'
import Body from './_component/Body'
import Form from './_component/Form'

interface IParams {
  conversationId: string
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params.conversationId)

  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className='h-full lg:pl-80'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  )
}

export default ConversationId
