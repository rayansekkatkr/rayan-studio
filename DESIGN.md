---
name: Rayan Studio
description: Founder-led product and software engineering studio. Ink on paper by day, night page headers, one indigo signal.
colors:
  indigo-signal: "#5957d9"
  indigo-signal-deep: "#4745bd"
  indigo-signal-night: "#8a88f2"
  live-green: "#3ddc84"
  paper: "#f2f1ed"
  paper-white: "#ffffff"
  paper-shade: "#ebe9e4"
  ink: "#0e0e10"
  ink-muted: "#646469"
  hairline: "rgba(11, 11, 14, 0.14)"
  hairline-strong: "rgba(11, 11, 14, 0.28)"
  night: "#09090c"
  night-surface: "#121218"
  night-shade: "#1a1a21"
  night-ink: "#f7f7f4"
  night-ink-muted: "#a2a2aa"
  night-hairline: "rgba(247, 247, 244, 0.14)"
typography:
  giant:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "14rem"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.06em"
  display:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.045em"
  pull:
    fontFamily: "Instrument Serif, serif"
    fontSize: "clamp(2.6rem, 6vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.02
  title:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.025em"
  body-lead:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter Tight, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.18em"
rounded:
  none: "0"
spacing:
  gutter-mobile: "1.25rem"
  gutter-desktop: "2rem"
  section: "clamp(3.5rem, 6vw, 5rem)"
  container: "86rem"
  reading: "46rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.indigo-signal}"
    textColor: "{colors.paper-white}"
  button-primary-night:
    backgroundColor: "{colors.night-ink}"
    textColor: "{colors.night}"
    rounded: "{rounded.none}"
    padding: "14px 28px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  nav-quote:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  card:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  tech-chip:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 14px 6px 12px"
  eyebrow:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
---

# Design System: Rayan Studio

## Overview

**Creative North Star: "The Night Workshop"**

One person building real software through the Korean night for clients waking up in Europe. Every inner page opens on a night band: near-black ground, a theme photo or a slow indigo glow melting in from the right, a page name set in giant black type across the full container. Below the band the page turns to paper: off-white ground, ink text, hairline rules. The home hero carries the same night with a tilted wall of the studio's real product screens drifting past.

The system is reductive by conviction. One sans family carries everything from the giant word to the form label; a single serif italic is reserved for the sentence that matters. One chromatic accent, indigo, signals action and current state; everything else is ink, paper or night. Corners are square without exception. Depth comes from the paper/night contrast and from photos dissolving into black, not from shadows.

Components are blunt and exact: square, flat, hairline-bordered, and they answer interaction with a color swap, never a lift or glow.

**Key Characteristics:**
- Paper by day, night for page headers, the home hero and statements.
- Inter Tight from weight 400 to 900; Instrument Serif italic as the only second voice.
- One accent (indigo) for action and state; a tiny green dot as the "available" signal.
- Zero radius on every surface, control and chip.
- Photos and product screens fade into the night through masks, never framed boxes.
- Desktop root font set to 90% at 1024px and up for density; phones keep 100%.

## Colors

Achromatic ink-paper-night system with one indigo signal. Source of truth: `--rs-*` variables in `src/app/globals.css`, exposed as `rs-*` Tailwind colors.

### Primary
- **Indigo Signal** (`indigo-signal`, `--rs-accent`): hover fill of every ink CTA, current nav item, focus border on inputs, accent numbers in editorial lists, generic tech icons, the hero glow. Never a ground for large areas.
- **Indigo Signal Deep** (`indigo-signal-deep`, `--rs-accent-hover`): hover step when indigo is already the resting fill.
- **Indigo Signal Night** (`indigo-signal-night`): indigo as text or icon on night (6.5:1 on night, 5.7:1 on night-shade). Exposed as `--rs-accent-fg` inside `.rs-theme-dark`.

### Tertiary
- **Live Green** (`live-green`): the 6px dot inside the header quote CTA. Status signal only, never text, never larger than a dot.

