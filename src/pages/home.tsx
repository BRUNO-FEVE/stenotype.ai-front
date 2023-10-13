import DefaultPageLayout from '@/components/layout/default-page-layout'
import { Link } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState, Suspense } from 'react'
import LoadingScene from '@/components/loading-scene'
import { Application } from '@splinetool/runtime'
import { ThemeContext } from '@/context/theme-context'
import useWindowResize from '@/hooks/useWindowResize'

const Spline = React.lazy(() => import('@splinetool/react-spline'))

const SPLINE_LINK =
  'https://draft.spline.design/iFaSBbPsc-cjfrDh/scene.splinecode'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const spline = useRef<Application>()

  const { theme } = useContext(ThemeContext)
  const { width } = useWindowResize()

  function onLoad(splineApp: Application) {
    spline.current = splineApp
  }

  const handleResponsivitySpline = () => {
    spline.current?.setVariable('Window Size', width)
    if (width < 480) {
      spline.current?.setZoom(6)
    }
  }

  useEffect(() => {
    spline.current?.setVariable('Theme', theme)
  }, [theme])

  useEffect(() => {
    handleResponsivitySpline()
  }, [width])

  useEffect(() => {
    handleResponsivitySpline()
    spline.current?.setVariable('Theme', theme)

    const hasBeenPreLoaded = sessionStorage.getItem('preloaded')

    if (!hasBeenPreLoaded) {
      setLoading(true)
      setTimeout(() => {
        sessionStorage.setItem('preloaded', 'true')
        setLoading(false)
      }, 5000) // 5 sec
    }
  }, [])

  return (
    <Suspense fallback={<LoadingScene />}>
      {loading ? <LoadingScene /> : null}
      <DefaultPageLayout className="w-screen items-start backdrop-blur-md md:backdrop-blur-none">
        <Spline
          onLoad={onLoad}
          className="absolute top-0 bottom-0 right-0 left-0 blur-xl md:blur-none"
          scene={SPLINE_LINK}
        />
        <div className="flex-1 flex flex-row items-center w-full max-w-screen-2xl relative">
          <div className="lg:w-1/2 p-8 w-fit flex flex-col gap-10 justify-start px-6 lg:pl-20 h-fit items-start md:items-start text-skin-muted">
            <h1 className="font text-3xl font-skin leading-5 text-left md:text-6xl md:text-left lg:text-7xl md:leading-tight z-10">
              IMPROVE YOUR
              <br />
              <span className="text-skin-base md:text-skin-base font-semibold leading-snug">
                PRODUCTIVITY
              </span>
              <br /> WITH AI
            </h1>
            <p className="z-10 text-sm md:text-base w-3/5 md:px-0 md:pr-28 text-left md:w-3/4 lg:w-full">
              Harness the full potential of Stenotype.ai to craft engaging
              social media content or even streamline a complex lecture.
            </p>
            <Link
              to={'/conversor'}
              className="text-white text-xl z-10 px-4 py-2 rounded-md hover:bg-skin-button-accent-hover bg-skin-button-accent"
            >
              <button>Get Started for free</button>
            </Link>
          </div>
          <div className="h-full w-1/2 lg:flex hidden lg:flex-row"></div>
        </div>
      </DefaultPageLayout>
    </Suspense>
  )
}
