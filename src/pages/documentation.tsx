import DefaultPageLayout from '@/components/layout/default-page-layout'
import * as Collapsible from '@/components/ui/collapsible'
import { useState } from 'react'
import { documentationContentList } from '@/data/documentation-data'
import { ContentUnit } from '@/lib/documentation-list'
import Separator from '@/components/ui/separator'

const GET_STARTED_STEPS = documentationContentList.listChilds()

export default function Documentation() {
  const [pageContent, setPageContent] = useState<ContentUnit | null>(
    documentationContentList.head,
  )

  function changePageContent(newPageContent: ContentUnit): void {
    setPageContent(newPageContent)
  }

  const handlePageContent = (comand: string): void => {
    switch (comand) {
      case 'next':
        setPageContent((prev) => {
          if (prev?.next) {
            return prev.next
          }
          return documentationContentList.head
        })
        break
      case '':
        break

      default:
        break
    }
  }

  return (
    <DefaultPageLayout className="flex-row justify-center md:justify-end lg:justify-center scrollbar-hide">
      <div className="w-1/5 h-fit hidden md:block fixed left-0 top-24 pl-6 text-skin-muted">
        <Collapsible.Root>
          <Collapsible.Trigger>
            <button
              onClick={() => {
                if (documentationContentList.head) {
                  changePageContent(documentationContentList.head)
                }
              }}
            >
              {documentationContentList.head?.title}
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            {GET_STARTED_STEPS.map((pageContent, index) => {
              return (
                <button
                  className="pl-2 text-sm hover:text-skin-base duration-100 ease-in"
                  key={index}
                  onClick={() => {
                    changePageContent(pageContent)
                  }}
                >
                  {pageContent.title}
                </button>
              )
            })}
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
      <div className="p-6 h-fit w-full md:w-4/5 lg:w-3/5 flex flex-col items-center gap-10">
        {pageContent?.component}
        <Separator orientation="horizontal" className="w-full" />
        <button
          onClick={() => {
            handlePageContent('next')
          }}
          className="px-20 py-2 ml-auto text-white bg-skin-button-accent hover:bg-skin-button-accent-hover rounded-md"
        >
          {pageContent === documentationContentList.head
            ? "Let's Start"
            : 'Next Step'}
        </button>
      </div>
    </DefaultPageLayout>
  )
}
