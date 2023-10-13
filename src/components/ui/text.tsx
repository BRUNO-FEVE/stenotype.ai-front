import { ThemeContext } from '@/context/theme-context'
import { HTMLAttributes, useContext } from 'react'
import { twMerge } from 'tailwind-merge'

interface variantProps {
  style: string
}

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant: string
}

export default function Text({ variant, children, ...props }: TextProps) {
  const { theme } = useContext(ThemeContext)

  const variants: { [key: string]: variantProps } = {
    title: {
      style: 'text-4xl text-skin-base font-semibold tracking-tight',
    },
    subtitle_1: {
      style: 'text-3xl text-skin-base font-semibold tracking-tight',
    },
    subtitle_2: {
      style: 'text-2xl text-skin-base font-semibold tracking-tight',
    },
    paragraph: {
      style: 'text-base text-skin-base leading-8',
    },
    link: {
      style:
        'text-base text-skin-muted hover:text-skin-base duration-100 ease-in cursor-pointer text-sm',
    },
  }

  const selectedStyle = variants[variant].style

  return (
    <p
      {...props}
      className={twMerge(
        `${theme ? 'theme-white' : null} ${selectedStyle}`,
        props.className,
      )}
    >
      {children}
    </p>
  )
}
