import { HTMLAttributes } from 'react'

export default function ContentBox({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className="flex flex-col gap-5">
      {children}
    </div>
  )
}
