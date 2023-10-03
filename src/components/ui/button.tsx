import { ArrowRightIcon } from 'lucide-react'
import {  HtmlHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface NewPageButtonProps {
    to: string
}

export default function PageButton({to}: NewPageButtonProps) {
  return (
    <Link to={to}>
        <button className="bg-skin-bg-base-foreground h-14 w-14 rounded-full fixed right-5 bottom-5 flex justify-center items-center">
            <ArrowRightIcon className="text-skin-inverted w-8 h-8" />
        </button>
    </Link>
  )
}

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

function Button({children, ...props}: ButtonProps) {
  return (
    <button 
      className='px-4 py-2 bg-skin-button-accent hover:bg-skin-button-accent-hover text-white'
      {...props}
    >
      {children}
    </button>
  )
}

export {
  Button
}