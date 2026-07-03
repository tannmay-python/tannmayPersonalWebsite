import { Link } from 'react-router-dom'
import data from '../data.json'
import Constellation from '../components/Constellation.jsx'

const host = (url) => {
  try { return new URL(url).hostname.replace('www.', '') } catch { return url }
}
const fmt = (d) => {
  if (!d) return ''
  const dt = new Date(d)
  return dt.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

// newest four pieces across all categories, for the home preview
const selected = Object.entries(data.work)
  .flatMap(([type, items]) => items.map((i) => ({ ...i, type })))
  .filter((i) => i.date)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 4)

const total = Object.values(data.work).reduce((n, arr) => n + arr.length, 0)

export default function Home() {
  const { links } = data.profile
  return (
    <main>
      {/* ---- Hero ---- */}
      <header className="hero">
        <Constellation />
        <div className="hero-inner">
          <p className="eyebrow">Takshashila Institution · Bengaluru</p>
          <h1>
            Tannmay Kumarr <span className="amp">Baid</span>
          </h1>
          <p className="hero-lede">
            I'm in twelfth grade at National Public School, HSR, and I write on
            technology and geopolitics at the <b>Takshashila Institution</b> —
            mostly India's rare-earth and critical-minerals strategy. Off the page:
            a telescope, a debate habit, and a library I'm running out of shelf space for.
          </p>
          <div className="hero-meta">
            <span>Adjunct Junior Scholar</span>
            <span>Op-eds &amp; policy research</span>
            <span>GCPP Technology &amp; Policy, Cohort 43</span>
          </div>
          <div className="hero-cta">
            <Link to="/writing" className="btn btn-primary">Read the writing →</Link>
            <a href={`mailto:${links.email}`} className="btn btn-ghost">Get in touch</a>
          </div>
        </div>
      </header>

      {/* ---- Projects ---- */}
      <section className="section" id="projects">
        <div className="section-head">
          <h2>Projects</h2>
          <span className="count">Things I've built</span>
        </div>
        <div className="projects-grid">
          {data.projects.map((p) => (
            <a key={p.title} href={p.url} target="_blank" rel="noreferrer" className="project-card">
              <span className="project-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <span className="visit">
                Visit <span className="host">{host(p.url)}</span> ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ---- Selected writing ---- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Selected writing</h2>
          <Link to="/writing" className="link-arrow">All {total} pieces →</Link>
        </div>
        <div className="writing-list">
          {selected.map((w) => (
            <a key={w.url} href={w.url} target="_blank" rel="noreferrer" className="wrow">
              <div className="wrow-main">
                <span className="wrow-title">{w.title}</span>
                <span className="wrow-meta">
                  <span className="wrow-type">{w.type}</span>
                  {w.outlet} · {fmt(w.date)}
                </span>
              </div>
              <span className="wrow-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* ---- Beyond ---- */}
      <section className="section" id="beyond" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Beyond the desk</h2>
        </div>
        <div className="beyond-grid">
          <article className="beyond-card beyond-feature">
            <span className="b-label">Debate</span>
            <h3>Arguing for a living, almost</h3>
            <p>Years on the national circuit with the Indian Schools Debating Society, and a habit of taking the harder side.</p>
            <div className="medals">
              <span className="medal"><b>Top&nbsp;18</b> India, WSDC national selection (2025)</span>
              <span className="medal"><b>Top&nbsp;40</b> India, WSDC national selection (2023)</span>
              <span className="medal"><b>Gold</b> Senior Novice, LSE Open</span>
            </div>
          </article>
          <article className="beyond-card">
            <span className="b-label">Astronomy</span>
            <h3>Nights out with an 8″ Dob</h3>
            <p>A Dobsonian telescope and a soft spot for planets on a clear night.</p>
          </article>
          <article className="beyond-card">
            <span className="b-label">Reading</span>
            <h3>A shelf worth borrowing</h3>
            <p><Link to="/library" className="link-arrow">Browse the library →</Link></p>
          </article>
          <article className="beyond-card">
            <span className="b-label">Also</span>
            <h3>Math &amp; the gym</h3>
            <p>Proofs and progressive overload — both are just reps.</p>
          </article>
        </div>
      </section>

      {/* ---- Contact ---- */}
      <section className="section contact" id="contact" style={{ paddingTop: 0 }}>
        <div className="section-head" style={{ justifyContent: 'center', border: 'none', marginBottom: '1rem' }}>
          <h2>Say hello</h2>
        </div>
        <p>For writing, projects, a book off the shelf, or anything in between.</p>
        <a href={`mailto:${links.email}`} className="contact-mail">{links.email}</a>
        <div className="socials">
          <a href={links.twitter} target="_blank" rel="noreferrer">Twitter ↗</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>
    </main>
  )
}
