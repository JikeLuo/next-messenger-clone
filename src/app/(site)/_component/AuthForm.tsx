'use client'

import axios from 'axios'
import React, { useCallback, useState, useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import AuthSocialButton from './AuthSocialButton'
import Button from '@/app/_component/Button'
import Input from '@/app/_component/inputs/Input'

type Variant = 'LOGIN' | 'REGISTER'

function AuthForm() {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === 'authenticated') router.push('/users')
  }, [session?.status, router, session])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Registration failed'))
        .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Login error')
          }

          if (callback?.ok && !callback?.error) {
            toast.success('Login success!')
            router.push('/user')
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)
    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Login error')
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Login success!')
          router.push('/user')
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className=' mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className=' bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <form className=' space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              label='Name'
              register={register}
              id='name'
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            type='email'
            label='Email address'
            id='email'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            type='password'
            label='Password'
            id='password'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button fullwidth type='submit' disabled={isLoading}>
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className='mt-6'>
          <div className='relative'>
            <div className=' absolute inset-0 flex items-center'>
              <div className=' w-full border-y border-gray-300' />
            </div>
            <div className=' relative flex justify-center text-sm'>
              <span className=' bg-white px-2 text-gray-500'>Or contitinue with</span>
            </div>
          </div>
          <div className=' my-6 flex gap-2'>
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>

        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>
            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
