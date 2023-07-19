'use client'

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface MessageInputProps {
  id: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  required?: boolean
  type?: string
  placeholder?: string
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  register,
  required,
  type,
  placeholder,
  errors,
}) => {
  return (
    <div className='relative w-full'>
      <input
        type={type}
        id={id}
        autoComplete={id}
        placeholder={placeholder}
        className='
          text-black 
          font-light 
          py-2 
          px-4 
          bg-neutral-100 
          w-full 
          rounded-full 
          focus:outline-none'
        {...register(id, { required })}
      />
    </div>
  )
}

export default MessageInput
