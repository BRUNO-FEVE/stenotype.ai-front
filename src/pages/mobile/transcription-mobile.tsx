import { TextCursorInputIcon } from 'lucide-react'
import { VideoContext } from '@/context/video-context'
import { useContext } from 'react'
import NewPageButton from '@/components/ui/button'
import DefaultPageLayout from '@/components/layout/default-page-layout'

export default function TranscriptionMobile() {
  // const [ transcription, setTranscription ] = useState< string | null >(null)

  const { video, prompt } = useContext(VideoContext)

  return (
    <DefaultPageLayout className="gap-7">
      <h1 className="text-skin-base font-bold text-2xl text-center">
        Generated Transcription
      </h1>
      <p className="w-full h-96 py-8 px-6 bg-skin-bg-secundary text-skin-base overflow-x-hidden overflow-scroll leading-8 rounded-md text-justify">
        {video?.transcription}
      </p>
      <div className="flex flex-row gap-2 pl-4">
        <TextCursorInputIcon className="text-skin-base" />
        <p className="text-skin-base">
          <span className="font-bold">Key Words: </span>
          {prompt || 'Não Fornecido'}
        </p>
      </div>
      <p className="text-skin-muted text-sm px-2 text-justify">
        Keywords are crucial in audio transcription with OpenAI's Whisper model.
        They enhance transcription quality and relevance by focusing the model
        on specific audio information in various contexts like medical, legal,
        and educational transcriptions. Keywords save time and effort, making
        the process efficient and productive.
      </p>
      <NewPageButton to="/prompt" />
    </DefaultPageLayout>
  )
}
