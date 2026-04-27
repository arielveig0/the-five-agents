# skill: obsidian-bases

**Path:** `.claude/skills/obsidian-bases/SKILL.md`
**Owner:** Claude Code (skill author)
**Type:** Skill definition (Markdown + YAML frontmatter)

## Purpose
Teaches Claude to create and edit Obsidian **Bases** — `.base` files that produce database-style views (table / cards / list / map) over notes in the vault, with filters, formulas, and summaries.

## Trigger
Invoked when the user works with `.base` files or mentions Bases, table views, card views, filters, or formulas in Obsidian.

## What it covers
- `.base` file YAML schema (filters, formulas, views, ordering)
- Validation rules and common YAML pitfalls
- Testing the rendered view inside Obsidian

## Related
- [[skill-obsidian-markdown]] — sibling skill for `.md` notes (Bases query the notes that this skill creates)
- [[skill-obsidian-vault-workflow]] — sibling skill governing where notes live
- [[claude-skills-folder]] — parent directory
- [[obsidian-config]] — the app this skill targets
- [[vault-bootstrap]] — first session that documented this skill
