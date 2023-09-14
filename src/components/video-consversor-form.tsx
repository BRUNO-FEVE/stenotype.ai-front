import { FileVideo, Upload } from "lucide-react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Textarea } from "./ui/textarea"
import { ChangeEvent, useMemo, useState } from "react"

export function VideoConversorForm() {
  const [ video, setVideo ] = useState<File | null>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }
    const videoFile =  files[0]

    setVideo(videoFile)
  }

  const previewURL  = useMemo(() => {
    if (!video) {
      return null
    }

    return URL.createObjectURL(video)
  }, [video])

  return (
    <form className="space-y-3">
      <label htmlFor="video" className="aspect-video flex border border-dashed text-sm text-muted-foreground flex-col justify-center items-center hover:bg-primary/5 cursor-pointer">
        {video ? 
          <>
            <video src={previewURL ? previewURL : ''} />
          </>
        : 
          <>
            <FileVideo className="w-4 h-4"/>
            Selecione um video
          </>
        }
      </label>
      <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />
      <Separator />
      <div className=" space-y-1">
        <Label className="text-sm" htmlFor="transcription_prompt">Prompt de transcrição</Label>
        <Textarea id="transcription_prompt" className="resize-none h-14" placeholder="Inclua palavras-chave mencionadas no video separadas por virgula (,)" />
      </div>
      <Button className="w-full gap-4">
          Carregar vídeo
          <Upload className="h-4 w-4" />
      </Button>
    </form>
  )
}
