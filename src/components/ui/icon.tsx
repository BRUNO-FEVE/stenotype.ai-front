import { ThemeContext } from '@/context/theme-context'
import { LucideIcon } from 'lucide-react'
import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'

interface IconProps {
  Icon: LucideIcon
  classname?: string
}

export default function Icon({ Icon, classname, ...props }: IconProps) {
  const { theme } = useContext(ThemeContext)
  return (
    <Icon
      {...props}
      className={twMerge(
        `${
          theme ? 'theme-white' : null
        } w-5 h-5 text-skin-muted  hover:text-skin-base cursor pointer`,
        classname,
      )}
    />
  )
}
