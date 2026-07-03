import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import data from '../data.json'

export default function Nav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const email = data.profile.links.email

  const goToSection = (id) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <nav className="nav">
      <NavLink to="/" className="nav-name">
        Tannmay Kumarr <b>Baid</b>
      </NavLink>
      <div className="nav-links">
        <button onClick={() => goToSection('projects')} className="hide-sm">Projects</button>
        <NavLink to="/writing" className={({ isActive }) => (isActive ? 'active' : '')}>Writing</NavLink>
        <NavLink to="/library" className={({ isActive }) => (isActive ? 'active' : '')}>Library</NavLink>
        <a href={`mailto:${email}`} className="nav-contact">Contact</a>
      </div>
    </nav>
  )
}
