import Text from '../components/ui/text'

export default function FileTypeGrid() {
  return (
    <div className="w-full max-w-xs h-fit grid grid-row-2 text-center">
      <div className="flex border border-skin-bg-muted flex-row justify-evenly">
        <Text
          variant="paragraph"
          className="w-full border-r border-skin-bg-muted p-2"
        >
          File Type
        </Text>
        <Text variant="paragraph" className="w-full p-2">
          Supported
        </Text>
      </div>
      <div className="flex border border-skin-bg-muted flex-row justify-evenly">
        <Text
          variant="paragraph"
          className="w-full border-r border-skin-bg-muted p-2"
        >
          mp4
        </Text>
        <Text variant="paragraph" className="w-full p-2">
          ✅
        </Text>
      </div>
      <div className="flex border border-skin-bg-muted flex-row justify-evenly">
        <Text
          variant="paragraph"
          className="w-full border-r border-skin-bg-muted p-2"
        >
          mp3
        </Text>
        <Text variant="paragraph" className="w-full p-2">
          ❌
        </Text>
      </div>
    </div>
  )
}
