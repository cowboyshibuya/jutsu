# <Product name> design

<Two or three sentences: who uses it, in what situation, and how it should feel.>

## Tokens

- **Primitives** (`<path>/primitives.css`): the raw scale. Never used directly in components.
- **Semantic** (`<path>/semantic.css`): what a value is for. Components use only these, through the Tailwind names in `tailwind.css` (`bg-surface`, `text-ink-muted`, `rounded-card`…).
- **shadcn** (`<path>/shadcn.css`): shadcn's variables point at the semantic tokens.
- The token check (`node <path>/check-tokens.mjs`) fails on raw colours, raw sizes, palette classes and primitives in components.

### Colour carries meaning

Green, amber, red and blue appear only through status tokens, for a real state:

| Tone | Means |
| --- | --- |
| success | <done, paid, healthy> |
| warning | <needs a look> |
| error | <failed, destructive> |
| running | <in progress> |
| neutral | <nothing to act on> |

## Components

Built on shadcn/ui. For each component the product uses, a short `<component>.md` beside it: when to use it and when to use something else, the default variant, one good and one bad example (pointing at real files), and every state (hover, pressed, loading, empty, disabled, error).

| Component | Doc | Notes |
| --- | --- | --- |
| Button | <path> | <one primary per screen> |

## Blocks

Every screen is a stack of named blocks. When a screen needs something none of these can do, ask whether it belongs.

| Block | Used for |
| --- | --- |
| `PageHeader` | The page's fact as its title, the page name as eyebrow, one action |
| `Metric`, `MetricGrid` | Figures compared over time |
| `EmptyState` | Nothing to show yet, with the next action |
| <`ProductBlock`> | <what it is for> |

## Open decisions

Values and patterns not settled yet. Agents ask before choosing; `node <path>/check-tokens.mjs --decisions` lists the token ones.

- <e.g. accent colour>
- <e.g. whether tables open a sheet or a page>

## Differences from the jutsu

Where this product deliberately differs from a taste jutsu, say so here, so agents follow the product and do not report it as a conflict.

- <e.g. phones keep the delta figure because …>
