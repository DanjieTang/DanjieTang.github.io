import { publications, site } from '../content'
import { isShown } from '../lib/todo'
import { AuthorList } from './AuthorList'
import { LinkPills, TextLink } from './Links'
import { Filled } from './Todo'

export function Publications() {
  return (
    <>
      <ol className="publications">
        {publications.map((pub) => (
          <li key={pub.title} className="publication">
            <p>
              {isShown(pub.authors) && (
                <>
                  <Filled value={pub.authors}>{(names) => <AuthorList names={names} />}</Filled>.{' '}
                </>
              )}
              “{pub.title}.” <em>{pub.venue}.</em>
            </p>
            <PublicationMeta role={pub.role} citations={pub.citations} />
            {pub.summary && <p className="publication__summary">{pub.summary}</p>}
            <LinkPills links={pub.links} />
          </li>
        ))}
      </ol>
      {isShown(site.scholar.href) && (
        <p className="publications__more">
          <TextLink link={{ ...site.scholar, label: 'All publications on Google Scholar' }} />
        </p>
      )}
    </>
  )
}

function PublicationMeta({ role, citations }: { role?: string; citations?: number }) {
  const parts = [role, citations !== undefined && `${citations} citations`].filter(Boolean)
  if (parts.length === 0) return null
  return <p className="publication__meta">{parts.join(' · ')}</p>
}
