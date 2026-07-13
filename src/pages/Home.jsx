import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import data from '../data.json'
import Constellation from '../components/Constellation.jsx'

const host = (url) => {
  try { return new URL(url).hostname.replace('www.', '') } catch { return url }
}
const fmt = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

const selected = Object.entries(data.work)
  .flatMap(([type, items]) => items.map((i) => ({ ...i, type })))
  .filter((i) => i.date)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 5)

const total = Object.values(data.work).reduce((n, arr) => n + arr.length, 0)

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Home() {
  const { links } = data.profile
  const [feature, ...rest] = data.projects
  return (
    <main>
      {/* ---- Masthead ---- */}
      <header className="masthead">
        <Constellation />
        <div className="masthead-inner">
          <motion.h1 variants={rise} initial="hidden" animate="show" custom={0}>
            Tannmay Kumarr <em>Baid</em>
          </motion.h1>
          <motion.p className="masthead-role" variants={rise} initial="hidden" animate="show" custom={2}>
            Adjunct Junior Scholar at the <b>Takshashila Institution</b>, writing on
            technology and geopolitics — mostly India's rare-earth and critical-minerals
            strategy. Twelfth grade at National Public School, HSR. Off the page: a
            telescope, a debate habit, and a library that keeps outgrowing its shelves.
          </motion.p>
          <motion.div className="masthead-cta" variants={rise} initial="hidden" animate="show" custom={4}>
            <Link to="/writing" className="btn btn-gold">Read the writing →</Link>
            <a href={`mailto:${links.email}`} className="btn btn-outline-light">Get in touch</a>
          </motion.div>
        </div>
      </header>

      {/* ---- Projects ---- */}
      <section className="section" id="projects">
        <div className="section-head">
          <h2>Projects</h2>
          <span className="count">Things I've built</span>
        </div>
        <div className="projects-grid">
          <a href={feature.url} target="_blank" rel="noreferrer" className="project-feature">
            <span className="p-kind">{feature.tag}</span>
            <h3>{feature.title}</h3>
            <p>{feature.blurb}</p>
            <span className="visit">Visit {host(feature.url)} ↗</span>
          </a>
          {rest.map((p) => (
            <a key={p.title} href={p.url} target="_blank" rel="noreferrer" className="project-card">
              <span className="p-kind">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <span className="visit">Visit {host(p.url)} ↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* ---- Selected writing ---- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Recent writing</h2>
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

      {/* ---- Beyond the desk ---- */}
      <section className="section" id="beyond" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Beyond the desk</h2>
        </div>
        <dl className="ledger">
          <div className="ledger-row">
            <dt>Debate</dt>
            <dd>Years on the national circuit with the Indian Schools Debating Society, usually taking the harder side.</dd>
            <span className="tag">Top 18 in India, WSDC selection '25 · LSE Open gold</span>
          </div>
          <div className="ledger-row">
            <dt>Astronomy</dt>
            <dd>Nights out with an 8-inch Dobsonian and a soft spot for planets. The stars behind my name up there follow your cursor.</dd>
            <span className="tag">GSO 8″ Dob</span>
          </div>
          <div className="ledger-row">
            <dt>Reading</dt>
            <dd><Link to="/library">A 155-volume working library, catalogued and open for lending →</Link></dd>
            <span className="tag">Philosophy to finance</span>
          </div>
          <div className="ledger-row">
            <dt>Policy school</dt>
            <dd>Graduate of Takshashila's GCPP (Technology &amp; Policy), Cohort 43.</dd>
            <span className="tag">Outstanding performance</span>
          </div>
        </dl>
      </section>

      {/* ---- Contact ---- */}
      <section className="contact-band" id="contact">
        <div className="contact-inner">
          <h2>Say hello</h2>
          <p>For writing, projects, a book off the shelf, or anything in between.</p>
          <a href={`mailto:${links.email}`} className="contact-mail">{links.email}</a>
          <div className="socials">
            <a href={links.twitter} target="_blank" rel="noreferrer">Twitter ↗</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </section>
    </main>
  )
}
