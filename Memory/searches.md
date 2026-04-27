# Chen — Search Memory Log

This is **Chen's** persistent memory of every web search she's performed. She consults it BEFORE every search to avoid duplicate work, and APPENDS to it AFTER every successful search.

## How to read this file
- Newest entries at the **top** (Chen prepends, doesn't append).
- Each entry covers one search request.
- "Source URL" is the canonical URL Chen extracted content from.
- "Saved as" is the filename Chen wrote into `Content/` for Yael to pick up.

## How Chen uses this file (mandatory protocol)
1. **Before search** — Chen reads this file, scans the last ~20 entries, and looks for topic overlap with the new request.
   - If overlap is exact → return existing source/file to Reuven (CEO) without re-searching.
   - If overlap is partial → narrow the new search to fill only the gap.
   - If no overlap → fresh search.
2. **After search** — Chen prepends a new entry using the template below.

## Entry template

```markdown
### YYYY-MM-DD HH:MM — <topic in 5–8 words>
- **Request from:** Reuven (CEO)
- **Original ask:** <original phrasing of the request>
- **Search queries used:** `query 1`, `query 2`
- **Sources reviewed:** N (rejected: M)
- **Top source chosen:**
  - URL: https://...
  - Why this source: <1 line — authority, recency, depth>
- **Saved as:** `Content/<slug>-YYYYMMDD.md`
- **Notes:** <anything Chen learned for next time — e.g. "Globes paywalls heavy, prefer Calcalist for finance/Israel">
```

---

## Searches

_(no searches performed yet)_
