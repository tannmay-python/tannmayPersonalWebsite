# tannmaybaid — personal site

Live: https://tannmay-python.github.io/tannmayPersonalWebsite/

Vite + React. All content lives in **one file: [`src/data.json`](src/data.json)**.
Every push to `main` auto-builds and deploys via GitHub Actions (~2 min). No local
setup needed — edit on github.com (pencil icon), commit, done.

## Add a new op-ed / podcast / publication / blog / newsletter

In `src/data.json`, find `work` → the right category array, and add an entry:

```json
{
  "title": "Exact headline of the piece",
  "url": "https://…",
  "date": "2026-07-20",
  "outlet": "Hindustan Times"
}
```

`date` is `YYYY-MM-DD` — it drives sorting and the year groups. `outlet` is the
display name (e.g. "All Things Policy", "Technopolitik", "The Hindu").

## Add a project

`projects` array — first entry is the big featured card, the rest are companions:

```json
{
  "title": "Project name",
  "url": "https://…",
  "blurb": "One or two sentences on what it is and why it exists.",
  "tag": "Data · Policy"
}
```

## Add a book

`library` array:

```json
{ "title": "Book Title", "author": "Author Name", "pages": 320 }
```

`pages` optional (`null` is fine). The catalogue files by author surname automatically.

## Everything else

Name, role, email, socials: `profile` at the top of `data.json`.
Run locally: `npm install && npm run dev`. Manual deploy fallback: `npm run deploy`.
