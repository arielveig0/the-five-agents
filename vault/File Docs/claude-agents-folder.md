# .claude/agents/

**Path:** `.claude/agents/`
**Owner:** Claude Code
**Type:** Directory of agent definition files

## Purpose
Holds custom **subagent** definitions for this project. Each subagent is a specialized assistant Claude Code can dispatch via the Agent tool — useful for parallelizing independent work or isolating heavy-context research from the main thread.

## Current state
Empty (`.gitkeep` placeholder only). No project subagents defined yet.

## Format
Each subagent is one Markdown file with YAML frontmatter declaring `name`, `description`, allowed tools, and the system prompt body.

## Related
- [[claude-skills-folder]] — sibling: skills are user-invokable, agents are dispatched by Claude
- [[claude-commands-folder]] — sibling: slash commands the user types directly
- [[claude-hooks-folder]] — sibling: lifecycle scripts the harness runs
- [[claude-md]] — project instructions that may reference subagents once they exist
- [[vault-bootstrap]] — folder created during initial scaffold
