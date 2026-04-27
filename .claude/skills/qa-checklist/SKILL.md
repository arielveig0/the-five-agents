---
name: qa-checklist
description: Structured 7-category QA review for content artifacts (rewritten articles + their generated images) before they ship to the user. Reads the article and images, evaluates against brief alignment, content quality, brand voice, image-content fit, image-brand fit, completeness, and technical correctness, and produces a verdict (APPROVED / REJECTED / APPROVED WITH MINOR NOTES) plus actionable correction items. Use whenever a final draft is ready and needs gatekeeping before user delivery.
---

# QA Checklist Skill

A focused, structured review procedure for the content pipeline. The caller (typically [guy] agent) supplies the article path + image paths + the original brief; this skill walks through 7 checklists, scores each, and emits a verdict.

## When to use
- A final draft from [yael] + [yuval] is ready and waiting for ship approval.
- Re-review after [yael] returned a corrected version following a previous REJECT.

## When NOT to use
- The caller wants to *fix* problems (Yael's or Yuval's job — Guy only flags).
- The artifact is intermediate (Yael's draft without images yet — wait until pipeline complete).
- The caller wants a "general opinion" — this skill is binary-ish (pass/fail per criterion).

## Workflow (4 steps)

### 1. Load context
- Read the **original brief** from Reuven (the prompt that started this pipeline run).
- Read the **article** at `Output/<file>.md` (full content, not just summary).
- For each image referenced in the article — `Read` (multimodal) `outputs/<image>.png` to actually see it.
- Read [[visual-identity]] from `vault/Brand Guidelines/` for brand reference.
- If the article cites Chen's source, read `Content/Ready/<source-file>.md` to verify the rewrite is faithful.

### 2. Run the 7-category checklist
For each item: ✅ pass / ❌ fail / ⚠️ partial. Be strict — partial means action is needed.

#### A. Brief alignment (does it answer what was asked?)
- Article addresses the original request, not a tangentially related topic.
- Angle/tone matches what Reuven asked for.
- Right audience (B2B vs B2C, technical vs accessible).

#### B. Content quality
- Hebrew flows naturally; no translationese or awkward syntax.
- Logical structure (hook → body → close).
- Subheadings aid scanning.
- Length appropriate to the content type (article vs LinkedIn post vs script).
- Free of repetition, fluff, unnecessary intensifiers.

#### C. Brand voice
- Matches the brand's "smart-with-humor, professional-yet-warm, no-bullshit" personality (see [[visual-identity]] section 6).
- Direct sentences, not throat-clearing.
- The wink — confident, not begging.

#### D. Image-content alignment
- Each image sits in a place where it actually relates to the surrounding text.
- Alt text accurately describes the image.
- No purely decorative images that add no information.

#### E. Image-brand alignment
- Palette is strictly navy `#1E2A5C` + turquoise `#3DB8C5` + white. No drift.
- Style is flat illustration with thick rounded navy outlines (matches [[visual-identity]] section 4).
- If the brand mascot appears — the wink and lightbulb are intact.
- Technically clean — no AI artifacts, no garbled hands, no broken text.

#### F. Completeness
- Title is present and compelling (not generic).
- Hook in first 2-3 sentences grabs attention.
- Conclusion / CTA at the end.
- Hero image present (when appropriate to the content type).
- Sources cited if the article was based on Chen's research.
- Frontmatter has `source`, `processed`, `status` fields.

#### G. Technical
- Filename follows convention: `<slug>-YYYYMMDD.md`.
- Image links work — `![alt](../outputs/<file>.png)` paths are valid.
- No leftover placeholders (`<!-- IMAGE: ... -->` should all be replaced by actual `![]()`).
- No leftover comments, draft notes, or scaffolding.
- Source file moved to `Content/Ready/`.

### 3. Form the verdict
Decision rule:
- **APPROVED** — all 7 categories passed (zero ❌, zero ⚠️).
- **APPROVED WITH MINOR NOTES** — all categories passed but with 1-2 ⚠️ that don't block ship; note them for awareness, don't bounce back.
- **REJECTED** — any ❌ in any category, or 3+ ⚠️ across the article.

### 4. Write the report
Use the template at `QA_Reports/_template.md`. Filename: `<article-slug>-YYYYMMDD-HHMM.md` (timestamp matters because the same article may be reviewed multiple times in iteration loops).

If REJECTED — the **Action items** section is mandatory and must be specific enough that Yael can act without re-reading the whole article. Format:
```
1. סקציה X פסקה Y: <משפט מדויק שצריך לשנות, ואיך>
2. כותרת השלישית — מנופחת מדי, לקצר ל-7 מילים
3. ...
```

For Yuval, if an image needs replacing — give the exact filename, the reason, and a refined description.

## Standard call shape

This is a procedural skill — no MCP. Guy invokes it conceptually as the body of his task. The output is the QA report file + a one-line verdict to return to Reuven.

## Error handling

- **Article missing** → return immediate error to Reuven. Don't write a partial report.
- **Image referenced but file doesn't exist** → automatic ❌ in category G (Technical).
- **Brief not provided / unclear** → ask Reuven for the brief; don't guess.
- **Re-review (iteration > 1)** → focus the checklist on the items that were ❌ last time. If they're now ✅, review the whole document for regressions, then approve.
- **Infinite loop risk (iteration ≥ 3)** → hard reject with note "needs human review — Yael couldn't fix in 2 iterations." Stop the loop.

## What this skill is NOT

- Not a writer / editor — Guy doesn't fix anything, only flags.
- Not a designer — Guy doesn't generate alternative images, only judges.
- Not subjective — every fail must point to a concrete checklist item, not "feels off."
