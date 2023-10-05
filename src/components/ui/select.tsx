import * as React from "react"
import { ThemeContext } from '@/context/theme-context';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react'
import { useContext } from 'react';
import { twMerge } from "tailwind-merge";

interface NewSelectProps extends React.ComponentPropsWithRef<typeof Select.Root> {
    placeholder: string
}

function NewSelect({placeholder, children, ...props}: NewSelectProps) {

  const { theme } = useContext(ThemeContext)

  return (
    <Select.Root {...props}>
        <Select.Trigger className={`${theme ? 'theme-white' : null} disabled:cursor-not-allowed data-[disabled]:text-skin-muted bg-skin-bg-secundary box-border w-full flex flex-row justify-between items-center text-skin-base border border-skin-bg-muted rounded-sm py-2 px-4`} >
            <Select.Value placeholder={placeholder}/>
            <Select.Icon>
                <ChevronDown />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content 
                position='popper' 
                align='center'
                sideOffset={7} 
                className={`${theme ? 'theme-white' : null} bg-skin-bg-secundary box-border rounded-sm text-skin-base border border-skin-bg-muted w-full min-w-[var(--radix-select-trigger-width)] py-2 px-2`}
            >
                <Select.Viewport>
                    {children}
                </Select.Viewport>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
  )
}

function SelectGroup ({children, ...props}: React.ComponentPropsWithoutRef<typeof Select.Group>) {
    return (
        <Select.Group {...props} className={twMerge('flex flex-col gap-1 focus:border-none', props.className)} >
            {children}
        </Select.Group>
    )
}

interface SelectItemProps extends React.ComponentPropsWithRef<typeof Select.Item> {
    label: string
}

function SelectItem ({ label, ref , ...props }: SelectItemProps) {
    return (
        <Select.Item
            {...props}
            className={twMerge('flex items-center gap-2 pl-8 py-2 text-skin-base outline-none hover:border-none hover:bg-skin-button-accent hover:text-white rounded-md cursor-pointer', props.className)}
            ref={ref}
        >
            <Select.ItemText>{label}</Select.ItemText>
            <Select.ItemIndicator className="absolute left-2">
                <Check className="w-4 h-4" />
            </Select.ItemIndicator>
        </Select.Item>
    )
}


function SelectLabel ({ref, ...props}: React.ComponentPropsWithRef<typeof Select.Label>) {
    return (
        <Select.Label {...props} className={twMerge('text-skin-muted pl-8', props.className)} ref={ref} />
    )
}

function SelectSeparator ({...props}: React.ComponentPropsWithoutRef<typeof Select.Separator>) {
    return (
        <div className="px-2 py-2">
            <Select.Separator {...props} className={twMerge('h-[1px] bg-zinc-400', props.className)} />
        </div>
    )
}


export {
    NewSelect,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectGroup
}