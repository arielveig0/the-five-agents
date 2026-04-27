# agent: guy (גיא)

**Path:** `.claude/agents/guy.md`
**Owner:** Claude Code (subagent definition)
**Type:** Subagent definition (Markdown + YAML frontmatter)

## Purpose
QA gatekeeper. Guy (גיא) is the **last** agent in every content pipeline — Reuven cannot ship anything to the user without Guy's approval. He runs a structured 7-category checklist, scores the artifact, and returns APPROVED / REJECTED / APPROVED WITH MINOR NOTES with concrete action items. He is the **only** agent allowed to reject a draft and bounce it back through Yael (or Yuval).

## Role in the system
Fourth subordinate of [[ceo-agent-prd]] — fills the final slot 4/4. Closes the loop opened by Chen → Yael → Yuval. Without Guy, every shipped artifact is "untested" by definition.

## Tool surface
- `Read` — multimodal (must actually view the images, not just paths)
- `Write` — produce QA reports in [[qa-reports-folder]]
- `Glob`, `Grep` — locate artifacts and run technical checks
- `Bash` — minimal, file existence checks
- `Skill` — invokes [[skill-qa-checklist]] for the procedure

**Explicitly NOT in the toolset:** `Edit` (Guy never modifies content), `Agent` (he reports to Reuven, doesn't dispatch), `WebFetch` / `WebSearch` (research isn't his job), no MCP image gen.

## Verdict rules (deterministic)
- **APPROVED** — all 7 categories ✅, zero ❌, zero ⚠️
- **APPROVED WITH MINOR NOTES** — all ✅ but 1-2 ⚠️ that don't block ship
- **REJECTED** — any ❌ in any category, or 3+ ⚠️ across the artifact

## Iteration loop
- **iter 1** — full review
- **iter 2** — focus on items that failed in iter 1
- **iter 3** — last resort. If still failing, hard reject with note "needs human review"

## Boundaries
- ❌ Never edits the artifact — only judges
- ❌ Never approves without seeing the images (multimodal Read mandatory)
- ❌ Never overrides a deterministic ❌ with "feels OK"
- ❌ Never dispatches Yael/Yuval directly — reports to Reuven

## Memory analogue
[[qa-reports-folder]] is Guy's persistent record. On iter 2/3, he reads the prior reports for the same article first to verify fixes match the action items.

## Related
- [[skill-qa-checklist]] — the 7-category procedure he invokes
- [[qa-reports-folder]] — `QA_Reports/` (Guy's persistent record)
- [[ceo-agent-prd]] — owns routing and the QA-gate flow
- [[yael-agent]], [[yuval-agent]] — upstream producers whose work Guy gates
- [[chen-agent]] — sometimes the ultimate source of facts; Guy verifies Yael didn't fabricate
- [[visual-identity]] — anchor for brand-voice and image-brand criteria
- [[output-folder]] — where the artifacts under review live
- [[outputs-folder]] — where the images Guy inspects live
- [[claude-agents-folder]] — parent directory
- [[guy-bootstrap]] — session that defined the agent
