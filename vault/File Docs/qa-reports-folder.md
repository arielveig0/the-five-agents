# QA_Reports/

**Path:** `QA_Reports/` (repo root)
**Owner:** [[guy-agent]] (write-only — Guy's exclusive log)
**Type:** Persistent QA report log

## Purpose
Every QA pass Guy performs produces one report in this folder. Reports are immutable — even on REJECTED, the report stays; the next iteration creates a *new* report with a fresh timestamp. This makes the folder a complete audit trail of every shipping decision.

The folder is also Guy's **memory** — on iteration 2 or 3, he reads the prior report(s) for the same article first, to know exactly what failed and verify the fixes target the right items.

## Files
- `_template.md` — the canonical report template Guy copies for every new review. Stays fixed.
- `<article-slug>-YYYYMMDD-HHMM.md` — one file per QA pass. Timestamped because the same article may be reviewed multiple times in a single iteration loop.
- `.gitkeep` — placeholder while empty

## Naming convention
`<article-slug>-YYYYMMDD-HHMM.md`:
- `article-slug` = same slug as in `Output/<slug>-YYYYMMDD.md` so reports are easily linked to their target.
- `YYYYMMDD-HHMM` allows multiple reports per day for the same article (iter 1 / iter 2 / iter 3).

## Report contents (per `_template.md`)
- **Metadata** — article path, brief, sources, images, iteration #
- **Checklist results** — 7 categories with ✅ / ❌ / ⚠️ per item
- **Verdict** — APPROVED / REJECTED / APPROVED WITH MINOR NOTES
- **Action items** (if REJECTED) — specific, actionable fixes for Yael and/or Yuval
- **Notes for next time** — patterns Guy learns about Yael's blind spots or Yuval's weak categories

## Notes
- Currently committed to git so collaborators can audit shipping decisions. If the folder grows large, rotate per-year (`QA_Reports/2026/`).
- On `iter ≥ 3 REJECT`, the report includes `final_iteration: true` to flag for human review.

## Related
- [[guy-agent]] — sole writer
- [[skill-qa-checklist]] — produces the structured content of each report
- [[output-folder]] — what each report reviews
- [[outputs-folder]] — images each report inspects
- [[guy-bootstrap]] — session that created this folder
