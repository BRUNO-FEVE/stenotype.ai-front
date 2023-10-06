import { ThemeContext } from "@/context/theme-context";
import { RefObject, TextareaHTMLAttributes, useContext } from "react";
import { twMerge } from "tailwind-merge";


interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: RefObject<HTMLTextAreaElement>
}

export default function TextArea({ref, ...props}: TextAreaProps) {
    const { theme } = useContext(ThemeContext)
  return (
    <textarea 
        {...props}
        ref={ref}
        className={twMerge(`${theme ? 'theme-white' : ''} z-10 bg-skin-bg-secundary resize-none h-full w-full border border-skin-bg-muted rounded-md text-skin-base p-4`, props.className)}
    />
  )
}
