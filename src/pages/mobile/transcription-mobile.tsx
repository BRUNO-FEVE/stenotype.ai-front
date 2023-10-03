import Navbar from "@/components/navbar"
import { TextCursorInputIcon } from 'lucide-react'
import { ThemeContext } from "@/context/theme-context"
import { VideoContext } from "@/context/video-context"
import { useContext, useEffect } from "react"
import NewPageButton from "@/components/ui/button"

export default function TranscriptionMobile() {
  // const [ transcription, setTranscription ] = useState< string | null >(null)

  const { theme } = useContext(ThemeContext)
  const { video, prompt } = useContext(VideoContext)

  useEffect(() => {
    console.log(video)
  }, [])

  return (
    <div className={`bg-skin-fill flex flex-col h-screen ${theme ? 'theme-white' : null}`}>
        <Navbar></Navbar>
        <div className="px-7 py-7 flex flex-col gap-7">
            <h1 className="text-skin-base font-bold text-2xl text-center">Generated Transcription</h1>
            <p className="w-full h-96 py-8 px-6 bg-skin-bg-secundary text-skin-base overflow-scroll leading-8 rounded-md text-justify">{video?.transcription}</p>
            <div className="flex flex-row gap-2 pl-4">
              <TextCursorInputIcon className="text-skin-base" />
              <p className="text-skin-base"><span className="font-bold">Key Words: </span>{prompt ? prompt : 'Não Fornecido'}</p>
            </div>
            <p className="text-skin-muted text-sm px-2 text-justify">Keywords are crucial in audio transcription with OpenAI's Whisper model. They enhance transcription quality and relevance by focusing the model on specific audio information in various contexts like medical, legal, and educational transcriptions. Keywords save time and effort, making the process efficient and productive.</p>
        </div> 
        <NewPageButton to="/prompt" />
    </div>
  )
}
