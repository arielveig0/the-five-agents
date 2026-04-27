# .claude/commands/

**Path:** `.claude/commands/`
**Owner:** Claude Code
**Type:** Directory of slash-command definition files

## Purpose
Project-scoped **slash commands** — things the user can invoke as `/command-name`. Useful for repeatable prompts and workflows specific to this repo.

## Current state
Empty (`.gitkeep` placeholder only). No custom slash commands yet.

## Format
Each command is one Markdown file. Filename (without `.md`) becomes the slash-command name. Frontmatter optionally declares `description`, `allowed-tools`, and `argument-hint`.

## Related
- [[claude-agents-folder]] — sibling: subagents Claude dispatches internally
- [[claude-skills-folder]] — sibling: skills the model can self-invoke
- [[claude-hooks-folder]] — sibling: lifecycle hooks
- [[claude-md]] — project instructions
- [[vault-bootstrap]] — folder created during initial scaffold
