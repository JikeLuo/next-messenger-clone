import Image from 'next/image'
import AuthForm from './_component/AuthForm'
export default function Home() {
  return (
    <div className=' flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
      <div className=' sm:mx-auto sm:w-full sm:max-w-md'>
        <Image
          src={'/image/logo.png'}
          alt='logo'
          height='48'
          width='48'
          className='mx-auto w-auto'
        />
        <h2 className=' mt-6 text-center font-bold text-3xl tracking-tight text-gray-900'>
          Sing in to your account
        </h2>
      </div>
      {/* AuthFrom */}
      <AuthForm />
    </div>
  )
}
