import Navbar from "@/components/navbar"
import { ThemeContext } from "@/context/theme-context"
import { VideoContext } from "@/context/video-context"
import { api } from "@/lib/axios"
import { getFfmpeg } from "@/lib/ffmpeg"
import { fetchFile } from "@ffmpeg/util"
import { CheckCircle, FileVideo, Upload, ArrowRightIcon } from "lucide-react"
import { ChangeEvent, FormEvent, useContext, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"

const ButtonStatesProps = {
  converting: 'Convertendo...',
  transcripting: 'Transcrevendo...',
  completed: 'Sucesso'
}

interface ButtonStateProps {
  converting: string
  transcripting: string
  completed: string
}

export default function VideoConversorMobile() {
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const [ video, setVideo ] = useState<File | null>(null)
  const [ button, setButton ] = useState<keyof ButtonStateProps | null>('completed')

  const { theme } = useContext(ThemeContext)
  const { setVideoId } = useContext(VideoContext)
  

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

    setButton('converting')

    const audioFile = await convertAudioToVideo(video)

    const data = new FormData()

    data.append('file', audioFile)

    setButton('transcripting')

    const response = await api.post(`/videos/${prompt}`, data)
    const videoId = response.data.video.id

    setButton('completed')

    console.log('finalizou')

    setVideoId(videoId)
  }

  return (
    <div className={`bg-skin-fill flex flex-col h-screen ${theme ? 'theme-white' : null}`}>
      <Navbar />
      <form onSubmit={handleSubimit} className=" flex flex-col px-20 flex-1 justify-center gap-6">
        <label htmlFor="video" className={`aspect-video cursor-pointer text-skin-base flex flex-col items-center justify-center gap-3 rounded-md ${video ? null : `bg-skin-bg-secundary border border-dashed border-skin-bg-muted ${theme ? 'hover:bg-black/10' : 'hover:bg-white/10'}`} `}>
          {previewURL ? 
            <>
              <div className="relative"> 
                <video src={previewURL} controls={false} className={`pointer-events-none max-h-60 ${button === "converting" || button === "transcripting" ? null : null}`} />
                {/* {button === "converting" || button === "transcripting" ? <Loader2Icon className="w-8 h-8 text-skin-base absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" /> : null} */}
              </div>
            </>
            : 
            <>
              <FileVideo className="w-6 h-6" onChange={() => {console.log('teste')}}/>
              Selecione um video
            </>
          }
        </label>
        <input 
        type="file" 
        id="video" 
        accept="video/mp4" 
        className="sr-only" 
        onChange={(event) => {
        handleFileSelected(event)
        setButton(null)
        }}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="transcription_prompt" className="text-skin-base">Prompt de transcrição :</label>
          <textarea 
            ref={promptRef}
            id="transcription_prompt"
            placeholder="Inclua palavras-chave mencionadas no video separadas por virgula (,)"
            className="bg-skin-bg-secundary resize-none h-20 border border-skin-bg-muted rounded-md placeholder:p-2 text-skin-base p-2"
            disabled={button ? true : false}
          />
        </div>
        <button
          data-success={button === 'completed'}
          type="submit"
          className=" bg-skin-button-accent hover:bg-skin-button-accent-hover text-white py-3 rounded-sm data-[success=true]:bg-emerald-500 flex flex-row items-center justify-center gap-3"
        >
          {button ? 
            <>
              {ButtonStatesProps[button]}
              {button === 'completed' ? <CheckCircle className="h-4 w-4" /> : null} 
            </>
            : 
            <>
              Carregar Video
              <Upload className="h-4 w-4"/>
            </>
          }
        </button>
        {button === 'completed' ? 
          <>
            <p className="text-md text-skin-base italic">Etapa concluida, agora vá para a proxima etapa e veja a transcrição do seu video.</p> 
            <Link to={"transcription"}>
              <button className="bg-skin-bg-base-foreground h-14 w-14 rounded-full fixed right-5 bottom-5 flex justify-center items-center">
                <ArrowRightIcon className="text-skin-inverted w-8 h-8" />
              </button>
            </Link>
          </>
        : 
          null
      }
      </form>
    </div>
  )
}
