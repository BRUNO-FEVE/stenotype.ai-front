import { SliderProps } from '@radix-ui/react-slider'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { useState } from 'react'


interface TemperatureSliderProps {
    defaultValue: SliderProps["defaultValue"]
}

export default function VideoAiForm( { defaultValue }: TemperatureSliderProps ) {
    const [ sliderValue, setSliderValue ] = useState(defaultValue)

    return (
        <form className="space-y-6">
            <div className="space-y-1">
            <Label htmlFor="" className="text-sm">Prompt</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder='Selecione um prompt...' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="titulo">Titulo Youtube</SelectItem>
                        <SelectItem value="descricao">Descrição Youtube</SelectItem>
                        <SelectItem value="new" disabled >Criar Novo (em breve)</SelectItem>
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
