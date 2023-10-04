import { ThemeContext } from '@/context/theme-context'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

  const { theme, handleThemeChange } = useContext(ThemeContext)

  return (
    <div className='fixed w-full flex flex-row items-center py-5 px-6 gap-4 [&>*]:text-skin-base justify-between backdrop-blur-sm'>
        <div className='flex flex-row gap-3'>
          <Link to={'/'}><h1 className="font-bold text-2xl sm:text-xl">stenotype.ai</h1></Link>
          {/* <button className="text-sm text-skin-muted hover:underline underline-offset-4">Documentation</button> */}
        </div>
        <div className='sm:flex hidden flex-row gap-4 px-6 py-3 rounded-3xl'>
          <button className='text-sm text-skin-muted hover:underline underline-offset-4  hover:text-skin-base'>Docs</button>
          {/* <button className='text-sm text-skin-muted hover:underline underline-offset-4 hover:text-skin-base'>Student</button>
          <button className='text-sm text-skin-muted hover:underline underline-offset-4 hover:text-skin-base'>Sand Box</button> */}
        </div>
        <div className='md:flex hidden flex-row gap-4'>
          <button className='underline-offset-4 hover:underline'>Login</button>
          <button className={`bg-skin-bg-fill-default px-4 py-2 rounded-md border border-transparent hover:border-skin-bg-muted hover:bg-skin-fill hover:text-skin-base text-white`}>Sign Up</button>
          <button className='block' onClick={handleThemeChange}>{ theme ? <MoonIcon className='h-4 w-4' /> : <SunIcon className='h-4 w-4' />}</button>
        </div>
        <button className='md:hidden block' onClick={handleThemeChange}>{ theme ? <MoonIcon className='h-6 w-6' /> : <SunIcon className='h-6 w-6' />}</button>
    </div>
  )
}
