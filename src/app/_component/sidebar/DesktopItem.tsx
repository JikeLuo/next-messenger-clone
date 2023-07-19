'use client'
import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

interface DesktopItemProps {
  href: string
  label: string
  icon: any
  active?: boolean
  onClick?: () => void
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (!!onClick) {
      return onClick()
    }
  }
  return (
    <li onClick={handleClick}>
      <Link
        className={clsx(
          `
        group
        flex
        gap-x-3
        rounded-md
        p-3
        text-sm
        leading-6
        font-semibold
        text-gray-600
        hover:text-black
        hover:bg-gray-100
      `,
          active && 'bg-gray-100 text-black',
        )}
        href={href}
      >
        <Icon className='h-6 w-6 shrink-0' />
        <span className=' sr-only'>{label}</span>
      </Link>
    </li>
  )
}

export default DesktopItem
