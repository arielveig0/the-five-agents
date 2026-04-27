# .claude/settings.local.json

**Path:** `.claude/settings.local.json`
**Owner:** Claude Code (per-user, per-machine)
**Type:** JSON

## Purpose
Stores permission decisions made on this machine — which Bash/PowerShell commands and tool calls Claude is allowed to run without re-prompting. Excluded from git via [[gitignore]] so per-user choices don't leak between collaborators.

## Schema (current)
```json
{
  "permissions": {
    "allow": [ "<glob-style command match>", ... ]
  }
}
```

## Notes
- File is auto-grown by Claude Code as the user clicks "Always allow" on permission prompts.
- For shared/project-level rules, use `.claude/settings.json` instead (which IS committed).
- One entry currently includes a literal credential captured during a one-off auth flow — should be cleaned manually; the credential should also be revoked at GitHub.

## Related
- [[claude-md]] — project-level instructions sit alongside this
- [[gitignore]] — excludes this file
- [[vault-bootstrap]] — flagged the credential leak
