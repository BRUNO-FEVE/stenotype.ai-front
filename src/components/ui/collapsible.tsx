import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

function ListUnit({ children, ...props }: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={twMerge(
        `hover:text-skin-base pl-3 text-sm xl:text-base`,
        props.className,
      )}
    >
      {children}
    </button>
  )
}

function Content({
  children,
  ...props
}: React.ComponentPropsWithRef<
  typeof CollapsiblePrimitive.CollapsibleContent
>) {
  return (
    <CollapsiblePrimitive.Content
      {...props}
      className="flex flex-col items-start gap-2 border-l border-skin-bg-muted ml-2 duration-100 ease-in"
    >
      {children}
    </CollapsiblePrimitive.Content>
  )
}

function Trigger({
  children,
  ...props
}: React.ComponentPropsWithRef<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>) {
  return (
    <CollapsiblePrimitive.Trigger
      {...props}
      className="hover:text-skin-base duration-100 ease-in"
      asChild
    >
      {children}
    </CollapsiblePrimitive.Trigger>
  )
}

function Root({
  children,
  ...props
}: React.ComponentPropsWithRef<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      {...props}
      className="flex flex-col gap-2 items-start"
    >
      {children}
    </CollapsiblePrimitive.Root>
  )
}

export { Root, Trigger, Content, ListUnit }
