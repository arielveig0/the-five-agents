# .gitignore

**Path:** `.gitignore` (repo root)
**Owner:** Git
**Type:** Plaintext exclusion rules

## Purpose
Tells git which paths to leave out of version control. Anything matched here is invisible to `git add`, `git status`, and pushes.

## Current rules
- `.claude/settings.local.json` — local Claude Code permissions, may contain machine-specific or sensitive data
- `node_modules/`, `dist/`, `build/` — JavaScript/TypeScript build artifacts (preemptive)
- `.env`, `.env.local` — environment variable files (secrets)
- `.DS_Store`, `Thumbs.db` — OS metadata
- `*.log` — log output

## Notes
- The `.claude/` directory itself **is** committed (only `settings.local.json` is excluded). Subagents, slash commands, hooks, and skills are part of the repo.
- `vault/` is currently **not** ignored, so the vault is part of the repo history.

## Related
- [[claude-settings-local]] — the file this excludes from git
- [[claude-md]] — committed in the same initial scaffold
- [[vault-bootstrap]] — session that wrote these rules
