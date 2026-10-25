/**
 * Content that hasn't been filled in yet. In dev builds a todo renders as an
 * "OWNER: ..." chip so it's easy to spot; production builds leave it out.
 */
export type Todo = { readonly todo: string }
export type OrTodo<T> = T | Todo

export const todo = (note: string): Todo => ({ todo: note })

export const isTodo = (value: unknown): value is Todo =>
  typeof value === 'object' && value !== null && 'todo' in value

/** Set to `true` to preview the placeholders in a production build. */
export const SHOW_TODOS = import.meta.env.DEV

/** Whether a value should take up any space on the page. */
export const isShown = (value: unknown) => !isTodo(value) || SHOW_TODOS
