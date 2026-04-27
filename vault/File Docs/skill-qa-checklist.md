# skill: qa-checklist

**Path:** `.claude/skills/qa-checklist/SKILL.md`
**Owner:** Claude Code (skill author)
**Type:** Skill definition (Markdown + YAML frontmatter)

## Purpose
Structured procedure for reviewing a finished content artifact (article + embedded images) against 7 quality categories before shipping. Built specifically for [[guy-agent]] but reusable by any future review-style agent.

## What it does (4 steps)
1. **Load context** — original brief, article (`Output/`), images (`outputs/`, multimodal Read), [[visual-identity]], optionally Chen's source (`Content/Ready/`)
2. **Run the 7-category checklist** — A. Brief alignment / B. Content quality / C. Brand voice / D. Image-content fit / E. Image-brand fit / F. Completeness / G. Technical
3. **Form a verdict** — APPROVED / REJECTED / APPROVED WITH MINOR NOTES, deterministic per the rules
4. **Write the report** — using `QA_Reports/_template.md`, filename `<slug>-YYYYMMDD-HHMM.md`

## What it does NOT do
- Not an editor — points to problems, doesn't fix them
- Not a brand strategist — applies what's in [[visual-identity]], doesn't reinvent
- Not subjective — every fail must point to a concrete checklist item

## Trigger
Invoked by [[guy-agent]] at the start of every QA pass. Could be reused by future reviewer-style agents (e.g. a security reviewer for code, a legal reviewer for copy).

## Iteration handling
The skill is iteration-aware:
- Iter 1: full breadth
- Iter 2: focused on previously-failed items, regression-check the rest
- Iter 3: last chance; if still failing, hard reject with "needs human review"

## Notes
- This is a **procedural** skill, not an MCP wrapper.
- The skill assumes the report template exists at `QA_Reports/_template.md`.

## Related
- [[guy-agent]] — sole current consumer
- [[qa-reports-folder]] — destination of every invocation's output
- [[claude-skills-folder]] — parent directory
- [[visual-identity]] — anchor for brand criteria within the checklist
- [[guy-bootstrap]] — session that introduced this skill
