import React from 'react'

function Button(
    children,
    type = 'button', 
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
)
// chilren is the text of button, props are any properties than user wants for its button are also added into button
{
  return (
    <button 
    className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor} `}
    {...props}
    type= {type}>
        {children}
    </button>
  )
}

export default Button
