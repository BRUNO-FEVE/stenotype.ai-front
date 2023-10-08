import DefaultPageLayout from '@/components/layout/default-page-layout'
import GetStarted from '@/components/get-started'
// import { useState, ReactNode } from 'react'

export default function Documentation() {
  // const [pageContent, setPageContent] = useState<ReactNode>(<GetStarted />)

  return (
    <DefaultPageLayout className="flex-row justify-center scrollbar-hide">
      <div className="w-1/5 h-fit fixed left-0 top-24 pl-3"></div>
      <div className="p-6 h-fit w-full md:w-3/5">{<GetStarted />}</div>
    </DefaultPageLayout>
  )
}
