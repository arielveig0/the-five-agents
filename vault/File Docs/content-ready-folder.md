# Content/Ready/

**Path:** `Content/Ready/` (repo root)
**Owner:** [[yael-agent]] (write-only — moves files in after processing)
**Type:** Archive of processed source articles

## Purpose
"Done pile" for source articles that Yael already rewrote. Yael moves the original here as the final step of every job (step 7 of her workflow), so [[content-folder]] always represents "still to do" while `Content/Ready/` represents "already done." Source files are kept (not deleted) so the original is recoverable if a rewrite needs to be redone.

## Naming
Files keep their original names from `Content/`. Collisions get a date prefix: `2026-04-27-<original>.<ext>`.

## Current state
Empty (`.gitkeep` placeholder only).

## Notes
- This folder grows monotonically; if it gets large, consider moving older entries to a `Content/Archive/<year>/` subfolder.
- Could be added to `.gitignore` later if the volume becomes annoying — currently committed.

## Related
- [[content-folder]] — the "to do" pile this archives from
- [[output-folder]] — the rewritten artifact
- [[yael-agent]] — the only writer
- [[yael-bootstrap]] — session that created this folder
