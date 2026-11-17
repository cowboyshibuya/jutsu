# Shipping

Push, PR, merge and release each need the user's word for this task. A grant like "merge when green" covers only this task.

1. **Validate locally** with the project's full gate (for example `bun run validate`). Never skip or hide a failing stage; report the exact one.
2. **Bump the version** if the project has a patch command for the changed app, as its own commit.
3. **Tidy commits** into small, ordered units, one concern each. Unrelated changes go in a separate PR or stay out.
4. **Open the PR** when allowed: title says the user-visible change; body says the problem, the fix, what was verified, what was not, and before/after screenshots for UI.
5. **Watch CI.** On failure, read the log, fix the cause on the branch, push, repeat. A flaky check is named as flaky with evidence, never silently retried until green.
6. **Merge** only when allowed and every required check is green. Squash unless the project says otherwise.
7. **Clean up** when allowed: pull the default branch, delete the merged branch and its worktree.
8. **Close the loop.** If the work came from an Alabasta task, submit the resolution. If it came from a production report, check the report stops recurring.
