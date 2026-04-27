# CLAUDE.md

**Path:** `CLAUDE.md` (repo root)
**Owner:** Claude Code (claude.ai/code)
**Type:** Project instructions, plain Markdown

## Purpose
Loaded automatically into every Claude Code session in this repo. Holds project-level conventions: high-level architecture, build/test commands, language preferences, and anything Claude needs to know to be productive without re-discovering it each session.

## Current contents
- Project name and stage ("scaffolding stage")
- Note: primary working language with the user is Hebrew

## When to update
- New build/lint/test command becomes part of the workflow
- A non-obvious architectural pattern is introduced
- A convention emerges that a future session would otherwise miss

## Related
- [[gitignore]] — committed alongside `CLAUDE.md` in the initial scaffold
- [[claude-settings-local]] — local permission file that complements project-level instructions
- [[claude-agents-folder]], [[claude-commands-folder]], [[claude-hooks-folder]], [[claude-skills-folder]] — sibling Claude Code config surfaces
- [[vault-bootstrap]] — session that introduced this documentation
