# How to use jutsu

This is the operating manual: how the pieces fit, what to type, and how the system improves itself.

## The pieces

```
┌──────────────────────────── Git: this repository ─────────────────────────────┐
│                                                                               │
│   cowboy-mode (router)                    taste jutsu                         │
│   ├─ playbooks/feature-ui                 ├─ explicit-titles                  │
│   ├─ playbooks/bug-fix                    ├─ adaptive-density                 │
│   ├─ playbooks/ui-review      ── uses ──▶ ├─ showcase                         │
│   ├─ playbooks/session-pickup             └─ agent-ready-site                 │
│   └─ playbooks/shipping                                                       │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
          │ reads first, and obeys                    │ optional
          ▼                                           ▼
┌──── each project ────────────┐        ┌──────────── Alabasta ─────────────────┐
│ AGENTS.md  (boundaries,      │◀───────│ project rules (scoped, human-signed),  │
│            commands, rules)  │ emits  │ tasks, decisions, resolutions          │
│ DESIGN.md  (taste, tokens,   │        │ ▲ agents read task context and submit  │
│            components)       │        │ │ a resolution through the MCP bridge  │
└──────────────────────────────┘        └───────────────────────────────────────┘
```

- **The router** (`cowboy-mode`) is how an agent works: its start-of-task routine, non-negotiables, principles, autonomy limits and reply style.
- **Playbooks** are step lists for one kind of task. The router copies the matching one into the task list.
- **Taste jutsu** are rule books for one area of the interface. They load on their own when a task touches that area, and every review uses their Never ship tables.
- **The project's own files win.** `AGENTS.md`, `CLAUDE.md` and `DESIGN.md` override any jutsu. When they disagree, the agent follows the project and reports the conflict, so you decide which one changes.
- **Alabasta is optional.** When its MCP is connected and a task names an Alabasta task, the agent reads that task's context first and submits a resolution at the end. Without it, nothing changes.

Why skills live in Git and rules live in Alabasta: [architecture.md](architecture.md).

## Setting up

### Once, on your machine

1. Install the plugin (see the README). Check it loaded: the `/` menu lists `jutsu:cowboy-mode`.
2. Optionally connect Alabasta: Alabasta → Workspace settings → Agent access, then paste the connect prompt into your agent.

### Once per project

1. Make sure the project has an `AGENTS.md` with at least: what the project is, the boundaries agents must not cross (migrations, access policies, billing, deploys), the check command (`bun run validate` or similar) and a glossary. `CLAUDE.md` can be one line: `@AGENTS.md`.
2. Give it a `DESIGN.md` when it has an interface: the components to reuse, tokens, and any rule that differs from the taste jutsu (for example, if phones keep the delta figure).
3. If the project has a shared UI package, name it in `AGENTS.md`; the router's first non-negotiable is "reuse before building".

## Daily use

### Start a task

```text
/jutsu:cowboy-mode <what you want, in plain words>
```

The agent then:

1. Restates the goal and the smallest change that meets it, and carries on without waiting.
2. Picks a playbook and shows its steps as the task list.
3. Reads the Alabasta task if one is named.
4. Says whether it will check the result in the browser (off unless you or the project allow it).
5. Works, committing each verified unit **on a work branch** without asking. It never commits on the default branch.
6. Stops and asks before anything outward: push, opening a PR, merging, deploying, staging or production data, sending messages, or a project boundary.
7. Reports: what changed, what was proven and how, what was not, and the one decision waiting on you.

### Which playbook, and what to say

| You want | Say something like | Playbook |
| --- | --- | --- |
| A new or changed screen | "add a Notes page with a new-note action" | feature-ui |
| Something fixed | "the balance page crashes since the last release, see Sentry" | bug-fix |
| A verdict on interface quality | "review this branch's interface" | ui-review |
| To continue earlier work | "an agent was working on feat/shift-scheduling before its limit, continue" | session-pickup |
| To ship | "validate, open the PR, merge when green" | shipping |

Grants such as "merge when green" or "you may use the browser" last for that task only.

### Review something

Ask for a review by area or as a whole:

```text
review the page headers with explicit-titles
check this page at phone width with adaptive-density
review the landing page with showcase and agent-ready-site
```

You get one findings table (Severity, Location, Before, After, Why), a list of what was checked and left alone, and a verdict: **Block** (any HIGH finding or a Never ship row) or **Approve**. The agent does not edit code during a review; it offers to fix.

