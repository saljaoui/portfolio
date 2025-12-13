export default function Skills() {
  const skills = ['JavaScript', 'React', 'Next.js', 'Tailwind CSS']
  
  return (
    <section id="skills" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {skills.map((skill) => (
            <span key={skill} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}