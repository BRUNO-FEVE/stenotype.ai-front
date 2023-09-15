import { SliderProps } from '@radix-ui/react-slider'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'


interface TemperatureSliderProps {
    defaultValue: SliderProps["defaultValue"]
    onValueChange: (template: string) => void
}

interface PromptProps {
    id: string
    title: string
    template: string
}

export default function VideoAiForm( { defaultValue, onValueChange }: TemperatureSliderProps ) {
    const [ sliderValue, setSliderValue ] = useState(defaultValue)
    const [ prompts, setPrompts] = useState<PromptProps[] | null >(null)

    function handleSelectChange(promptId: string) {
        const promptSelected = prompts?.find(prompt => prompt.id === promptId)

        if(!promptSelected) { 
            return
        }

        onValueChange(promptSelected.template)
    }

    useEffect(() => {
        api.get('/prompts').then(response => 
            setPrompts(response.data)
        )
    }, [])

    return (
        <form className="space-y-6">
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
                <span className=" text-sm text-muted-foreground">{sliderValue}</span>
            </div>
            <div className="space-y-3"> 
              <Slider 
                id="temperature"
                max={1}
                onValueChange={setSliderValue}
                defaultValue={[0.5]}
                step={0.1}
              />
              <p className="text-xs text-muted-foreground italic">
                Valores mais altos tendem a deixar o resultado mais criativo e com possiveis erros
              </p>
            </div>
            <Button className="w-full">
              Executar
            </Button>
          </form>
  )
}
