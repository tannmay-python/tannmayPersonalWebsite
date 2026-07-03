import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import data from '../data.json'

const fmt = (d) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const ORDER = ['Op-Eds', 'Podcasts', 'Publications', 'Blogs', 'Newsletters']

const all = ORDER.flatMap((type) =>
  (data.work[type] || []).map((i) => ({ ...i, type }))
).sort((a, b) => (b.date || '').localeCompare(a.date || ''))

const counts = ORDER.reduce((acc, t) => {
  acc[t] = (data.work[t] || []).length
  return acc
}, {})

export default function Writing() {
  const [filter, setFilter] = useState('All')

  const shown = useMemo(
    () => (filter === 'All' ? all : all.filter((i) => i.type === filter)),
    [filter]
  )

  // group the visible items by year for the archive spine
  const groups = useMemo(() => {
    const g = {}
    for (const item of shown) {
      const yr = item.date ? item.date.slice(0, 4) : 'Undated'
      ;(g[yr] = g[yr] || []).push(item)
    }
    return Object.entries(g).sort((a, b) => {
      if (a[0] === 'Undated') return 1
      if (b[0] === 'Undated') return -1
      return b[0].localeCompare(a[0])
    })
  }, [shown])

  return (
    <>
      <div className="page-head">
        <h1>Writing</h1>
        <p>
          Op-eds, podcasts, and policy research — most of it on rare earths, critical
          minerals, and the geopolitics of technology. Published across national dailies
          and the Takshashila Institution.
        </p>
        <div className="filters">
          <button
            className={`filter-chip ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
          >
            All <span className="n">{all.length}</span>
          </button>
          {ORDER.map((t) => (
            <button
              key={t}
              className={`filter-chip ${filter === t ? 'active' : ''}`}
              onClick={() => setFilter(t)}
            >
              {t} <span className="n">{counts[t]}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <motion.div layout className="writing-list">
          {groups.map(([year, items]) => (
            <div key={year}>
              <div className="year-label">{year}</div>
              <AnimatePresence mode="popLayout">
                {items.map((w) => (
                  <motion.a
                    key={w.url}
                    href={w.url}
                    target="_blank"
                    rel="noreferrer"
                    className="wrow"
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="wrow-main">
                      <span className="wrow-title">{w.title}</span>
                      <span className="wrow-meta">
                        <span className="wrow-type">{w.type}</span>
                        {w.outlet}
                      </span>
                    </div>
                    <span className="wrow-date">{fmt(w.date)}</span>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  )
}
