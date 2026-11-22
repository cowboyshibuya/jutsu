---
name: sortable-tables
description: Data tables that professionals can sort, scan and act on. Every column with a comparable value sorts, with a visible cue; the active column shows its direction; empty values sort last both ways; paginated tables sort on the server; sort and filters live in the URL; rows open their record, actions sit in a ••• menu, numbers align. Use when building or reviewing a data table, list view, admin grid, sortable columns, table headers, pagination, row actions, or a table's toolbar. Triggers on table, data table, data grid, sortable, sort by, column header, aria-sort, pagination, row click, action column, table toolbar, tabular numbers.
---

# Sortable tables

A table is for comparing records. Comparing means ordering: the biggest, the newest, the overdue, the alphabetical. A professional who cannot sort a column has to read every row instead. So every table sorts, and it shows that it does.

```
NAME ↕          STATUS ↕      CREATED ↓       REVENUE ↕
Marie Lambert   ✓             17 Nov 2026     €4,415.00     •••
Jean Dupont     ◔             16 Nov 2026     €3,980.00     •••
Adam Benmoud    ✕             12 Nov 2026            —      •••
```

`↕` a sortable column at rest, `↓` the active column and its direction, `—` a missing value, `•••` the row's actions.

## Hard rules

1. **One table component.** Every table in the product is the shared one, with shared column definitions per record type (one "shifts" column set, used by every page that lists shifts). A page never defines its own copy of a record's columns.
2. **Sort where all the rows are.** A table that holds every row sorts in the browser. A paginated table sorts in the query: sorting the visible page makes "highest revenue" mean "highest on page 3".
3. **Allow-list the sort column** before it reaches the query. An unknown value falls back to the default order; it never reaches the database as text.
4. **The project's design doc wins.** Follow its table component and report conflicts.

## The gate

1. **Is this a table?** Records compared across several attributes: yes. A short list read top to bottom (recent activity, a feed): use rows, not a table, and skip the rest.
2. **Which columns sort?** Every column with a comparable value: names, dates, numbers, money, durations, statuses with a meaningful order. Not: free text, avatars, the ••• column.
3. **What is the default order?** The order that answers the page's question; usually newest first. The header shows it like any other active sort.
4. **Where does sorting happen?** All rows in hand → client. Paginated or server-filtered → query (hard rule 2).

## Sorting behaviour

- **The cue.** Every sortable header shows a quiet up-down icon (`↕`) that brightens on hover and focus. The active column shows its label at full contrast and an arrow for its direction. A column without the icon does not sort.
- **The click.** The header label is a `<button>` inside the `<th>`. Clicking a new column sorts it in its useful direction: numbers, money and dates descending (biggest, newest first), text ascending (A to Z). Clicking the active column flips it. Two states, no "unsorted" third click; the default order is one click away on its own column. Use the same rule on every table.
- **Accessibility.** `aria-sort="ascending"` or `"descending"` on the active `<th>` only; the button's name is the column label. Keyboard: Tab to the header, Enter or Space sorts.
- **Missing values sort last** in both directions and show as `—`. A driver with no previous period has no trend; treating it as 0 ranks them above someone who really declined.
- **Compare like a person.** Locale-aware, numeric-aware text ("Taxi 2" before "Taxi 10"). Statuses by their meaning order (open, in progress, done, cancelled), not alphabetically. Ties fall back to a stable key (newest, then ID) so rows never shuffle between renders.
- **State in the URL.** `?sort=revenue&order=desc` beside the filters, so a link, a refresh and Back keep the view. Changing the sort keeps the filters and returns to page 1.
- **No layout shift.** The icon slot is reserved at rest, so a column does not widen when it becomes active. The table keeps its height while re-sorting or loading the next page.
- **Sorting never changes the page title.** The title follows the page's scope, not the table's order (see `explicit-titles`).

## The table around it

