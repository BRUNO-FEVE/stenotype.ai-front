import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { twMerge } from 'tailwind-merge'

interface SeparatorProps
  extends React.ComponentPropsWithRef<typeof SeparatorPrimitive.Root> {}

export default function Separator({ ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      {...props}
      className={twMerge(
        `bg-zinc-600 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]`,
        props.className,
      )}
      decorative
    />
  )
}
