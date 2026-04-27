# .claude/skills/

**Path:** `.claude/skills/`
**Owner:** Claude Code
**Type:** Directory of skill packages

## Purpose
Project-scoped **skills** — focused capability bundles the model itself invokes when the task matches the skill's trigger description. Each skill is a folder with a `SKILL.md` (frontmatter declaring `name` + `description`, then instructions) and optionally supporting reference files.

## Current state
Three Obsidian skills present:
- [[skill-obsidian-bases]]
- [[skill-obsidian-markdown]]
- [[skill-obsidian-vault-workflow]]

## Format
```
.claude/skills/<skill-name>/
  SKILL.md           # required: frontmatter (name, description) + body
  references/*.md    # optional: deep-dive docs the skill links to
```

## Related
- [[claude-agents-folder]] — sibling: agents are dispatched, skills are self-invoked
- [[claude-commands-folder]], [[claude-hooks-folder]] — siblings
- [[skill-obsidian-bases]], [[skill-obsidian-markdown]], [[skill-obsidian-vault-workflow]] — the skills inside
- [[vault-bootstrap]] — folder created during initial scaffold
