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
    <div className={`bg-skin-fill h-screen ${theme ? 'theme-white' : null}`}>
      <Navbar handleThemeChange={handleThemeChange} theme={theme}/>
    </div>
  )
}
