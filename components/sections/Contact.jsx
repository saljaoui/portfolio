export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Contact Me</h2>
        <form className="space-y-4">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-3 border rounded-lg"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-3 border rounded-lg"
          />
          <textarea 
            placeholder="Your Message" 
            rows="5"
            className="w-full p-3 border rounded-lg"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}