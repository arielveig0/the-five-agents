---
name: web-research
description: Find authoritative, current articles or sources on a given topic via web search, evaluate their quality, extract the most relevant content (with the source URL), and return a clean Markdown summary suitable for downstream rewriting. Use when a task requires up-to-date information, primary sources with links, or quotes from named publications. Avoids hallucinated facts by always grounding output in cited URLs.
---

# Web Research Skill

A focused procedure for **finding, vetting, and extracting** content from the open web. The caller (typically the [chen] agent) supplies a topic + intent; this skill returns one or more high-quality sources with extracted content, ready for downstream consumption.

## When to use
- A task needs **current** information that an LLM's training cutoff doesn't cover.
- The output must include **real source URLs** the user can click.
- The caller explicitly asked for "research" / "find articles on" / "what does X say about Y."

## When NOT to use
- The caller wants opinions or rewriting (that's Yael's job).
- The caller wants images (that's Yuval's job).
- The topic is timeless and the LLM already has authoritative knowledge.

## Workflow (5 steps)

### 1. Plan queries
From the caller's brief, generate 2–4 distinct search queries. Vary by:
- Language (Hebrew + English when topic has both ecosystems)
- Specificity (broad → narrow)
- Source intent ("what is X" vs "X case study" vs "X 2026 trends")

### 2. Search
Use `WebSearch` for the primary discovery pass. Note the year carefully — for "current" topics, include `2026` or `latest` in the query. Repeat with each planned query if needed.

### 3. Filter for quality
For each candidate URL returned, score on:

| Signal | Weight |
|---|---|
| **Authority** — known publisher, named author, .edu/.gov/.org, or established news/industry site | High |
| **Recency** — published within the last 18 months (sooner for tech/AI) | High |
| **Depth** — full article, not a 200-word teaser; has data/quotes/specifics | Medium |
| **Original** — primary source, not aggregator/listicle that links to the real source | Medium |
| **Accessible** — not behind hard paywall (soft paywalls OK with summary) | Medium |

Reject: SEO-spam, content farms, AI-generated listicles, opinion blogs without credentials, anything older than 3 years for fast-moving topics.

### 4. Fetch and extract
Use `WebFetch` on the top 1–3 sources with a precise extraction prompt:
> "Extract: (1) the article's main thesis in one sentence; (2) 3–5 supporting facts/data points with any specific numbers and dates; (3) any direct quotes from named experts; (4) the publication date and author. Skip ads, navigation, and unrelated sidebars."

If `WebFetch` says "redirect" — follow once. If it says "authentication required" — that source is dead, skip.

### 5. Return structured output
Caller gets a Markdown block per source:

```markdown
## <Article Title>
**Source:** <Publisher> — <Author> — <Publication Date>
**URL:** https://...
**Why this source:** <1 line — authority, recency, depth>

### Thesis
<1 sentence>

### Key facts
- <fact with number/date>
- <fact>
- <fact>

### Notable quotes
> "<direct quote>"
> — <Speaker name, role>

### Caller notes
<anything that affected selection, e.g. "rejected 3 listicle aggregators" / "preferred Calcalist over Globes — paywall">
```

## Standard call shape

This is a skill, not a tool. The caller invokes it conceptually (i.e., Chen's system prompt instructs her to follow this procedure). There is no `mcp__web-research` — Chen uses the underlying `WebSearch` and `WebFetch` tools directly, in the order this skill prescribes.

## Error handling

- **Zero usable sources** → return a structured "no source met quality bar" report; let the caller decide whether to broaden the query or report up.
- **All sources paywalled** → fall back to summaries from search snippets, mark output as `Source: snippets only — no full text accessible`.
- **WebSearch rate-limited** → wait, retry once. If still failing, return a clear failure to the caller.
- **Conflicting facts across sources** → present both, note the conflict explicitly. Do NOT pick a side without strong reason.

## What this skill is NOT

- Not a writer — does not paraphrase or rewrite. Quote verbatim with attribution.
- Not a translator — keeps source language for direct quotes; can summarize in any language.
- Not an analyst — does not synthesize "the truth"; presents what authoritative sources say.
- Not creative — does not embellish or extrapolate beyond what's in the source.
