---
name: adaptive-density
description: How an interface sheds noise as space shrinks without losing power: short labels the page context already explains, metric tiles that drop icons and turn deltas into a coloured arrow on phones, buttons that go from "+ New note" to "+", choice bars that become a menu, filters behind one Filter button, row actions in a ••• menu. Use when building or reviewing responsive layouts, metric tiles, KPI grids, toolbars, page-header actions, tab or period bars, filter rows, table row actions, or anything that must work from phone to desktop. Triggers on responsive, mobile, small screen, breakpoint, compact, density, icon button, metric label, KPI tile, delta, trend arrow, toolbar overflow, filter popover, action column, overflow menu, container query.
---

# Adaptive density

Less noise, not less power. Every action stays reachable at every width; what changes is how much of the screen it claims. Wide screens can afford a label and an icon. Narrow screens keep the meaning and drop the decoration.

The page already gives context. On a "Users" page a metric reads "Total", not "Total users". That short label is what makes the narrow version possible.

```
Desktop   [👥 Total        1,284  ↑ 12%]   [+ New note]   [Week | Month | 3M | 6M]
Phone     [Total   1,284 ↑]                [+]            [Month ⌄]
```

## Hard rules

1. **One component, every width.** Adapt with CSS (breakpoints, container queries) inside the same component. Never a second "mobile" component tree, and never width detection in JavaScript that flashes the wrong layout before hydration.
2. **The project's design doc wins.** If it sets different collapse rules, follow it and report the conflict with its line.
3. **Every collapsed control keeps its full name.** An icon-only button keeps its label as the accessible name and tooltip. An arrow-only delta keeps its figure in the accessible name and tooltip.
4. **Collapsed is still touchable.** Icon-only targets stay at least 40px, 44px for frequent phone actions.
5. **Nothing becomes unreachable.** Hidden means moved (into a menu, a popover, a tooltip), never deleted at small sizes.

## The gate

For each element that does not fit, try these in order and stop at the first that works.

1. **Remove words the context already says.** "Total users" → "Total". "Expenses this period" → "Expenses". This applies at every width, not only on phones.
2. **Shorten.** "+ New note" → "+ New".
3. **Iconify**, keeping the full name accessible. "+ New" → "+".
4. **Fold into a menu.** More than three choices → a menu showing the current choice. Secondary filters → one Filter button with an active count. Utilities (export, refresh, settings) → the ••• overflow menu.
5. **Stack or scroll.** Let a row wrap, stack two panels, or scroll a strip horizontally with the next item peeking past the edge.

Never: shrink text below readable size, hide the primary action, or drop information with no path back to it.

## The collapse table

| Element | Wide | Medium | Narrow |
| --- | --- | --- | --- |
| Metric tile | icon · label · value · delta (arrow + figure) | label · value · delta (arrow + figure) | label · value · arrow in the delta colour |
| Metric grid | up to 4 per row, balanced (5 → 3 + 2, 7 → 4 + 3) | 3 or 2 per row | always 2 per row; never stretch an odd last tile |
| Primary action | "+ New note" | "+ New" | "+" |
| Panel action ("View more", "Edit") | ghost icon button with tooltip | same | same |
| Choice bar, ≤ 3 choices | bar | bar | bar |
| Choice bar, > 3 choices | bar | bar | menu with the current choice: `[Month ⌄]` |
| Secondary filters | inline under the search | inline | one Filter button with active count, Apply and Reset |
| Search | its own row | its own row | its own row, full width |
| Utilities | ••• menu | ••• menu | ••• menu |
| Row actions | ••• menu at the row end; revealed on hover only with a fine pointer | same | ••• always visible |
| Pickable items (people on a map) | list | list | horizontal strip that scrolls |
| Wide table | all columns | identity column sticky, horizontal scroll with a visible cue | same |

Collapse late: keep the wider form as long as it truly fits, and break where the content stops fitting, not at device presets. Use container queries for components that live in drawers, side panels and grids of different widths.

