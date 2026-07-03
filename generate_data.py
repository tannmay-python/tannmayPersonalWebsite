import json
import os
import re

with open('docx_data.json', 'r') as f:
    docx_data = json.load(f)
with open('metadata.json', 'r') as f:
    meta_data = json.load(f)
with open('xlsx_data.json', 'r') as f:
    xlsx_data = json.load(f)

# ---- Library ----
# Authors that got mangled (a page number landed in the author column).
author_fix = {
    "The Constitution Of India": "Government of India",
    "The Economics Book": "DK",
    "The Philosophy Book": "DK",
    "Gita Makaranda": "Swami Vidyaprakashananda",
}

def to_pages(*vals):
    for v in vals:
        if isinstance(v, str):
            m = re.match(r'^(\d+)(?:\.\d+)?$', v.strip())
            if m:
                return int(m.group(1))
    return None

library = []
for row in xlsx_data[1:]:
    if len(row) < 3:
        continue
    title = (row[1] or "").strip()
    author = (row[2] or "").strip()
    if not title or title == "-":
        continue
    if title.endswith('.0'):
        title = title[:-2].strip()
    pages = to_pages(row[3] if len(row) > 3 else None, author)
    if re.match(r'^\d+(?:\.\d+)?$', author):  # numeric = misplaced page no.
        author = author_fix.get(title, "")
    author = author_fix.get(title, author)
    library.append({"title": title, "author": author, "pages": pages})

# ---- Work ----
# Manual overrides where the crawler failed (403 / empty <title>).
title_override = {
    "https://theprint.in/opinion/pakistan-bluffing-6-trillion-mineral-wealth/2780538/":
        "Pakistan is bluffing. There's no proof for $6 trillion mineral wealth claim",
    "https://hightechir.substack.com/i/169108854/technopolitik-the-achilles-heel-of-americas-magnet-plan":
        "The Achilles' Heel of America's Magnet Plan",
    "https://hightechir.substack.com/p/160-tech-denial-as-a-catalyst-for":
        "Tech Denial as a Catalyst for Innovation",
    "https://hightechir.substack.com/p/153-unpacking-press-note-3-amendments":
        "Unpacking Press Note 3 Amendments",
}
date_override = {
    "https://theprint.in/opinion/pakistan-bluffing-6-trillion-mineral-wealth/2780538/": "2025-11-10",
}
outlet_map = {
    "timesofindia.indiatimes.com": "Times of India",
    "stratnewsglobal.tech": "StratNews Global",
    "indiasworld.in": "India's World",
    "moneycontrol.com": "Moneycontrol",
    "thehindu.com": "The Hindu",
    "theprint.in": "ThePrint",
    "hindustantimes.com": "Hindustan Times",
    "takshashila.org.in": "Takshashila Institution",
    "legion.takshashila.org.in": "Takshashila Institution",
    "youtube.com": "All Things Policy",
    "hightechir.substack.com": "Technopolitik",
}

def outlet_for(url):
    host = re.sub(r'^https?://', '', url).split('/')[0].lower()
    host = host.replace('www.', '')
    return outlet_map.get(host, host)

def clean_title(t, url):
    if url in title_override:
        return title_override[url]
    for suf in [' - YouTube', ' | Hindustan Times', ' - The Hindu', " | India's World",
                ' – Takshashila Institution', ' &mdash; The Takshashila Institution',
                ' - The Takshashila Institution', ' | India&#039;s World']:
        t = t.replace(suf, '')
    t = (t.replace('&#039;', "'").replace('&#39;', "'").replace('&quot;', '"')
          .replace('&mdash;', '—').replace('&amp;', '&').replace('OPINION | ', ''))
    t = t.replace('All Things Policy | ', '')
    return t.strip()

sections = {
    'op-eds:': 'Op-Eds', 'publications:': 'Publications', 'podcasts:': 'Podcasts',
    'projects:': 'Projects', 'blogs': 'Blogs', 'newsletter pieces:': 'Newsletters',
}
buckets = {v: [] for v in sections.values()}
current = None
for item in docx_data:
    text = item.get('text', '').strip().lower()
    if text in sections:
        current = sections[text]
    for link in item.get('links', []):
        url = link['url']
        meta = meta_data.get(url, {})
        title = clean_title(meta.get('title', '') or url, url)
        m = re.search(r'(\d{4}-\d{2}-\d{2})', meta.get('date_hint', ''))
        date = date_override.get(url, m.group(1) if m else "")
        if not date:  # many Takshashila URLs embed a YYYYMMDD stamp
            um = re.search(r'/(\d{4})(\d{2})(\d{2})-', url)
            if um:
                date = f"{um.group(1)}-{um.group(2)}-{um.group(3)}"
        if current:
            buckets[current].append({
                "title": title, "url": url, "date": date, "outlet": outlet_for(url),
            })

# sort each work bucket newest-first
for k in buckets:
    buckets[k].sort(key=lambda e: e['date'], reverse=True)

projects = [
    {
        "title": "India Critical Minerals Dashboard",
        "url": "https://indiacriticalminerals.com/",
        "blurb": "An interactive dashboard tracking India's critical-mineral demand, imports, and dependencies — built to make a tangled supply-chain story legible at a glance.",
        "tag": "Data · Policy",
    },
    {
        "title": "ChainWorld",
        "url": "https://tannmay-python.github.io/blockchain-seminar/",
        "blurb": "A visual, ground-up explainer of how blockchains actually work — built for people who bounce off the jargon.",
        "tag": "Explainer · Web",
    },
    {
        "title": "India's Tech Laws · 1885–2025",
        "url": "https://tannmay-python.github.io/techLawsList/",
        "blurb": "A browsable timeline of every major technology law India has passed in 140 years, from the Telegraph Act to today.",
        "tag": "Archive · Web",
    },
]

data = {
    "profile": {
        "name": "Tannmay Kumarr Baid",
        "role": "Adjunct Junior Scholar, Takshashila Institution",
        "school": "National Public School, HSR",
        "links": {
            "email": "tannmay1303@gmail.com",
            "linkedin": "https://www.linkedin.com/in/tannmaykumarrbaid/",
            "twitter": "https://x.com/tannmaybaid",
        },
    },
    "projects": projects,
    "work": {k: buckets[k] for k in
             ['Op-Eds', 'Publications', 'Podcasts', 'Blogs', 'Newsletters']},
    "library": library,
}

os.makedirs('src', exist_ok=True)
with open('src/data.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("library:", len(library), "with pages:", sum(1 for b in library if b['pages']))
for k, v in buckets.items():
    print(k, len(v))
