# <Product name>

<One or two sentences: what the product is, for whom.>

## Working rules

- Read `DESIGN.md` before any interface change. Build screens from its blocks and components; never hand-roll a button, table, dialog or header that already exists.
- Take every value from the tokens (`<path>/primitives.css`, `semantic.css`). Components use semantic tokens only. A value marked `@decide` is not settled: ask before using or changing it.
- When a screen needs something no block can do, stop and ask whether it belongs before building it.
- Fix the pattern, not the instance: a correction to one screen goes into the shared component and every screen using it.

## Boundaries

Never, without the user's explicit word:

- <e.g. edit database migrations or access policies>
- <e.g. touch billing or payment code>
- <e.g. deploy, or read or write production data>
- commit to the default branch, push, open a PR or merge.

## Commands

- Install: `<package manager> install`
- Develop: `<dev command>`
- Full check before calling work done: `<validate command>` (it includes the token check)

## Glossary

- **<term>**: <meaning in this product>

## Rules from experience

Each rule: what the agent did, what was wanted, and why. Add one when the same correction happens twice.

- <rule>. <why>.
