import { ArrowRightIcon } from 'lucide-react'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface NewPageButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to: string
}

export default function PageButton({ to, ...props }: NewPageButtonProps) {
  return (
    <Link to={to}>
      <button
        {...props}
        className="bg-skin-bg-base-foreground h-14 w-14 rounded-full fixed right-5 bottom-5 flex justify-center items-center"
      >
        <ArrowRightIcon className="text-skin-inverted w-8 h-8" />
      </button>
    </Link>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        'px-4 py-2 bg-skin-button-accent hover:bg-skin-button-accent-hover text-white',
        props.className,
      )}
    >
      {children}
    </button>
  )
}

export { Button }
