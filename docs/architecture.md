# Architecture

Every skill, playbook and tool in this repository is a **jutsu**. On disk a jutsu is a standard agent skill (`jutsu/<name>/SKILL.md`), so any agent that reads skills can load it.

Decided 2026-11-17.

## Two sources of truth, split by kind

| Git (this repository) | Alabasta |
| --- | --- |
| Jutsu: the router, playbooks, principles, taste jutsu | Per-project rules (scoped, human-signed), decisions, glossary |
| Harness code: hooks, scripts, setup-project templates | Tasks, projects, ideas, blockers |
| Everything published for other people | Resolutions: what was done, verified, deferred |
| | Learning-loop data: corrections, rule citations, dead rules |

Why jutsu stay in Git:

1. They are published. Anyone installing from GitHub has no Alabasta, so every jutsu works standalone. Alabasta is an optional upgrade inside a jutsu ("if the Alabasta MCP is connected, also…").
2. Jutsu are code: diffs, review, versions, rollback.
3. They must load locally and offline. An expired token must not remove an agent's instructions mid-task.
4. Agents and the ChatGPT plugin can write to Alabasta. Instructions every agent follows must not be editable by an agent.

## How they connect

- **Every playbook ends at the bridge.** Open the PR, then submit the Alabasta resolution; the bridge's Stop hook enforces it.
- **`/correct` writes to Alabasta.** A repeated mistake becomes an enforced check in the repo (preferred) or a proposed rule a human signs.
- **Rules flow one way into repositories.** Alabasta emits standing rules into a marked block inside `AGENTS.md`; the rest of the file stays hand-written.
- **Jutsu mirror one way into Alabasta's `skills` table**, so in-app agents use the same taste. They are edited only in Git.
- **Universal habits become router rules here; project-specific ones become Alabasta rules.**
