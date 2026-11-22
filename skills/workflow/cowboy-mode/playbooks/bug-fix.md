# Bug fix

1. **Gather evidence first.** Read the report, the error tracker issues, logs and recent commits touching the area. Write down the observed behavior and the expected behavior.
2. **Reproduce.** Prefer a failing test at the cheapest layer that shows the bug. If no test fits, a scripted or manual reproduction with exact steps.
3. **Find the first wrong state.** Trace back from the symptom to where the system first went wrong. List every caller of that code.
4. **Fix the root cause there.** A guard is a fix only when the state it handles is legitimate. If two fixes sharing one premise fail, test the premise before writing a third.
5. **Check the blast radius.** Every caller still behaves; similar code elsewhere does not carry the same bug.
6. **Commit** the test and the fix on the work branch.
7. **Prove it.** The reproduction now passes and the project's checks pass. For a production report, say what will confirm it in production (the issue stops recurring) and check it if you have access.
8. **Report** the cause in one sentence, the fix, the proof and anything unverified.
