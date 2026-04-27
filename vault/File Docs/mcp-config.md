# .mcp.json

**Path:** `.mcp.json` (repo root)
**Owner:** Claude Code (project-scoped MCP config)
**Type:** JSON

## Purpose
Declares Model Context Protocol (MCP) servers that Claude Code will spawn for this project. Project-scope (not user-scope) so any collaborator who clones the repo gets the same servers.

## Current servers
- **`nano-banana-2`** — runs `npx -y mcp-image`, exposes `generate_image` for Google Gemini 3 (Nano Banana 2 / Pro) image generation. Used by [[yuval-agent]] via [[skill-nano-banana-2]].

## Required environment variables
- `GEMINI_API_KEY` — Google AI Studio API key
- `IMAGE_OUTPUT_DIR` — absolute path to the project's `outputs/` folder

These are referenced in `.mcp.json` via `${VAR}` substitution. Two loading paths:
1. **Shell export** (most reliable) — export in PowerShell/bash before launching Claude Code.
2. **`.env` file** (project root, gitignored) — `mcp-image` is Node.js and reads `.env` from its CWD via dotenv. Template lives at [.env.example](../../.env.example).

If unset, the server fails on first call with a credential / path error.

## Notes
- The `IMAGE_QUALITY` env in the config is hard-coded to `balanced` — overridable per call via the tool's `quality` parameter.
- To add another MCP server, append under `mcpServers` and reload Claude Code.

## Related
- [[skill-nano-banana-2]] — the skill that consumes this MCP
- [[yuval-agent]] — the agent that uses the skill
- [[reference-folder]], [[outputs-folder]] — input/output directories for image generation
- [[yuval-bootstrap]] — session that introduced this config
