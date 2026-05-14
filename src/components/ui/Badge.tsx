import { cn } from '@/lib/utils'
import type { EntryType, Difficulty } from '@/types/content'

const typeColors: Record<EntryType, string> = {
  snippet: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  command: 'bg-green-500/10 text-green-400 border-green-500/20',
  note: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  pattern: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  prompt: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  workflow: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  reference: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  debug: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
  intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
}

type BadgeProps = {
  variant?: 'type' | 'difficulty' | 'tag'
  value: string
  className?: string
}

export function Badge({ variant = 'tag', value, className }: BadgeProps) {
  const colorClass =
    variant === 'type'
      ? typeColors[value as EntryType] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      : variant === 'difficulty'
        ? difficultyColors[value as Difficulty] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        : 'bg-foreground/5 text-muted border-border'

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border',
        colorClass,
        className
      )}
    >
      {value}
    </span>
  )
}
