import { ArrowRightIcon } from 'lucide-react'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface VariantProps {
  style: string
  content: ReactNode
}

interface NewPageButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string
  to: string
}

export default function PageButton({
  variant,
  to,
  children,
  ...props
}: NewPageButtonProps) {
  const variants: { [key: string]: VariantProps } = {
    default: {
      style:
        'px-20 py-2 ml-auto text-white bg-skin-button-accent hover:bg-skin-button-accent-hover rounded-md',
      content: children,
    },
    fixed: {
      style:
        'bg-skin-bg-base-foreground h-14 w-14 rounded-full fixed right-5 bottom-5 flex justify-center items-center',
      content: <ArrowRightIcon className="text-skin-inverted w-8 h-8" />,
    },
  }

  const style = variants[variant].style
  const content = variants[variant].content
  return (
    <Link to={to}>
      <button {...props} className={twMerge(style, props.className)}>
        {content}
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