### Neutral
- **Paper** (`paper`): page ground below the night band; fill of form inputs and of chips placed inside white cards.
- **Paper White** (`paper-white`): card and chip surfaces; header surface at 92% opacity, mega menu at 96%.
- **Paper Shade** (`paper-shade`): subtle alternating section ground.
- **Ink** (`ink`): body and heading text, the primary CTA fill, the 1px rule under page titles.
- **Ink Muted** (`ink-muted`): leads, eyebrows, secondary copy.
- **Hairline / Hairline Strong**: 1px borders on cards, inputs, chips, header; strong variant on hover and outline buttons.
- **Night** (`night`): night bands, page heroes, home hero and statement.
- **Night Surface / Night Shade**: cards and alternate grounds inside `.rs-theme-dark`.
- **Night Ink / Night Ink Muted / Night Hairline**: text, secondary text and borders inside night regions.

### Named Rules
**The One Signal Rule.** Indigo is the only chromatic color in the interface. It marks action (hover), place (current nav) and focus. If two things on a screen are indigo at rest, one of them is wrong.

**The Theme-Scope Rule.** Night is applied by wrapping a region in `.rs-theme-dark`, which remaps the `--rs-*` variables. Never hard-code night hexes inside a component that also renders on paper.

## Typography

**Display Font:** Inter Tight (with sans-serif), loaded via `next/font` as `--font-sans`
**Body Font:** Inter Tight
**Accent Font:** Instrument Serif 400, normal and italic, as `--font-serif`

**Character:** A heavy, tightly tracked grotesque does the shouting and the working; a narrow editorial serif italic speaks the one sentence per section that should be remembered.

### Hierarchy
- **Giant** (900, fitted to the container width, capped at 14rem, line-height 0.8, uppercase): the page name in night headers. Decorative and `aria-hidden`; the real h1 sits beside it.
- **Display** (800, 2.5rem to 4.5rem, 0.98): h1 on pages without a giant word.
- **Headline** (800, 2.25rem to 3.75rem, 0.95 to 1): section h2.
- **Pull** (Instrument Serif 400, 2.6rem to 4.75rem, 1.02): the statement sentence; also inline italic accents inside headlines (`EditorialAccent`).
- **Title** (700, 1.25rem to 1.5rem, snug): card titles, and the h1 when paired with a giant word.
- **Body lead** (400, 1.125rem, 1.625, ink-muted): intro paragraphs, max width 46rem.
- **Body** (400, 1rem, 1.5): running text and inputs; buttons at 600.
- **Label** (600, 0.75rem, +0.14em to +0.18em, uppercase, ink-muted): the Night Band label (read as a breadcrumb), labels inside cards, small meta. Never a kicker above a section heading.

### Named Rules
**The One Serif Sentence Rule.** Instrument Serif appears at most once per section, for a sentence or a phrase inside a headline. Never for UI, labels, buttons or body paragraphs.

**The Negative Tracking Rule.** Anything at 2rem or above tracks between -0.035em and -0.06em; small uppercase tracks +0.14em to +0.18em. Nothing sits at default tracking at display sizes.

## Layout

Single centered container (86rem) with 1.25rem gutters on mobile and 2rem from 768px. Reading text is capped at 46rem. Sections are separated by `clamp(3.5rem, 6vw, 5rem)`. Night headers open with 7rem (mobile) / 9rem (desktop) top padding to clear the fixed header.

Night headers with a giant word switch to a 5/7 asymmetric grid at 1024px: title left, lead right. Editorial pages (services, work) use large indigo numbers as anchors beside text columns. Home chapters take a fixed share of the viewport on desktop (76svh / 64svh / 62svh) and flow freely on mobile.

The header is fixed: transparent over night bands, solid paper-white with a bottom hairline once scrolled, and a floating inset bar (12px inset, capped at 76rem) further down. It hides on scroll down. Breakpoints are Tailwind defaults; the meaningful ones are 768px (gutters) and 1024px (desktop nav, 90% root font, asymmetric grids).

## Elevation & Depth

Flat by default. Depth is tonal (night band against paper) and photographic (images masked into the night with linear-gradient masks from the right and the bottom). Two shadows exist, both functional.

### Shadow Vocabulary
- **Floating header** (`box-shadow: 0 16px 40px -24px rgba(11,11,14,0.45)`): only on the floating header bar, to separate it from content scrolling beneath.
- **Product screen** (`box-shadow: 0 24px 60px -28px rgba(0,0,0,0.8)`): only on real product screenshots set on night, to read them as objects.

### Named Rules
**The Dissolve, Don't Frame Rule.** Photos in night bands and statements dissolve into the night through masks and shade gradients. They are never set in a bordered box with a drop shadow.

