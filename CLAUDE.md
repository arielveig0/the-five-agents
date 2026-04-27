# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

The Five Agents — project scaffolding stage. Architecture, commands, and conventions will be added here as the codebase grows.

## Notes

- Primary working language with the user: Hebrew.

## Vault Protocol (mandatory)

Invoke the **obsidian-vault-workflow** skill at the start of every session AND at the start of every new user task in this repo. Do Phase 1 (read context from `vault/`) before touching code, and Phase 2 (append a dated session entry) before declaring the task complete. The vault under [vault/](vault/) is Claude's long-term memory for this project — it is not optional reading.

## CEO Agent (mandatory entry point)

Every user request in this repo MUST be routed through the **CEO subagent** ([.claude/agents/ceo_agent.md](.claude/agents/ceo_agent.md)) before any other action. The CEO is the single entry point: it analyzes the request, owns the vault read/write protocol per task, decides whether to execute directly or delegate to specialized subordinates, and returns a unified summary in Hebrew.

- **Always invoke first** — dispatch the `ceo` subagent (via the Agent tool) at the start of every user message, before reading code, calling other agents, or doing direct work.
- **Do not bypass the CEO** even for trivial requests; the CEO itself decides if the task is small enough to handle without delegating.
- The CEO's full spec lives in the PRD at [vault/Content Briefs/ceo-agent-prd.md](vault/Content%20Briefs/ceo-agent-prd.md).
- The 4 subordinate agents are fully defined and active: `yuval` (creative), `yael` (content), `chen` (web research), and `guy` (QA gatekeeper). The canonical content pipeline is `chen -> yael -> yuval -> guy`, coordinated by the CEO.
