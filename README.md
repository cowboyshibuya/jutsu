# Jutsu

My setup, foundations, docs and agent skills, in one place: how I work, what I build and what I write.

- **[Skills](skills/)** are standard agent skills (`skills/<group>/<name>/SKILL.md`), so any agent that reads skills can load them. They are grouped by what they are for, and each group installs as its own plugin.
- **[Foundations](foundations/)** are the shared building blocks skills install into projects, such as the [UI foundation](foundations/ui/README.md): design tokens (light and dark), a shadcn bridge, a token check that rejects raw values, and base blocks, served as a shadcn registry.
- **[Setup](setup/README.md)** is the agent configuration for a machine: global instructions, settings, hooks.
- **[Docs](docs/)** explain jutsu itself: [how to use it and write new skills](docs/workflow.md), and [why skills live in Git](docs/architecture.md).

## Skills

| Group | Skill | What it does |
| --- | --- | --- |
| workflow | [`cowboy-mode`](skills/workflow/cowboy-mode/SKILL.md) | The router. Restates the goal, picks a playbook, reuses before building, fixes patterns rather than instances, commits each verified unit on a work branch, proves the result. Five playbooks: feature-ui, bug-fix, ui-review, session-pickup, shipping. |
| workflow | [`setup-project`](skills/workflow/setup-project/SKILL.md) | Sets a project up the jutsu way: installs the UI foundation, writes AGENTS.md and DESIGN.md from templates without overwriting, wires the token check, and asks the product's open decisions. |
| interface | [`explicit-titles`](skills/interface/explicit-titles/SKILL.md) | The title states the page's primary fact ("42 shifts this week"); the page name becomes the eyebrow; no description. |
| interface | [`adaptive-density`](skills/interface/adaptive-density/SKILL.md) | Less noise as space shrinks, never less power: short labels, metric tiles that drop icons and turn deltas into a coloured arrow, "+ New note" → "+", filters behind one button. |
| interface | [`sortable-tables`](skills/interface/sortable-tables/SKILL.md) | Every comparable column sorts, with a visible cue; empty values last both ways; paginated tables sort on the server; sort lives in the URL; ••• row actions. |
| web | [`showcase`](skills/web/showcase/SKILL.md) | Product pages that sell by showing the real product: the app's own components on demo data, one-action demos, a composition per width, plain factual copy. |
| web | [`agent-ready-site`](skills/web/agent-ready-site/SKILL.md) | A site for people and their assistants: one source of facts, llms.txt, structured data, "Ask AI" on every reading page, and quick starts written as prompts instead of install commands. |

Coming: [`docs`](skills/docs/README.md) (skills that produce documents, such as handbooks) and [`general`](skills/general/README.md) (skills for any kind of work).

### Interface and web: quiet professional software

Software keeps moving toward fewer primary choices: not fewer actions, less noise. Consumer apps learned this long ago; professional tools rarely did, because professionals were assumed to want every control in sight. AI changes that. A chat input with all the power behind it is the new shape. These skills teach coding agents to build that way: the title answers the question, labels say only what context does not, controls fold away as space shrinks, and the product shows itself instead of describing itself.

Every taste skill has the same shape: hard rules, a gate (ordered questions), the rules, a **Never ship** self-check, what code cannot tell you, a preferred fix order, and a review format ending in **Block** or **Approve**.

## Install

### Claude Code

Add the marketplace, then install the groups you want:

```text
/plugin marketplace add cowboyshibuya/jutsu
```

```text
/plugin install workflow --marketplace cowboyshibuya/jutsu
```

```text
/plugin install interface --marketplace cowboyshibuya/jutsu
```

```text
/plugin install web --marketplace cowboyshibuya/jutsu
```

From a local checkout, add the marketplace with `/plugin marketplace add /path/to/jutsu`, then `/plugin install workflow@jutsu` and so on.

Commands are prefixed with their group: `/workflow:cowboy-mode`.

Upgrading from 0.1, where everything was one `jutsu` plugin: uninstall it (`/plugin uninstall jutsu@jutsu`), update the marketplace, and install the groups. The UI registry moved from `…/foundation/r` to `…/foundations/ui/r`; the old URL keeps a frozen copy for now.

### Other agents

Copy the skill folders you want from `skills/<group>/` into your agent's skills directory. Each folder is a self-contained skill. `setup-project` also needs `foundations/ui/templates/` three levels up from it, or the registry URL.

## Use

Start any non-trivial task with the router:

```text
/workflow:cowboy-mode the Tasks page needs a title that says how many tasks are open
```

The taste skills load on their own when a task touches page headers, responsive layout, marketing pages or site metadata. Ask for a review by name:

```text
review the page headers in this branch with explicit-titles
```

## Credits

Built on ideas from [Emil Kowalski's skills](https://github.com/emilkowalski/skills) (dense, decision-first craft rules and the review format), [Jakub Krehel's skills](https://github.com/jakubkrehel/skills) (a family of narrow skills with trigger-rich descriptions) and [pstack](https://github.com/cursor/plugins/tree/main/pstack) (a router with playbooks and a correction loop).

## License

MIT
