# skill: nano-banana-2

**Path:** `.claude/skills/nano-banana-2/SKILL.md`
**Owner:** Claude Code (skill author)
**Type:** Skill definition (Markdown + YAML frontmatter)

## Purpose
Thin wrapper around the **`mcp-image`** MCP server, which exposes `generate_image` for Google Gemini 3 image generation (Nano Banana 2 = Gemini 3.1 Flash Image; Nano Banana Pro = Gemini 3 Pro Image). Caller hands a complete prompt + optional reference images; skill forwards via `mcp__nano-banana-2__generate_image` and returns the saved file path.

## Trigger
Image generation / editing / style-transfer / compositing tasks.

## What it does NOT do
- Build prompts (caller's job — typically [[yuval-agent]]).
- Analyze reference images (caller's job).
- Move output files (caller moves them after).

## Dependencies
- [[mcp-config]] — `.mcp.json` must define the `nano-banana-2` MCP server entry.
- `GEMINI_API_KEY` env var — required for the MCP server.
- `IMAGE_OUTPUT_DIR` env var — recommended; defaults to `./output`.

## Related
- [[mcp-config]] — MCP server registration
- [[yuval-agent]] — primary caller
- [[claude-skills-folder]] — parent directory
- [[reference-folder]], [[outputs-folder]] — input/output for image flow
- [[yuval-bootstrap]] — session that introduced this skill
