import Navbar from "@/components/navbar"
import { ThemeContext } from "@/context/theme-context"
import { useContext } from "react"
import { Link } from "react-router-dom"
// import useWindowResize from "@/hooks/useWindowResize"

export default function Home() {
  // const { width } = useWindowResize()

  const { theme } = useContext(ThemeContext)

  return (
    <div className={`bg-skin-fill flex flex-col h-screen ${theme ? 'theme-white' : null}`}>
      <Navbar/>
      <div className="flex-1 flex flex-row">
        <div className="lg:w-1/2 w-full  flex flex-col gap-6 justify-center px-6 lg:pl-20 h-full items-center lg:items-start">
          <h1 className="text-bold text-5xl text-center md:text-6xl lg:text-left lg:text-7xl text-skin-base z-10 leading-10">ELEVATE YOUR PRODUCTIVITY <br/> WITH AI</h1>
          <p className="text-skin-muted z-10 px-16 lg:px-0 lg:pr-28 lg:text-left text-center">Harness the full potential of Stenotype.ai to craft engaging social media content or even streamline a complex lecture.</p>
          <Link className="text-white text-xl z-10 px-4 py-2 rounded-md hover:bg-skin-button-accent-hover bg-skin-button-muted" to={'prompt'}><button>Get Started for free</button></Link>
          <div className={`rounded-full h-80 w-80 ${theme ? 'bg-violet-500' : 'bg-violet-800'} blur-3xl absolute top-24 left-24`} />
          <div className={`rounded-full h-80 w-80 ${theme ? 'bg-red-500' : 'bg-red-800'} blur-3xl absolute bottom-24 left-32`} />
        </div>
        <div className="h-full w-1/2 lg:flex hidden lg:flex-row">
          
        </div>
      </div>
    </div>
  )
}