| Part | Rule |
| --- | --- |
| Search | Its own row above the table, full width on a phone |
| Filters | Inline under the search on wide screens; one Filter button with an active count on a phone (see `adaptive-density`) |
| Columns | Identity first (the record's name or reference), then what the page compares; labels one word where one word works |
| Numbers and money | Right-aligned, tabular numerals, locale-formatted, unit never wrapping |
| Dates | Short and absolute in the cell ("12 Nov 2026"), full date and time in the tooltip; `Created` and `Updated` are sortable columns when they matter |
| Status | The shared status badge: icon and colour, the word in its tooltip and accessible name |
| Row click | Opens the record's preview or page. Links and buttons inside the row do not trigger it. Hover helps but is never required to understand the row |
| Row actions | A ••• menu at the row's end. Never an "Actions" column of buttons |
| Pagination | Below the table, a fixed page size shared by every table, page in the URL |
| States | Loading, empty, no results and error keep the headers, so the reader keeps their place |
| Narrow screens | Horizontal scroll with a visible cue and the identity column sticky; or a cards view switch for records that read better as cards. Columns hidden at narrow widths stay sortable from a Sort menu in the toolbar |

## Example

```tsx
const { rows, sort } = useTableSort(drivers, driverSortValue, { key: "revenue", order: "desc" });

<DataTable
  columns={useDriverColumns()}          // shared column set: { key, header, sortKey?, align?, cell }
  data={rows}
  sort={sort}                           // { key, order, onSort }
  onRowClick={(driver) => openDriver(driver.id)}
/>

// Paginated: pass the URL's sort to the query instead
const sortBy = resolveSortColumn(searchParams.sort, SORTABLE_SHIFT_COLUMNS) ?? "started_at";
query.order(sortBy, { ascending: searchParams.order === "asc", nullsFirst: false });
```

Express this with the project's own table, query layer and icons.

## Never ship

Self-check before finishing. Each row is a block in review.

| Never | Instead |
| --- | --- |
| A table with no sortable column | Every comparable column sorts |
| Sortable columns with no cue | A quiet icon at rest, an arrow on the active one |
| Sorting only the visible page of a paginated table | Sort in the query |
| A raw sort parameter passed to the query | Allow-list, then default |
| Empty values first when sorting descending | Missing values last in both directions |
| "Taxi 10" before "Taxi 2" | Numeric-aware comparison |
| Statuses sorted alphabetically | Their meaning order |
| Sort state lost on refresh or Back | Sort in the URL with the filters |
| A page-local copy of a record's columns | The shared column set |
| An "Actions" column of buttons | A ••• menu at the row end |
| Clicking a button in a row also opens the row | Nested controls stop the row action |
| Left-aligned money | Right-aligned, tabular |
| Headers disappearing while loading or empty | Headers stay; the body shows the state |
| A column that widens when it becomes active | Reserved icon slot |

## What code can't tell you

Sort each column both ways on real data, at a narrow and a wide width, and look: missing values at the bottom both times, ties stable, the active arrow readable, no column jumping in width, the sort surviving a refresh and Back, and on a paginated table, page 2 continuing page 1's order. If you did not try it, say so.

## Fixing: preferred order

1. **Move** the table onto the shared component and shared columns; delete the copies.
2. **Make sorting correct**: server-side when paginated, allow-listed, missing values last, numeric-aware.
3. **Show it**: the cue, the active arrow, `aria-sort`.
4. **Keep it**: sort and filters in the URL.
5. **Tidy the row**: ••• actions, row click, aligned numbers, status badges.

## Review output

**Findings**: one table, most severe first.

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| HIGH | `app/shifts/page.tsx:42` | `useTableSort` on a server-paginated list | `sortBy`/`order` passed to the query | Sorts only the visible page (hard rule 2) |

HIGH: wrong order (page-only sorting, missing values first, unvalidated sort input reaching the query). MEDIUM: a Never ship row. LOW: polish.

**Verdict**: list tables checked and left as they are, with the reason. Then **Block** on any HIGH or Never ship row, otherwise **Approve**.
