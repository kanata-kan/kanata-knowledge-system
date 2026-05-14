import { CopyButton } from './CopyButton'

type TerminalBlockProps = {
  children: string
  label?: string
}

export function TerminalBlock({ children, label }: TerminalBlockProps) {
  const lines = children.trim().split('\n')

  return (
    <div className="relative my-4 rounded-lg overflow-hidden border border-border">
      {label && (
        <div className="flex items-center px-4 py-2 bg-card border-b border-border">
          <span className="text-xs text-muted">{label}</span>
        </div>
      )}
      <div className="relative bg-[#0d1117] p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {line.startsWith('#') ? (
                <span className="text-gray-500">{line}</span>
              ) : (
                <>
                  <span className="text-green-400 select-none mr-2">$</span>
                  <span className="text-foreground">{line}</span>
                </>
              )}
            </div>
          ))}
        </pre>
        <CopyButton code={lines.filter(l => !l.startsWith('#')).join('\n')} />
      </div>
    </div>
  )
}
