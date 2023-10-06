import Navbar from "@/components/navbar";
import { ArrowRight, ThermometerSun, ThermometerSnowflake, Clipboard, Check, ThumbsDown, ThumbsUp, LucideIcon, } from 'lucide-react'
import { Button } from "@/components/ui/button";
import VideoConversorWeb from "@/components/web/video-conversor-web";
import { ThemeContext } from "@/context/theme-context";
import {  useContext, useEffect, useState } from "react";
import { Select, SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import Slider from '@/components/ui/slider'
import { api } from "@/lib/axios";
import { useCompletion } from "ai/react";
import { VideoContext } from "@/context/video-context";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

interface PromptProps {
    id: string
    title: string
    template: string
}

export default function ControlStation() {
    const [ prompts, setPrompts ] = useState<PromptProps[] | null>(null)
    const [ template, setTemplate ] = useState<string>('')
    const [ temperature, setTemperature ] = useState<number>(0.5)
    const [ clipboardIcon, setClipboardIcon ] = useState<LucideIcon>(Clipboard)

    const { theme } = useContext(ThemeContext)

    function handleSelectChange(promptId: string) {
        const promptSelected = prompts?.find(prompt => prompt.id === promptId)
    
        if(!promptSelected) { 
            return
        }
    
        setTemplate(promptSelected.template)
    }


  const handleClipBoardClick = () => {
    setClipboardIcon(Check)

    setTimeout(() => {
      setClipboardIcon(Clipboard)
    }, 1500) // 1.5 sec
  }

    const { video } = useContext(VideoContext)
    const videoId = video?.id

    const { setInput, handleSubmit, completion } = useCompletion({
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
        setInput(template)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [template])

  return (
    <div className={`${theme ? 'theme-white' : null} flex flex-col justify-center bg-skin-fill items-center`}>
        <Navbar />
        <div className="bg-skin-fill text-skin-base h-screen max-w-screen-2xl pt-24 px-4 pb-4 flex flex-row gap-6">
            <div className="w-3/5 h-full flex flex-col gap-2">
                <div className="h-3/5 w-full flex flex-row gap-6">
                    <VideoConversorWeb />
                    <form onSubmit={handleSubmit} className="h-full flex-1 flex flex-col justify-evenly gap-4">
                        <Button className="flex flex-row gap-4 justify-center">
                            Execute
                            <ArrowRight />
                        </Button>
                        <div className="flex flex-col gap-1">
                            <label>Modelo</label>
                            <Select disabled placeholder="GPT 3.5 turbo 16k" />
                            <p className="text-skin-muted text-sm italic">You will be able to customize this option soon.</p>
                        </div>
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
                        <Select 
                            onValueChange={handleSelectChange}
                            placeholder="Select the base prompt..."
                        >
                            <SelectGroup>
                                <SelectLabel>Prompts</SelectLabel>
                                {prompts?.map((prompt, index) => {
                                    return(<SelectItem key={index} label={prompt.title} value={prompt.id} />)
                                })}
                            </SelectGroup>
                        </Select>
                        <p className="text-sm text-skin-muted italic">Prompts are key in AI, guiding behavior and ensuring ethics. Understanding their importance is essential for AI's potential.</p>
                    </form>
                </div>
                <div className="flex-1 w-full">
                    <textarea 
                        placeholder="Include the prompt for the AI..."
                        className="bg-skin-bg-secundary w-full h-full p-4 resize-none border border-skin-bg-muted rounded-sm"
                        value={template}
                        onChange={(event) => setTemplate(event.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1 h-full">
                <div>
                    {completion ? 
                        <div className="flex flex-row justify-between items-center px-4 py-2 border border-skin-bg-muted border-b-0 bg-zinc-700 rounded-t-md">
                        <div className="flex flex-row gap-2 items-center">
                            <CopyToClipboard text={completion}>
                                {React.createElement(clipboardIcon, { onClick: (handleClipBoardClick), className: 'w-5 h-5 text-skin-muted  hover:text-skin-base cursor pointer' })}
                            </CopyToClipboard>
                            <p className={`text-sm text-skin-muted ${clipboardIcon === Check ? 'block' : 'invisible'}`} >Copied</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <ThumbsUp className="w-5 h-5 text-skin-muted  hover:text-skin-base cursor pointer" />
                            <ThumbsDown className="w-5 h-5 text-skin-muted  hover:text-skin-base cursor pointer" />
                        </div>
                        </div>
                    : null
                    }
                </div>
                <textarea 
                    placeholder="Include the prompt for the AI..."
                    className={`bg-skin-bg-secundary w-full h-full p-4 resize-none border border-t-0 border-skin-bg-muted ${completion ? null : 'border-t'}`}
                    value={completion}
                    readOnly
                />
            </div>
        </div>
    </div>
  )
}
