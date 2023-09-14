import { Github } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { SliderProps } from "@radix-ui/react-slider";
import React from "react";
import { VideoConversorForm } from "./components/video-consversor-form";

interface TemperatureSliderProps {
  defaultValue: SliderProps["defaultValue"]
}

export function App( { defaultValue }: TemperatureSliderProps ) {
  const [ sliderValue, setSliderValue ] = React.useState(defaultValue)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row justify-between items-center px-6 py-4 border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex flex-row items-center gap-4">
          <p className="text-sm text-muted-foreground">Desenvolvido com 💜 no NLW da Rocketseat</p>
          <Separator orientation="vertical" className="h-8" />
          <Button variant={"outline"} className="gap-2">
            <Github className="h-4 w-4" />
            Github
          </Button>
        </div>
      </div>
      <main className="flex flex-row flex-1 p-4 gap-4">
        <div className="grid grid-rows-2 gap-4 flex-1">
          <Textarea className="resize-none leading-relaxed" placeholder="Inclua o prompt para a IA..." />
          <Textarea className="resize-none leading-relaxed" placeholder="Resultado gerado pela IA..." readOnly />
          <p className="text-muted-foreground text-sm">
            Lembre-se que voçê pode ultilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do video selecionado
          </p>
        </div>
        <aside className="w-80 space-y-6">
          <VideoConversorForm />
          <Separator />
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
                  <SelectItem value="descricao" disabled >Criar Novo (em breve)</SelectItem>
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
        </aside>
      </main>
    </div>
  )
}
