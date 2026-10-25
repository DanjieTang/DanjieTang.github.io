import type { ReactNode } from 'react'

type SectionProps = { id: string; title: string; children: ReactNode }

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="section container" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="section__title">
        {title}
      </h2>
      {children}
    </section>
  )
}
