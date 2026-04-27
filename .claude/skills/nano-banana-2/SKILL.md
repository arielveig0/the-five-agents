---
name: nano-banana-2
description: Generate or edit images using Google Gemini 3 (Nano Banana 2 / Nano Banana Pro) via the mcp-image MCP server. Use when a task asks to create, edit, restyle, or composite images. Sends a prompt + optional reference images and returns the generated image file path. Hebrew agent prompts allowed; the MCP itself is language-agnostic.
---

# Nano Banana 2 Skill

A thin wrapper over the `mcp-image` MCP server. The server exposes a single tool: **`generate_image`**, which routes to either Nano Banana 2 (Gemini 3.1 Flash Image) or Nano Banana Pro (Gemini 3 Pro Image) based on the quality preset.

## When to use

- The user (or an agent acting on the user's behalf) asks for an image: generation from scratch, style transfer, edit, composite.
- The caller has already constructed a complete prompt — this skill **does not** invent prompts; it sends what it's given.

If the prompt-construction logic itself is the task (e.g. "match these reference images"), do that step in the *caller* (e.g. the [yuval] agent), then invoke this skill.

## Prerequisites

The MCP server is configured at the project root in [.mcp.json](../../../.mcp.json). Two environment variables MUST be set in the shell that launches Claude Code:

| Var | Purpose | Example |
|---|---|---|
| `GEMINI_API_KEY` | Google AI Studio API key | `export GEMINI_API_KEY=...` |
| `IMAGE_OUTPUT_DIR` | Absolute path where the MCP writes images | `c:\Users\ariel\Desktop\Workspace\the-five-agents\outputs` |

If `IMAGE_OUTPUT_DIR` is unset, the MCP defaults to `./output` (relative to its working directory). Always prefer setting it explicitly to the project's `outputs/` folder so generated images land in the right place automatically.

If the env vars are missing, the MCP tool call fails with a credential / path error — surface that error to the caller verbatim, do not retry.

## Tool reference

When the MCP server is connected, the tool surfaces in Claude Code as:

```
mcp__nano-banana-2__generate_image
```

### Parameters (most common)

| Param | Required | Notes |
|---|---|---|
| `prompt` | yes | The full text prompt. Self-contained — the server runs prompt optimization automatically unless `SKIP_PROMPT_ENHANCEMENT=true`. |
| `reference_images` | no | Array of file paths to images used as visual conditioning (style/composition references). |
| `quality` | no | `fast` / `balanced` / `quality` — overrides the default. `balanced` is the project default. |
| `aspect_ratio` | no | `1:1`, `16:9`, `9:16`, `21:9`, `1:8`, etc. Default `1:1`. |
| `output_filename` | no | Suggested filename (without extension). The server appends a hash if collisions exist. |

### Return

The tool returns the absolute path of the saved image. Pass it back to the caller; do NOT re-encode the bytes inline.

## Standard call shape

```
mcp__nano-banana-2__generate_image({
  prompt: "<full caller-provided prompt>",
  reference_images: ["<abs path>", "<abs path>"],   // optional
  quality: "balanced",                                // optional
  aspect_ratio: "1:1",                                // optional
  output_filename: "<short slug>"                     // optional
})
```

## Error handling

- **Missing API key** → return the error verbatim. Do not retry.
- **Reference image not found** → check the path against the project root; if the caller passed a relative path, resolve it relative to the project root before retrying once.
- **Quota / rate limit** → surface to caller with the wait time the API returned.
- **Empty / corrupted result** → retry once with `quality: "quality"` (Pro tier). If still bad, fail to caller.

## What this skill is NOT

- Not a prompt-engineering helper. The caller builds the prompt.
- Not an image analyzer. Reading and analyzing reference images is the caller's job; this skill only forwards them as conditioning.
- Not a file mover. The MCP writes to `IMAGE_OUTPUT_DIR`; if the caller wants a different location, the caller moves it after.
