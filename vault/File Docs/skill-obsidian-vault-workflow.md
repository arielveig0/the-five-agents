# skill: obsidian-vault-workflow

**Path:** `.claude/skills/obsidian-vault-workflow/SKILL.md`
**Owner:** Claude Code (skill author)
**Type:** Skill definition (Markdown + YAML frontmatter)

## Purpose
Mandatory **vault read/write protocol** for this project. Defines:
- One file per topic (not dated filenames) under `vault/Meeting Notes/`, `Content Briefs/`, `Publishing Log/`, `Brand Guidelines/`
- Each topic file: Overview + Open Questions + chronological Session Log
- Folder `_index.md` listing every topic in that folder
- Phase 1 (read context before work) + Phase 2 (append a session entry after work) checklists
- Status tags `[shipped]` / `[wip]` / `[planned]` etc. on every session heading
- Wikilinks required on every Session Log "Related" line

## Trigger
Invoked at the start AND end of every coding/content/architecture/bugfix/review task in this repo.

## Why it exists
Vault is Claude Code's long-term memory — without this protocol, sessions can't reload context cheaply or hand off to each other.

## Related
- [[skill-obsidian-markdown]] — sibling: provides the syntax used inside vault notes
- [[skill-obsidian-bases]] — sibling: lets future sessions build dashboard views over the vault
- [[claude-skills-folder]] — parent directory
- [[claude-md]] — project instructions; this skill complements them as runtime memory
- [[vault-bootstrap]] — first session to apply this protocol
