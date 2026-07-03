import { useState, useMemo } from 'react'
import data from '../data.json'

const email = data.profile.links.email

// Warm, library-toned palette. Every book by the same author gets the same
// spine colour, so collections (all the Nietzsche, all the Shakespeare) surface
// as clusters of colour on the shelf.
const PALETTE = [
  '#620d3c', '#7a2348', '#8a3b64', '#43304f', '#5a3a2a', '#7a4a1f',
  '#a06a12', '#3d4a2f', '#2f4a45', '#6e2b2b', '#4a2c40', '#8c5a12',
]
const colorFor = (author) => {
  let h = 0
  const key = (author || 'unknown').toLowerCase()
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]
}
// darken a #rrggbb by a factor, for the spine's shaded inner edge
const darken = (hex, f = 0.7) => {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.round(((n >> 16) & 255) * f)
  const g = Math.round(((n >> 8) & 255) * f)
  const b = Math.round((n & 255) * f)
  return `rgb(${r}, ${g}, ${b})`
}

// Spine thickness follows page count — thin pamphlets, fat treatises.
const widthFor = (pages) => {
  if (!pages) return 22
  return Math.max(15, Math.min(46, Math.round(pages * 0.05 + 8)))
}

const clean = (s) => (s || '').trim()

export default function Library() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('author')
  const [selected, setSelected] = useState(null)

  const books = useMemo(() => {
    const list = data.library.map((b, i) => ({
      ...b,
      title: clean(b.title),
      author: clean(b.author),
      id: i,
      color: colorFor(clean(b.author)),
      w: widthFor(b.pages),
    }))
    const by = {
      author: (a, b) => a.author.localeCompare(b.author) || a.title.localeCompare(b.title),
      title: (a, b) => a.title.localeCompare(b.title),
      thickness: (a, b) => (b.pages || 0) - (a.pages || 0),
    }
    return list.sort(by[sort])
  }, [sort])

  const q = query.trim().toLowerCase()
  const matches = q
    ? books.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)).length
    : books.length

  const authorCount = new Set(books.map((b) => b.author).filter(Boolean)).size

  return (
    <>
      <div className="page-head">
        <h1>The Library</h1>
        <p>
          {books.length} books I own and have read — philosophy and history, policy
          and finance, a good deal of Shakespeare and Nietzsche. Each spine is coloured
          by author and sized by page count, so the collections show themselves.
        </p>
      </div>

      <section className="section" style={{ paddingTop: '1.5rem' }}>
        <div className="lib-controls">
          <div className="lib-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or author…"
              aria-label="Search the library"
            />
          </div>
          <div className="lib-sort">
            {[['author', 'By author'], ['title', 'A–Z'], ['thickness', 'By length']].map(([k, label]) => (
              <button key={k} className={sort === k ? 'active' : ''} onClick={() => setSort(k)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="lib-count">
          {q ? <>{matches} of {books.length} books</> : <>{books.length} books · {authorCount} authors</>}
        </div>

        <div className="shelf" onMouseLeave={() => {}}>
          {books.map((b) => {
            const dim = q && !(b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
            return (
              <div
                key={b.id}
                className={`spine ${dim ? 'dim' : ''} ${selected?.id === b.id ? 'selected' : ''}`}
                style={{ width: `${b.w}px`, background: `linear-gradient(90deg, ${b.color} 55%, ${darken(b.color, 0.72)})` }}
                title={`${b.title} — ${b.author || 'Unknown'}`}
                onClick={() => setSelected(selected?.id === b.id ? null : b)}
              >
                <span className="spine-label">{b.title}</span>
              </div>
            )
          })}
        </div>

        {selected && (
          <div className="book-detail">
            <div>
              <div className="bd-title">{selected.title}</div>
              <div className="bd-meta">
                {selected.author || 'Unknown author'}
                {selected.pages ? ` · ${selected.pages} pages` : ''}
              </div>
            </div>
            <button className="bd-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
          </div>
        )}

        <p className="lib-legend">
          <b>Colour</b> groups books by author · <b>width</b> tracks page count · click a spine for details.
        </p>

        <div className="borrow">
          <p>
            See something you'd like to read? <b>Email me.</b> Most of these are
            yours to borrow — I'd rather they be read than shelved.
          </p>
          <a href={`mailto:${email}?subject=Borrowing a book`} className="btn btn-primary">
            Ask to borrow →
          </a>
        </div>
      </section>
    </>
  )
}
