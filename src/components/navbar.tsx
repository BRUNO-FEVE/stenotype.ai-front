import { ThemeContext } from '@/context/theme-context'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Icon } from '@/components/ui/icon'
import { GithubIcon } from 'lucide-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  isHome: boolean
}

export default function Navbar({ isHome }: NavbarProps) {
  const { theme, handleThemeChange, handleHomeThemeChange } =
    useContext(ThemeContext)

  const setDefaultTheme = () => {
    if (theme) handleThemeChange()
  }

  return (
    <div className="z-10 fixed top-0 right-0 left-0 flex flex-row items-center py-5 px-6 gap-4 [&>*]:text-skin-base justify-between backdrop-blur-sm">
      <Link to={'/'} onClick={setDefaultTheme}>
        <h1 className="font-bold text-2xl sm:text-xl">stenotype.ai</h1>
      </Link>
      <div className="sm:flex hidden flex-row gap-4 px-6 py-3 rounded-3xl">
        <Link to={'/documentation'}>
          <button className="text-sm text-skin-muted hover:underline underline-offset-4  hover:text-skin-base duration-100 ease-in">
            Documentation
          </button>
        </Link>
      </div>
      <div className="md:flex hidden flex-row gap-4">
        {/* <button className='underline-offset-4 hover:underline'>Login</button>
          <button className={`bg-skin-bg-fill-default px-4 py-2 rounded-md border border-transparent hover:border-skin-bg-muted hover:bg-skin-fill hover:text-skin-base text-white`}>Sign Up</button> */}
        <a
          href="https://github.com/BRUNO-FEVE/upload.ai-front"
          target="_blank"
          className="group flex flex-row gap-2 items-center border border-skin-bg-muted px-4 py-2 rounded-md hover:text-skin-muted duration-100 ease-in"
        >
          Github
          <Icon
            Icon={GithubIcon}
            classname="w-4 h-4 text-skin-base group-hover:text-skin-muted duration-100 ease-in"
          ></Icon>
        </a>
        <button className="block" onClick={handleThemeChange}>
          {theme ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <button
        className="md:hidden block"
        onClick={isHome ? handleHomeThemeChange : handleThemeChange}
      >
        {theme ? (
          <MoonIcon className="h-6 w-6" />
        ) : (
          <SunIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  )
}
