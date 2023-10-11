import { ThemeContext } from '@/context/theme-context'
import { useContext } from 'react'
import { Youtube, Instagram, Music2, PenIcon } from 'lucide-react'
import ContentBox from './layout/content-box'
import Text from '../components/ui/text'
import { IconListCell } from './ui/icon'
import TopicsBar from './ui/topics-bar'

export default function StepTwoDocumentation() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="relative flex items-start">
      <TopicsBar>
        <a href="#default-prompts">
          <Text variant="link">Default Prompts</Text>
        </a>
        <a href="#custom-prompts">
          <Text variant="link">Custom Propmts</Text>
        </a>
        <a href="#temperature">
          <Text variant="link">Temperature</Text>
        </a>
      </TopicsBar>
      <div
        className={`${
          theme ? 'selection:bg-sky-300' : 'selection:bg-indigo-500'
        } flex flex-col gap-20 w-full`}
      >
        <ContentBox>
          <Text variant="title">Selecting the Prompt</Text>
          <Text id="default-prompts" variant="paragraph">
            In the Stenotype system, the prompt plays a pivotal role, as it acts
            as the guiding force behind the AI's content generation and
            question-answering capabilities. Crafting a well-structured prompt
            is the most crucial aspect of Stenotype, as it ensures that the AI
            understands your specific requirements and generates content
            accordingly.
          </Text>
        </ContentBox>
        <ContentBox>
          <Text id="custom-prompts" variant="subtitle_1">
            Default Prompts
          </Text>
          <Text variant="paragraph">
            To simplify this process, Stenotype provides a set of default
            prompts, each tailored to popular content platforms and needs. These
            default prompts include options such as:
          </Text>
          <div className="w-full flex justify-evenly">
            <div className="grid grid-cols-2 gap-8">
              <IconListCell Icon={Youtube}>
                <div>
                  <p>Title</p>
                  <p>Description</p>
                </div>
              </IconListCell>
              <IconListCell Icon={Instagram}>Description</IconListCell>
              <IconListCell Icon={Music2}>Description</IconListCell>
              <IconListCell Icon={PenIcon}>Description</IconListCell>
            </div>
          </div>
          <Text id="temperature" variant="paragraph">
            Leveraging these predefined prompts streamlines your interaction
            with the AI and allows you to seamlessly create content for a
            variety of applications, whether you're aiming to enhance your
            social media presence or craft professional resumes.
          </Text>
        </ContentBox>
        <ContentBox>
          <Text variant="subtitle_1">Custom Prompts</Text>
          <Text variant="paragraph">
            While these default prompts are convenient, we highly recommend that
            users create custom prompts tailored to their specific needs. You
            can use the structure of the default prompts as a starting point and
            customize them to match your unique requirements. This personalized
            approach ensures that Stenotype delivers content precisely aligned
            with your objectives, making it a powerful tool for a wide range of
            applications.
          </Text>
        </ContentBox>
        <ContentBox>
          <Text variant="subtitle_1">Temperature</Text>
          <Text variant="paragraph">
            The temperature setting is a critical factor when working with AI
            models like Stenotype. It plays a key role in influencing the
            creativity and output of the AI. Temperature essentially acts as a
            knob that adjusts the randomness of the AI's responses. A higher
            temperature setting, such as 0.8, will result in more creative and
            diverse responses, while a lower setting, like 0.2, will yield more
            deterministic and focused answers.
          </Text>
        </ContentBox>
      </div>
    </div>
  )
}
