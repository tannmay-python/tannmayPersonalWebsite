import json
import urllib.request
import re
import concurrent.futures

with open('docx_data.json', 'r') as f:
    data = json.load(f)

def fetch_info(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'})
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        
        title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
        title = title_match.group(1).strip() if title_match else url
        
        # basic date extraction
        date = ""
        date_match = re.search(r'("datePublished":\s*"[^"]+"|property="article:published_time"\s+content="[^"]+")', html, re.IGNORECASE)
        if date_match:
            date = date_match.group(1)
        elif 'youtube' in url:
            date_match2 = re.search(r'"publishDate":"([^"]+)"', html)
            if date_match2:
                date = date_match2.group(1)
            
        return {"url": url, "title": title.replace('\n', '').strip(), "date_hint": date}
    except Exception as e:
        return {"url": url, "title": url, "error": str(e)}

results = {}
urls_to_fetch = []
for item in data:
    for link in item.get('links', []):
        urls_to_fetch.append(link['url'])

urls_to_fetch = list(set(urls_to_fetch)) # unique

with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    futures = {executor.submit(fetch_info, url): url for url in urls_to_fetch}
    for future in concurrent.futures.as_completed(futures):
        res = future.result()
        results[res['url']] = res

with open('metadata.json', 'w') as f:
    json.dump(results, f, indent=2)
