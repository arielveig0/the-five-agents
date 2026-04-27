# agent: yael (יעל)

**Path:** `.claude/agents/yael.md`
**Owner:** Claude Code (subagent definition)
**Type:** Subagent definition (Markdown + YAML frontmatter)

## Purpose
Content writer agent. Yael (יעל) is the project's editorial brain — pulls source articles from `Content/`, rewrites them in the project's voice (LLM-only, no external tools), marks where images are needed via `<!-- IMAGE: ... -->` placeholders, saves to `Output/`, moves the source to `Content/Ready/`. She intentionally does NOT call Yuval — the CEO does that in a second pass after Yael returns.

## Role in the system
Second subordinate of the CEO ([[ceo-agent-prd]]), filling slot 2/4 in the Routing Matrix. Together with [[yuval-agent]], they form the project's content production pipeline (Yael writes, Yuval illustrates, CEO orchestrates).

## Tool surface
- `Read` (source articles, including PDFs via `pages`)
- `Write` (output drafts to `Output/`)
- `Edit` (refining)
- `Glob` (find articles in `Content/`)
- `Grep` (style anchors in `Output/`)
- `Bash` — restricted to two operations: `mv` (move source to `Content/Ready/`) and `pandoc` (DOCX→MD conversion)

**Explicitly NOT in the toolset:** `Agent`, `WebFetch`, `WebSearch`, `Skill`, any MCP tool. Enforces the "LLM-only" boundary by absence.

## Boundaries
- Never calls Yuval or any other subagent.
- Never adds factual content not in the source — rewriting only, not researching.
- Never writes markdown image syntax `![](...)` — only `<!-- IMAGE: ... -->` comments.
- Never writes to `outputs/` (Yuval's image folder) — only to `Output/` (her articles).

## Image-placeholder protocol
When Yael recognizes an article needs an image, she emits exactly:
```
<!-- IMAGE: <3–7 word description> -->
```
on its own line, where she'd want the image. The CEO, post-pass, extracts these via `Grep`, dispatches Yuval per placeholder, and `Edit`s the file to replace the comment with `![alt](../outputs/<file>.png)`.

## Related
- [[ceo-agent-prd]] — owns the routing and the second-pass image fulfillment
- [[yuval-agent]] — fulfilled by CEO from Yael's placeholders
- [[content-folder]] — Yael's input
- [[output-folder]] — Yael's output (distinct from `outputs/`)
- [[content-ready-folder]] — where Yael moves consumed sources
- [[claude-agents-folder]] — parent directory
- [[yael-bootstrap]] — session that defined the agent
