import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

interface NavbarProps {
  handleThemeChange: () => void 
  theme: boolean
}

export default function Navbar({ handleThemeChange, theme }: NavbarProps) {
  return (
    <div className='flex flex-row items-center py-5 px-6 gap-4 [&>*]:text-skin-base justify-between'>
        <div className='flex flex-row gap-3'>
          <h1 className="font-bold text-2xl sm:text-xl">stenotype.ai</h1>
          {/* <button className="text-sm text-skin-muted hover:underline underline-offset-4">Documentation</button> */}
        </div>
        <div className='sm:flex hidden flex-row gap-4 px-6 py-3 rounded-3xl'>
          <button className='text-sm text-skin-muted hover:underline underline-offset-4  hover:text-skin-base'>Documentation</button>
          {/* <button className='text-sm text-skin-muted hover:underline underline-offset-4 hover:text-skin-base'>Student</button>
          <button className='text-sm text-skin-muted hover:underline underline-offset-4 hover:text-skin-base'>Sand Box</button> */}
        </div>
        <div className='md:flex hidden flex-row gap-4'>
          <button className='underline-offset-4 hover:underline'>Login</button>
          <button className={`bg-skin-bg-fill-default px-4 py-2 rounded-md border border-transparent hover:border-skin-bg-muted hover:bg-skin-fill hover:text-skin-base text-white`}>Sign Up</button>
          <button className='block' onClick={handleThemeChange}>{ theme ? <MoonIcon className='h-4 w-4' /> : <SunIcon className='h-4 w-4' />}</button>
        </div>
        <button className='md:hidden block' onClick={handleThemeChange}>{ theme ? <MoonIcon /> : <SunIcon />}</button>
    </div>
  )
}
