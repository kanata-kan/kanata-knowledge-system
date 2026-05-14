export type EntryType =
  | 'snippet'
  | 'command'
  | 'note'
  | 'pattern'
  | 'prompt'
  | 'workflow'
  | 'reference'
  | 'debug'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type Category =
  | 'nextjs'
  | 'mongodb'
  | 'express'
  | 'typescript'
  | 'architecture'
  | 'debugging'
  | 'snippets'
  | 'cli'
  | 'ai'
  | 'workflows'
  | 'deployment'
  | 'performance'
  | 'security'

export type EntryMeta = {
  title: string
  slug: string
  category: Category
  type: EntryType
  difficulty: Difficulty
  tags: string[]
  summary: string
  createdAt: string
  updatedAt: string
  pinned?: boolean
  technologies?: string[]
  relatedSlugs?: string[]
}

export type Entry = EntryMeta & {
  content: string
}

export type CategoryInfo = {
  slug: Category
  label: string
  description: string
  icon: string
}
