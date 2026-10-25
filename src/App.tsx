import type { ReactNode } from 'react'
import { Footer } from './components/Footer'
import { GemmaDiagram } from './components/GemmaDiagram'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Personal } from './components/Personal'
import { ProjectCard } from './components/ProjectCard'
import { Publications } from './components/Publications'
import { Section } from './components/Section'
import { projects } from './content'

// Hand-built extras that don't fit the shared project layout, keyed by project id.
const projectExtras: Record<string, ReactNode> = {
  gemmallm: <GemmaDiagram />,
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Section id="projects" title="Projects">
          <div className="projects">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i}>
                {projectExtras[project.id]}
              </ProjectCard>
            ))}
          </div>
        </Section>
        <Section id="publications" title="Publications">
          <Publications />
        </Section>
        <Section id="personal" title="Personal">
          <Personal />
        </Section>
      </main>
      <Footer />
    </>
  )
}
