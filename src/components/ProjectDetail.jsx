import React, { useEffect, useLayoutEffect, useState } from 'react'

const ProjectDetail = ({ project, onBack }) => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Start at the top, before first paint
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getProjectLink = (projectId) => {
    const links = {
      7: 'https://www.shopify.com/ca/shop-campaigns', // Shopify
      1: 'https://github.com/FORTif-ai', // WAT.ai
      3: 'https://encorefinancialgroup.ca/', // Encore
      4: 'https://aeonstellar.co/', // Aeon
      2: 'https://qquote.com/', // QQuote
      5: 'https://gradepad.netlify.app/' // GradePad
    }
    return links[projectId] || '#'
  }

  const getImageTransform = (projectId) => {
    if (projectId === 7) return 'none' // Shopify: preserve true shape without scaling
    if (projectId === 1) return 'none' // WAT.ai: preserve true shape without scaling
    if (projectId === 4) return 'none' // Aeon: preserve true shape without scaling
    if (projectId === 5) return 'scale(1.0)' // GradePad: zoom on project page (slightly smaller)
    return 'scale(1.15)' // Default - matches home page scaling
  }

  return (
    <div className="project-detail">
      <div className="project-detail-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <a href={getProjectLink(project.id)} target="_blank" rel="noopener noreferrer" className="links-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
          </svg>
        </a>
      </div>

      <div className="project-detail-content">
        <h1 className="project-detail-title">{project.title}</h1>
        <h2 className="project-detail-job-title">{project.jobTitle}</h2>

        <div className={`project-detail-image-container project-glow-${project.id} ${project.id === 4 ? 'aeon-detail' : ''} ${project.id === 1 ? 'wat-detail' : ''} ${project.id === 5 ? 'gradepad-detail' : ''}`}>
          <img
            src={project.id === 4 ? './images/AeonBGprojectPage.webp' : project.id === 5 ? './images/GradePadbgPP (3).webp' : project.image}
            alt={project.title}
            className={`project-detail-image ${project.id === 4 ? 'aeon-image' : ''} ${project.id === 1 ? 'wat-image' : ''} ${project.id === 5 ? 'gradepad-image' : ''}`}
            style={{
              transform: getImageTransform(project.id)
            }}
          />
        </div>

        <div className="detail-meta">
          <div className="detail-meta-left">
            <div className="detail-meta-group">
              <h4>Timeline</h4>
              <p style={{ whiteSpace: 'pre-line' }}>{project.timeline || project.year}</p>
            </div>
            <div className="detail-meta-group">
              <h4>Role</h4>
              <p>{project.jobTitle}</p>
            </div>
            {project.id === 1 && (
              <div className="detail-meta-group">
                <h4>Research</h4>
                <p><a href="https://drive.google.com/file/d/1qWI_7aOvGYEjylcjC61IJ_aA5MMvIB11/view" target="_blank" rel="noopener noreferrer" className="team-member-link">Research paper ↗</a></p>
              </div>
            )}
          </div>
          <div className="detail-meta-right">
            <h4>Synopsis</h4>
            <p>{project.synopsis || project.description}</p>
          </div>
          {project.tech && (
            <div className="detail-meta-group detail-tools-section">
              <h4>Tools & Skills</h4>
              <div className="detail-tools">
                {project.tech.split(',').map(t => (
                  <span key={t.trim()} className="tool-chip">{t.trim()}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {project.id === 7 && (
          <div className="about-this-role-section">
            <h4>About This Role</h4>
            <p>I spent a 2026 work term at Shopify as a <strong>Software Engineer Intern</strong> on the <strong>Ads Channels</strong> team, working on <a href="https://www.shopify.com/ca/shop-campaigns" target="_blank" rel="noopener noreferrer" className="team-member-link">Shop Campaigns</a>, Shopify's customer acquisition product. Merchants set a target cost per acquisition and pay only when a shopper actually buys, and the system places ads across the Shop app, the Shopify Product Network, and external channels like Meta, Google, and ChatGPT. The product has driven over 10 million attributed sales.</p>
          </div>
        )}

        {project.id === 1 && (
          <div className="about-this-role-section">
            <h4>About This Role</h4>
            <p>I'm a <strong>Machine Learning Engineer</strong> on WAT.ai, one of Waterloo's student-run AI design teams, working on FORTif.ai. The work grew into a research paper, <a href="https://drive.google.com/file/d/1qWI_7aOvGYEjylcjC61IJ_aA5MMvIB11/view" target="_blank" rel="noopener noreferrer" className="team-member-link"><em>FORTif.ai: A Multimodal Platform for Safer Independent Living</em></a>, which I co-authored with a 13-person team spanning Waterloo, York, and Queen's, supported by WAT.ai and the UbiLab at the University of Waterloo.</p>

            <div className="role-subsection">
              <h5>The Project</h5>
              <p>FORTif.ai helps seniors live independently, safely, for longer. The problem is real: roughly <strong>one in five Canadians</strong> is now 65 or older, falls are the <strong>leading cause of injury-related hospitalizations</strong>, and 20-30% of seniors experience at least one fall every year. Most existing tools react after an accident happens. We built a platform that works to prevent them, integrating three subsystems:</p>
              <div className="feature-tiles">
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                    </svg>
                  </div>
                  <h5>Hazard Detection</h5>
                  <p>A vision-language model that watches camera frames for tripping hazards and sends real-time, actionable alerts</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2Z" />
                    </svg>
                  </div>
                  <h5>Empathetic Chatbot</h5>
                  <p>A RAG-powered companion for reminders, wellness check-ins, and warm, contextual conversation by voice or text</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
                    </svg>
                  </div>
                  <h5>Memory Management</h5>
                  <p>A vector database of patient-specific memories that keeps conversations contextual, designed for users with cognitive impairments</p>
                </div>
              </div>
            </div>

            <div className="role-subsection">
              <h5>Hazard Detection</h5>
              <p>One of the core areas I worked on was the <strong>hazard detection system</strong>. We started by benchmarking conventional computer vision: <strong>YOLOv8</strong> ran fast on ~2 GB of RAM but was inconsistent on small, irregular hazards like scattered wires, while <strong>SAM3</strong> detected everything reliably but demands a CUDA GPU and ~25 GB of disk, which isn't realistic hardware for a senior's living room. That trade-off pushed us to a vision-language model, <strong>Gemini 2.5 Flash Lite</strong>, which analyzes frames and returns structured JSON: hazard type, location, confidence, and a severity rating from Safe to Critical, with SMS-ready alerts dispatched through <strong>Twilio</strong> and signature-based deduplication so the same rug doesn't ping you every few seconds.</p>
              <p>The biggest lesson was how much <strong>prompt design</strong> matters. Baseline prompts kept missing rugs and toys on the floor; after iterating on walkway-focused prompts, the system reliably caught floor clutter, rolled rug edges, trailing cables, and even a pet wandering into the walking path, all without changing the model.</p>
            </div>

            <div className="role-subsection">
              <h5>AI Chatbot</h5>
              <p>The conversational side is built on a <strong>retrieval-augmented generation (RAG)</strong> pipeline: Gemini 2.5 Flash for generation, a <strong>Weaviate</strong> vector database of patient-specific memories, and hybrid semantic + keyword search for retrieval, behind a Python <strong>FastAPI</strong> backend. Follow-up questions are rewritten into standalone queries so context never gets lost, and a medical-advice guardrail redirects anything clinical to a real healthcare professional.</p>
              <p>Everything works by <strong>voice or text</strong>, because accessibility for users at every level of tech comfort is the whole point.</p>
            </div>

            <div className="role-subsection">
              <h5>The Experience</h5>
              <p>This has been a different kind of project from a typical internship: open research questions instead of a spec, and a big cross-university team to coordinate with. Turning months of building into a paper meant running negative controls, documenting failure modes honestly, and writing for an audience beyond the team.</p>
            </div>
          </div>
        )}

        {project.id === 2 && (
          <div className="about-this-role-section">
            <h4>About This Role</h4>
            <p>I did two internships at QQuote in 2025. In the winter term I worked with <a href="https://www.linkedin.com/in/nathan-hufnagel-a3b5bb35/" target="_blank" rel="noopener noreferrer" className="team-member-link">Nathan Hufnagel</a> on <strong>product management</strong> and the <strong>full product lifecycle</strong>, from designing features to testing them. I liked it enough that I came back in the fall to get hands-on with the code, focused on <strong>API development</strong>, <strong>database optimization</strong>, and <strong>QA automation</strong>.</p>

            <h4 style={{ marginTop: '2.75rem' }}>Winter Term</h4>

            <div className="role-subsection">
              <h5>What I Worked On</h5>
              <div className="feature-tiles">
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V7H5V5H19M5,19V9H19V19H5M7,11H9V17H7V11M11,11H13V17H11V11M15,11H17V17H15V11Z" />
                    </svg>
                  </div>
                  <h5>Feature Specifications</h5>
                  <p>Wrote detailed feature specs and requirements to guide the development team through the product development process</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
                    </svg>
                  </div>
                  <h5>Design & Wireframes</h5>
                  <p>Created wireframes and mockups to visualize new product ideas with focus on user experience and design</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                  </div>
                  <h5>QA Testing</h5>
                  <p>QA testing across different scenarios to ensure features worked as expected and bugs were caught early</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                  </div>
                  <h5>Documentation</h5>
                  <p>Wrote internal documentation to help with team processes and future project development</p>
                </div>
              </div>
            </div>

            <div className="role-subsection">
              <h5>Product Management</h5>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Learned to think about features from the user's perspective, focusing on what actually solves problems rather than just what's technically possible</li>
                <li>Writing feature specs taught me to think through edge cases and user flows before any code gets written</li>
                <li>Got experience with prioritization and planning by seeing how the team balanced user requests with technical debt and business goals</li>
                <li>Learned the value of getting an extremely early MVP out the door, sometimes building something as simple as an Excel spreadsheet to validate ideas before coding</li>
              </ul>
            </div>

            <div className="role-subsection">
              <h5>Design & UX</h5>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Created hundreds of wireframes using Figma, making sure to factor in every possible click and scenario</li>
                <li>Gained respect for the design process by experiencing how much thought goes into user flows from rough sketches to polished mockups</li>
                <li>Learned to pay attention to spacing, typography, colour choices, and different states like loading, error, and success</li>
              </ul>
            </div>

            <h4 style={{ marginTop: '2.75rem' }}>Fall Term</h4>

            <div className="role-subsection">
              <h5>Email Pipeline Optimization</h5>
              <p>The email system had a critical issue: cron jobs would only start generating emails at the scheduled send time, meaning emails that were supposed to go out at 10 AM wouldn't finish until 4 PM. Dealerships were receiving their reports hours late, which was unacceptable for time-sensitive business data.</p>
              <p>I helped solve this by separating the preparation and sending phases. I helped implement a dedicated <strong>cron job trigger</strong> that would preload all required email data well before the scheduled send time. When the target time arrived, the system would simply send the preloaded emails rather than building them on the spot.</p>
              <p>This architectural change, combined with further optimizations to the generation process itself, resulted in <strong>57.8% faster</strong> end-to-end processing times. Email generation was reduced from 3 hours 50 minutes to 1 hour 37 minutes. More importantly, emails now send in under 1 minute once generated, ensuring dealerships receive their reports on time.</p>
            </div>

            <div className="role-subsection">
              <h5>Database Optimization</h5>
              <p>Two critical graphs in the Reporter platform were taking up to 80 seconds to load: the <strong>week-over-week quoting graph</strong> and the <strong>potential cumulative revenue graph</strong>. These graphs were querying massive tables and processing huge amounts of unnecessary data, making the email previews nearly unusable.</p>
              <p>I helped re-architect the database schema by creating dedicated, optimized tables containing only the required parameters for each graph. For the week-over-week quoting graph, I helped create a dedicated table with only the essential data fields needed for that visualization. For the potential cumulative revenue graph, I helped create another optimized table with date fields and specific revenue breakdowns by category.</p>
              <p>I also helped optimize the <strong>SQL</strong> queries and <strong>PHP</strong> code that interacted with these tables. The results were dramatic: the week-over-week quoting graph improved by an average of <strong>96.33%</strong> (from 42.78s to 1.11s for the most time-intensive cases), and the potential cumulative revenue graph improved by an average of <strong>98.73%</strong> (from 79.73s to 0.74s). These optimizations transformed the email preview experience from frustratingly slow to near-instantaneous.</p>
            </div>

            <div className="role-subsection">
              <h5>API Development</h5>
              <p>I helped lead the design of <strong>custom API contracts</strong> for a client-facing system, defining endpoints and validation rules to enable seamless integration with internal services. This work involved creating detailed specifications that defined the endpoints, request/response formats, authentication requirements, and error handling.</p>
              <p>This was great practice thinking about <strong>API design</strong> from a developer's perspective. I had to consider things like: What data do clients actually need? How should we structure the responses to be useful but not overwhelming? What edge cases do we need to handle? Having the product management experience from my first term helped me think through these questions with the end user in mind.</p>
            </div>

            <div className="role-subsection">
              <h5>The Experience</h5>
              <p>The winter term gave me real ownership across product management, design, and testing; coming back in the fall, I already knew the team and the product, so I could jump straight into more complex engineering work. Between the two terms I saw the whole picture of how software gets built, from specs and wireframes to APIs and database optimization.</p>
            </div>
          </div>
        )}

        {project.id === 5 && (
          <div className="about-this-role-section">
            <h4>About This Project</h4>
            <p>GradePad started as a fix for a real pain: existing grade calculators didn’t save anything and made it hard to manage multiple courses. I turned it into a modern, persistent, and genuinely helpful grade tracking platform that saves your work, syncs across devices, and gives a clear view of your semester at a glance.</p>


            <div className="role-subsection">
              <h5>The Problem</h5>
              <p>Most calculators were single-course, stateless, and visually dated. No multi-course dashboard, no persistence, and lots of manual recalculation. I wanted something that looked great, remembered my data, and showed both per-course and overall performance without jumping between tabs.</p>
            </div>



            <div className="role-subsection">
              <h5>What I Built</h5>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Persistent multi-course grade tracking with autosave</li>
                <li>Semester dashboard with GPA and per-course summaries</li>
                <li>AI-powered Syllabus Parser that converts pasted syllabi into graded evaluations</li>
                <li>Firestore storage for logged-in users with cross-device sync</li>
                <li>localStorage for guests accounts that persists across sessions and page reloads</li>
                <li>Theming and clean, responsive UI with installable PWA support</li>
              </ul>
            </div>

            {/* How it works steps */}
            <ol className="steps-rail">
              <li><span className="dot">1</span><h6>Sign Up</h6><p>Create account or continue as guest</p></li>
              <li><span className="dot">2</span><h6>Add Courses</h6><p>Weights, due dates, categories</p></li>
              <li><span className="dot">3</span><h6>Parse Syllabus</h6><p>LLM turns text into evaluations</p></li>
              <li><span className="dot">4</span><h6>Track</h6><p>Autosave, dashboards, insights</p></li>
            </ol>

            <div className="role-subsection">
              <h5>Technical Highlights</h5>
              <div className="feature-tiles">
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                    </svg>
                  </div>
                  <h5>Authentication & Sync</h5>
                  <p>Firebase Auth + Firestore for seamless user authentication and data synchronization</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17,12L12,17V14H8V10H12V7M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
                    </svg>
                  </div>
                  <h5>Real-time Persistence</h5>
                  <p>Immediate saving of user inputs and parsed data with no lost information on refresh</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11.03L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11.03C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                    </svg>
                  </div>
                  <h5>Serverless AI</h5>
                  <p>Netlify function with LLM integration to parse any syllabus into structured assignments</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V7H5V5H19M5,19V9H19V19H5M7,11H9V17H7V11M11,11H13V17H11V11M15,11H17V17H15V11Z" />
                    </svg>
                  </div>
                  <h5>Guest Data Persistence</h5>
                  <p>localStorage for guests: auto-saves and persists across sessions without an account</p>
                </div>
              </div>
            </div>

            <div className="role-subsection">
              <h5>Syllabus Parsing Demo</h5>
              <p>Here’s a short demo showing the AI-powered parser converting a pasted syllabus into structured evaluations.</p>
              <div style={{ marginTop: '1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  maxWidth: '750px',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.08), 0 0 60px rgba(255, 255, 255, 0.05)',
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.15))'
                }}>
                  <video
                    controls
                    playsInline
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  >
                    <source src="/videos/GPparsing.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>





            <div className="role-subsection">
              <h5>Technical Challenges</h5>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Normalizing arbitrary syllabus formats into structured data required careful parsing and guardrails around AI output with filtering, validation, and persistence logic so it survives reloads</li>
                <li>Designing a resilient data layer that supports both authenticated sync with Firestore and guest fallback using local storage without code duplication</li>
                <li>Ensuring grade calculations handle edge cases including missing inputs, zero weights, and partial data while keeping the UI responsive and accurate</li>
              </ul>
            </div>

            <div className="role-subsection">
              <h5>Design & UX</h5>
              <p>I focused on clarity and speed with clean typography, smart spacing, and colour-coded signals for performance. Tables are intentionally minimal and interactive with drag-and-drop, quick add/remove, and collapse/expand features, so managing a course feels fast and frictionless. The dashboard gives an immediate sense of semester progress without digging.</p>
            </div>


            <div className="role-subsection">
              <h5>What I Learned</h5>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>The most impactful products solve specific, deeply felt problems. My narrow pain point of losing grade data across sessions led to a solution that students actually wanted to use</li>
                <li>Iterative MVP development through multiple prototype stages validates assumptions and ensures the product evolves as expected before full implementation</li>
                <li>Modern UI and UX are critical for user adoption where a polished interface builds trust and differentiates from dated competitors</li>
              </ul>
            </div>
          </div>
        )}

        {project.id === 3 && (
          <div className="about-this-role-section">
            <h4>About This Role</h4>
            <p>Over the summer of 2025, I joined a small team at Encore Financial, working with <a href="https://www.linkedin.com/in/hasanjee/" target="_blank" rel="noopener noreferrer" className="team-member-link">Bilal Hasanjee</a> to build an <strong>AI-powered financial platform</strong>. We were building something pretty ambitious: a full suite for investment research, portfolio management, and wealth tracking. Working remotely with a small team, I took on both frontend and backend work.</p>

            <div className="role-subsection">
              <h5>What I Built</h5>
              <div className="feature-tiles">
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,18H23L14,6Z" />
                    </svg>
                  </div>
                  <h5>Front-End Development</h5>
                  <p>Built React components for financial dashboards and portfolio tracking with real-time data visualization and responsive performance</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
                    </svg>
                  </div>
                  <h5>Back-End & API Integration</h5>
                  <p>Server-side logic with market data API integration and secure user authentication and session management</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" />
                    </svg>
                  </div>
                  <h5>Data Visualization & Analytics</h5>
                  <p>Performance dashboards showing investment KPIs, historical trends, and AI-generated insights</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
                    </svg>
                  </div>
                  <h5>Advanced AI Tools</h5>
                  <p>PDF parsing capabilities and deep research models for comprehensive financial analysis</p>
                </div>
              </div>
            </div>

            <div className="role-subsection">
              <h5>Building the Dashboard</h5>
              <p>One of the bigger challenges was building a dashboard that could handle real-time financial data without feeling laggy. I spent a lot of time optimizing how we fetched and displayed market data, using React hooks to manage state efficiently and implementing proper loading states.</p>
              <p>The portfolio tracking feature needed to show complex investment data in a way that made sense at a glance. I used <strong>Chart.js</strong> to create interactive visualizations that could drill down into specific time periods or asset classes. The tricky part was balancing detail with simplicity.</p>
            </div>

            <div className="role-subsection">
              <h5>AI Carousel Interface</h5>
              <p>I built a carousel interface to help users navigate through different AI prompt options. This made it easy for users to explore various research queries and see what the AI could help them with, without having to type everything out manually. When a user clicks on any analysis module, it opens a chatbot page with a pre-filled prompt based on what was clicked, immediately starting a conversation with the AI.</p>

              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                <li><strong>Coverflow Effect:</strong> This was one of the more complex features to implement. I built a custom React carousel from scratch using useState for state management and Tailwind CSS for styling. The coverflow effect required careful manipulation of CSS transform properties, z-index layering for proper depth perception, and optimized transition timing functions to ensure smooth animations.</li>
                <li><strong>Card Positioning & Navigation:</strong> I implemented a card positioning algorithm that calculated dynamic offsets based on the current index, handling edge cases for the first and last cards. The navigation logic involved debouncing to prevent rapid state changes and ensuring proper boundary conditions.</li>
                <li><strong>Performance Optimization:</strong> I spent considerable time optimizing the render performance, using React.memo where appropriate and minimizing unnecessary re-renders. I initially experimented with auto-rotation using useEffect and setInterval, but ultimately disabled it in favor of user-controlled navigation for better accessibility and intentional user interaction.</li>
              </ul>

              <p>Here's a demonstration of the MVP I created.</p>
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  maxWidth: '750px',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.08), 0 0 60px rgba(255, 255, 255, 0.05)',
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.15))'
                }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  >
                    <source src="/videos/SampleCarousel.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

            <div className="role-subsection">
              <h5>Deep Research Model</h5>
              <p>I also worked on implementing the <strong>deep research</strong> feature, which allowed users to get comprehensive, in-depth analysis on specific topics. The model would pull from multiple sources and provide detailed insights that went beyond surface-level information.</p>
              <p>Here's a demonstration of the MVP I created.</p>
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  maxWidth: '750px',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.08), 0 0 60px rgba(255, 255, 255, 0.05)',
                  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.15))'
                }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  >
                    <source src="/videos/Deep Research.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

            <div className="role-subsection">
              <h5>AI Features</h5>
              <p>We integrated AI to provide personalized investment insights and recommendations. This involved working with language models to analyze market trends and generate readable summaries for users. I helped design the prompts and structure the output so it felt natural and actually useful.</p>
            </div>

            <div className="role-subsection">
              <h5>The Experience</h5>
              <p>I integrated market data APIs and worked with real-time financial data streams, which meant dealing with latency, rate limits, and data accuracy. I also had to think carefully about regulatory compliance, security protocols, and proper handling of sensitive financial information. Features that touch real money and user investments demand a level of attention to detail I hadn't needed anywhere else.</p>
            </div>
          </div>
        )}

        {project.id === 4 && (
          <div className="about-this-role-section">
            <h4>About This Role</h4>
            <p>I spent the summer working at Aeon Stellar Commerce on StellaEats, Canada's first AI-powered food marketplace focused on dietary needs. I worked closely with <a href="https://www.linkedin.com/in/jayden-ferrer/" target="_blank" rel="noopener noreferrer" className="team-member-link">Jayden Ferrer</a>, under <a href="https://www.linkedin.com/in/primiecegnar/" target="_blank" rel="noopener noreferrer" className="team-member-link">Primie Cegnar</a>, to build out the paywall system.</p>

            <div className="role-subsection">
              <h5>What I Built</h5>
              <div className="feature-tiles">
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
                    </svg>
                  </div>
                  <h5>Front-End Design & UX</h5>
                  <p>Paywall UI design in Figma with subscription user flows that consistently received positive feedback and met project goals</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
                    </svg>
                  </div>
                  <h5>Stripe & Firebase Integration</h5>
                  <p>Integrated Stripe payment processing and Firebase authentication despite deployment challenges to deliver a working product</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                    </svg>
                  </div>
                  <h5>Paywall Implementation</h5>
                  <p>Access control logic for subscription tiers with feature gating and research on paywall best practices</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                  </div>
                  <h5>Testing & Documentation</h5>
                  <p>Scenario videos and comprehensive developer documentation for paywall setup and maintenance</p>
                </div>
              </div>
            </div>

            <div className="role-subsection">
              <h5>System Architecture</h5>
              <p>We designed a comprehensive <strong>system architecture</strong> to handle user registration, subscription management, and content access control. The architecture integrated Firebase for authentication, Stripe for payment processing, and Firestore as the primary database.</p>
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <img
                  src="./images/aeonArchitecture.webp"
                  alt="Aeon Architecture Diagram"
                  style={{
                    width: '100%',
                    maxWidth: '750px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.08)',
                    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.15))'
                  }}
                />
              </div>
              <p>The system included several key modules: a User Authentication Module for registration and initial setup, a Subscription Module for managing premium subscriptions, a Tier-Level Access Module for controlling content based on user roles, and an Admin Control Module for administrative oversight. The architecture ensured that content access was dynamically controlled based on subscription status, with Stripe webhooks keeping the system synchronized with payment events.</p>
            </div>

            <div className="role-subsection">
              <h5>Technical Challenges</h5>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Designing the paywall required over a week of research on working paywalls to ensure we met modern standards and followed industry best practices</li>
                <li>Stripe integration and deployment required navigating complex payment system architectures with troubleshooting and testing different approaches to understand payment gateway integration and deployment workflows</li>
                <li>Stripe price configuration and Firebase rules presented challenges that helped me understand the technical requirements behind payment gateways and the importance of thorough documentation</li>
              </ul>
            </div>

            <div className="role-subsection">
              <h5>The Experience</h5>
              <p>The team at Aeon was small, so I had a lot of ownership and saw how decisions got made quickly. Working directly with Primie gave me real insight into product strategy and how technical decisions impact the business.</p>
            </div>
          </div>
        )}
      </div>

      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}

export default ProjectDetail
