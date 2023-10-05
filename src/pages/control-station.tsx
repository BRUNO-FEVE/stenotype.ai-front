import Navbar from "@/components/navbar";
import { ThemeContext } from "@/context/theme-context";
import { useContext } from "react";

export default function ControlStation() {
    const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme ? 'theme-white' : null}`}>
        <Navbar />
        <div className="bg-skin-fill h-screen pt-24 flex flex-row gap-2">
            <div className="bg-skin-bg-secundary w-3/5 h-full flex flex-col p-4 gap-2">
                <div className="h-3/5 w-full bg-red-300 flex flex-row gap-2">
                    <div className="w-1/2 h-full flex flex-col gap-3">
                        <div className="aspect-video bg-white"></div>
                        <div className="bg-green-600 w-full h-full"></div>
                    </div>
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
