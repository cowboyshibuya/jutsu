# Metric and MetricGrid

**Use** for a figure the page compares over time: revenue, counts, rates. Always inside a `MetricGrid`.
**Not for** the page's primary fact (that is the `PageHeader` title) or rankings (use rows).

**Default**: short `label`, `value` formatted for the locale, `icon` on wide screens, `delta` against the previous period of the same length.

| | Example |
| --- | --- |
| Good | `<Metric label="Total" value="1,284" icon={Users} delta={{ value: 0.12, comparedTo: "last month" }} />` |
| Bad | `<Metric label="Total users this period" value="1284" delta={{ value: 0, comparedTo: "" }} />` (label repeats the page, unformatted value, a fake 0% for missing data) |

| State | Behaviour |
| --- | --- |
| Loading | A value-sized skeleton; the tile keeps its size |
| No previous period | No `delta` at all |
| Costs | `inverted: true`, so going down is green |
| Narrow | Icon hidden; delta is the coloured arrow, its figure in the tooltip and accessible name |
| Grid | Two per row on phones, up to four from `xl`; an odd last tile keeps its column |
