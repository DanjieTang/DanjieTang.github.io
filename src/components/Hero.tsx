import { experience, site, type Role } from '../content'
import { resolveHref } from '../lib/href'
import { isShown } from '../lib/todo'
import { ProfileLinks, TextLink } from './Links'

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-name">
      <div className="hero__intro">
        <img
          className="hero__photo"
          src={resolveHref(site.photo.src)}
          alt={site.photo.alt}
          width={136}
          height={136}
        />
        <div>
          <h1 id="hero-name" className="hero__name">
            {site.name}
          </h1>
          <p className="hero__bio">{site.bio}</p>
          <ProfileLinks />
          <p className="hero__email">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          {isShown(site.cv.href) && (
            <p className="hero__cv">
              <TextLink link={site.cv} />
            </p>
          )}
        </div>
      </div>
      <Experience roles={experience} />
    </section>
  )
}

function Experience({ roles }: { roles: Role[] }) {
  return (
    <aside className="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="label">
        Experience
      </h2>
      <ul className="roles">
        {roles.map((role) => (
          <li key={`${role.title}@${role.org}`} className="role">
            <span className="role__title">{role.title}</span>
            <span className="role__dates">{role.dates}</span>
            <span className="role__org">{role.org}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
