import { Fragment } from 'react'
import { site } from '../content'

export function AuthorList({ names }: { names: string[] }) {
  return (
    <>
      {names.map((name, i) => (
        <Fragment key={name}>
          {i > 0 && ', '}
          {site.authorAliases.includes(name) ? <strong>{name}</strong> : name}
        </Fragment>
      ))}
    </>
  )
}
