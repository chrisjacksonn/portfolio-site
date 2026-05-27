import React from 'react'
import ProjectCard from './ProjectCard'

export const projectsData = [
  {
    id: 1,
    title: "WAT.ai",
    year: "2026",
    timeline: "Sep. 2025 - Present",
    jobTitle: "Machine Learning Engineer",
    description: "Co-authored research and built FORTif.ai, a multimodal AI platform for safer independent living.",
    image: "./images/WATaiBg (1).webp",
    tech: "Python, LLMs, RAG, Gemini, Weaviate, Computer Vision, YOLOv8, SAM3, FastAPI, Twilio"
  },
  {
    id: 5,
    title: "GradePad",
    year: "2025",
    timeline: "Jan. 2025 - Apr. 2025",
    jobTitle: "Personal Project",
    description: "An intelligent academic tracker with AI that manages courses and calculates GPAs.",
    image: "./images/GradePadBg (0.0).webp",
    tech: "HTML, CSS, JavaScript, Firebase, Firestore, AI Parsing"
  },
  {
    id: 2,
    title: "QQuote",
    year: "2025",
    timeline: "Sep. 2025 - Dec. 2025",
    jobTitle: "Software Engineering Intern",
    description: "Return internship focused on API development and QA automation.",
    image: "./images/QQuoteBg.webp",
    tech: "Postman, QA Automation, PHP, Swagger"
  },
  {
    id: 3,
    title: "Encore Financial Ltd",
    year: "2025",
    timeline: "Jun. 2025 - Present",
    jobTitle: "AI Software Engineer",
    description: "Building an AI-powered financial platform for investment research and portfolio management.",
    image: "./images/EncoreBg (7).webp",
    tech: "TypeScript, React, Node.js, AI Integration, PDF Processing, Tailwind CSS"
  },
  {
    id: 4,
    title: "Aeon Stellar Commerce",
    year: "2025",
    timeline: "Jun. 2025 - Aug. 2025",
    jobTitle: "Full Stack Developer",
    description: "Developed subscription paywall system for Canada's first AI-powered dietary marketplace.",
    image: "./images/AeonBGprojectPage.webp",
    tech: "React.js, Stripe, Firebase, Figma, API Integration, Payment Systems, Subscription Management, UX Design"
  },
  {
    id: 6,
    title: "QQuote",
    year: "2025",
    timeline: "Jan. 2025 - Apr. 2025",
    jobTitle: "Special Projects Engineering Assistant",
    description: "Co-op term creating feature specifications, designed wireframes and mockups.",
    image: "./images/QQuoteBg.webp",
    tech: "Figma, Product Management, Postman, Power BI, SQL, PHP, RUM Tracking"
  }
]

const Projects = ({ onProjectClick }) => {
  return (
    <section className="projects">
      <div className="projects-grid">
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} onProjectClick={onProjectClick} />
        ))}
      </div>
    </section>
  )
}

export default Projects
