import { ThemeContext } from '@/context/theme-context'
import { HTMLAttributes, useContext } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Text({
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  const { theme } = useContext(ThemeContext)
  return (
    <p
      {...props}
      className={twMerge(
        `${
          theme ? 'theme-white' : null
        } text-skin-muted hover:text-skin-base duration-100 ease-in`,
        props.className,
      )}
    >
      {children}
    </p>
  )
}
