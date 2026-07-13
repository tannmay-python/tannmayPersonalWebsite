import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Writing from './pages/Writing.jsx'
import Library from './pages/Library.jsx'

function ScrollManager() {
  const { pathname, state } = useLocation()
  useEffect(() => {
    const titles = {
      '/writing': 'Writing — Tannmay Kumarr Baid',
      '/library': 'Library — Tannmay Kumarr Baid',
    }
    document.title = titles[pathname] || 'Tannmay Kumarr Baid'
    if (state?.scrollTo) {
      const el = document.getElementById(state.scrollTo)
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, state])
  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <ScrollManager />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/library" element={<Library />} />
        </Routes>
        <Footer />
      </HashRouter>
    </MotionConfig>
  )
}
