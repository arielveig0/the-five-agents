# reference/

**Path:** `reference/` (repo root)
**Owner:** [[yuval-agent]] (read-only consumer)
**Type:** Image directory (visual inspiration)

## Purpose
Inspiration library for Yuval. Every image generation in the project starts with Yuval scanning this folder, analyzing style/palette/composition/mood, and selecting 2–4 images whose attributes match the current brief. The selection becomes `reference_images` in the MCP call.

## What goes here
- Photos, illustrations, screenshots, mood boards — anything that defines the project's intended visual identity.
- Filenames descriptive enough that Yuval can pick by name when there are many.
- Free-form structure — no required subfolders.

## What does NOT go here
- Generated outputs (those go to [[outputs-folder]]).
- Source assets unrelated to visual style.

## Current state
Empty (`.gitkeep` placeholder only). User will populate as the visual identity emerges.

## Related
- [[outputs-folder]] — destination of work that draws from here
- [[yuval-agent]] — primary consumer
- [[skill-nano-banana-2]] — receives selected references via the MCP `reference_images` parameter
- [[yuval-bootstrap]] — session that created this folder
