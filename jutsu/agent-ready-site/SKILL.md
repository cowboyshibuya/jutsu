---
name: agent-ready-site
description: A public site written for two readers, people and their AI assistants. One source of product facts drives the pages, llms.txt, structured data and a read-only MCP endpoint, so nothing drifts; every word is in the server HTML; every page offers "Ask AI" to open ChatGPT, Claude or another assistant with a prompt about that page; and a quick start is a prompt to paste into a coding agent, not an install command. Use when building or reviewing a marketing site, docs, guides, a quick start or install section, blog, pricing or legal pages, SEO, structured data, llms.txt, an "Ask AI" or "summarize with AI" button, or public agent and API discovery. Triggers on quick start, getting started, installation, npm install, setup instructions, copy prompt, llms.txt, AI search, generative engine optimization, GEO, AEO, JSON-LD, schema.org, structured data, Ask ChatGPT, summarize with AI, MCP server, well-known, OpenAPI, crawlers, sitemap.
---

# Agent-ready site

More and more people meet a product through an assistant: "what is X, how much is it, is it right for me?". The site has two readers now. The person, who should be able to hand any page to their assistant in one click. And the assistant, which should find the facts complete, current and unambiguous.

The work is mostly plumbing, done once, generated from the same facts as the pages.

## Hard rules

1. **One source of facts.** Name, positioning, pricing, plans, limits, languages and key pages live in one module. Pages, llms.txt, JSON-LD and agent tools all read it. A hand-copied fact file goes stale, and a stale file an assistant trusts is worse than none.
2. **Every word is in the server HTML.** Titles, body, FAQ answers, pricing tables. Nothing a reader or crawler needs is loaded only by client script or hidden behind a click that fetches it.
3. **Public surfaces are read-only and public-only.** Agent endpoints expose what the marketing site already says. No customer data, no write tools, no internal numbers.
4. **Same truth everywhere.** If the pricing page says €20, llms.txt, JSON-LD and the pricing tool say €20. A mismatch is a bug, not a wording choice.
5. **Untrusted input stays data.** An agent endpoint that takes arguments validates them and never treats them as instructions.

## The layers

Adopt in order. Each layer is useful on its own; stop where the product's needs stop.

| Layer | What | Serves |
| --- | --- | --- |
| 1. Readable | Server HTML, one `<h1>`, semantic headings, canonical URLs, `hreflang` per language, sitemap, RSS for articles | Every crawler and assistant |
| 2. Structured | JSON-LD: Organization, SoftwareApplication or Product (with offers), FAQPage, Article, BreadcrumbList, HowTo, DefinedTerm for category terms | Search and answer engines |
| 3. Summarised | `/llms.txt`: core facts, positioning, pricing, the key pages with one line each. `/llms-full.txt`: the full text of the key pages and guides. Both generated, cached briefly | Assistants reading the site |
| 4. Askable | "Ask AI" on reading pages and in the footer (see below) | The person, through their assistant |
| 5. Queryable | A read-only MCP endpoint with a handful of fact tools (facts, pricing, page list, a guide summary, discovery), an OpenAPI description, and `/.well-known/` discovery files (MCP server card, API catalog) | Agents acting for a prospect |
| 6. Actionable | OAuth metadata and authenticated tools, only when the product has a real API | Agents acting for a customer |

## Ask AI

A control that opens the reader's assistant in a new tab with a prompt about this page already written.

- **The prompt** asks what the reader wants from this page and includes its canonical URL, so the assistant reads the source rather than guessing: "Summarize this guide and tell me what applies to a two-taxi company: {title} {url}". Written in the reader's language, per page type (article, guide, legal page, about, home).
- **Providers that take the prompt in the link** open with it filled (`?q=` for ChatGPT, Claude and Le Chat at the time of writing; re-check, since providers change this). For one that cannot, copy the prompt to the clipboard inside the click and show a short note: "Prompt copied. Paste it into Gemini." Always offer **Copy prompt** for any other assistant.
- **Two shapes**: a split pill (the main half opens the remembered provider, a chevron opens the others) for article heads; a row of provider tiles for the footer ("Ask about Product on").
- **The pill keeps its width** when the provider changes: stack every label and cross-fade between them.
- **Count the clicks** per provider and source page, so you learn which pages people hand to assistants.
- **Placement**: articles, guides, legal pages, the about page, the footer. Not on forms or checkout.
- **Never draw AI with sparkles.** Use the providers' own marks.

## Quick start is a prompt

Developers set things up through their coding agent now. A quick start that shows `npm install x` makes the reader translate it into a request; show the request instead.

