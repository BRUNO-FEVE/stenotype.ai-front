import DefaultPageLayout from '@/components/default-page-layout'
import GetStarted from '@/components/get-started'
import { useState, ReactNode } from 'react'

export default function Documentation() {
  const [pageContent, setPageContent] = useState<ReactNode>(<GetStarted />)

  return (
    <DefaultPageLayout className="flex-row justify-center">
      <div className="w-1/5 h-fit fixed left-0 top-24 pl-3"></div>
      <div className="p-6 bg-gray-600 h-fit w-3/5">{pageContent}</div>
    </DefaultPageLayout>
  )
}
