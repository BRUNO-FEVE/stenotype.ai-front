import { Select, SelectGroup, SelectLabel, SelectItem } from "../ui/select"
import Slider from "../ui/slider"
import { ArrowRight, ThermometerSun, ThermometerSnowflake } from "lucide-react"
import ComponentLayout from "../component-layout"
import { Button } from "../ui/button"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "@/context/theme-context"
import { api } from "@/lib/axios"
import { useCompletion } from "ai/react"
import { VideoContext } from "@/context/video-context"
import Icon from "../ui/icon"

interface PromptProps {
    id: string
    title: string
    template: string
}

interface PromptWebProps {
    setCompletion: (completeion: string) => void
    setPrompt: (promptId: string) => void
    prompt: string
}

export default function PromptWeb({ setCompletion, setPrompt, prompt }: PromptWebProps) {
    const [ prompts, setPrompts ] = useState<PromptProps[] | null>(null)
    const [ temperature, setTemperature ] = useState<number>(0.5)

    const { theme } = useContext(ThemeContext)
    const { video } = useContext(VideoContext)
    const videoId = video?.id

    const { setInput, handleSubmit, completion, isLoading } = useCompletion({
        api: 'https://upload-ai-back.vercel.app/ai/complete', // --> PROD
        // api: 'http://localhost:3333/ai/complete', // --> DEV
        body: {
            videoId,
            temperature,
        },
        headers: {
            "Content-type": "application/json",
        }
      })

    useEffect(() => {
        api.get('/prompts').then(res => {
          setPrompts(res.data)
        })
      }, [])
    
      useEffect(() => {
        setInput(prompt)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [prompt])

      useEffect(() => {
        setCompletion(completion)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [completion])

  return (
    <div className={`${theme ? 'theme-white' : null} flex-1 flex`}>
        <form onSubmit={handleSubmit} className="flex flex-col justify-evenly d">
            <Button 
                data-executing={isLoading}
                className="flex flex-row gap-2 justify-center items-center w-full data-[executing]:cursor-not-allowed"
                disabled={isLoading}
            >
                {isLoading ? 
                    <>
                        Executing...
                    </>
                : 
                    <>
                        Execute
                        <Icon Icon={ArrowRight} classname="text-white"></Icon>
                    </>
                }
            </Button>
            <ComponentLayout label="Modelo :" paragraph="You will be able to customize this option soon.">
                <Select disabled placeholder="GPT 3.5 turbo 16k" />
            </ComponentLayout>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-2">
                    {temperature > 0.5 ? <ThermometerSun /> : <ThermometerSnowflake />}
                    <label>Temperature: </label>
                    <p>{temperature}</p>
                </div>
                <Slider 
                    min={0} 
                    step={0.1}
                    max={1} 
                    defaultValue={[temperature]} 
                    value={[temperature]} 
                    onValueChange={(event) => {setTemperature(event[0])}} 
                />
                <p className="text-sm text-skin-muted italic">Higher values tend to make the result more creative and prone to possible errors.</p>
            </div>
            <ComponentLayout 
                label="Prompt :" 
                paragraph="Prompts are key in AI, guiding behavior and ensuring ethics. Understanding their importance is essential for AI's potential."
            >
                <Select 
                    onValueChange={setPrompt}
                    placeholder="Select the base prompt..."
                >
                    <SelectGroup>
                        <SelectLabel>Prompts</SelectLabel>
                        {prompts?.map((prompt, index) => {
                            return(<SelectItem key={index} label={prompt.title} value={prompt.id} />)
                        })}
                    </SelectGroup>
                </Select>
            </ComponentLayout>
        </form>
    </div>
  )
}
