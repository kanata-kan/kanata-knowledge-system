import { codeToHtml } from 'shiki'
import { CopyButton } from './CopyButton'

type CodeBlockProps = {
  children: string
  language: string
  filename?: string
}

export async function CodeBlock({ children, language, filename }: CodeBlockProps) {
  const html = await codeToHtml(children.trim(), {
    lang: language,
    theme: 'github-dark',
  })

  return (
    <div dir="ltr" className="relative group my-4 overflow-hidden rounded-lg border border-border">
      {filename && (
        <div className="flex items-center px-4 py-2 bg-card border-b border-border">
          <span className="text-xs text-muted font-mono">{filename}</span>
        </div>
      )}
      <div className="relative">
        <div
          className="overflow-x-auto text-sm [&_pre]:p-4 [&_pre]:m-0 [&_pre]:bg-[#0d1117] [&_code]:text-sm [&_code]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <CopyButton code={children.trim()} />
      </div>
    </div>
  )
}
