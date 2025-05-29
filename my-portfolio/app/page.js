'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Instagram, Download } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio">
      {/* Home Section */}
      <section id="home" className="section home-section">
        <div className="container">
          <div className="image-gradient">
            <Image 
              src="/gradient.png" 
              alt="gradient" 
              fill
              className="gradient-bg"
              priority
            />
          </div>
          <div className="layer-blur"></div>
          
          <header>
            <div className="logo">
              <Link href="/">
                <Image 
                  src="/my-logo.png" 
                  alt="Aljaoui Soufian logo" 
                  width={120}
                  height={40}
                />
              </Link>
            </div>

            <nav>
              {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  className={activeSection === section ? 'active' : ''}
                  onClick={() => scrollToSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
          </header>

          <main>
            <div className="hero-content">
              <h2>Hello, It&apos;s Me <span className="name">Aljaoui Soufian</span></h2>
              <h3>And I&apos;m a <span id="typed-role">Full Stack Developer</span></h3>
              <p>
                Passionate about building web apps, clean user interfaces, and scalable systems.
                I enjoy using modern tools like React, Node.js, and Next.js to bring ideas to life.
              </p>

              <div className="social-media">
                <Link 
                  href="https://github.com/your-username" 
                  target="_blank" 
                  className="btn"
                  aria-label="GitHub Profile"
                >
                  <Github size={24} />
                </Link>
                <Link 
                  href="https://www.linkedin.com/in/your-username" 
                  target="_blank" 
                  className="btn linkedin"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </Link>
                <Link 
                  href="https://instagram.com/your-username" 
                  target="_blank" 
                  className="btn insta"
                  aria-label="Instagram Profile"
                >
                  <Instagram size={24} />
                </Link>
              </div>
              
              <Link href="/assets/cv.pdf" download className="btn-download-cv">
                <Download size={20} />
                Download CV
              </Link>
            </div>
          </main>

          <div className="robot-3d">
            {/* Spline viewer would be loaded here */}
            <div className="spline-placeholder">
              3D Model Placeholder
            </div>
          </div>
          <div className="scroll-down"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="section-container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>Who I Am</h3>
              <p>I&apos;m a passionate Full Stack Developer with expertise in modern web technologies. 
                 I love creating efficient, scalable solutions and bringing creative ideas to life through code.</p>
              <p>With a strong foundation in both frontend and backend development, I strive to build 
                 applications that not only look great but also perform exceptionally well.</p>
            </div>
            <div className="skills-grid">
              {['React', 'Node.js', 'Next.js', 'JavaScript', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker'].map((skill) => (
                <div key={skill} className="skill-item">{skill}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="section-container">
          <h2 className="section-title">My Projects</h2>
          <div className="projects-grid">
            <ProjectCard
              title="E-Commerce Platform"
              description="A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard. Built with modern technologies for optimal performance."
              technologies={['React', 'Node.js', 'MongoDB', 'Stripe']}
            />
            <ProjectCard
              title="Task Management App"
              description="A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface."
              technologies={['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL']}
            />
            <ProjectCard
              title="Weather Dashboard"
              description="A responsive weather application with location-based forecasts, interactive maps, and beautiful data visualizations using modern APIs."
              technologies={['React', 'Chart.js', 'REST API', 'CSS3']}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ title, description, technologies }) {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="project-tech">
        {technologies.map((tech) => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>
      <div className="project-links">
        <Link href="#" className="project-link">Live Demo</Link>
        <Link href="#" className="project-link">GitHub</Link>
      </div>
    </div>
  );
}