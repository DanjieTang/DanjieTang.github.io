import type { ReactNode } from 'react'
import { isTodo, SHOW_TODOS, type OrTodo } from '../lib/todo'

export function OwnerNote({ children }: { children: string }) {
  return <code className="owner-note">OWNER: {children}</code>
}

type FilledProps<T> = {
  value: OrTodo<T>
  children: (value: T) => ReactNode
}

/** Renders `children(value)` once the value is filled in, else an OWNER chip. */
export function Filled<T>({ value, children }: FilledProps<T>) {
  if (!isTodo(value)) return children(value)
  return SHOW_TODOS ? <OwnerNote>{value.todo}</OwnerNote> : null
}
