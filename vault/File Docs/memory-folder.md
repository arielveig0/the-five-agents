# Memory/

**Path:** `Memory/` (repo root)
**Owner:** [[chen-agent]] (read + write — Chen's exclusive memory)
**Type:** Persistent search log

## Purpose
Chen's **personal memory** — separate from the project-wide vault. The vault (under `vault/`) is Reuven's long-term memory for the whole project; `Memory/` is just for Chen, scoped to her domain (web searches she has performed).

The mechanism solves two problems:
1. **No duplicate searches** — before any new search, Chen reads this file to see if she already covered the topic. If yes, she returns the existing result instead of re-searching.
2. **Source-quality learning** — Chen records lessons about each publisher (paywalls, depth, language fit) so future searches choose better starting points without trial-and-error.

## Files
- `searches.md` — append-only (well, prepend-only) log. Newest entries on top. Each entry: date, request, queries used, sources reviewed/rejected, top source URL, saved filename, and notes for next time.
- `.gitkeep` — placeholder while the log is empty

## Protocol summary
- **Read** at start of every Chen task (mandatory; not optional even when the topic feels new).
- **Prepend** a new entry at the end of every successful search.
- Format follows the template at the top of `Memory/searches.md` itself.

## Notes
- `Memory/` is intentionally **outside `vault/`**. The vault is structured chronological session logs (different model). `Memory/` is structured operational data Chen reads/writes mid-task.
- If `Memory/searches.md` grows very large (1000+ entries), consider rotating to `Memory/archive/searches-YYYY.md` and keeping the live file scoped to last 12 months.
- Currently committed to git so collaborators share the search history. If sources start to leak sensitive client domains, move to `.gitignore` and switch to per-user memory.

## Related
- [[chen-agent]] — sole owner
- [[skill-web-research]] — the skill that produces the entries
- [[content-folder]] — where Chen writes the actual source files (the URLs in `Memory/searches.md` are pointers to here)
- [[chen-bootstrap]] — session that created this folder
