import { HTMLAttributes, ReactNode, useContext } from 'react'
import Navbar from '../navbar'
import { ThemeContext } from '@/context/theme-context'
import { twMerge } from 'tailwind-merge'

interface DefaultPageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export default function DefaultPageLayout({
  children,
  ...props
}: DefaultPageLayoutProps) {
  const { theme } = useContext(ThemeContext)
  return (
    <div
      {...props}
      className={twMerge(
        `${
          theme ? 'theme-white' : null
        } bg-skin-fill text-skin-base h-screen w-full py-24 px-7 flex flex-col gap-4 overflow-x-hidden`,
        props.className,
      )}
    >
      <Navbar />
      {children}
    </div>
  )
}
