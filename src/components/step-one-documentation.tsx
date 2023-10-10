import ContentBox from './layout/content-box'
import Text from '../components/ui/text'
import { useContext } from 'react'
import { ThemeContext } from '@/context/theme-context'
import ConvertingImg from '@/assets/step-1.png'
import Separator from './ui/separator'
import { TextCursorInputIcon } from 'lucide-react'

// interface StepOneDocumentationProps {
//   setNextStep?: (nextPage: ReactNode) => void
// }

export default function StepOneDocumentation() {
  const { theme } = useContext(ThemeContext)

  return (
    <div>
      <div
        className={`${
          theme ? 'selection:bg-sky-300' : 'selection:bg-indigo-500'
        } flex flex-col gap-10`}
      >
        <ContentBox>
          <Text variant="title">Converting the Video</Text>
          <Text variant="paragraph">
            The first step in the Stenotype process is initiated after you
            upload your video. Upon upload, we proceed to convert the video into
            an MP3 format, a crucial preparation step before sending it to
            Whisper, an OpenAI API specialized in transcription services. It's
            important to note that the file size of your video can significantly
            impact the conversion time. Larger files may require more time for
            the conversion process, so optimizing file sizes can expedite the
            transcription process and lead to quicker results.
          </Text>
        </ContentBox>
        <ContentBox className="gap-10">
          <div className="flex flex-row items-center gap-4">
            <TextCursorInputIcon className="w-8 h-8" />
            <Text variant="subtitle_1">Key Words</Text>
          </div>
          <div className="flex justify-center">
            <img
              className="w-1/2"
              src={ConvertingImg}
              alt="Converting Section Component"
            ></img>
          </div>
          <Text variant="paragraph">
            Moreover, paying attention to the inclusion of key words and
            ensuring they are pronounced clearly in your video's audio content
            can substantially improve the accuracy of the transcription.
            Whisper's ability to recognize and transcribe key words is enhanced
            when they are enunciated distinctly. This meticulous preparation
            ensures that Whisper can accurately transcribe the audio content,
            setting the stage for further content generation and analysis with
            Stenotype.
          </Text>
        </ContentBox>
        <Separator orientation="horizontal" />
        <div className="flex justify-end">
          <button
            // onClick={}
            className="px-20 py-2 text-white bg-skin-button-accent hover:bg-skin-button-accent-hover rounded-md"
          >
            Let's Start
          </button>
        </div>
      </div>
    </div>
  )
}
