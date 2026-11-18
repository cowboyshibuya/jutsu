# Jutsu

Agent skills for building software that feels intuitive and stays quiet, especially professional software.

Software keeps moving toward fewer primary choices: not fewer actions, less noise. Consumer apps learned this long ago; professional tools rarely did, because professionals were assumed to want every control in sight. AI changes that. A chat input with all the power behind it is the new shape. These jutsu teach coding agents to build that way: the title answers the question, labels say only what context does not, controls fold away as space shrinks, the product shows itself instead of describing itself, and the agent proves its work before calling it done.

Every skill here is a **jutsu**. On disk each one is a standard agent skill (`jutsu/<name>/SKILL.md`), so any agent that reads skills can load it.

## The jutsu

| Jutsu | Kind | What it does |
| --- | --- | --- |
| [`cowboy-mode`](jutsu/cowboy-mode/SKILL.md) | Workflow | The router. Restates the goal, picks a playbook, reuses before building, fixes patterns rather than instances, commits each verified unit on a work branch, proves the result. Five playbooks: feature-ui, bug-fix, ui-review, session-pickup, shipping. |
| [`setup-project`](jutsu/setup-project/SKILL.md) | Workflow | Sets a project up the jutsu way: installs the foundation, writes AGENTS.md and DESIGN.md from templates without overwriting, wires the token check, and asks the product's open decisions. |
| [`explicit-titles`](jutsu/explicit-titles/SKILL.md) | Taste | The title states the page's primary fact ("42 shifts this week"); the page name becomes the eyebrow; no description. |
| [`adaptive-density`](jutsu/adaptive-density/SKILL.md) | Taste | Less noise as space shrinks, never less power: short labels, metric tiles that drop icons and turn deltas into a coloured arrow, "+ New note" → "+", filters behind one button. |
| [`sortable-tables`](jutsu/sortable-tables/SKILL.md) | Taste | Every comparable column sorts, with a visible cue; empty values last both ways; paginated tables sort on the server; sort lives in the URL; ••• row actions. |
| [`showcase`](jutsu/showcase/SKILL.md) | Taste | Product pages that sell by showing the real product: the app's own components on demo data, one-action demos, a composition per width, plain factual copy. |
| [`agent-ready-site`](jutsu/agent-ready-site/SKILL.md) | Taste | A site for people and their assistants: one source of facts, llms.txt, structured data, "Ask AI" on every reading page, and quick starts written as prompts instead of install commands. |

The [foundation](foundation/README.md) is the shared code the jutsu build with: design tokens (primitives, semantic, light and dark), a shadcn bridge, a token check that rejects raw values, and base blocks, served as a shadcn registry.

Every taste jutsu has the same shape: hard rules, a gate (ordered questions), the rules, a **Never ship** self-check, what code cannot tell you, a preferred fix order, and a review format ending in **Block** or **Approve**.

## Install

### Claude Code

```text
/plugin marketplace add cowboyshibuya/jutsu
/plugin install jutsu@jutsu
```

From a local checkout instead of GitHub:

```text
/plugin marketplace add /path/to/jutsu
/plugin install jutsu@jutsu
```

Commands are prefixed: `/jutsu:cowboy-mode`.

### Other agents

Copy the folders you want from `jutsu/` into your agent's skills directory. Each folder is a self-contained skill.

## Use

Start any non-trivial task with the router:

```text
/jutsu:cowboy-mode the Tasks page needs a title that says how many tasks are open
```

The taste jutsu load on their own when a task touches page headers, responsive layout, marketing pages or site metadata. Ask for a review by name:

```text
review the page headers in this branch with explicit-titles
```

The full guide, including how to grow your own jutsu, is in [docs/workflow.md](docs/workflow.md).

## Credits

Built on ideas from [Emil Kowalski's skills](https://github.com/emilkowalski/skills) (dense, decision-first craft rules and the review format), [Jakub Krehel's skills](https://github.com/jakubkrehel/skills) (a family of narrow skills with trigger-rich descriptions) and [pstack](https://github.com/cursor/plugins/tree/main/pstack) (a router with playbooks and a correction loop).

## License

MIT