## Metrics in detail

- **Label**: the shortest noun the page context allows ("Total", "Active", "Subscribed", "To pay").
- **Delta**: compared with the previous period of the same length. Semantic colour (up green, down red, or reversed for costs). On narrow screens it is the arrow in that colour; the figure moves to the tooltip and the accessible name: "Up 12% compared with last month".
- **No delta** when there is no previous period. Never show "0%" for missing data.
- **Equal tiles.** A tile with a delta is exactly the same size as one without, and an icon's presence never changes the value's position across tiles in a row.
- **Tabular numerals** so values in a row line up.

## Example

```tsx
<Metric
  icon={Users}                  // hidden below sm
  label="Total"                 // never "Total users" on the Users page
  value={formatNumber(total)}
  delta={{ value: 0.12, direction: "up", comparedTo: "last month" }}
/>

// Inside Metric
<span className="hidden sm:inline-flex">{icon}</span>
<Delta
  {...delta}
  // figure visible from sm; below, the arrow alone, coloured, with the figure in the name
  className="[&_.figure]:hidden sm:[&_.figure]:inline"
  aria-label={`${delta.direction === "up" ? "Up" : "Down"} ${formatPercent(delta.value)} compared with ${delta.comparedTo}`}
/>

<Button aria-label="New note" tooltip="New note">
  <Plus />
  <span className="hidden sm:inline lg:hidden">New</span>
  <span className="hidden lg:inline">New note</span>
</Button>
```

Express this in the project's own styling system and components; the classes above are only an illustration.

## Never ship

Self-check before finishing. Each row is a block in review.

| Never | Instead |
| --- | --- |
| "Total users" on the Users page | "Total" |
| A separate mobile component duplicating the desktop one | One component adapted with CSS |
| Icon-only button with no accessible name or tooltip | Full label as `aria-label` and tooltip |
| Arrow-only delta with the figure lost | Figure in the tooltip and accessible name |
| Primary action hidden on phones | It collapses to "+", it never disappears |
| Five period buttons squeezed onto a phone | A menu showing the current choice |
| Three filter dropdowns in a row on a phone | One Filter button with an active count |
| An "Actions" column of buttons | A ••• menu at the row end |
| Hover-only actions on touch devices | Always visible, or in the ••• menu |
| Tile height changes when a delta is present | Equal tiles |
| Odd last metric stretched across two phone columns | It keeps its column |
| Text shrunk to fit | Shorten, iconify or fold instead |
| Breakpoints copied from device sizes | Break where the content stops fitting |

## What code can't tell you

Look at the rendered pages at the narrowest supported width (320–375px), a medium width, and a desktop width, in the longest language the product ships. Check for: clipped or overflowing toolbars, a "+" pushed off the edge, labels wrapping inside tiles, tiles of different heights, a horizontal page scroll, and hover-only controls on a touch device. If you did not look, say so.

## Fixing: preferred order

1. **Shorten labels** everywhere using the page context.
2. **Fold** secondary filters and utilities into Filter and ••• menus.
3. **Iconify** actions, keeping accessible names.
4. **Convert** long choice bars to menus on narrow widths.
5. **Equalise** tiles and fix the grid to two phone columns.
6. **Scroll** what must stay wide (tables, strips), with a visible cue.

## Review output

Two parts, in this order.

**Findings**: one table, most severe first.

| Severity | Location | Width | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| HIGH | `components/tasks/toolbar.tsx:42` | 375px | "+" button clipped past the right edge | Search on its own row; Filter and "+" share the second row | The primary action must stay reachable (hard rule 5) |

HIGH: an action or information becomes unreachable, or the page scrolls horizontally. MEDIUM: a Never ship row, or a label that repeats the page context. LOW: collapsing earlier or later than the content needs.

**Verdict**: list the components checked and left as they are, with the reason. Then **Block** on any HIGH or Never ship row, otherwise **Approve**.
