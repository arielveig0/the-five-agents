# .claude/hooks/

**Path:** `.claude/hooks/`
**Owner:** Claude Code
**Type:** Directory of hook scripts

## Purpose
Holds executable scripts that Claude Code runs at specific **lifecycle events** — before/after a tool call, on session start/stop, on user prompt submit, etc. Hooks are how you enforce automated behaviors that the model itself cannot guarantee (e.g. "always run formatter after Write").

## Current state
Empty (`.gitkeep` placeholder only). No hooks configured yet.

## Configuration
Hook **registration** happens in `.claude/settings.json` (or `settings.local.json`) under the `"hooks"` key — placing a script in this folder alone does nothing until it's wired up there.

## Related
- [[claude-settings-local]] — where hook registrations live
- [[claude-agents-folder]], [[claude-commands-folder]], [[claude-skills-folder]] — siblings
- [[vault-bootstrap]] — folder created during initial scaffold
