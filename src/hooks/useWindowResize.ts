import { useEffect, useState } from 'react'

interface WindowSizeProps {
  width: number
  height: number
}

export default function useWindowResize() {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return windowSize
}
