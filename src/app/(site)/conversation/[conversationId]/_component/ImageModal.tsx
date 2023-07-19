'use client'

import React from 'react'
import { FullMessageType } from '@/types'
import Modal from '@/app/_component/Modal'
import Image from 'next/image'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  src: string
}

const ImageModal: React.FC<ImageModalProps> = ({ src, onClose, isOpen }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className=' w-[40rem] h-[30rem] '>
        <Image alt='image' src={src} className='object-contain' fill />
      </div>
    </Modal>
  )
}

export default ImageModal
