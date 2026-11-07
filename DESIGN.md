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
- **Style filters** (`StyleFilters`): pill chips with counts; `aria-pressed` marks the active one.
- **Page hero** (`.page-hero`): green band with breadcrumbs and an expanded headline. Used by every secondary page.
- **Closing band** (`.closing-cta`): marigold, one dark button.
- No eyebrow/kicker labels above headings.

## Motion

One authored moment: the home-page sheets start stacked and fan out once (`ease-out` expo, 0.8s), and re-fan when another template is chosen. Everything else is short state feedback (lifts, colour). `prefers-reduced-motion` disables all of it.

## CV templates

The PDF layouts are separate from the site palette. Each template has its own default accent (`templates[].color` in `src/lib/model.ts`); users can override it with one of ten print-safe colours (`accentColors`), all ≥4.5:1 against white so they work as heading text and as backgrounds behind white text.

Templates flagged `photo: true` place the optional profile photo (a 320px circular PNG prepared on the device by `src/lib/photo.ts`); without a photo they fall back to initials or simply omit it. Layouts must stay legible with and without one.
