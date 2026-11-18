# PageHeader

**Use** at the top of every product page: lists, dashboards, records, settings.
**Not for** sections inside a page (use a section heading) or marketing heroes.

**Default**: `title` with the page's fact, `eyebrow` with the page name, no `subtitle`, at most one `PageHeaderAction`.

| | Example |
| --- | --- |
| Good | `<PageHeader eyebrow="Shifts" title="42 shifts this week" action={<PageHeaderAction label="New shift" shortLabel="New" icon={Plus} />} />` |
| Bad | `<PageHeader title="Shifts" subtitle="View and manage all your shifts" />` (the name as title, a description that repeats it) |

| State | Behaviour |
| --- | --- |
| Loading | A title-sized skeleton in `title`; never "0" |
| Zero | A real zero is a fact: "No shifts this week" |
| Unavailable | "—" with the reason nearby, never "0" |
| Tabs | Same eyebrow, action and height on every tab; only the title words change |
| Narrow | The action collapses to "+"; the title wraps between the figure and the period, never inside the figure |
