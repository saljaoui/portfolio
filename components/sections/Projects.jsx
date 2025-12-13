import ProjectCard from '@/components/common/ProjectCard'

export default function Projects() {
  const projects = [
    { id: 1, title: 'Project 1', description: 'Description here' },
    { id: 2, title: 'Project 2', description: 'Description here' },
  ]

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}