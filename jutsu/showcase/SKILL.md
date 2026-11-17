---
name: showcase
description: Marketing and product pages that sell by showing the real product, not pictures of it. The app's own components on demo data, demos where the visitor does one thing, an app window bleeding off the edge behind a card, a different composition per screen width, short looping stories that keep their size, plain factual copy, and live proof that hides when data is missing. Use when building or reviewing a landing page, product or feature page, hero, feature grid, pricing teaser, testimonial or closing call to action. Triggers on landing page, marketing site, hero section, product page, feature section, product preview, demo, screenshot, mockup, bento grid, feature cards, scroll animation, social proof, live counter, call to action.
---

# Showcase

A product page is the product's first screen. It earns trust the way the app does: by working. Show the real thing, let the visitor do one real thing, say only what is true, and keep everything else quiet.

## Hard rules

1. **Real components, demo data.** Previews render the app's own components on a fixed demo dataset. Never a screenshot, never hand-drawn dashboard chrome that the app does not have. When the app changes, the page changes with it.
2. **Say only what the code does.** No feature, number or claim the product cannot back today. "Coming soon" is labelled as such.
3. **Previews are pictures to assistive tech.** Mark them hidden from screen readers and inert unless the page names a control as live, so their headings and buttons do not enter the page's outline or tab order.
4. **Every word is in the server HTML.** Headlines, leads, FAQ answers: readable with no script, by crawlers and by AI assistants.
5. **The project's design doc wins.** Follow its tokens and components and report conflicts.

## The gate

For each section, answer in order.

1. **What is the one thing this section must make the visitor believe?** One sentence. If you cannot write it, cut the section.
2. **Can the visitor do it rather than read it?** A short task the product really performs (start a shift, add a ride, see a total update) beats any description. If yes, build a one-action demo. If not, a still preview.
3. **Is motion needed to show it?** Only when the point is change over time (a count rising, a row arriving, a step completing). Otherwise a still, faded preview.
4. **What does it become on a phone?** Decide the phone composition now (see Widths), not after.

## Patterns

### One action at a time

A demo lets the visitor do exactly one thing, then stops. Values the task does not need are preset. The one live action is lit at full strength; actions the app offers but the demo does not run are shown dimmed and disabled, with no hand cursor. Finishing the action shows the real result (the row appears in the table, the total changes).

### Two layers

A window of the app runs off one edge of the page behind, fading at that edge and at its foot; the card the visitor uses stands in front of it, taller than the window. The window gives context, the card gives the task. On a phone the window is hidden, unless the card means nothing without it (a map): then it sits full width behind the card's head.

### Stories

An animated preview tells one short story on a timer (a ride starts, ends, lands in the table) and starts over. It:

- keeps one size through every step: a table keeps its row count, a new row slides in as the others glide down;
- never shows an empty card: a card that highlights something arrives with its content and leaves with it;
- pauses when off screen or in a background tab;
- under reduced motion, shows the final, meaningful state, still.

### Edges

A large picture runs off the page edge with a gradient fade; its border never shows at the edge. A small picture sits centred. Every fade uses one shared mask helper.

### Live proof

A live figure ("12,480 rides recorded") reads real data through a short cache. When the data is unavailable, the element disappears; it never shows 0 or a placeholder figure. Testimonials are real people or real companies, quoted as they said it.

## Widths

Compose each width; do not shrink one composition.

| Element | Desktop | Phone |
| --- | --- | --- |
| Hero picture | the desktop app in a window | the phone app in a phone frame |
| Two layers | window behind, card in front | card alone, or window behind its head |
| Large previews in a list | run off the edge | take turns running off the left and right edges |
| Small previews | in their cell | centred |
| Headline and lead | side by side on one baseline | stacked |
| Feature cells | two per row, hairline between; an odd last cell takes the full row | stacked, hairline between |

Grids keep `min-w-0` so a preview never pushes the page wider. Fixed text slots clamp with an ellipsis in the longest language rather than overflow.

## Copy

- **Title**: a promise in plain words. "Every shift, ride and road sheet. In one place." Not a slogan that could sell anything.
- **Lead**: first sentence lit, the rest a step dimmer. Two sentences at most.
- **No eyebrows above section titles**, no "Introducing", no "Powerful", "Seamless", "Revolutionary".
- **Concrete over adjectives**: "1 hour per week", "free for one person with one taxi", "~3 seconds to start a ride".
- **Name the reader's world**: their nouns (shift, ride, road sheet), their places, their money.
- **FAQ answers the hard questions first**: price, privacy, cancelling, who pays.

## Restraint

- One bright action per screen; a second action is quiet.
- Colour carries meaning (status, roles, money), never decoration.
- Hairlines before boxes; depth from light, not stacked shadows.
- Pages meant for reading (guides, legal, articles) carry no pictures.

## Motion values

- Enter, exit and settle: `cubic-bezier(0.23, 1, 0.32, 1)`. Springs (stiffness 260–420, damping 16–26) only for things that pop in: a marker, a check.
- 200–350 ms for controls and swaps, 350–450 ms for a panel entering, 600–900 ms for a line or bar drawing.
- Enter with opacity, a small rise (6–24 px) and a slight blur that clears; blur only on small elements.
- Animate `transform` and `opacity` only. No per-frame React state, no infinite animation off screen, no backdrop filter over moving content.

## Never ship

Self-check before finishing. Each row is a block in review.

| Never | Instead |
| --- | --- |
| A screenshot or invented dashboard | The app's own components on demo data |
| A claim the product cannot back | Only what the code does; "coming soon" labelled |
| A demo with several live actions | One lit action; the rest dimmed and disabled |
| A preview whose headings and buttons reach screen readers | Hidden and inert |
| An animation that changes the component's size | One size through every step |
| A card that appears empty, then fills | It arrives with its content |
| A live counter showing 0 when data fails | The counter disappears |
| The desktop composition shrunk onto a phone | A phone composition |
| A picture's border showing at the page edge | Fade at the edge |
| A third-party map or embed loaded for decoration | A drawn version |
| Text only rendered by client script | Every word in the server HTML |
| Eyebrow above every section title | The title alone |

## What code can't tell you

Watch the page at desktop and phone widths, in the longest language, from top to bottom at normal and fast scroll speed. Look for: long stretches of near-empty screen during scroll-driven animation, previews cut off on the right, labels truncated inside previews, a story that jumps size, motion still running under reduced motion, and the live figure when its data source is off. If you did not watch it, say so.

## Fixing: preferred order

1. **Cut** sections that fail gate 1, and claims the product cannot back.
2. **Replace** screenshots and invented chrome with real components.
3. **Turn** descriptions into a one-action demo where the task allows.
4. **Compose** the phone version.
5. **Stabilise** stories: fixed size, pause off screen, reduced motion.
6. **Tighten** copy: plain title, two-sentence lead, concrete numbers.

## Review output

**Findings**: one table, most severe first.

| Severity | Location | Width | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| MEDIUM | `marketing/insight-grid.tsx` | 375px | Metric preview keeps icons and delta figures; labels cut to "Confirmed reve…" | Phone composition: short labels, no icons, arrow-only delta | A desktop composition shrunk onto a phone |

HIGH: a false claim, a broken or unusable section, or content missing from the server HTML. MEDIUM: a Never ship row. LOW: copy and motion polish.

**Verdict**: list sections checked and left as they are, with the reason. Then **Block** on any HIGH or Never ship row, otherwise **Approve**.
