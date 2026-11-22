# How to use jutsu

This is the operating manual: how the pieces fit, what to type, and how the system improves itself.

## The pieces

```
┌──────────────────────────── Git: this repository ─────────────────────────────┐
│                                                                               │
│   workflow: cowboy-mode (router)          interface + web: taste skills       │
│   ├─ playbooks/feature-ui                 ├─ explicit-titles                  │
│   ├─ playbooks/bug-fix                    ├─ adaptive-density                 │
│   │                                       ├─ sortable-tables                  │
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
- **Taste skills** are rule books for one area of the interface. They load on their own when a task touches that area, and every review uses their Never ship tables.
- **The project's own files win.** `AGENTS.md`, `CLAUDE.md` and `DESIGN.md` override any skill. When they disagree, the agent follows the project and reports the conflict, so you decide which one changes.
- **Alabasta is optional.** When its MCP is connected and a task names an Alabasta task, the agent reads that task's context first and submits a resolution at the end. Without it, nothing changes.

Why skills live in Git and rules live in Alabasta: [architecture.md](architecture.md).

## Setting up

### Once, on your machine

1. Install the plugins you want (see the README). Check they loaded: the `/` menu lists `workflow:cowboy-mode`.
2. Optionally connect Alabasta: Alabasta → Workspace settings → Agent access, then paste the connect prompt into your agent.

### Once per project

Run `/workflow:setup-project`. It:

1. reads the project (package manager, framework, Tailwind, shadcn, existing docs and tokens) and works on a branch;
2. asks you, in one message, only what the repository cannot answer: what the product is, the accent and typefaces (or "decide later"), the boundaries, and anything that deliberately differs from the taste skills;
3. installs the [UI foundation](../foundations/ui/README.md) from the registry: tokens, the shadcn bridge, the token check, and the base blocks;
4. writes `AGENTS.md` and `DESIGN.md` from the templates, adding only missing sections to files that exist;
5. wires the token check into the project's checks (for an existing project with many raw values, it reports them and asks before gating);
6. proves it with the project's checks and lists the open decisions.

What you write yourself is only what is specific to the product: brand values, product blocks, and rules from that product's mistakes.

## Daily use

### Start a task

```text
/workflow:cowboy-mode <what you want, in plain words>
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
- Each taste skill's Never ship table, as a self-check.
- On screen, when allowed: the narrowest and a desktop width, the longest language, loading and empty states. If it did not look, it says so.

## Making it better

The system improves from your corrections. The loop:

```
you correct an agent ──▶ the correction repeats ──▶ mine it ──▶ encode it ──▶ test it on a real app
        ▲                                                                              │
        └──────────────────────── gaps found go back into the skill ◀─────────────────┘
```

### 1. Notice repeats

A correction you give twice is a candidate. One-off taste calls are not.

### 2. Mine your sessions

Ask an agent to read your recent sessions for a project and group your corrections into classes, as was done for Tomcabs to build the router (those notes stay private, in `docs/mining/`, which Git ignores). Keep classes that appeared at least twice.

### 3. Encode each class at the strongest level that works

| Level | Example |
| --- | --- |
| 1. Remove the alternative | Delete the duplicate table component so only the shared one exists |
| 2. A type | A `title` prop that requires the fact, not a free string |
| 3. A check whose error names the fix | `ui:check` rejects a raw checkbox; Sparkles for AI fails the build |
| 4. A test | The route test fails until a new page resolves its workspace |
| 5. A rule | A line in a skill (universal) or an Alabasta rule (one project) |

Universal habits go into a skill here. Project-only facts (a field name, a version command) become Alabasta rules for that project, emitted into its `AGENTS.md`.

### 4. Test it on a real app

A new or changed skill is not done until it has been used on real work. Every skill so far changed after its first real use:

- `explicit-titles` gained four rules from Alabasta (lists with no time scope, home pages, breadcrumb apps, two-tone titles), then three Never ship rows from looking at the result in the browser.
- `agent-ready-site` gained two rows from Alabasta's routing and MCP endpoint.

## Writing a new skill

1. **Pick its group** (see the README): `workflow` for how the agent works, `interface` and `web` for product taste, `docs` for documents the agent produces, `general` for any other kind of work. A skill lives at `skills/<group>/<name>/SKILL.md`. Shared code or templates that several skills need go in `foundations/<area>/`, not inside one skill.
2. **Collect the rules first**: from your own words, a reference project (Tomcabs' `DESIGN.md` and `docs/standards.md` are the richest), and mined corrections.
3. **Use the shape** for its kind. A taste skill (rules you review against) has:

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

   A maker skill (it produces a file: a document, a page, a diagram) has a numbered workflow in `SKILL.md`, its long guidance in `references/`, templates and fonts in `assets/`, and a check in `scripts/` that must pass before the agent hands the file over. The check is the point: it turns "looks right" into a command that fails.

4. **Keep it generic**: no project component names; examples may use real wording.
5. **No em dashes**, plain sentences, one idea per sentence.
6. **Validate and check the cost**:

   ```bash
   claude plugin validate .
   ```

   ```bash
   claude plugin details <group>@jutsu
   ```

   The descriptions load into every session (about 1,000 tokens for the seven skills today); the body loads only when used (about 2–2.5k tokens each).
7. **Register it**: add its path to its group's plugin in `.claude-plugin/marketplace.json` (a new group gets a new plugin entry), add it to the README table, and, for a taste skill, to the router's list.
8. **Test it on real work** before trusting it.

## Status

### Built

- Router and five playbooks, from 289 of your Tomcabs messages.
- Taste skills: explicit-titles, adaptive-density, sortable-tables, showcase, agent-ready-site.
- One marketplace, `jutsu`, with a plugin per group: `workflow`, `interface`, `web`.
- `setup-project` and the UI foundation registry: tokens (light and dark), shadcn bridge, token check, `PageHeader`, `Metric`, `EmptyState`, templates.

### Planned

| Next | Why |
| --- | --- |
| `say-less` | Short labels, data written for people, one word per concept |
| `status-badges` | Status as icon plus tooltip on one colour map; mined six times |
| `quiet-interface` | The philosophy: fewer primary choices, power behind a simple surface; write last |
| `edit-in-place` | Whatever starts an edit becomes the actions that end it |
| `improve-interface` | Audit a whole app against the taste skills and write self-contained plans, or Alabasta tasks, for cheaper agents |
| `correct` / `reflect` | Turn the improvement loop above into commands |

### Open

- Fill `skills/docs/` (a handbook skill is the first candidate) and `skills/general/`; each becomes a plugin when it has its first skill.
- Move the machine setup into `setup/`.
- Remove the frozen `foundation/r/` copy once no project installs from the old URL.
- Tighten the skill descriptions to lower the always-loaded cost.
- Check whether `npx skills add` finds skills nested in `skills/<group>/`; add a fallback if not.
