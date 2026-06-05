import React from 'react'
import ProjectCard from './ProjectCard'

export const projectsData = [
  {
    id: 7,
    title: "Shopify",
    year: "2026",
    jobTitle: "Software Engineer Intern",
    description: "Working on Shop Campaigns, Shopify's pay-per-sale customer acquisition product, on the Ads Channels team.",
    image: "./images/ShopifyBg.webp"
  },
  {
    id: 1,
    title: "WAT.ai",
    year: "2026",
    timeline: "Sep. 2025 - Present",
    jobTitle: "Machine Learning Engineer",
    description: "Built FORTif.ai, a multimodal AI platform for safer independent living; research presented at CUCAI 2026.",
    image: "./images/WataiHero.webp",
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
    timeline: "Jan. - Apr. 2025\nSep. - Dec. 2025",
    jobTitle: "Software Engineering Intern",
    description: "Two internships spanning software engineering, QA automation, and product management.",
    image: "./images/QQuoteBg.webp",
    tech: "PHP, SQL, Postman, Swagger, QA Automation, Figma, Product Management, Power BI, RUM Tracking"
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
