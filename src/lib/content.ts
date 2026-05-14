import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'src/content')

export function getContentBySlug(category: string, slug: string) {
  const fullPath = path.join(contentDirectory, category, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    meta: data,
    content,
  }
}

export function getAllContent(category: string) {
  const categoryPath = path.join(contentDirectory, category)
  
  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const fileNames = fs.readdirSync(categoryPath)
  const allContent = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(categoryPath, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      meta: data,
    }
  })

  return allContent
}

export function getAllCategories() {
  const categories = ['nextjs', 'mongodb', 'express', 'architecture', 'snippets']
  return categories.filter(cat => {
    const categoryPath = path.join(contentDirectory, cat)
    return fs.existsSync(categoryPath)
  })
}