## Shapes

Square everywhere. `--rs-radius-sm/md/lg` are all 0 and components reference them, so the system stays square by token, not by habit. Borders are 1px hairlines. The only round shape is the 6px live-green status dot. Page titles without a giant word sit above a 1px ink rule aligned to the container content edges.

## Components

### Buttons
Blunt and exact: a block of ink that turns indigo.
- **Shape:** square (0).
- **Primary:** ink fill, paper text, 600 weight at 1rem, 14px by 28px, optional trailing arrow icon with an 8px gap.
- **Hover / Focus:** fill swaps to indigo in 150ms; no translate, no shadow. Disabled at 50 to 60% opacity.
- **Primary on night:** night-ink fill with night text; hover swaps to indigo with night-ink text.
- **Outline:** transparent, 1px hairline-strong border, ink text, 500 weight; hover turns border and text indigo.
- **Header quote CTA:** compact primary (10px by 20px, 0.875rem) with the live-green dot before the label.

### Chips
- **Tech chip:** paper-white fill (paper when inside a white card), 1px hairline, 0.875rem medium ink text, a 16px brand or generic icon on the left. Static, not interactive.

### Cards / Containers
- **Corner Style:** square.
- **Background:** paper-white on paper; night-surface inside night.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px hairline; hover raises it to hairline-strong in 150ms. That is the whole hover.
- **Internal Padding:** 20px for link rows, 32px for content panels.

### Inputs / Fields
- **Style:** paper fill, 1px hairline, square, 12px by 16px, 1rem ink text, label above with a 6px gap.
- **Focus:** border turns indigo in 150ms; no glow ring.
- **Error:** inline message via `FormStatus`.

### Navigation
- **Desktop (1024px and up):** wordmark "Rayan Studio" at 800 weight, 1.125rem, -0.02em; links at 0.875rem medium with a 16px by 8px hit area; current link in indigo (`aria-current="page"`), hover turns ink links indigo. Over night (transparent state) everything inverts to night-ink and the current link uses indigo-signal-night.
- **Right side:** language switch, then the quote CTA.
- **Mobile:** 40px menu/close icon button opening the full menu panel.

### Night Band (signature)
The page header shared by every inner page: a `.rs-theme-dark` region with an optional theme photo masked in from the right at 78% opacity (30% when the photo is busy product UI; 45% / 22% on mobile), or a drifting indigo glow when there is no photo. Hosts the eyebrow, optional giant word, h1 and lead.

### Giant Word (signature)
The page name in Inter Tight 900 uppercase, measured with a ResizeObserver to fill the container width exactly (capped at 14rem). Always paired with a real h1; always `aria-hidden`.

### Product Screen Wall (signature)
Home hero only: a plane rotated -9 degrees holding columns of real product screenshots scrolling vertically at linear speed, masked on the left and top/bottom, paused on hover and frozen under `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** open every inner page with the Night Band and a real h1; add a Giant Word when the page has a short name.
- **Do** use ink fill turning indigo on hover for every primary action, with a 150ms color transition.
- **Do** reference `--rs-*` variables (via the `rs-*` Tailwind colors) so `.rs-theme-dark` can remap them.
- **Do** keep radius at 0 through `--rs-radius-*`, and borders at 1px hairline.
- **Do** show real product screens, not illustrations, when a page needs imagery of the work.
- **Do** stop every looping animation under `prefers-reduced-motion`.

### Don't:
- **Don't** extend the legacy warm-paper layer (`--background`, `--accent` orange `#d94f2b`, `.glass-panel`, `.shimmer-btn`, offset shadows, `ui/button`, `ui/card`, `ui/input`, `ui/badge`). It survives only in `components/site/` for the local `/site/[sector]/[city]` landings and older pages; new work uses Direction A tokens.
- **Don't** add a second chromatic accent or colored section grounds. Gradient text is limited to the indigo-to-white editorial numbers (`.num-gradient`).
- **Don't** lift, scale or glow components on hover; the response is a color swap.
- **Don't** round corners on anything but the status dot.
- **Don't** use Instrument Serif for UI, labels or paragraphs.
- **Don't** put a label above a section heading: the heading carries its own weight. Only the Night Band keeps its label, which reads as a breadcrumb.
- **Don't** frame night-band photos in boxes; mask them into the night.
