# Feature (UI)

1. **Name the job.** Who uses this screen and what question it answers first: oversight (is anything wrong, what do I do) or work (what is my next action).
2. **Name the data shape.** The records, their states and their relationships, before any component code.
3. **Inventory before building.** Search shared components, same-surface components and the design doc for every piece: header, metrics, table, rows, sheet or modal, badges, empty state. List what is reused and what is new; anything new needs a reason.
4. **Build the smallest version that is complete.** Apply the installed taste skills: the title is the primary fact, labels are short, controls collapse at small widths, tables sort, statuses use the shared map.
5. **States.** Loading (including tab, period and filter changes), empty with the next action, error, disabled, pending, success.
6. **Every width and language.** Check the narrowest supported width and a desktop width, plus every locale the project ships (the longest one sets the layout).
7. **Commit** the unit on the work branch.
8. **Prove it.** Run the project's checks (UI consistency, types, lint, tests). Drive the journey in the browser only if verification is on; otherwise say it was not driven.
9. **Report** per the router: what changed, what was proven, what was not.
