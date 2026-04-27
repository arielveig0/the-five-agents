# agent: yuval (יובל)

**Path:** `.claude/agents/yuval.md`
**Owner:** Claude Code (subagent definition)
**Type:** Subagent definition (Markdown + YAML frontmatter)

## Purpose
Creative image agent. Yuval (יובל) is the project's "art director" — owns visual consistency across every image generated. Workflow: scan `reference/` → analyze style/palette/composition → fuse with the user's brief → call [[skill-nano-banana-2]] → save to `outputs/`.

## Role in the system
First subordinate of the CEO ([[ceo-agent-prd]]). The CEO routes any image-generation request to Yuval; the user does not call Yuval directly.

## Tool surface
- `Read` (incl. multimodal image reads of `reference/`)
- `Glob` (find reference files)
- `Write` / `Edit` (manage outputs)
- `Bash` (move generated files into `outputs/`)
- `Skill` (invoke [[skill-nano-banana-2]])
- Plus any tool the inherited Claude Code default permits (Yuval's frontmatter declares a focused subset)

## Boundaries
- Never skips the `reference/` scan.
- Never bypasses the skill with a raw MCP call.
- Never copies a reference 1:1 — extracts *style*, not content.
- Never writes non-model outputs to `outputs/`.

## Related
- [[skill-nano-banana-2]] — the only image-gen tool Yuval uses
- [[mcp-config]] — underlying MCP infra
- [[reference-folder]] — Yuval's inspiration source
- [[outputs-folder]] — Yuval's destination
- [[ceo-agent-prd]] — Yuval is the first row in the CEO routing matrix
- [[claude-agents-folder]] — parent directory
- [[yuval-bootstrap]] — session that defined the agent
