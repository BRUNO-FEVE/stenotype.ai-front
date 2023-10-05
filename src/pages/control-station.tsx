import Navbar from "@/components/navbar";
import VideoConversorWeb from "@/components/web/video-conversor-web";
import { ThemeContext } from "@/context/theme-context";
import {  useContext } from "react";

export default function ControlStation() {

    const { theme } = useContext(ThemeContext)

  return (
    <div className={`${theme ? 'theme-white' : null}`}>
        <Navbar />
        <div className="bg-skin-fill h-screen pt-24 flex flex-row gap-2">
            <div className="w-3/5 h-full flex flex-col px-4 pb-4 gap-2">
                <div className="h-3/5 w-full flex flex-row gap-2">
                    <VideoConversorWeb />
                    <div className="bg-blue-500 h-full flex-1">

                    </div>
                </div>
                <div className="flex-1 w-full bg-red-800">

                </div>
            </div>
            <div className="bg-skin-bg-secundary flex-1"></div>
        </div>
    </div>
  )
}
