import { site } from '../content'
import { ProfileLinks } from './Links'

// __BUILD_DATE__ is injected by vite.config.ts as YYYY-MM-DD.
const updated = new Date(`${__BUILD_DATE__}T00:00:00`)

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <ProfileLinks>
          <li>
            <a href={`mailto:${site.email}`}>Email</a>
          </li>
        </ProfileLinks>
        <p className="site-footer__meta">
          Last updated:{' '}
          {updated.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · ©{' '}
          {updated.getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  )
}
