import Navbar from "@/components/navbar"
import { useState } from "react"
// import useWindowResize from "@/hooks/useWindowResize"

export default function Home() {
  // const { width } = useWindowResize()
  const [ theme, setTheme ] = useState<boolean>(false)

  const handleThemeChange = () => {
    setTheme(prev => !prev)
  }

  return (
    <div className={`bg-skin-fill flex flex-col h-screen ${theme ? 'theme-white' : null}`}>
      <Navbar handleThemeChange={handleThemeChange} theme={theme}/>
      <div className="flex-1 flex flex-row">
        <div className="lg:w-1/2 w-full  flex flex-col gap-4 justify-center px-6 lg:pl-20 h-full items-center lg:items-start">
          <h1 className="text-bold text-5xl text-center md:text-6xl lg:text-left lg:text-7xl text-skin-base z-10">UNLOCK YOUR CREATIVE POTENCIONAL <br/> WITH AI</h1>
          <button className="text-skin-inverted text-xl hover:underline underline-offset-4 z-10 lg:pl-4">Get Started</button>
          <div className={`rounded-full h-80 w-80 ${theme ? 'bg-violet-500' : 'bg-violet-800'} blur-3xl absolute top-24 left-24`} />
          <div className={`rounded-full h-80 w-80 ${theme ? 'bg-red-500' : 'bg-red-800'} blur-3xl absolute bottom-24 left-32`} />
        </div>
        <div className="h-full w-1/2 lg:block hidden">
          <div className="h-full w-72">
            
          </div>
        </div>
      </div>
    </div>
  )
}
