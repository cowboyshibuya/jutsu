# UI review

1. **Resolve the scope.** A page, the uncommitted changes, the branch or a PR. For a diff, read both sides: what was removed matters as much as what was added.
2. **Expand to surfaces.** Every screen a changed component appears on is in scope.
3. **Check the non-negotiables first**, then each installed taste jutsu: duplicates of shared components, one-off fixes that should be the pattern, repeated labels and descriptions, dead-end entity references, raw data, layout shift, missing states. Then: any value that is not a token (run the project's token check if it has one), every block's loading, empty and error states, and status text that matches the real state (an approval card still saying "Needs approval" after approval is a HIGH).
4. **Classify each finding** as introduced, regression or pre-existing. Pre-existing findings are listed but not blocking.
5. **Vet every finding** by re-reading its code at the cited line. Drop anything by design (documented in the project's design doc), duplicated or misattributed.
6. **Look at the rendered screens** when verification is on; otherwise say which findings could only be confirmed on screen.
7. **Write findings as one table:** Severity | Location (`path:line`) | Before | After | Why, most severe first. HIGH blocks a task or hides information; MEDIUM breaks a rule the user has stated; LOW is polish. Each taste jutsu's own review section sets finer severities and its preferred fix order.
8. **List what passed:** screens checked and left as they are, with the reason. This shows the review was a filter, not a wishlist.
9. **Verdict:** Block (any HIGH, or a taste jutsu's Never ship row) or Approve. Do not edit code unless asked; offer to fix.
