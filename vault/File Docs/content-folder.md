# Content/

**Path:** `Content/` (repo root)
**Owner:** [[yael-agent]] (read-only consumer; moves files out)
**Type:** Article inbox (Markdown / TXT / PDF / DOCX)

## Purpose
Inbox for raw articles awaiting rewrite. The user (or any contributor) drops source files here; Yael picks them up one at a time, rewrites them into [[output-folder]], and moves the original into [[content-ready-folder]] when done. The folder always represents "what needs to be processed."

## Accepted formats
- `.md` — preferred, no conversion needed
- `.txt` — Yael reads directly
- `.pdf` — Yael reads via Read tool's `pages` parameter
- `.docx` — Yael runs `pandoc` to convert before reading; if pandoc isn't installed, she stops and reports

## Naming convention
Free-form for inputs. Yael generates the slug for the output filename based on article topic, not source filename.

## Current state
Empty (`.gitkeep` placeholder only).

## Notes
- Subfolder `Content/Ready/` is the "done" pile — see [[content-ready-folder]].
- The capital `C` is intentional and chosen by the user; do not normalize to lowercase. Yael's `Output/` similarly capitalized; Yuval's `outputs/` (separate folder) is lowercase plural.

## Related
- [[content-ready-folder]] — destination after Yael finishes a source
- [[output-folder]] — where the rewritten version lands
- [[yael-agent]] — sole consumer
- [[yael-bootstrap]] — session that created this folder
