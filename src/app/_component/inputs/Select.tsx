'use client'

import React from 'react'
import ReactSelect from 'react-select'

interface SelectProps {
  label: string
  disable?: boolean
  options: Record<string, any>[]
  onChange: (value: Record<string, any>) => void
  value?: Record<string, any>
}

const Select: React.FC<SelectProps> = ({ label, disable, options, onChange, value }) => {
  return (
    <div className='z-[100]'>
      <label className='block text-sm font-medium leading-6 text-gray-900'>{label}</label>
      <div className='mt-2'>
        <ReactSelect
          isDisabled={disable}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 99999 }) }}
          classNames={{ control: () => 'text-sm' }}
        />
      </div>
    </div>
  )
}

export default Select
