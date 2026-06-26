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
    if (projectId === 2) return 'none' // QQuote: hero image is pre-cropped to 2:1
    if (projectId === 3) return 'none' // Encore: hero image is pre-cropped to 2:1
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

        <div className={`project-detail-image-container project-glow-${project.id} ${project.id === 4 ? 'aeon-detail' : ''} ${project.id === 1 ? 'wat-detail' : ''} ${project.id === 5 ? 'gradepad-detail' : ''} ${project.id === 7 ? 'shopify-detail' : ''} ${project.id === 2 ? 'qquote-detail' : ''} ${project.id === 3 ? 'encore-detail' : ''}`}>
          <img
            src={project.id === 7 ? './images/ShopifyLaptop.webp' : project.id === 2 ? './images/QQuoteLaptop.webp' : project.id === 1 ? './images/WataiMonitor.webp' : project.id === 3 ? './images/EncoreDesk.webp' :project.id === 4 ? './images/AeonBGprojectPage.webp' : project.id === 5 ? './images/GradePadbgPP (3).webp' : project.image}
            alt={project.title}
            className={`project-detail-image ${project.id === 4 ? 'aeon-image' : ''} ${project.id === 1 ? 'wat-image' : ''} ${project.id === 5 ? 'gradepad-image' : ''} ${project.id === 7 ? 'shopify-image' : ''} ${project.id === 2 ? 'qquote-image' : ''} ${project.id === 3 ? 'encore-image' : ''}`}
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
                <p><a href="https://drive.google.com/file/d/1zBYuexehyjrdZFhFxgOlSuqkMTsDlqgR/view" target="_blank" rel="noopener noreferrer" className="team-member-link">Research paper ↗</a></p>
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
            <p>I'm a <strong>Machine Learning Engineer</strong> on WAT.ai, one of Waterloo's student-run AI design teams, working on FORTif.ai. The work grew into a research paper, <a href="https://drive.google.com/file/d/1zBYuexehyjrdZFhFxgOlSuqkMTsDlqgR/view" target="_blank" rel="noopener noreferrer" className="team-member-link"><em>FORTif.ai: A Multimodal Platform for Safer Independent Living</em></a>, which I co-authored with a 13-person team spanning Waterloo, York, and Queen's, supported by WAT.ai and the UbiLab at the University of Waterloo. We presented the work at <strong>CUCAI 2026</strong>, Canada's largest undergraduate AI conference, and the paper is published in the <a href="https://cucai.ca/papers/19" target="_blank" rel="noopener noreferrer" className="team-member-link">conference proceedings</a>.</p>

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
                  <p>Wrote feature specs and requirements that guided what the development team built</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
                    </svg>
                  </div>
                  <h5>Design & Wireframes</h5>
                  <p>Wireframes and mockups in Figma that let the team see product ideas before building them</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                  </div>
                  <h5>QA Testing</h5>
                  <p>Tested features across scenarios so bugs got caught before customers found them</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                  </div>
                  <h5>Documentation</h5>
                  <p>Internal documentation for team processes and the projects that came after mine</p>
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
              <p>We solved it by separating the preparation and sending phases: a dedicated <strong>cron job trigger</strong> I helped build preloads all the email data ahead of the scheduled send time, so when the target time arrives the system just sends what's already prepared instead of building it on the spot.</p>
              <p>That change, plus further optimizations to the generation process itself, made end-to-end processing <strong>57.8% faster</strong>: email generation dropped from 3 hours 50 minutes to 1 hour 37 minutes, and once generated, emails now go out in under a minute, so dealerships get their reports on time.</p>
            </div>

            <div className="role-subsection">
              <h5>Database Optimization</h5>
              <p>Two critical graphs in the Reporter platform were taking up to 80 seconds to load: the <strong>week-over-week quoting graph</strong> and the <strong>potential cumulative revenue graph</strong>. These graphs were querying massive tables and processing huge amounts of unnecessary data, making the email previews nearly unusable.</p>
              <p>I helped re-architect the schema around purpose-built tables: one holding only the fields the week-over-week graph actually renders, another with the date fields and per-category revenue breakdowns behind the cumulative revenue graph. We also tuned the <strong>SQL</strong> queries and <strong>PHP</strong> code sitting on top of them.</p>
              <p>The results were dramatic: the week-over-week quoting graph improved by an average of <strong>96.33%</strong> (42.78s down to 1.11s in the worst cases), and the potential cumulative revenue graph by <strong>98.73%</strong> (79.73s down to 0.74s).</p>
            </div>

            <div className="role-subsection">
              <h5>API Development</h5>
              <p>I helped lead the design of <strong>custom API contracts</strong> for a client-facing system: endpoint definitions, request/response formats, validation rules, authentication requirements, and error handling, all specified in enough detail that internal services could build against them without guesswork.</p>
              <p>It forced me to think about <strong>API design</strong> from the client's side. What data do clients actually need? How should responses be structured to be useful but not overwhelming? What edge cases matter? The product management experience from the winter helped me answer those questions with the end user in mind.</p>
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
            <p>GradePad started as a fix for a real pain: existing grade calculators didn’t save anything and made it hard to manage multiple courses. So I built one that remembers your work, syncs across devices, and shows your whole semester at a glance.</p>


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
                <li>localStorage for guest accounts that persists across sessions and page reloads</li>
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
                  <p>Firebase Auth + Firestore for sign-in and cross-device sync</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17,12L12,17V14H8V10H12V7M19,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
                    </svg>
                  </div>
                  <h5>Real-time Persistence</h5>
                  <p>Every input saves as you type, so nothing is lost on refresh</p>
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
                <li>Normalizing arbitrary syllabus formats meant strict guardrails around the AI output: filter, validate, and only then persist</li>
                <li>One data layer serves both authenticated Firestore sync and guest localStorage fallback, without duplicating logic</li>
                <li>Grade calculations had to survive edge cases like missing inputs, zero weights, and partial data without ever showing a wrong number</li>
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
                <li>Shipping rough prototypes early caught wrong assumptions while they were still cheap to fix</li>
                <li>Polish matters: a clean interface is half the reason people trusted GradePad over the dated alternatives</li>
              </ul>
            </div>
          </div>
        )}

        {project.id === 3 && (
          <div className="about-this-role-section">
            <h4>About This Role</h4>
            <p>Over the course of 2025, I joined <a href="https://www.linkedin.com/in/hasanjee/" target="_blank" rel="noopener noreferrer" className="team-member-link">Bilal Hasanjee</a> and others to work on an <strong>AI-powered financial platform</strong>: a full suite for investment research, portfolio management, and wealth tracking. Working remotely, I took on both frontend and backend work.</p>

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
                  <p>React dashboards for portfolio tracking and live market data, tuned for fast renders and responsive charts</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
                    </svg>
                  </div>
                  <h5>Back-End & API Integration</h5>
                  <p>Server-side logic for market data APIs, authentication, and session management</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" />
                    </svg>
                  </div>
                  <h5>Data Visualization & Analytics</h5>
                  <p>Chart.js visualizations of investment KPIs and historical performance, with drill-down by time period and asset class</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
                    </svg>
                  </div>
                  <h5>Advanced AI Tools</h5>
                  <p>LLM-powered deep research and PDF parsing for in-depth financial analysis</p>
                </div>
              </div>
            </div>

            <div className="role-subsection">
              <h5>Real-Time Market Data</h5>
              <p>The hardest engineering problem was making <strong>live market data</strong> feel instant. Quotes and portfolio values change constantly, so I spent my time on the plumbing: how we fetched from market data APIs, stayed inside providers' <strong>rate limits</strong>, dealt with latency, and kept renders efficient with React hooks and proper loading states so the dashboard never felt laggy.</p>
              <p>Presentation mattered as much as speed. Investment data has to make sense at a glance, so I used <strong>Chart.js</strong> to build interactive visualizations of portfolio performance that drill down into specific time periods or <strong>asset classes</strong>. The tricky part was balancing detail with simplicity.</p>
            </div>

            <div className="role-subsection">
              <h5>AI Research Interface</h5>
              <p>I built the entry point for the platform's AI research tools: a custom React carousel of <strong>analysis modules</strong> covering different research angles, where clicking any module opens the chatbot with a pre-filled prompt and starts the analysis immediately. The goal was to take a user from a question about their portfolio to a running AI conversation in one click, without typing a prompt from scratch. Building it from scratch meant careful work with CSS transforms, debounced navigation, and render optimization.</p>

              <p>Here's the MVP in action.</p>
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
              <p>I also worked on the <strong>deep research</strong> feature, which lets users request institutional-style analysis on a specific topic. The model pulls from multiple sources and synthesizes a detailed write-up. It's the difference between asking for a stock quote and asking for a thesis.</p>
              <p>A quick demo:</p>
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
              <h5>AI Market Insights</h5>
              <p>We used language models to turn <strong>market trends</strong> into readable summaries and personalized investment insights. I helped design the prompts and the output structure, so a portfolio's story reads clearly instead of like raw numbers.</p>
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
                  <p>Paywall UI and subscription flows, designed in Figma and iterated with the team</p>
                </div>
                <div className="tile">
                  <div className="chip">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
                    </svg>
                  </div>
                  <h5>Stripe & Firebase Integration</h5>
                  <p>Stripe payments wired to Firebase auth, taken all the way through deployment</p>
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
                  <p>Scenario walkthrough videos and developer docs for paywall setup and maintenance</p>
                </div>
              </div>
            </div>

            <div className="role-subsection">
              <h5>System Architecture</h5>
              <p>We designed the <strong>system architecture</strong> around three services: Firebase for authentication, Stripe for payments, and Firestore as the primary database, covering everything from registration to subscription management to content access control.</p>
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
              <p>Four modules sit on top: authentication and onboarding, subscription management, tier-based content access, and admin controls. Stripe webhooks keep everything in sync with payment events, so what a user can access always matches what they're actually paying for.</p>
            </div>

            <div className="role-subsection">
              <h5>Technical Challenges</h5>
              <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>I spent over a week studying live paywalls before designing ours, so the flows would follow patterns users already know</li>
                <li>Stripe integration and deployment took real troubleshooting, testing different approaches until the payment gateway and the deploy pipeline cooperated</li>
                <li>Stripe price configuration and Firebase security rules were finicky enough to teach me why payment systems need thorough documentation</li>
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
