# skill: web-research

**Path:** `.claude/skills/web-research/SKILL.md`
**Owner:** Claude Code (skill author)
**Type:** Skill definition (Markdown + YAML frontmatter)

## Purpose
Procedure for **finding, vetting, and extracting** current content from the open web. Built specifically for [[chen-agent]] but designed to be reusable by any future agent that needs grounded, cited research.

## What it does (5 steps)
1. **Plan queries** — 2-4 distinct searches varying by language, specificity, intent
2. **Search** — `WebSearch` for primary discovery
3. **Filter for quality** — score by authority / recency / depth / originality / accessibility; reject SEO spam, content farms, AI-generated listicles, anything older than 3 years for fast-moving topics
4. **Fetch and extract** — `WebFetch` on top 1-3 sources with a precise extraction prompt
5. **Return structured output** — Markdown block per source with thesis, facts, quotes, caller notes

## What it does NOT do
- Not a writer (no rewriting; quote verbatim with attribution)
- Not a translator (preserves source language for direct quotes)
- Not an analyst (doesn't synthesize "the truth"; presents what sources say)
- Not creative (no embellishment beyond the source)

## Trigger
Invoked by [[chen-agent]] at the start of every research task. Could later be invoked by any other agent that needs current/cited information.

## Notes
- This is a **procedural** skill, not a tool wrapper. The model calling it uses `WebSearch` + `WebFetch` directly, in the order this skill prescribes. There is no `mcp__web-research`.
- `WebSearch` is US-only — the skill documents the fallback (direct `WebFetch` on known authoritative URLs) when WebSearch is unavailable.

## Related
- [[chen-agent]] — the only current consumer
- [[claude-skills-folder]] — parent directory
- [[memory-folder]] — Chen's record of past invocations of this skill
- [[content-folder]] — destination of the skill's output (via Chen)
- [[chen-bootstrap]] — session that introduced this skill
