import { site } from '../content'

const nav = [
  { href: '#projects', label: 'Projects' },
  { href: '#publications', label: 'Publications' },
  { href: '#personal', label: 'Personal' },
]

export function Header() {
  return (
    <header className="site-header container">
      <a className="site-header__name" href="#top">
        {site.name}
      </a>
      <nav aria-label="Sections">
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
