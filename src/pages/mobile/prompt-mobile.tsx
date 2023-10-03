// import { useContext } from "react";

import Navbar from "@/components/navbar";
import { TextSelect } from 'lucide-react'
import { ThemeContext } from "@/context/theme-context";
import { VideoContext } from "@/context/video-context";
import { useContext, useEffect, useState } from "react";
import { NewSelect } from "@/components/ui/select";
import { SelectLabel, SelectGroup, SelectItem } from "@/components/ui/select";
import { api } from "@/lib/axios";

interface PromptProps {
  id: string
  title: string
  template: string
}

export default function Prompt() {
  const [ prompts, setPrompts ] = useState<PromptProps[] | null>(null)
  const [ template, setTemplate ] = useState<string>('')

  const { theme } = useContext(ThemeContext)
  const { video } = useContext(VideoContext)

  function handleSelectChange(promptId: string) {
    const promptSelected = prompts?.find(prompt => prompt.id === promptId)

    if(!promptSelected) { 
        return
    }

    setTemplate(promptSelected.template)
}

  useEffect(() => {
    api.get('/prompts').then(res => {
      setPrompts(res.data)
    })
  }, [])

  return (
    <div className={`bg-skin-fill flex flex-col h-screen ${theme ? 'theme-white' : null}`}>
        <Navbar />
        <div className="pt-16 px-7 flex flex-col gap-7"> 
          <div className="flex flex-row items-center bg-skin-bg-secundary h-10 rounded-md py-2 gap-2">
            <TextSelect className="text-skin-base" />
            <p className="text-skin-base">{video?.transcription.substring(0,59)} ...</p>
          </div>
          <form className="flex flex-col gap-5">
            <div className="flex flex-row gap-5">
                <NewSelect 
                onValueChange={handleSelectChange}
                placeholder="Select the base prompt...">
                  <SelectGroup>
                    <SelectLabel>Prompts</SelectLabel>
                    {prompts?.map((prompt, index) => {
                      return(<SelectItem key={index} label={prompt.title} value={prompt.id} />)
                    })}
                  </SelectGroup>
                </NewSelect>
                <NewSelect disabled placeholder="GPT 3.5 turbo 16k" />
            </div>   
            <textarea 
              id="prompt" 
              className="w-full bg-skin-bg-secundary h-80 resize-none p-4 text-skin-base border border-skin-bg-muted rounded-sm" 
              placeholder="Include the prompt for the AI..."
              value={template}
              onChange={(event) => setTemplate(event.target.value)}
            />
            <div>

            </div>
          </form>
        </div>
    </div>
  )
}
