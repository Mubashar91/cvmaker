# Folio design system

**Idea: paper on the desk.** The site is a deep-green desk; real CV sheets (actual PDF renders) are the heroes; marigold marks the one primary action in view. Colour is committed at page scale — whole bands are green or marigold — not sprinkled as accents on a neutral page.

## Colour

Defined as custom properties in `src/app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--desk` | `#10352b` | Header, hero, page heroes, privacy band, editor preview pane |
| `--desk-deep` | `#0b2820` | Footer, recessed panels on the desk |
| `--desk-raised` / `--desk-line` | `#17443a` / `#2b5649` | Cards and rules on the desk |
| `--on-desk` / `--on-desk-muted` | `#f4f3ec` / `#b7c9be` | Text on green (13:1 / 7.8:1) |
| `--marigold` | `#f3b53f` | Primary action, highlights, closing band, focus ring on dark |
| `--ground` / `--ground-2` | `#f8f7f2` / `#eeeee5` | Warm paper ground / alternate band |
| `--ink` / `--ink-2` / `--ink-3` | `#0f1d18` / `#3a4842` / `#5a6760` | Text; `--ink-3` is the lightest allowed for small text (≥4.5:1) |
| `--green` | `#10352b` | Actions and focus ring on light ground |

Rules: text on marigold is always `--ink`. Secondary text on green is `--on-desk-muted`, never grey. No gradients, no glass.

## Type

The self-hosted interface family is **Archivo Variable** (`@fontsource-variable/archivo/wdth.css`, weight 100–900, width 62–125%). Landing-page highlights pair it with the system **Georgia italic** for an editorial, personal feel, without an additional font download.

- Display (`h1`, `h2`): width 100–108%, weight 640–680, close tracking, balanced wrapping. Home hero uses explicit line breaks; italic highlights stay on their own line.
- Body: width 100%, 17px (16px on phones), line-height 1.6; long reading 18px / 1.75.
- UI labels: 14–15.5px, weight 580–650. Nothing below 12.5px.
- Numbers in counts, page numbers, and steps use `tabular-nums`.

## Components

- **Buttons** (`.button`): `accent` (marigold, primary), `dark` (green on light/marigold), `outline` (light ground), `on-dark` (outline on green). `large` for hero and closing actions. 10px radius.
- **Template card** (`TemplateCard`): a real CV sheet sits on a softly tinted paper mat. The small Free marker reinforces the pricing promise. Hover lifts the sheet and reveals a "Use template" pill. Selected = 3px green outline. The homepage starts with six designs and offers an explicit reveal button; the catalogue shows every design.
- **Template discovery**: name/intent search, independent column filter, and recommended/newest/alphabetical sorting. Empty states offer one reset action. Preview opens a native modal with full-size real PDF artwork; arrow keys browse the filtered results and Escape restores focus.
- **CV review**: eight transparent checks on visible content with direct correction links. Use check counts, never an invented ATS score. A plain-text export uses the chosen section order and excludes hidden sections.
- **Template collections**: six curated pages with original selection guidance. Collection cards provide useful crawlable navigation on the homepage, catalogue, and related detail pages.
- **Style filters** (`StyleFilters`): pill chips with counts; `aria-pressed` marks the active one.
- **Page hero** (`.page-hero`): green band with breadcrumbs and an expanded headline. Used by every secondary page.
- **Closing band** (`.closing-cta`): marigold, one dark button.
- **Setting options** (`.setting-option`, `CVDesignControls`): three-up option buttons with a live sample (Aa in the PDF faces, spacing bars). Pressed = green inset ring on paper ground; on phones they become compact centred tiles.
- **Custom colour swatch** (`.swatch.is-custom`): dashed outline with a pipette until used, then it shows the chosen colour. A one-line note appears when the colour had to be darkened for print.
- **Next step** (`.next-step`): a green `dark` button at the foot of each content section; marigold stays reserved for Download.
- No eyebrow/kicker labels above headings.

## Motion

One authored moment: the home-page sheets start stacked and fan out once (`ease-out` expo, 0.8s), and re-fan when another template is chosen. Everything else is short state feedback (lifts, colour). `prefers-reduced-motion` disables all of it.

## CV templates

The PDF layouts are separate from the site palette. Each template has its own default accent (`templates[].color` in `src/lib/model.ts`); users can override it with one of ten print-safe colours (`accentColors`) or any custom colour. Every accent is ≥4.5:1 against white — custom picks are darkened by `readableAccent` until they are — so they work as heading text and as backgrounds behind white text.

Each template must be recognisable at thumbnail size by one structural idea (a band, a stripe, a frame, a rule, tiles), not by colour alone. Before adding one, check its silhouette against the existing 40 in the gallery. Header shapes drawn in the page background (Prism, Tide, Halo) reserve their space with a fixed spacer and auto-size the name to one line; later pages repeat a slim version of the shape. Icons come from `src/lib/pdf-icons.ts` (Lucide outlines), never Unicode glyphs.

Templates flagged `photo: true` place the optional profile photo (a 320px circular PNG prepared on the device by `src/lib/photo.ts`); without a photo they fall back to initials or simply omit it. Layouts must stay legible with and without one.
