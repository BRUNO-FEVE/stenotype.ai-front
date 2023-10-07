import {
  TextSelect,
  ThermometerSun,
  ThermometerSnowflake,
  Clipboard,
  Check,
  ThumbsUp,
  LucideIcon,
  ThumbsDown,
} from 'lucide-react'
import { VideoContext } from '@/context/video-context'
import React, { useContext, useEffect, useState } from 'react'
import {
  Select,
  SelectLabel,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { api } from '@/lib/axios'
import Slider from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { useCompletion } from 'ai/react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import DefaultPageLayout from '@/components/default-page-layout'

interface PromptProps {
  id: string
  title: string
  template: string
}

export default function Prompt() {
  const [prompts, setPrompts] = useState<PromptProps[] | null>(null)
  const [template, setTemplate] = useState<string>('')
  const [temperature, setTemperature] = useState<number>(0.5)
  const [clipboardIcon, setClipboardIcon] = useState<LucideIcon>(Clipboard)

  const { video } = useContext(VideoContext)
  const videoId = video?.id

  function handleSelectChange(promptId: string) {
    const promptSelected = prompts?.find((prompt) => prompt.id === promptId)

    if (!promptSelected) {
      return
    }

    setTemplate(promptSelected.template)
  }

  const { setInput, handleSubmit, isLoading, completion } = useCompletion({
    api: 'https://upload-ai-back.vercel.app/ai/complete', // --> PROD
    // api: 'http://localhost:3333/ai/complete', // --> DEV
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json',
    },
  })

  const handleClipBoardClick = () => {
    setClipboardIcon(Check)

    setTimeout(() => {
      setClipboardIcon(Clipboard)
    }, 1500) // 1.5 sec
  }

  useEffect(() => {
    api.get('/prompts').then((res) => {
      setPrompts(res.data)
    })
  }, [])

  useEffect(() => {
    setInput(template)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template])

  return (
    <DefaultPageLayout className="h-full">
      <div className="flex flex-row justify-center items-center bg-skin-bg-secundary h-10 rounded-md py-2 px-4 gap-2 border border-skin-bg-muted">
        <TextSelect className="text-skin-base" />
        <p className="text-skin-base">
          {video?.transcription.substring(0, 50)}...
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-row gap-5">
          <Select
            onValueChange={handleSelectChange}
            placeholder="Select the base prompt..."
          >
            <SelectGroup>
              <SelectLabel>Prompts</SelectLabel>
              {prompts?.map((prompt, index) => {
                return (
                  <SelectItem
                    key={index}
                    label={prompt.title}
                    value={prompt.id}
                  />
                )
              })}
            </SelectGroup>
          </Select>
          <Select disabled placeholder="GPT 3.5 turbo 16k" />
        </div>
        <textarea
          id="prompt"
          className="w-full bg-skin-bg-secundary h-80 resize-none p-4 text-skin-base border border-skin-bg-muted rounded-sm"
          placeholder="Include the prompt for the AI..."
          value={template}
          onChange={(event) => setTemplate(event.target.value)}
        />
        <div className="flex flex-row items-center gap-3 text-skin-base">
          <div className="flex flex-row items-center gap-1">
            {temperature > 0.5 ? <ThermometerSun /> : <ThermometerSnowflake />}
            <p>Temperature:</p>
          </div>
          <p>{temperature}</p>
          <Slider
            min={0}
            step={0.1}
            max={1}
            defaultValue={[temperature]}
            value={[temperature]}
            onValueChange={(event) => {
              setTemperature(event[0])
            }}
          />
        </div>
        <Button disabled={!!isLoading}>Execute</Button>
        <div>
          <div className="h-80 bg-skin-bg-secundary py-4 flex flex-col justify-around gap-3 text-skin-base border border-skin-bg-muted rounded-sm">
            {completion ? (
              <div className="flex flex-row justify-between items-center px-4">
                <div className="flex flex-row gap-2 items-center">
                  <CopyToClipboard text={completion}>
                    {React.createElement(clipboardIcon, {
                      onClick: handleClipBoardClick,
                      className:
                        'w-5 h-5 text-skin-muted  hover:text-skin-base cursor pointer',
                    })}
                  </CopyToClipboard>
                  <p
                    className={`text-sm text-skin-muted ${
                      clipboardIcon === Check ? 'block' : 'invisible'
                    }`}
                  >
                    Copied
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <ThumbsUp className="w-5 h-5 text-skin-muted  hover:text-skin-base cursor pointer" />
                  <ThumbsDown className="w-5 h-5 text-skin-muted  hover:text-skin-base cursor pointer" />
                </div>
              </div>
            ) : null}
            <textarea
              id="prompt"
              className="w-full h-72 bg-transparent resize-none px-4 focus:border-none outline-none"
              placeholder="Result generated by AI"
              value={completion}
              readOnly
            />
          </div>
        </div>
      </form>
    </DefaultPageLayout>
  )
}
