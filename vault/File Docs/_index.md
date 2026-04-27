# File Docs — Index

One note per file (or coherent file group) in the project. Each note explains what the file does, who owns it, and which other files relate to it.

## Topics

### Root
- [[claude-md]] — `CLAUDE.md`, project instructions for Claude Code
- [[gitignore]] — `.gitignore`, git exclusion rules

### Claude Code config (`.claude/`)
- [[claude-settings-local]] — `.claude/settings.local.json`, local-only permission allowlist
- [[claude-agents-folder]] — `.claude/agents/`, custom subagent definitions
- [[claude-commands-folder]] — `.claude/commands/`, custom slash commands
- [[claude-hooks-folder]] — `.claude/hooks/`, lifecycle hook scripts
- [[claude-skills-folder]] — `.claude/skills/`, project-scoped skills
- [[skill-obsidian-bases]] — `.claude/skills/obsidian-bases/SKILL.md`
- [[skill-obsidian-markdown]] — `.claude/skills/obsidian-markdown/SKILL.md`
- [[skill-obsidian-vault-workflow]] — `.claude/skills/obsidian-vault-workflow/SKILL.md`
- [[skill-nano-banana-2]] — `.claude/skills/nano-banana-2/SKILL.md`, Gemini 3 image gen via MCP
- [[skill-web-research]] — `.claude/skills/web-research/SKILL.md`, search/vet/extract procedure
- [[skill-qa-checklist]] — `.claude/skills/qa-checklist/SKILL.md`, 7-category QA review procedure
- [[yuval-agent]] — `.claude/agents/yuval.md`, creative image agent
- [[yael-agent]] — `.claude/agents/yael.md`, content writer agent (LLM-only)
- [[chen-agent]] — `.claude/agents/chen.md`, web researcher agent (with persistent search memory)
- [[guy-agent]] — `.claude/agents/guy.md`, QA gatekeeper (only agent that can reject)

### Image pipeline
- [[mcp-config]] — `.mcp.json`, MCP server registry (currently `nano-banana-2` only)
- [[reference-folder]] — `reference/`, visual inspiration consumed by Yuval
- [[outputs-folder]] — `outputs/`, generated images produced by Yuval

### Content pipeline (Chen → Yael → Yuval → Guy)
- [[memory-folder]] — `Memory/`, Chen's persistent search log
- [[content-folder]] — `Content/`, raw articles + Chen's source-files awaiting rewrite
- [[content-ready-folder]] — `Content/Ready/`, archive of processed sources
- [[output-folder]] — `Output/`, rewritten articles (distinct from `outputs/`)
- [[qa-reports-folder]] — `QA_Reports/`, Guy's persistent QA decisions log

### Obsidian app (`.obsidian/`)
- [[obsidian-config]] — `.obsidian/*.json`, Obsidian vault application settings
