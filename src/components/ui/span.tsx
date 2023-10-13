import { ThemeContext } from '@/context/theme-context'
import { HTMLAttributes, useContext } from 'react'

export default function Span({
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const { theme } = useContext(ThemeContext)
  return (
    <span {...props} className={`${theme ? '' : ''}`}>
      {children}
    </span>
  )
}
