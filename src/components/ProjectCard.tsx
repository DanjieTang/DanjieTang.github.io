import type { ReactNode } from 'react'
import type { Paper, Project } from '../content'
import { isShown, isTodo, type OrTodo } from '../lib/todo'
import { AuthorList } from './AuthorList'
import { BenchmarkTable } from './BenchmarkTable'
import { Figure } from './Figure'
import { LinkPills } from './Links'
import { Filled } from './Todo'

type ProjectCardProps = {
  project: Project
  index: number
  /** Project-specific extras (e.g. a diagram), placed after the table. */
  children?: ReactNode
}

export function ProjectCard({ project, index, children }: ProjectCardProps) {
  const { figure } = project
  const titleId = `${project.id}-title`

  return (
    <article id={project.id} className="card project" aria-labelledby={titleId}>
      <header className="project__header">
        <span className="project__number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          {project.eyebrow && <p className="eyebrow">{project.eyebrow}</p>}
          <h3 id={titleId} className="project__title">
            {project.title}
          </h3>
          <p className="project__summary">{project.summary}</p>
        </div>
      </header>

      {figure?.position === 'top' && <Figure image={figure} variant="panel" />}
      <ProjectBody project={project} />
      {project.benchmarks && <BenchmarkTable {...project.benchmarks} />}
      {children}
      {figure?.position === 'bottom' && <Figure image={figure} />}
      {project.readingList && <ReadingList papers={project.readingList} />}
      <LinkPills links={project.links} />
    </article>
  )
}

function ProjectBody({ project }: { project: Project }) {
  const { highlights = [], authors, role, learned } = project
  const showRole = role !== undefined && isShown(role)
  const showLearned = learned !== undefined && isShown(learned)
  const hasAside = authors !== undefined || showRole || showLearned
  if (highlights.length === 0 && !hasAside) return null

  return (
    <div className={hasAside ? 'project__body' : 'project__body project__body--solo'}>
      {highlights.length > 0 && (
        <ul className="highlights">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {hasAside && (
        <aside className="project__aside">
          {authors && (
            <AsideNote label="Authors">
              <AuthorList names={authors} />
            </AsideNote>
          )}
          {showRole && (
            <AsideNote label="My role">
              <Filled value={role}>{(text) => text}</Filled>
            </AsideNote>
          )}
          {showLearned && (
            <AsideNote label="What I learned">
              <Filled value={learned}>{(text) => text}</Filled>
            </AsideNote>
          )}
        </aside>
      )}
    </div>
  )
}

function AsideNote({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="aside-note">
      <h4 className="label">{label}</h4>
      <p>{children}</p>
    </div>
  )
}

function ReadingList({ papers }: { papers: OrTodo<Paper[]> }) {
  if (!isShown(papers)) return null

  return (
    <details className="reading-list" open>
      <summary>
        <strong>Reading list</strong>
        {!isTodo(papers) && (
          <span className="reading-list__count"> · {papers.length} papers I read for this project.</span>
        )}
      </summary>
      <Filled value={papers}>
        {(list) => (
          <ol>
            {list.map((paper) => (
              <li key={paper.title}>{paper.href ? <a href={paper.href}>{paper.title}</a> : paper.title}</li>
            ))}
          </ol>
        )}
      </Filled>
    </details>
  )
}
