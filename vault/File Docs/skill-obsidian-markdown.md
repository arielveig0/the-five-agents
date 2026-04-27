# skill: obsidian-markdown

**Path:** `.claude/skills/obsidian-markdown/SKILL.md`
**Owner:** Claude Code (skill author)
**Type:** Skill definition (Markdown + YAML frontmatter)

## Purpose
Teaches Claude to write **Obsidian Flavored Markdown** — CommonMark + GFM extended with wikilinks (`[[Note]]`), embeds (`![[Note]]`), callouts, properties (frontmatter), comments, tags, and other Obsidian-specific syntax.

## Trigger
Invoked when working with `.md` files in an Obsidian vault, or when the user mentions wikilinks, callouts, frontmatter, tags, or embeds.

## What it covers
- Frontmatter property types (referenced via `references/PROPERTIES.md`)
- Wikilinks vs Markdown links (when to use which)
- Embed syntax for notes, images, PDFs (referenced via `references/EMBEDS.md`)
- Callouts, comments, and other Obsidian extensions

## Related
- [[skill-obsidian-vault-workflow]] — sibling that governs *where* notes go; this skill governs *how they read*
- [[skill-obsidian-bases]] — sibling that consumes the notes this skill creates
- [[claude-skills-folder]] — parent directory
- [[obsidian-config]] — the app these notes are rendered in
- [[vault-bootstrap]] — applied this skill's syntax (wikilinks) throughout the vault
