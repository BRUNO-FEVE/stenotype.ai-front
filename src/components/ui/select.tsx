import * as React from 'react'
import { ThemeContext } from '@/context/theme-context'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown, Check } from 'lucide-react'
import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'

interface NewSelectProps
  extends React.ComponentPropsWithRef<typeof SelectPrimitive.Root> {
  placeholder: string
}

function Select({ placeholder, children, ...props }: NewSelectProps) {
  const { theme } = useContext(ThemeContext)

  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        className={`${
          theme ? 'theme-white' : null
        } disabled:cursor-not-allowed data-[disabled]:text-skin-muted bg-skin-bg-secundary box-border w-full flex flex-row justify-between items-center text-skin-base border border-skin-bg-muted rounded-sm py-2 px-4`}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          align="center"
          sideOffset={7}
          className={`${
            theme ? 'theme-white' : null
          } z-20 bg-skin-bg-secundary box-border rounded-sm text-skin-base border border-skin-bg-muted w-full min-w-[var(--radix-select-trigger-width)] py-2 px-2`}
        >
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

function SelectGroup({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      {...props}
      className={twMerge(
        'flex flex-col gap-1 focus:border-none',
        props.className,
      )}
    >
      {children}
    </SelectPrimitive.Group>
  )
}

interface SelectItemProps
  extends React.ComponentPropsWithRef<typeof SelectPrimitive.Item> {
  label: string
}

function SelectItem({ label, ref, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      {...props}
      className={twMerge(
        'flex items-center gap-2 pl-8 py-2 text-skin-base outline-none hover:border-none hover:bg-skin-button-accent hover:text-white rounded-md cursor-pointer',
        props.className,
      )}
      ref={ref}
    >
      <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-2">
        <Check className="w-4 h-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectLabel({
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      {...props}
      className={twMerge('text-skin-muted pl-8', props.className)}
      ref={ref}
    />
  )
}

function SelectSeparator({
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>) {
  return (
    <div className="px-2 py-2">
      <SelectPrimitive.Separator
        {...props}
        className={twMerge('h-[1px] bg-zinc-400', props.className)}
      />
    </div>
  )
}

export { Select, SelectItem, SelectLabel, SelectSeparator, SelectGroup }
