/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropsWithChildren, createContext, useState } from "react"

interface videoProps {
    id: string
    name: string
    path: string
    transcription: string
    createAt: string
}

interface DefaultVideoProps {
    video: videoProps | null
    prompt: string | null
    setVideo: (video: videoProps) => void
    setPrompt: (prompt: string) => void
}

const DefaultVideo: DefaultVideoProps = {
    video: null,
    prompt: null,

    setPrompt: (_prompt: string) => {
        return
    },

    setVideo: (_video: videoProps) => {
        return
    }
}

export const VideoContext = createContext(DefaultVideo)

export default function VideoProvider( {children}: PropsWithChildren ) {
    const [ video, setVideo ] = useState<videoProps | null>(null)
    const [ prompt, setPrompt ] = useState<string | null>(null)

    return (
        <VideoContext.Provider
        value={{
            video,
            prompt,
            setVideo,
            setPrompt
        }}
        >
            {children}
        </VideoContext.Provider>
    )
}