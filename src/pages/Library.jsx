import { useState, useMemo, useEffect, useRef } from 'react'
import data from '../data.json'

const email = data.profile.links.email
const clean = (s) => (s || '').trim()
// catalogues file by surname — the last word of the author's name
const surname = (a) => clean(a).split(/\s+/).pop() || ''
const deArticle = (t) => t.replace(/^(The|A|An)\s+/i, '')

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function Library() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('author')
  const searchRef = useRef(null)

  // "/" focuses the search box; Escape clears it
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement !== searchRef.current) {
        e.preventDefault()
        searchRef.current?.focus()
      } else if (e.key === 'Escape') {
        setQuery('')
        searchRef.current?.blur()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const keyOf = (b) =>
    sort === 'author' ? (surname(b.author) || deArticle(b.title)) : deArticle(b.title)

  const books = useMemo(() => {
    const list = data.library.map((b, i) => ({
      ...b, title: clean(b.title), author: clean(b.author), id: i,
    }))
    return sort === 'author'
      ? list.sort((a, b) =>
          surname(a.author).localeCompare(surname(b.author)) || a.title.localeCompare(b.title))
      : list.sort((a, b) => deArticle(a.title).localeCompare(deArticle(b.title)))
  }, [sort])

  const q = query.trim().toLowerCase()
  const shown = q
    ? books.filter((b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    : books

  const groups = useMemo(() => {
    const m = new Map()
    for (const b of shown) {
      let L = keyOf(b).charAt(0).toUpperCase()
      if (!/[A-Z]/.test(L)) L = '#'
      if (!m.has(L)) m.set(L, [])
      m.get(L).push(b)
    }
    return [...m.entries()]
  }, [shown, sort]) // eslint-disable-line react-hooks/exhaustive-deps

  const present = new Set(groups.map(([L]) => L))
  const authorCount = new Set(books.map((b) => b.author).filter(Boolean)).size
  const totalPages = books.reduce((n, b) => n + (b.pages || 0), 0)

  return (
    <>
      <header className="masthead compact">
        <div className="masthead-inner">
        <h1>Library</h1>
        <p className="masthead-lede">
          A working library — philosophy and history, statecraft and finance, a run of
          Shakespeare, rather a lot of Nietzsche. Catalogued in full below, <b>filed by
          author, and open for lending</b>.
        </p>
        <div className="cat-stats">
          <span><b>{books.length}</b> volumes</span>
          <span><b>{authorCount}</b> authors</span>
          <span><b>{totalPages.toLocaleString('en-IN')}</b> pages, give or take</span>
        </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '1.2rem' }}>
        <div className="cat-bar">
          <div className="lib-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the catalogue — press /"
              aria-label="Search the library"
            />
          </div>
          <div className="lib-sort">
            {[['author', 'By author'], ['title', 'By title']].map(([k, label]) => (
              <button key={k} className={sort === k ? 'active' : ''} onClick={() => setSort(k)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <nav className="alpha-rail" aria-label="Jump to letter">
          {ALPHA.map((L) =>
            present.has(L)
              ? <a key={L} href={`#lib-${L}`}>{L}</a>
              : <span key={L}>{L}</span>
          )}
        </nav>

        {shown.length === 0 && (
          <p className="cat-empty">Nothing catalogued under “{query}”.</p>
        )}

        {groups.map(([L, items]) => (
          <div className="cat-group" key={L} id={`lib-${L}`}>
            <div className="cat-letter">{L}</div>
            <div>
              {items.map((b) => (
                <div className="cat-row" key={b.id}>
                  <span className="ct">{b.title}</span>
                  <span className="leader" aria-hidden="true" />
                  <span className="ca">{b.author || '—'}</span>
                  <span className="cp">{b.pages ? `${b.pages} pp.` : ''}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="borrow">
          <p>
            The lending desk is open. If something here catches your eye, <b>write to me</b> —
            books do more good in circulation than on a shelf.
          </p>
          <a href={`mailto:${email}?subject=Borrowing a book`} className="btn btn-primary">
            Borrow a book →
          </a>
        </div>
      </section>
    </>
  )
}
