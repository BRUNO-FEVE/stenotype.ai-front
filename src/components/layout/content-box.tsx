import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export default function ContentBox({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={twMerge('flex flex-col gap-5', props.className)}>
      {children}
    </div>
  )
}
