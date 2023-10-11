import { useContext } from 'react'
import Text from '../components/ui/text'
import { ThemeContext } from '@/context/theme-context'
import ContentBox from './layout/content-box'
import FileTypeGrid from './file-type-grid'
import TopicsBar from './ui/topics-bar'
// import StepOneDocumentation from './step-one-documentation'

// interface GetStartedProps {
//   setNextStep?: (nextPage: ReactNode) => void
// }

export default function GetStarted() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="relative flex items-start">
      <TopicsBar>
        <a href="#aplicantions">
          <Text variant="link">Commum Aplicantions</Text>
        </a>
        <a href="#before-start">
          <Text variant="link">Before you start</Text>
        </a>
      </TopicsBar>
      <div
        className={`${
          theme ? 'selection:bg-sky-300' : 'selection:bg-indigo-500'
        } flex flex-col gap-10`}
      >
        <ContentBox>
          <Text variant="title" id="aplicantions">
            Get Started
          </Text>
          <Text variant="paragraph">
            Stenotype is a cutting-edge AI technology designed to effortlessly
            extract audio content from videos. Once the audio is transcribed,
            you can seamlessly generate insightful questions or create engaging
            content based on the transcript.
          </Text>
        </ContentBox>
        <ContentBox>
          <Text variant="subtitle_1" id="aplications">
            Commum Aplications
          </Text>
          <Text variant="paragraph">
            This versatile tool finds its most common application in the realm
            of social media, where it automates the process of generating
            textual content to complement your videos. This includes crafting
            compelling titles, detailed descriptions, and more, all driven by
            the extracted audio content.
          </Text>
          <Text variant="paragraph" id="before-start">
            Additionally, another prevalent use of Stenotype is in content
            summarization, making it an invaluable tool for condensing lengthy
            content into concise and easily digestible formats. Whether you're a
            content creator looking to streamline your video content production
            or a researcher seeking to analyze video data, Stenotype offers a
            powerful and efficient solution for a variety of applications.
          </Text>
        </ContentBox>
        <ContentBox>
          <Text variant="subtitle_1">Before you start</Text>
          <Text variant="paragraph">
            Before you start utilizing Stenotype, it's crucial to understand why
            having clear audio in your video content is paramount. Stenotype
            operates by analyzing the audio within your videos, as it cannot
            visualize the video itself. This means that it relies heavily on the
            quality of the audio, especially when someone is speaking, for
            accurate content extraction through voice recognition. Clear and
            well-recorded audio not only ensures more accurate transcriptions
            but also enhances the AI's capability to create meaningful content
            and answer questions effectively.
          </Text>
          <Text variant="paragraph">
            So, to make the most of Stenotype's capabilities, prioritize the
            quality of audio in your videos, particularly when there is spoken
            content, to unlock its full potential in content extraction and
            creation.
          </Text>
          <div className="flex flex-row justify-center py-10">
            <FileTypeGrid />
          </div>
        </ContentBox>
      </div>
    </div>
  )
}
