# EmptyState

**Use** when a list, table body or panel has nothing to show yet, or a search found nothing.
**Not for** errors (use a banner with the recovery action) or loading (use a skeleton at the content's shape).

**Default**: an icon, a title that says what will appear or what to do, and the next valid action.

| | Example |
| --- | --- |
| Good | `<EmptyState icon={Car} title="Add a taxi to start recording shifts" action={<Button>Add taxi</Button>} />` |
| Bad | `<EmptyState icon={Inbox} title="No data" />` under a title that already says "No shifts" |

| State | Behaviour |
| --- | --- |
| No results from search | Title names the search and offers clearing it |
| Inside a table | Headers stay above it |
| Motion | None; it never loops or pulses |
