import { ThemeContext } from '@/context/theme-context';
import { HtmlHTMLAttributes, useContext } from 'react';
import { twMerge } from 'tailwind-merge'

interface BackgroundBlurProps extends HtmlHTMLAttributes<HTMLDivElement> {
    color: string;
}

interface themeColors {
    lither: string
    darker: string
}

export default function BackgroundBlur({ color, ...props }: BackgroundBlurProps) {
    const { theme } = useContext(ThemeContext);

    const colorVariants: { [key: string]: themeColors } = {
        violet: {
            lither: 'bg-violet-500',
            darker: 'bg-violet-800'
        }, 
        red: {
            lither: 'bg-red-500',
            darker: 'bg-red-800'
        },
        orange: {
            lither: 'bg-orange-400',
            darker: 'bg-orange-400'
        }
    };

    const selectedColorVariant: themeColors = colorVariants[color];

    return (
        <div
            {...props}
            className={twMerge(`rounded-full bg-ora h-80 w-80 ${theme ? selectedColorVariant.lither : selectedColorVariant.darker} blur-3xl absolute`, props.className)}
        />
    );
}
