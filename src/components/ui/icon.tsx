import { ThemeContext } from '@/context/theme-context'
import { LucideIcon } from 'lucide-react'
import { HTMLAttributes, useContext } from 'react'
import { twMerge } from 'tailwind-merge'

interface IconProps {
  Icon: LucideIcon
  classname?: string
}

function Icon({ Icon, classname, ...props }: IconProps) {
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

interface IconListCellProps extends HTMLAttributes<HTMLDivElement> {
  Icon: LucideIcon
}

function IconListCell({ Icon, children, ...props }: IconListCellProps) {
  return (
    <div
      {...props}
      className={twMerge(
        'flex flex-row items-center gap-2 text-sm',
        props.className,
      )}
    >
      <Icon className="w-8 h-8" />
      {children}
    </div>
  )
}

export { Icon, IconListCell }
