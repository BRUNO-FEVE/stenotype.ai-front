import { ReactNode } from 'react'

export class ContentUnit {
  public title: string
  public component: ReactNode
  // eslint-disable-next-line no-use-before-define
  public next: ContentUnit | null

  constructor(
    title: string,
    component: ReactNode,
    next: ContentUnit | null = null,
  ) {
    this.title = title
    this.component = component
    this.next = next
  }
}

export class ContentList {
  public head: ContentUnit | null

  constructor() {
    this.head = null
  }

  addNewUnit(newContent: ContentUnit): void {
    if (!this.head) {
      this.head = newContent
    } else {
      let lastContent = this.head
      if (lastContent) {
        while (lastContent.next) {
          lastContent = lastContent.next
        }
      }
      lastContent.next = newContent
    }
  }

  listChilds(): ContentUnit[] {
    const finalList: ContentUnit[] = []
    if (this.head) {
      let nextContent = this.head.next
      while (nextContent) {
        finalList.push(nextContent)
        nextContent = nextContent.next
      }
      return finalList
    }
    return []
  }
}
