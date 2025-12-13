export default function ProjectCard({ project }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <button className="text-blue-600">View Project →</button>
    </div>
  )
}