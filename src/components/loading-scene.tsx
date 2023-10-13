import { Loader2 } from 'lucide-react'
import BackgroundBlur from './ui/background-blur'

export default function LoadingScene() {
  return (
    <div className="absolute z-20 w-screen h-screen flex flex-row gap-2 justify-center items-center bg-black text-lg text-white">
      <Loader2 className="animate-spin" />
      <BackgroundBlur color={'violet'} className="-z-10 animate-pulse" />
      Loading...
    </div>
  )
}
