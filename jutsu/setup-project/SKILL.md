---
name: setup-project
description: Set up a project the jutsu way, or bring an existing one up to it. Installs the foundation (tokens, shadcn bridge, token check, base blocks) from the registry, writes AGENTS.md and DESIGN.md from templates without overwriting what exists, wires the token check into the project's checks, and asks the product's open design decisions instead of guessing them. Use for /setup-project, "set up this project", "add the foundation", or "update the foundation". Runs only when invoked.
disable-model-invocation: true
---

# Set up a project

The method lives in the jutsu, the shared code in the foundation registry, and only the product's own decisions in the project. This jutsu installs the first two and asks for the third.

Templates are in `../../foundation/templates/` from this file. The registry is served from `FOUNDATION_URL` (default `https://raw.githubusercontent.com/cowboyshibuya/jutsu/main/foundation/r`); to test a local change, build it with `FOUNDATION_URL=http://127.0.0.1:4100/r node foundation/scripts/build-registry.mjs` and serve `foundation/` on that port (use `127.0.0.1`, not `localhost`, which can resolve to IPv6 and miss an IPv4-only server). Rebuild without `FOUNDATION_URL` before committing.

## Hard rules

1. **Never overwrite.** An existing `AGENTS.md`, `DESIGN.md`, token file or component is read first; add only missing sections or files, and show the diff of anything you would change.
2. **Ask, never guess, the product's decisions.** Anything the repository cannot answer and the person did not answer stays marked `@decide` in the tokens and listed under Open decisions in `DESIGN.md`.
3. **Respect the project's boundaries.** Files its `AGENTS.md` protects (global CSS, config, middleware) are changed only with the person's word. If a release-age, install-script or network policy blocks an install, stop and ask instead of changing it.
4. **Work on a branch.** Commit each step on a work branch; never push.

## Steps

1. **Read the project.** Package manager (from the lockfile), framework, Tailwind version, whether shadcn is set up (`components.json`), existing `AGENTS.md`, `DESIGN.md`, tokens and shared components, the check command, and the git state. Create a work branch.
2. **Ask once, in one message**, only what the repository does not answer:
   - what the product is and who uses it, in one or two sentences;
   - the accent colour and typefaces (or "decide later");
   - the boundaries agents must never cross without asking;
   - anything that deliberately differs from the taste jutsu.
3. **Install the foundation** with the project's package-manager runner (`bunx shadcn@latest`, `pnpm dlx shadcn@latest`, `npx shadcn@latest`):
   - `add <FOUNDATION_URL>/tokens.json` and `<FOUNDATION_URL>/check-tokens.json`;
   - the blocks the product needs: `page-header`, `metric`, `empty-state`.
   If shadcn is not set up, ask before running `shadcn init`.
4. **Wire the tokens.** Import `primitives.css`, `semantic.css`, `shadcn.css`, then `tailwind.css` after `@import "tailwindcss"` in the global stylesheet (with permission if it is protected). Replace the colour block `shadcn init` wrote with nothing: `shadcn.css` now provides it. Write the person's answers into `primitives.css` and remove those `@decide` marks.
5. **Wire the check.** Add `"check:tokens": "node scripts/check-tokens.mjs <component dirs>"` to `package.json` (shadcn's generated `components/ui` is skipped until the project customises it; `--include-ui` adds it). Run it.
   - New project, or it passes: add it to the full check command.
   - Existing project with failures: report the count by file, add it to the full check only if the person agrees, and offer to migrate the worst files first. Do not mass-edit without a yes.
6. **Write the docs** from the templates. Missing file: create it filled with the answers. Existing file: add only missing sections (Tokens, Colour carries meaning, Blocks, Open decisions, Differences from the jutsu) and leave the rest as it is. `CLAUDE.md` is one line, `@AGENTS.md`, unless it already has content.
7. **Prove it.** Run the project's full check and build. Render one page that uses a block, when browser verification is allowed. Run `node scripts/check-tokens.mjs --decisions` and include its list in the report.
8. **Report**: what was installed and where, what was asked and answered, the open decisions, the token-check result, and what still needs the person (a protected file, a failing baseline).

## Updating an existing setup

For "update the foundation": re-add each installed item and review the diff before accepting (`shadcn add <url> --dry-run`, then `--diff <file>` where the CLI supports it; otherwise compare the item's file with the local copy). Local changes win: list conflicts for the person instead of overwriting them. Re-run the token check and the full check.

## Promoting back

When a block is built the same way in two projects, propose moving it into `foundation/blocks/` with its `.md`, an entry in `foundation/registry.json`, and a rebuild of `r/`. A block used once stays in its project.