### What the agent checks before it says "done"

- The project's own checks (types, lint, tests, UI consistency).
- Each taste jutsu's Never ship table, as a self-check.
- On screen, when allowed: the narrowest and a desktop width, the longest language, loading and empty states. If it did not look, it says so.

## Making it better

The system improves from your corrections. The loop:

```
you correct an agent ──▶ the correction repeats ──▶ mine it ──▶ encode it ──▶ test it on a real app
        ▲                                                                              │
        └──────────────────────── gaps found go back into the jutsu ◀─────────────────┘
```

### 1. Notice repeats

A correction you give twice is a candidate. One-off taste calls are not.

### 2. Mine your sessions

Ask an agent to read your recent sessions for a project and group your corrections into classes, as was done for Tomcabs ([docs/mining/tomcabs-2026-11.md](mining/tomcabs-2026-11.md)). Keep classes that appeared at least twice.

### 3. Encode each class at the strongest level that works

| Level | Example |
| --- | --- |
| 1. Remove the alternative | Delete the duplicate table component so only the shared one exists |
| 2. A type | A `title` prop that requires the fact, not a free string |
| 3. A check whose error names the fix | `ui:check` rejects a raw checkbox; Sparkles for AI fails the build |
| 4. A test | The route test fails until a new page resolves its workspace |
| 5. A rule | A line in a jutsu (universal) or an Alabasta rule (one project) |

Universal habits go into a jutsu here. Project-only facts (a field name, a version command) become Alabasta rules for that project, emitted into its `AGENTS.md`.

### 4. Test it on a real app

A new or changed jutsu is not done until it has reviewed real code. Every jutsu so far changed after its first real use:

- `explicit-titles` gained four rules from Alabasta (lists with no time scope, home pages, breadcrumb apps, two-tone titles), then three Never ship rows from looking at the result in the browser.
- `agent-ready-site` gained two rows from Alabasta's routing and MCP endpoint.

## Writing a new jutsu

1. **Collect the rules first**: from your own words, a reference project (Tomcabs' `DESIGN.md` and `docs/standards.md` are the richest), and mined corrections.
2. **Use the shape** every taste jutsu shares:

   | Section | Purpose |
   | --- | --- |
   | Frontmatter `description` | What it does plus trigger words; this is what makes it load on its own |
   | Opening | The idea in two or three sentences, with a small picture |
   | Hard rules | Numbered; include "the project's design doc wins" |
   | The gate | Ordered questions that decide the design, and may decide to build nothing |
   | Rules or tables | The substance, with exact values |
   | Never ship | Never / Instead; each row blocks a review |
   | What code can't tell you | What only shows on screen, and "say if you did not look" |
   | Fixing: preferred order | Delete and simplify first |
   | Review output | Findings table, what passed, Block or Approve |

3. **Keep it generic**: no project component names; examples may use real wording.
4. **No em dashes**, plain sentences, one idea per sentence.
5. **Validate and check the cost**:

   ```bash
   claude plugin validate .
   ```

   ```bash
   claude --plugin-dir . plugin details jutsu
   ```

   The descriptions load into every session (about 850 tokens for five jutsu today); the body loads only when used (about 2–2.5k tokens each).
6. **Add it** to the router's list of taste jutsu and to the README table.
7. **Test it on a real app** before trusting it.

## Status

### Built

- Router and five playbooks, from 289 of your Tomcabs messages.
- Taste jutsu: explicit-titles, adaptive-density, showcase, agent-ready-site.
- Plugin and marketplace manifests that validate.

### Planned

| Next | Why |
| --- | --- |
| `sortable-tables` | Every table sorts, with a visible sort cue; mined three times |
| `say-less` | Short labels, data written for people, one word per concept |
| `status-badges` | Status as icon plus tooltip on one colour map; mined six times |
| `quiet-interface` | The philosophy: fewer primary choices, power behind a simple surface; write last |
| `edit-in-place` | Whatever starts an edit becomes the actions that end it |
| `improve-interface` | Audit a whole app against the taste jutsu and write self-contained plans, or Alabasta tasks, for cheaper agents |
| `correct` / `reflect` | Turn the improvement loop above into commands |

### Before publishing

- Initialise Git and create the GitHub repository.
- Add a `LICENSE` file (the README says MIT).
- Tighten the jutsu descriptions to lower the always-loaded cost.
- Check whether `npx skills add` finds jutsu in the `jutsu/` folder; add a fallback if not.
