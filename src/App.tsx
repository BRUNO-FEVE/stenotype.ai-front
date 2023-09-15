import { Github } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { VideoConversorForm } from "./components/video-consversor-form";
import VideoAiForm from "./components/video-ai-form";

export function App() {
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
        <aside className="w-80 space-y-2">
          <VideoConversorForm />
          <Separator />
          <VideoAiForm defaultValue={[0.5]} />
        </aside>
      </main>
    </div>
  )
}
