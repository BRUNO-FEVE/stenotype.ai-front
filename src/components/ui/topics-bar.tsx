import { HTMLAttributes } from 'react'

export default function TopicsBar({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="w-1/5 fixed right-0 pl-2 text-sm hidden lg:flex lg:flex-col lg:gap-4"
    >
      <h2>On this page</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}
