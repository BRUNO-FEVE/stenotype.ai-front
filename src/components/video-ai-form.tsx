import { Button } from './ui/button'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { useCompletion } from 'ai/react'


interface TemperatureSliderProps {
    onValueChange: (template: string) => void
    onResponse: (completion: string) => void
    videoId: string | null
    promptInput: string | null
}

interface PromptProps {
    id: string
    title: string
    template: string
}

export default function VideoAiForm( { onValueChange, onResponse, videoId, promptInput }: TemperatureSliderProps ) {
    const [ temperature, setTemperature ] = useState(0.5)
    const [ prompts, setPrompts] = useState<PromptProps[] | null >(null)

    function handleSelectChange(promptId: string) {
        const promptSelected = prompts?.find(prompt => prompt.id === promptId)

        if(!promptSelected) { 
            return
        }

        onValueChange(promptSelected.template)
    }

    const { setInput, handleSubmit, isLoading, completion } = useCompletion({
        api: 'https://upload-ai-back.vercel.app/ai/complete',
        // api: 'http://localhost:3333/ai/complete',
        body: {
            videoId,
            temperature,
        },
        headers: {
            "Content-type": "application/json",
        }
    })

    useEffect(() => {
        api.get('/prompts').then(response => 
            setPrompts(response.data)
        )
    }, [])

    useEffect(() => {
        if (promptInput) { 
            setInput(promptInput)
        }
        onResponse(completion)
    }, [promptInput, completion])

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
            <Label htmlFor="" className="text-sm">Prompt</Label>
                <Select onValueChange={handleSelectChange}>
                    <SelectTrigger>
                        <SelectValue placeholder='Selecione um prompt...' />
                    </SelectTrigger>
                    <SelectContent>
                        { prompts ? 
                            prompts.map((prompt, index) => {
                                return (
                                    <SelectItem key={index} value={prompt.id}>{prompt.title}</SelectItem>  
                                )
                            })
                        : 
                        null
                        }
                        {}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="" className="text-sm">Modelo</Label>
              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground italic">Voçê podera customizar essa opção em breve.</p>
            </div>
            <div className="flex flex-row justify-between items-center">
                <Label htmlFor="temperature">Temperatura</Label>
                <span className=" text-sm text-muted-foreground">{temperature}</span>
            </div>
            <div className="space-y-3"> 
              <Slider 
                id="temperature"
                max={1}
                onValueChange={event => setTemperature(event[0])}
                defaultValue={[temperature]}
                step={0.1}
              />
              <p className="text-xs text-muted-foreground italic">
                Valores mais altos tendem a deixar o resultado mais criativo e com possiveis erros
              </p>
            </div>
            <Button className="w-full" disabled={videoId || isLoading == true ? false : true}>
              {isLoading ? "Carregando..." : "Executar"}
            </Button>
          </form>
  )
}
