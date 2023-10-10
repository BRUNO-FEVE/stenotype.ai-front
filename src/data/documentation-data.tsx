import { ContentUnit, ContentList } from '@/lib/documentation-list'
import GetStarted from '@/components/get-started'
import StepOneDocumentation from '@/components/step-one-documentation'

const documentationContentList = new ContentList()

const GET_STARTED = new ContentUnit('Get Started', <GetStarted />)
const STEP_ONE = new ContentUnit(
  'Step 1 - Converting the Video',
  <StepOneDocumentation />,
)
// const GET_STARTED = new ContentUnit('Get Started', <GetStarted />)

documentationContentList.addNewUnit(GET_STARTED)
documentationContentList.addNewUnit(STEP_ONE)

export { documentationContentList }
