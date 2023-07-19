'use client'

import React, { useCallback, useState } from 'react'
import Modal from '@/app/_component/Modal'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import useConversation from '@/hooks/useConversation'
import { toast } from 'react-hot-toast'
import { FiAlertTriangle } from 'react-icons/fi'
import { Dialog } from '@headlessui/react'
import Button from '@/app/_component/Button'

interface ConformModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConfirmModal: React.FC<ConformModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { conversationId } = useConversation()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = useCallback(() => {
    setIsLoading(true)
    axios
      .delete(`/api/conversation/${conversationId}`)
      .then(() => {
        onClose()
        router.push('/conversation')
        router.refresh()
      })
      .catch(() => toast.error('something went wrong'))
      .finally(() => setIsLoading(false))
  }, [conversationId, router, onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='sm:flex sm:items-start'>
        <div
          className='
            mx-auto 
            flex 
            flex-shrink-0 
            items-center 
            justify-center
            h-12 
            w-12 
            rounded-full 
            bg-red-100 
            sm:mx-0 
            sm:h-10 
            sm:w-10'
        >
          <FiAlertTriangle className='h-6 w-6 text-red-600' />
        </div>
        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
          <Dialog.Title
            as='h3'
            className='text-base font-semibold leading-6 text-gray-900'
          >
            Delete conversation
          </Dialog.Title>
          <div className='my-2'>
            <p className='text-sm text-gray-500'>
              Are you sure you want to delete this conversation?
            </p>
          </div>
        </div>
      </div>
      <div className='my-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
