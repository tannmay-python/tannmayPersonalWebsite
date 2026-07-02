import json
import os
import re

with open('docx_data.json', 'r') as f:
    docx_data = json.load(f)
    
with open('metadata.json', 'r') as f:
    meta_data = json.load(f)

with open('xlsx_data.json', 'r') as f:
    xlsx_data = json.load(f)

# parse library
library = []
# skip header
for row in xlsx_data[1:]:
    if len(row) >= 3:
        title = row[1]
        author = row[2]
        if title and title != "-" and author and author != "-":
            # remove .0 from title if present
            if isinstance(title, str) and title.endswith('.0'):
                title = title[:-2]
            library.append({"title": title, "author": author})

# parse work
op_eds = []
podcasts = []
publications = []
projects = []
blogs = []
newsletters = []

current_section = None
for item in docx_data:
    text = item.get('text', '').strip()
    if text.lower() == 'op-eds:':
        current_section = op_eds
    elif text.lower() == 'publications:':
        current_section = publications
    elif text.lower() == 'podcasts:':
        current_section = podcasts
    elif text.lower() == 'projects:':
        current_section = projects
    elif text.lower() == 'blogs':
        current_section = blogs
    elif text.lower() == 'newsletter pieces:':
        current_section = newsletters
        
    for link in item.get('links', []):
        url = link['url']
        meta = meta_data.get(url, {})
        title = meta.get('title', url)
        # clean title
        title = title.replace(' - YouTube', '').replace(' | Hindustan Times', '').replace(' - The Hindu', '')
        title = title.replace(' | India\'s World', '').replace(' \u2013 Takshashila Institution', '')
        title = title.replace('&#039;', "'").replace('&quot;', '"').replace('&mdash;', '-')
        title = title.replace('OPINION | ', '')
        
        date_hint = meta.get('date_hint', '')
        date = ""
        if date_hint:
            # extract simple date like YYYY-MM-DD or Month YYYY
            match = re.search(r'(\d{4}-\d{2}-\d{2})', date_hint)
            if match:
                date = match.group(1)
                
        if not title:
            title = url
            
        entry = {"title": title, "url": url, "date": date}
        
        if current_section is not None:
            current_section.append(entry)

portfolio_data = {
    "profile": {
        "name": "Tannmay Kumarr Baid",
        "bio": "I'm a 12th-grade commerce student at National Public School, HSR, and an Adjunct Junior Scholar at the Takshashila Institution. I am highly curious and have spent years exploring fields ranging from astrophysics and neuroscience to policy, law, economics, finance, and tech.",
        "education": "National Public School, HSR (High School Diploma) | The Takshashila Institution (GCPP TP Cohort 43 Grad, Outstanding Performance)",
        "links": {
            "linkedin": "https://www.linkedin.com/in/tannmaykumarrbaid/",
            "email": "tannmay1303@gmail.com",
            "twitter": "https://x.com/tannmaybaid"
        },
        "hobbies": ["Astronomy (8-inch Dobsonian telescope)", "Reading", "Math", "Gym", "Debate (ISDS Top-40 in 2023, Top-18 in 2025 | LSE Open Senior Novice Gold Medal)"]
    },
    "projects": projects,
    "work": {
        "Op-Eds": op_eds,
        "Publications": publications,
        "Podcasts": podcasts,
        "Blogs": blogs,
        "Newsletters": newsletters
    },
    "library": library
}

os.makedirs('src', exist_ok=True)
with open('src/data.json', 'w') as f:
    json.dump(portfolio_data, f, indent=2)
