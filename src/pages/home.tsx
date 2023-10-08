import DefaultPageLayout from '@/components/layout/default-page-layout'
import BackgroundBlur from '@/components/ui/background-blur'
import { Link } from 'react-router-dom'
// import useWindowResize from "@/hooks/useWindowResize"

export default function Home() {
  // const { width } = useWindowResize()

  return (
    <DefaultPageLayout className="w-screen items-center">
      <div className="flex-1 flex flex-row w-full max-w-screen-2xl relative">
        <div className="lg:w-1/2 w-full  flex flex-col gap-6 justify-center px-6 lg:pl-20 h-full items-center lg:items-start">
          <h1 className="font text-5xl text-center md:text-6xl lg:text-left lg:text-7xl text-skin-base z-10 leading-10">
            ELEVATE YOUR PRODUCTIVITY <br /> WITH AI
          </h1>
          <p className="text-skin-muted z-10 px-16 lg:px-0 lg:pr-28 lg:text-left text-center">
            Harness the full potential of Stenotype.ai to craft engaging social
            media content or even streamline a complex lecture.
          </p>
          <Link
            to={'/conversor'}
            className="text-white text-xl z-10 px-4 py-2 rounded-md hover:bg-skin-button-accent-hover bg-skin-button-accent"
          >
            <button>Get Started for free</button>
          </Link>
          <BackgroundBlur color="violet" className="top-32 left-24" />
          <BackgroundBlur color="red" className="bottom-16 left-32" />
        </div>
        <div className="h-full w-1/2 lg:flex hidden lg:flex-row"></div>
      </div>
    </DefaultPageLayout>
  )
}
