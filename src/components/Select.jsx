import React, {useId, forwardRef} from 'react'

// this is a dropdown input option for our create post form

const Select = forwardRef(
    function Select({
        options,
        label,
        className='',
        ...props
    }, ref) {
        const id = useId()
      return (
        <div className='w-full'>
          {label && <label
          htmlFor={id}>
            {label}
            </label>}
            
            <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
                {/* if option exist then only map on it thats why ? used */}
                {options?.map((option)=>(
                    <option
                    key={option}
                    value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
      )
    }

)

export default Select