```
Quick start
Pick your framework, then copy this prompt into your agent.

[React ⌄]                                              [Copy prompt]
Set up ui-sdk in this React project. It needs React 19 or newer.
1. Install @ui-sdk/react and @ui-sdk/core with the project's package manager.
   If a release-age policy blocks the install, stop and ask me instead of changing it.
2. Add a note to AGENTS.md, creating it if needed: before using ui-sdk, follow the
   ui-sdk skill if it's installed, and read node_modules/@ui-sdk/react/docs/llms.txt.
3. If you support skills, run: npx skills@latest add org/repo --skill ui-sdk

Then ask your agent to build something:                [Copy prompt]
Build a search field with ui-sdk: a text input and a Clear button that only shows
when there's text. Clear empties the input and puts focus back in it.
```

What makes the setup prompt work:

- **Package-manager neutral.** "With the project's package manager", never a hard-coded `npm`, `pnpm` or `bun`.
- **States the requirements up front** (runtime and framework versions) so the agent checks before installing.
- **Respects the project's safety policies.** If a release-age, lockfile or install-script policy blocks it, the agent stops and asks; it never loosens the policy to get through.
- **Leaves durable context.** It writes a short note into `AGENTS.md` pointing at the docs shipped inside the package (`node_modules/<pkg>/docs/llms.txt`), so every later session reads the documentation that matches the installed version.
- **Offers the skill** for agents that support skills, as an optional step.
- **Numbered steps the agent can verify**, one action each.

Then a second prompt: one concrete, small first task with a checkable result, written in the project's terms ("use our existing styles").

The block itself: monospace, shown in full (never collapsed behind "show more"), a **Copy prompt** button, a selector when the prompt differs by framework or platform, and the text present in the server HTML. A raw command can follow under "Manual setup" for people without an agent.

## llms.txt shape

```
# Product

> One-line positioning.

## Core facts
- **Category**: …
- **Primary users**: …
- **Pricing**: Free for …; Plus €20/mo for …; Pro …
- **Languages**: …

## Key pages
- Pricing: https://…/pricing (what each plan includes)
- Guide: https://…/guides/… (one line on what it answers)
```

Facts first, in plain sentences an assistant can quote. Links with one line each. No marketing adjectives.

## Never ship

Self-check before finishing. Each row is a block in review.

| Never | Instead |
| --- | --- |
| A hand-written llms.txt or JSON-LD copy of the facts | Generated from the same facts module as the pages |
| FAQ answers loaded on click | Answers in the server HTML, collapsed with CSS or `<details>` |
| A price in llms.txt or a tool that differs from the pricing page | One source; a test that compares them |
| An agent tool that returns customer or internal data | Public facts only |
| A write tool on the public endpoint | Read-only; writes need authentication |
| "Ask AI" that opens an empty assistant with no prompt and no copy | Prefilled where possible, copied otherwise, with a note |
| A prompt with no URL | The canonical URL in every prompt |
| An English-only prompt on a French page | The prompt in the page's language |
| Sparkles for AI | The provider's mark |
| JSON-LD that claims ratings, reviews or offers the page does not show | Only what is visible on the page |
| A quick start that leads with `npm install x` | A setup prompt for the reader's agent; the raw command under "Manual setup" |
| A setup prompt that names one package manager | "With the project's package manager" |
| A setup prompt that lets the agent bypass a release-age or install policy | "If a policy blocks the install, stop and ask me" |
| Setup that leaves no trace for the next session | A note in `AGENTS.md` pointing at the docs shipped in the package |
| A dynamic root route (`/[workspace]`, `/[username]`) that answers `/llms.txt`, `/robots.txt` or any unknown path with a 200 HTML page | Reserve those paths so their own routes win; unknown paths return 404 |
| An authenticated agent endpoint that runs a tool without a token | Listing tools is fine; every call without a token is refused with the OAuth challenge |

## What code can't tell you

Check the running site, or say you did not:

- view the page source and find the FAQ answers and pricing figures in it;
- fetch `/llms.txt` and compare its prices and plan limits with the pricing page;
- open each Ask AI provider and confirm the prompt arrives (or the copy note shows);
- run the pages through a structured-data validator;
- list the MCP tools and call each one.

## Fixing: preferred order

1. **Move content into the server HTML.**
2. **Create the single facts module** and point the pages at it.
3. **Generate** JSON-LD and llms.txt from it.
4. **Add Ask AI** to reading pages and the footer.
5. **Add the read-only endpoint and discovery files** if prospects' agents are a real channel.

## Review output

**Findings**: one table, most severe first.

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| HIGH | `app/llms.txt/route.ts` | Static file says Plus is €15 | Generated from the pricing module (€20) | Assistants quote a wrong price (hard rule 4) |

HIGH: a fact that differs between surfaces, content missing from server HTML, or private data on a public endpoint. MEDIUM: a Never ship row. LOW: a missing optional layer.

**Verdict**: list what was checked and left as it is, with the reason. Then **Block** on any HIGH or Never ship row, otherwise **Approve**.
