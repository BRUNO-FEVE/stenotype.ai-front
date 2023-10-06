import { ThemeContext } from "@/context/theme-context"
import { HTMLAttributes, ReactNode, useContext } from "react"
import { twMerge } from "tailwind-merge"

interface ComponentLayoutProps extends HTMLAttributes<HTMLDivElement>{
    label: string
    children: ReactNode
    paragraph: string
}

export default function ComponentLayout({ label, children, paragraph, ...props }:ComponentLayoutProps) {
    const {theme} = useContext(ThemeContext)
  return (
    <div
        className={twMerge(`${theme ? 'theme-white': null} flex flex-col gap-2`, props.className)}
        {...props}
    >
        <label htmlFor="">{label}</label>
        {children}
        <p className="text-skin-muted text-sm italic">{paragraph}</p>
    </div>
  )
}
