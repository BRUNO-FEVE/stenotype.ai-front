import { FileVideo, Upload } from "lucide-react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Textarea } from "./ui/textarea"
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react"
import { getFfmpeg } from "@/lib/ffmpeg"
import { fetchFile } from '@ffmpeg/util'
import { api } from "@/lib/axios"

// interface ButtonStatesProps {
//   wating: 'wating',
//   transcripting: 'transcripting',
//   finished: 'finished'
// }

export function VideoConversorForm() {
  const [ video, setVideo ] = useState<File | null>(null)
  const promptRef = useRef<HTMLTextAreaElement>(null)


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

  async function convertAudioToVideo (video: File) {
    console.log('Convert Started.')

    const ffmpeg = await getFfmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    ffmpeg.on('progress', progress => {
      console.log('Convert progress: ' + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3'
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', { type: 'audio/mpeg' })

    console.log('Convert finished.')

    return audioFile
  }

  async function handleSubimit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt= promptRef.current?.value

    if (!video) {
      return
    }

    const audioFile = await convertAudioToVideo(video)

    const data = new FormData()

    data.append('file', audioFile)

    const response = await api.post('/videos', data)
    const videoId = response.data.video.id

    await api.post(`/videos/${videoId}/transcription`, {
      prompt: prompt
    })

    console.log('finalizou')
  }

  return (
    <form onSubmit={handleSubimit} className="space-y-3">
      <label htmlFor="video" className="aspect-video flex border border-dashed text-sm text-muted-foreground flex-col justify-center items-center hover:bg-primary/5 cursor-pointer">
        {previewURL ? 
          <>
            <video src={previewURL} controls={false} className="pointer-events-none"/>
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
        <Textarea 
          ref={promptRef}
          id="transcription_prompt" 
          className="resize-none h-14" 
          placeholder="Inclua palavras-chave mencionadas no video separadas por virgula (,)" 
        />
      </div>
      <Button type="submit" className="w-full gap-4">
          Carregar vídeo
          <Upload className="h-4 w-4" />
      </Button>
    </form>
  )
}
