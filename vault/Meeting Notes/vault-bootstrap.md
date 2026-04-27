# Vault Bootstrap

## Overview
Initial scaffold of the project's Obsidian vault following the [[skill-obsidian-vault-workflow]] protocol. Created the four canonical folders (Meeting Notes, Content Briefs, Publishing Log, Brand Guidelines) plus a custom **File Docs** folder holding one note per project file or coherent file group. Each File Docs note explains purpose, owner, and lists wikilinked related files. The vault now serves as both Claude's long-term memory and a navigable map of the repo's current (small) surface area.

## Open Questions
- Should `.obsidian/workspace.json` eventually be added to [[gitignore]] (it churns on every UI interaction)? Defer until churn becomes annoying.
- The credential captured inside [[claude-settings-local]] should be revoked at GitHub and that allow-rule cleaned out — flagged but not yet done in this session.
- Custom **File Docs** folder is outside the four canonical vault folders — keep separate or absorb into Meeting Notes later? Working assumption: keep separate, since file-docs are reference material, not session logs.

## Session Log

### 2026-04-27 — Initial vault scaffold and per-file documentation [shipped]
- **What was done:**
  - Created `vault/Meeting Notes/`, `vault/Content Briefs/`, `vault/Publishing Log/`, `vault/Brand Guidelines/`, each with an `_index.md`.
  - Created `vault/File Docs/` (custom folder) with one note per meaningful project file: [[claude-md]], [[gitignore]], [[claude-settings-local]], [[claude-agents-folder]], [[claude-commands-folder]], [[claude-hooks-folder]], [[claude-skills-folder]], [[skill-obsidian-bases]], [[skill-obsidian-markdown]], [[skill-obsidian-vault-workflow]], [[obsidian-config]].
  - Each note documents path, owner, purpose, current state, and wikilinked related files.
- **Decisions:**
  - Used a custom **File Docs** folder rather than forcing per-file notes into Meeting Notes — file documentation is reference material, not chronological session logs, and mixing them would pollute the Session Log model.
  - Combined the four `.obsidian/*.json` files into a single [[obsidian-config]] note since they're conceptually one config surface.
  - The empty `.gitkeep` placeholders inside `.claude/agents|commands|hooks|skills` were not given individual notes — the *folder* itself is the documented unit.
- **Notes / Caveats:**
  - During the earlier git push step, a Personal Access Token was pasted in chat and ended up captured in [[claude-settings-local]] as part of an auto-approved allow-rule. That credential must be revoked at GitHub and the rule manually pruned.
  - `vault/` is currently NOT ignored, so the entire vault becomes part of the repo — fine for now since this is a solo project, revisit if collaborators join.
- **Related:** [[skill-obsidian-vault-workflow]], [[skill-obsidian-markdown]], [[claude-md]], [[claude-settings-local]]
