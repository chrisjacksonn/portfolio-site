import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Header from './components/Header'
import Projects, { projectsData } from './components/Projects'
import ProjectDetail from './components/ProjectDetail'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // Home scroll position saved when a project is opened, restored on back
  const savedHomeScroll = useRef(0)
  const pendingHomeScroll = useRef(null)

  // Handle loading animation
  useEffect(() => {
    const minLoadTime = 800 // Minimum loading time to prevent flash
    
    const timer1 = setTimeout(() => {
      setIsLoading(false)
    }, minLoadTime)
    
    // Wait for fonts to load
    if (document.fonts && document.fonts.ready) {
      const waitForFirstRowImages = async () => {
        const imageUrls = [
          './images/WATaiBg (1).webp',
          './images/QQuoteBg.webp'
        ]
        const decodeOne = (src) => new Promise((resolve) => {
          const img = new Image()
          const done = () => resolve(true)
          img.onload = done
          img.onerror = done
          if (img.decode) {
            img.decode().then(done).catch(done)
          }
          img.src = src
        })
        const timeout = new Promise((resolve) => setTimeout(resolve, 1800))
        await Promise.race([
          Promise.allSettled(imageUrls.map(decodeOne)),
          timeout
        ])
      }

      document.fonts.ready.then(async () => {
        await waitForFirstRowImages()
        clearTimeout(timer1)
        setTimeout(() => {
          setIsLoading(false)
        }, 100)
      })
    }
    
    return () => clearTimeout(timer1)
  }, [])
  
  // Disable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // On first load, if URL is a deep link, open the matching project
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/+/, '')
    if (!path) return
    const customSlugs = { 2: 'qquote2', 3: 'encore-financial', 4: 'aeon', 6: 'qquote1' }
    const slugify = (title) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const match = projectsData.find(p => {
      const expected = customSlugs[p.id] || slugify(p.title)
      return expected === path
    })
    if (match) {
      setSelectedProject(match)
      document.title = `Chris Jackson | ${match.title}`
    }
  }, [])

  // Listen for browser back/forward button clicks
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.project) {
        // Going to a project detail
        setSelectedProject(event.state.project)
        document.title = `Chris Jackson | ${event.state.project.title}`
      } else {
        // Going back to homepage
        pendingHomeScroll.current = savedHomeScroll.current
        setSelectedProject(null)
        document.title = 'Chris Jackson'
      }
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Restore home scroll position after returning from a project detail
  useLayoutEffect(() => {
    if (selectedProject === null && pendingHomeScroll.current !== null) {
      const y = pendingHomeScroll.current
      pendingHomeScroll.current = null
      window.scrollTo(0, y)
    }
  }, [selectedProject])

  const handleProjectClick = (project) => {
    // Remember where the user was on the home page
    savedHomeScroll.current = window.scrollY
    setSelectedProject(project)
    // Custom URL slugs for specific projects
    const customSlugs = {
      2: 'qquote2', // QQuote Software Engineering
      3: 'encore-financial', // Encore Financial Ltd
      4: 'aeon', // Aeon Stellar Commerce
      6: 'qquote1' // QQuote Special Projects
    }
    // Create URL-friendly slug from project title
    const urlSlug = customSlugs[project.id] || project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    // Push state to browser history so back button works
    window.history.pushState({ project }, '', `/${urlSlug}`)
    // Update browser title
    document.title = `Chris Jackson | ${project.title}`
  }

  const handleBack = () => {
    if (window.history.state && window.history.state.project) {
      // Came here from the home page; going back restores it
      // via the popstate handler, including scroll position
      window.history.back()
    } else {
      // Opened via a direct link, so there's no home entry in history
      window.history.replaceState(null, '', '/')
      pendingHomeScroll.current = 0
      setSelectedProject(null)
      document.title = 'Chris Jackson'
    }
  }

  // Show loading screen while page is loading
  if (isLoading) {
    return <LoadingScreen />
  }

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={handleBack} />
  }

  return (
    <div className="app">
      <Header />
      <Projects onProjectClick={handleProjectClick} />
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Chris Jackson</p>
        </div>
      </footer>
    </div>
  )
}

export default App
