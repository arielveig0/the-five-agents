# Output/

**Path:** `Output/` (repo root)
**Owner:** [[yael-agent]] (writes drafts) + CEO (post-pass image embedding)
**Type:** Markdown directory (rewritten articles)

## Purpose
Destination for rewritten articles produced by Yael. Each file is a `.md` in the project's voice, with `<!-- IMAGE: <description> -->` placeholders where images are needed. The CEO does a post-pass to call Yuval per placeholder and replace each one with `![alt](../outputs/<file>.png)`.

## ⚠️ Naming distinction
**Output/** (capital singular) ≠ **outputs/** (lowercase plural). They are separate folders for different purposes:

| Folder | Owner | Contents |
|---|---|---|
| `Output/` | [[yael-agent]] | rewritten article `.md` files |
| `outputs/` | [[yuval-agent]] | generated image `.png` files |

The user explicitly chose this naming convention to keep editorial output and visual output cleanly separated. Do not merge them.

## Naming convention
`<slug>-YYYYMMDD.md` — slug is lowercase-hyphenated English, ≤5 words, derived from article topic. Collisions get `-2`, `-3` suffix.

## Frontmatter
Every file Yael creates has minimal frontmatter:
```yaml
---
source: <original filename from Content/>
processed: YYYY-MM-DD
status: draft (awaiting CEO image fulfillment) | ready
---
```
Status flips from `draft` to `ready` after CEO finishes the image pass.

## Current state
Empty (`.gitkeep` placeholder only).

## Notes
- Yael's drafts use Hebrew RTL — preserve that.
- Style anchor: when [[writing-voice]] doesn't exist (currently it doesn't), Yael uses recent files in this folder as her stylistic reference. Bootstrap problem: empty folder = no anchor on the first article. Open Question.

## Related
- [[content-folder]] — source of inputs that get rewritten here
- [[yael-agent]] — primary writer
- [[outputs-folder]] — sibling but separate (Yuval's images, embedded into these files via CEO post-pass)
- [[ceo-agent-prd]] — describes the image-fulfillment pass that mutates files here
- [[yael-bootstrap]] — session that created this folder
