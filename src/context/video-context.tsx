/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropsWithChildren, createContext, useState } from "react"

interface DefaultVideoProps {
    videoId: string | null
    setVideoId: (videoId: string) => void
}

const DefaultVideo: DefaultVideoProps = {
    videoId: null,

    setVideoId: (_videoId: string) => {
        return
    },
}

export const VideoContext = createContext(DefaultVideo)

export default function VideoProvider( {children}: PropsWithChildren ) {
    const [ videoId, setVideoId ] = useState<string | null>('')

    return (
        <VideoContext.Provider
        value={{
            videoId,
            setVideoId
        }}
        >
            {children}
        </VideoContext.Provider>
    )
}