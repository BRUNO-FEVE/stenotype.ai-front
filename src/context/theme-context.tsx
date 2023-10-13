import { PropsWithChildren, createContext, useState } from 'react'

interface DefaultThemeProps {
  theme: boolean
  handleThemeChange: () => void
  handleHomeThemeChange: () => void
}

const DefaultTheme: DefaultThemeProps = {
  theme: false,
  handleThemeChange: () => {},
  handleHomeThemeChange: () => {},
}

export const ThemeContext = createContext(DefaultTheme)

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<boolean>(false)

  const handleThemeChange = () => {
    setTheme((prev) => !prev)
  }

  const handleHomeThemeChange = () => {
    setTimeout(() => {
      setTheme((prev) => !prev)
    }, 3000) // 3000 sec
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleThemeChange,
        handleHomeThemeChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
