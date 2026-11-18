# Foundation

The shared code every product starts from: design tokens, the shadcn bridge, a token check and base blocks. It is a [shadcn registry](https://ui.shadcn.com/docs/registry): each item is copied into the project as source, so the project owns it and no package can change it underneath.

The jutsu say how to build; the foundation is what to build with; each project's `DESIGN.md` holds only its own decisions.

## Items

| Item | Installs | What it is |
| --- | --- | --- |
| `tokens` | `styles/foundation/*.css` | Primitives, semantic tokens (light and dark through `light-dark()`), the shadcn bridge, Tailwind v4 names |
| `check-tokens` | `scripts/check-tokens.mjs` | Fails on raw colours, raw sizes, palette classes and primitives in components; `--decisions` lists `@decide` values |
| `page-header` | `components/blocks/page-header.tsx` + `.md` | The page's fact as its title, the name as eyebrow, an action that collapses to "+" |
| `metric` | `components/blocks/metric.tsx` + `.md` | Metric tile and grid; icon on wide screens, arrow-only delta on phones |
| `empty-state` | `components/blocks/empty-state.tsx` + `.md` | An icon, what will appear, the next action |

`templates/` holds `AGENTS.md`, `DESIGN.md` and `COMPONENT.md`, which the `setup-project` jutsu fills in.

## The layers

```
primitives.css   --gray-500, --space-4, --radius-lg          the raw scale; never used in components
      ▼
semantic.css     --text-muted, --status-success-bg            what a value is for; light and dark
      ▼
tailwind.css     text-ink-muted, bg-success-bg, rounded-card  what components write
shadcn.css       --muted-foreground → --text-muted            so shadcn components follow too
```

Names avoid shadcn's own (`primary`, `muted`, `accent` mean something else there): text colours are `ink-*`, the brand colour is `brand`.

Values marked `@decide` are not settled. Agents ask before using or changing them.

## Install

Use the `setup-project` jutsu, which asks the product's decisions and wires everything. By hand:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/cowboyshibuya/jutsu/main/foundation/r/tokens.json
```

Then import the four CSS files after `@import "tailwindcss"`, and add `"check:tokens": "node scripts/check-tokens.mjs app components"` to the project's checks.

## Change it

1. Edit a file in `tokens/`, `blocks/` or `checks/`.
2. Rebuild the registry: `node scripts/build-registry.mjs` (set `FOUNDATION_URL` to serve it from somewhere other than GitHub).
3. Commit `r/` with the change; projects pull it when they choose ("update the foundation" with `setup-project`).

A block moves here only after two projects built it the same way.
