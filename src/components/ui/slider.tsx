import { ThemeContext } from '@/context/theme-context'
import * as SliderPrimitive from '@radix-ui/react-slider'
import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'

interface SliderProps
  extends React.ComponentPropsWithRef<typeof SliderPrimitive.Root> {}

export default function Slider({ ref, ...props }: SliderProps) {
  const { theme } = useContext(ThemeContext)

  return (
    <SliderPrimitive.Root
      {...props}
      ref={ref}
      className={twMerge(
        `${
          theme ? 'theme-white' : null
        } w-full h-5 relative flex items-center select-none touch-none`,
        props.className,
      )}
    >
      <SliderPrimitive.Track className="h-1 bg-skin-bg-secundary relative grow rounded-full">
        <SliderPrimitive.Range className=" absolute h-full rounded-full bg-skin-bg-base-foreground" />
      </SliderPrimitive.Track>
      <SliderPrimitive.SliderThumb
        aria-label="Volume"
        className="w-5 h-5 block bg-skin-bg-base-foreground rounded-full"
      />
    </SliderPrimitive.Root>
  )
}
