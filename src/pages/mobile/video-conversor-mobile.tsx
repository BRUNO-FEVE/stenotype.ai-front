import DefaultPageLayout from '@/components/layout/default-page-layout'
import BackgroundBlur from '@/components/ui/background-blur'
import NewPageButton from '@/components/ui/button'
import TextArea from '@/components/ui/text-area'
import { ThemeContext } from '@/context/theme-context'
import { VideoContext } from '@/context/video-context'
import { api } from '@/lib/axios'
import { getFfmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { CheckCircle, FileVideo, Upload } from 'lucide-react'
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

const ButtonStatesProps = {
  converting: 'Converting...',
  transcripting: 'Transcribing...',
  completed: 'Success',
}

interface ButtonStateProps {
  converting: string
  transcripting: string
  completed: string
}

export default function VideoConversorMobile() {
  const promptRef = useRef<HTMLTextAreaElement>(null)
  const [videofile, setVideoFile] = useState<File | null>(null)
  const [button, setButton] = useState<keyof ButtonStateProps | null>(null)

  const { theme } = useContext(ThemeContext)
  const { setVideo, setPrompt } = useContext(VideoContext)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }
    const videoFile = files[0]

    setVideoFile(videoFile)
  }

  const previewURL = useMemo(() => {
    if (!videofile) {
      return null
    }

    return URL.createObjectURL(videofile)
  }, [videofile])

  async function convertAudioToVideo(video: File) {
    console.log('Convert Started.')

    const ffmpeg = await getFfmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    ffmpeg.on('progress', (progress) => {
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
      'output.mp3',
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg',
    })

    console.log('Convert finished.')

    return audioFile
  }

  async function handleSubimit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptRef.current?.value

    if (prompt) {
      setPrompt(prompt)
    }

    if (!videofile) {
      return
    }

    setButton('converting')

    const audioFile = await convertAudioToVideo(videofile)

    const data = new FormData()

    data.append('file', audioFile)

    setButton('transcripting')

    const response = await api.post(`/videos/${prompt}`, data)
    console.log(response)
    const video = {
      id: response.data.video.id,
      name: response.data.video.name,
      path: response.data.video.path,
      transcription: response.data.video.transcription,
      createAt: response.data.video.createAt,
    }

    setButton('completed')

    console.log('finalizou')

    setVideo(video)
  }

  return (
    <DefaultPageLayout>
      <form
        onSubmit={handleSubimit}
        className=" flex flex-col px-7 flex-1 justify-center gap-6"
      >
        <label
          htmlFor="video"
          className={`${
            videofile ? null : 'aspect-video'
          } cursor-pointer text-skin-base flex flex-col items-center justify-center gap-3 rounded-md ${
            videofile
              ? null
              : `bg-skin-bg-secundary border border-dashed border-skin-bg-muted ${
                  theme ? 'hover:bg-black/10' : 'hover:bg-white/10'
                }`
          } `}
        >
          {previewURL ? (
            <>
              <div className="relative z-10">
                <video
                  loop
                  controls={false}
                  poster={previewURL}
                  className={`pointer-events-none max-h-64`}
                />
              </div>
            </>
          ) : (
            <>
              <FileVideo
                className="w-6 h-6"
                onChange={() => {
                  console.log('teste')
                }}
              />
              Upload a video
            </>
          )}
          {button === 'transcripting' || button === 'converting' ? (
            <>
              <BackgroundBlur
                color="red"
                className="top-10 left-3 animate-pulse"
              />
              <BackgroundBlur
                color="violet"
                className="bottom-56 right-3 animate-pulse"
              />
            </>
          ) : null}
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
          <label htmlFor="transcription_prompt" className="text-skin-base z-10">
            KeyWords :
          </label>
          <TextArea
            inputRef={promptRef}
            id="transcription_prompt"
            placeholder="Include keywords mentioned in the video, separated by commas (,)."
            disabled={!!button}
          />
        </div>
        <button
          data-success={button === 'completed'}
          type="submit"
          className="z-10 bg-skin-button-accent hover:bg-skin-button-accent-hover text-white py-3 rounded-sm data-[success=true]:bg-emerald-500 flex flex-row items-center justify-center gap-3"
        >
          {button ? (
            <>
              {ButtonStatesProps[button]}
              {button === 'completed' ? (
                <CheckCircle className="h-4 w-4" />
              ) : null}
            </>
          ) : (
            <>
              Upload
              <Upload className="h-4 w-4" />
            </>
          )}
        </button>
        {button === 'completed' ? (
          <>
            <p className="text-md text-skin-muted italic">
              {' '}
              Stage completed, now move on to the next stage and review the
              transcription of your video.
            </p>
            <NewPageButton variant="fixed" to="/transcription" />
          </>
        ) : null}
      </form>
    </DefaultPageLayout>
  )
}
