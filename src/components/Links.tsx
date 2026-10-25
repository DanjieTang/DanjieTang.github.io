import type { ReactNode } from 'react'
import { site, type Link } from '../content'
import { resolveHref } from '../lib/href'
import { isShown } from '../lib/todo'
import { Filled } from './Todo'

export function TextLink({ link, className }: { link: Link; className?: string }) {
  return (
    <Filled value={link.href}>
      {(href) => (
        <a className={className} href={resolveHref(href)}>
          {link.label}
        </a>
      )}
    </Filled>
  )
}

export function LinkPills({ links }: { links: Link[] }) {
  const shown = links.filter((link) => isShown(link.href))
  if (shown.length === 0) return null

  return (
    <ul className="pills">
      {shown.map((link) => (
        <li key={link.label}>
          <TextLink link={link} className="pill" />
        </li>
      ))}
    </ul>
  )
}

/** GitHub / LinkedIn / Scholar, plus anything passed as children. */
export function ProfileLinks({ children }: { children?: ReactNode }) {
  return (
    <ul className="link-row">
      {site.profiles
        .filter((link) => isShown(link.href))
        .map((link) => (
          <li key={link.label}>
            <TextLink link={link} />
          </li>
        ))}
      {children}
    </ul>
  )
}
