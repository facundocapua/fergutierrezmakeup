---
name: Fer Gutierrez MakeUp
description: A makeup artist's working face chart turned into a website, in warm paper, ink and gold pencil, with whole sections in pink, beige and gold.
colors:
  rosa: '#f1cdcf'
  rosa-hondo: '#a63d5e'
  rosa-oscuro: '#86304b'
  dorado: '#d9b65f'
  dorado-hondo: '#7f5f22'
  beige: '#e8ddd0'
  paper: '#fdfbf8'
  ink: '#171412'
  graphite: '#5c534c'
typography:
  display:
    fontFamily: 'Bricolage Grotesque'
    fontSize: '5.9cqw'
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: '-0.025em'
    fontVariation: "'wdth' 75"
  headline:
    fontFamily: 'Bricolage Grotesque'
    fontSize: '4.5rem'
    fontWeight: 700
    lineHeight: 1
    letterSpacing: '-0.025em'
    fontVariation: "'wdth' 80"
  title:
    fontFamily: 'Bricolage Grotesque'
    fontSize: '1.875rem'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '-0.025em'
  title-step:
    fontFamily: 'Bricolage Grotesque'
    fontSize: '1.5rem'
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: '-0.025em'
  lede:
    fontFamily: 'Bricolage Grotesque'
    fontSize: '1.25rem'
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: 'Bricolage Grotesque'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: 'Bricolage Grotesque'
    fontSize: '1rem'
    fontWeight: 500
    lineHeight: 1.5
  hand-note:
    fontFamily: 'Reenie Beanie'
    fontSize: '2rem'
    fontWeight: 400
    lineHeight: 0.95
  hand-numeral:
    fontFamily: 'Reenie Beanie'
    fontSize: '2.25rem'
    fontWeight: 400
    lineHeight: 1
rounded:
  none: '0'
  full: '9999px'
spacing:
  gutter: '1rem'
  gutter-sm: '2rem'
  gutter-lg: '4rem'
  section: '3.5rem'
  section-lg: '6rem'
  block: '3rem'
  row: '2rem'
  row-step: '1.5rem'
  container: '1680px'
  container-inset: '1548px'
components:
  action-ink:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0.75rem 1.25rem'
  action-ink-hover:
    backgroundColor: '{colors.graphite}'
  action-rosa:
    backgroundColor: '{colors.rosa-hondo}'
    textColor: '{colors.paper}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0.75rem 1.25rem'
  action-rosa-hover:
    backgroundColor: '{colors.rosa-oscuro}'
  action-paper:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0.75rem 1.25rem'
  action-paper-hover:
    backgroundColor: '{colors.rosa}'
  action-line:
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0.25rem 0'
  whatsapp-float:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    rounded: '{rounded.none}'
    size: '3rem'
  whatsapp-float-hover:
    backgroundColor: '{colors.rosa-hondo}'
  chart-note:
    textColor: '{colors.ink}'
    typography: '{typography.hand-note}'
    padding: '0.25rem 0'
  chart-note-active:
    textColor: '{colors.dorado-hondo}'
  chart-swatch:
    width: '3.5rem'
    height: '2rem'
  chart-pin:
    backgroundColor: '{colors.dorado-hondo}'
    textColor: '{colors.paper}'
    rounded: '{rounded.full}'
    size: '1.25rem'
  ruled-row:
    padding: '2rem 0'
  ruled-row-step:
    padding: '1.5rem 0'
  field-rosa:
    backgroundColor: '{colors.rosa}'
    textColor: '{colors.ink}'
  field-beige:
    backgroundColor: '{colors.beige}'
    textColor: '{colors.ink}'
  field-ink:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
---

# Design System: Fer Gutierrez MakeUp

## Overview

**Creative North Star: "La Ficha"**

The site is built as the sheet a makeup artist works on: a face chart. A real photograph takes the place of the printed outline, and gold pencil marks, handwritten notes and smears of tone are laid over it. Around that sheet, whole sections take the colors the Artist chose for her brand, in line with her studio in Málaga: powder pink, beige and gold, with black and warm white. It is direct and physical, and it reads as someone's working tools rather than as a beauty brand.

Density is confident. Headlines are very large, narrow and tight, running text stays plain and legible, and content is ordered by ruled lines rather than boxes. Corners are square and surfaces are flat. Motion belongs to the pencil: lines draw themselves on arrival, and a note isolates its own mark.

La Ficha is implemented on the home page and in the shared header and footer. The other pages are still in the previous system, inside the new header and footer. They are recorded as debt under **Do's and Don'ts** and aren't a source of rules for new work.

**Key Characteristics:**

- Warm white paper, near-black ink and one gold pencil.
- Full-width sections in flat fields of pink, beige, gold and ink, with no gradients.
- Narrow, heavy Bricolage Grotesque headlines, with a handwriting face for pencil notes.
- Square-cornered actions and ruled rows instead of cards.
- No elevation shadows: depth comes from fields, photographs and marks drawn over them.
- Interactive face chart in the hero, whose notes isolate their pencil marks.

## Colors

The Artist's own palette of black, beige, pink, gold and white, warm throughout, so the interface sits with skin, makeup and her studio. Pink and gold each come as a light ground and a deep tone for text and marks.

### Primary

- **Rosa** (#f1cdcf): powder pink, the color of Classes and their field. Also the hover of the Paper action, the placeholder behind Review avatars and text selection.
- **Rosa Hondo** (#a63d5e): the deep pink for text and actions. The "Te enseño." half of the hero headline, the action that leads to Classes outside their field, and the hover and focus outline of the floating WhatsApp action.
- **Rosa Oscuro** (#86304b): the hover of the Rosa Hondo action, and nothing else.

### Secondary

- **Dorado** (#d9b65f): gold on black, for the headings of the Artist's own section and the rule closing it. A flat gold ground read as sand, so gold lives on Ink.
- **Dorado Hondo** (#7f5f22): the gold pencil. Leader lines, circles, dots and numbered pins on the chart; a ticked note's text and a focused note's outline; the navigation underline; Review stars; Bridal step numerals.

### Tertiary

- **Beige** (#e8ddd0): the greige field behind Bridal Makeup.

### Neutral

- **Paper** (#fdfbf8): warm white, the ground of the hero, Occasions and Reviews, and the text color on Ink, Rosa Hondo and Dorado Hondo.
- **Ink** (#171412): text on Paper, Rosa and Beige; the default action, including on the Rosa field; the Portfolio, Artist and footer fields; and the full-screen mobile menu.
- **Graphite** (#5c534c): secondary text on Paper (dates, counts, the Deposit note) and the hover of the Ink action.

Rules take the section's own text color at reduced strength: Ink at 30% on Paper, Rosa and Beige, and Paper at 30% on Ink. The header's bottom rule is the lightest, at Ink 15%.

Measured contrast for text: Ink on Paper and Paper on Ink 17.75:1, Ink on Beige 13.70:1, Ink on Rosa 12.55:1, Dorado on Ink 9.44:1, Paper on Rosa Oscuro 8.01:1, Graphite on Paper and Paper on Graphite 7.27:1, Rosa Hondo on Paper and Paper on Rosa Hondo 5.89:1, Dorado Hondo on Paper and Paper on Dorado Hondo 5.71:1. Dorado Hondo on Beige reaches 4.40:1, so the Bridal numerals depend on being large text (2.25rem).

Measured contrast for edges: the Rosa Hondo fill on Ink reaches 3.01:1 and the Rosa Oscuro hover 2.22:1, so on Ink grounds the hover fill recedes and the Paper label and arrow carry the action. The floating action's Rosa Hondo focus outline reaches 5.89:1 on Paper, 4.55:1 on Beige, 4.17:1 on Rosa, 3.22:1 on Dorado and 3.01:1 on Ink.

The "Google Maps" attribution in Reviews uses its own grey (#5E5E5E) and Roboto, as Google requires. Both are outside this system.

### Named Rules

**The Pink Means Classes Rule.** Pink is the color of Classes: their field, the "Te enseño." verb and, among actions at rest, Rosa Hondo: "Quiero aprender" in the hero and "Preguntar por las clases" in the footer and menu. Bookings use Ink, or Paper on a dark ground. On the Rosa field itself, Class actions are Ink.

**The Deep Tone Rule.** Rosa is a ground and Dorado only appears on Ink. On light grounds, text, actions and marks in those hues use Rosa Hondo and Dorado Hondo.

**The Flat Field Rule.** A field is one flat color from edge to edge. Fields change between sections, never inside one. There are no gradients in this world.

**The Real Tone Rule.** A swatch is a tone sample taken from the marked feature in the photograph it annotates, shown as an image clipped to a smear. It is never a flat fill or an invented color.

## Typography

**Display Font:** Bricolage Grotesque, with its width and optical size axes
**Body Font:** Bricolage Grotesque
**Handwriting Font:** Reenie Beanie, a stand-in for the Artist's handwriting

**Character:** A sturdy grotesque, squeezed narrow at large sizes, does the printing on the chart. A thin, hurried pencil hand answers it from the margins.

### Hierarchy

- **Display** (700, width 75%, 15.5vw on phones, 8.5vw from 640px, 5.9% of the stage width from 1024px, 0.95 line height, tight tracking): the two verbs of the hero, and only those.
- **Headline** (700, width 80%, 3rem, 4.5rem from 640px, 1 line height, tight tracking, balanced wrapping): the heading of every section below the hero and of the footer. The mobile menu's links use the same treatment at 3rem.
- **Title** (600, 1.875rem, tight tracking): Class names and Occasions. **Title Step** (600, 1.5rem, tight tracking) names the Bridal steps.
- **Lede** (400, 1.25rem, 1.4 line height, up to 36rem wide): the paragraph below a section headline and the Artist's text.
- **Body** (400, 1rem, 1.5 line height, up to 32rem wide): descriptions in rows and Occasions. The hero sentences rise to 1.125rem from 640px and follow the stage width from 1024px, never below 15px.
- **Label** (500, 1rem): actions and Class metadata. Navigation adds uppercase and 0.025em tracking, the only uppercase in the system.
- **Hand Note** (400, 2rem, 0.95 line height): the pencil notes on the chart. From 1024px it follows the stage at 2.45% of its width, never below 26px. The Classes photo note is 7.4% of the photo's width.
- **Hand Numeral** (400, 2.25rem, 1 line height): Bridal step numbers, in Dorado Hondo.

### Named Rules

**The Pencil Rule.** The handwriting face is only for what the Artist would write by hand on the sheet: notes and step numerals. It never sets headings, actions or running text.

**The Stand-In Rule.** Reenie Beanie is provisional. Once the Artist has corrected the drafted notes, scans of her own handwriting replace it, with text alternatives (backlog D4).

## Layout

Full-width sections stack as a sequence of grounds, within a 1680px container. Gutters are 1rem, 2rem from 640px and 4rem from 1024px. Sections have 3.5rem of vertical padding, 6rem from 1024px; rows and photographs start 3rem below the text that introduces them.

The hero is a stage with the proportions of a 1440 by 820 drawing from 1024px, with everything placed in percentages of it and sized in container units, so the type, notes and leader lines stay registered to the face at any width. The face takes the central 35.7%, with one verb, sentence and action on each side and two notes beneath them. Below 1024px it becomes a flow: verbs, sentences and actions first, in one column or two from 640px, then the photograph and the notes.

Below 1024px the leader lines give way to numbered pins on the photograph, matched by the same number beside each note. The Portfolio selection is a horizontal snap row, becoming five equal columns from 1024px. In Reviews, the first Review sticks beside the others from 1024px. From 768px the Occasions photographs use a 7 and 5 column split aligned on subgrid, so the captions line up.

From 1024px, Classes, Bridal Makeup and the Artist's section all split into a 5-column photograph and a 7-column field. This repetition is known debt (backlog D5), not a template.

## Elevation & Depth

Nothing in La Ficha is elevated. Depth comes from the change of field between sections, from photographs running to the section's edge, and from pencil marks drawn over the photograph. The floating WhatsApp action is separated from whatever passes beneath it by a 1px Paper border. The mobile menu covers the page completely instead of floating above it.

### Shadow Vocabulary

- **Pencil halo** (`filter: drop-shadow(0 0 1px rgb(253 251 248 / 0.9))`): a tight light edge on the hero's pencil marks, keeping the gold legible over skin and hair. It is a legibility device for marks on photographs, not elevation. Pins do the same job with a 1px Paper ring.

### Named Rules

**The Flat Chart Rule.** Nothing in this world lifts off the sheet. Separate things with a rule, a field or a border.

## Shapes

Everything rectangular has square corners: actions, photographs, fields and the floating WhatsApp action. Two curves are native to the world: the circles of numbered pins and Review avatars, and the hand-drawn pencil geometry (leader lines, overshot ellipses and the irregular smear each swatch is clipped to). Lines are 1px rules, a 2px underline on line actions and a pencil stroke with round caps, 2 units for leader lines and 2.5 for circles.

### Named Rules

**The Square Action Rule.** Every action has a radius of 0. Rounding belongs to the marks and the avatars, never to anything that gets pressed.

## Components

### Actions

The world's only call to action: square, plain and direct, ending in an arrow.

- **Shape:** square rectangle, 0.75rem by 1.25rem of padding, with a 1rem arrow 0.75rem after the label. External links, including all of WhatsApp, use an up-right arrow and open in a new tab. Internal links use a right arrow.
- **Ink:** the default, for Bookings and Quotes on light grounds. Hovers to Graphite.
- **Rosa:** Classes outside the Rosa field, in Rosa Hondo with a Paper label. Hovers to Rosa Oscuro.
- **Paper:** Bookings on Ink grounds. Hovers to Rosa.
- **Line:** a label with a 2px underline in the current text color, without a fill, for navigation to deeper pages.
- **Hover / Focus:** filled actions change color in 200ms, and the arrow of every action moves 0.25rem to the right. Focus is a 2px outline offset by 2px, in a color that contrasts with the ground: on Ink grounds the Rosa action takes a Paper outline instead of its own.

### Ruled Rows

The world's replacement for cards. Items sit between 1px rules, closed with a top rule on the list: Classes as a text column and an action, Bridal steps as numeral, title and text, Reviews with a rule above each one. There's no fill, corner or shadow.

### Face Chart

The signature of the system: a photograph marked up by hand.

- **Notes:** each is a labelled checkbox with a tone swatch and a Hand Note. The native inputs are visually hidden and grouped in a fieldset with a visually hidden legend.
- **Isolation:** when a note is active, every other pencil mark drops to 15% opacity, its own stays at full strength and a hand-drawn circle closes around the feature in 500ms. A note is active while ticked with a tap or click or focused by keyboard. Ticking again returns it to rest, and the ticked note's text turns Dorado Hondo. A focused note has a 2px Dorado Hondo outline.
- **Hover:** hovering a note also isolates its mark, but only under `(hover: hover)`, because touch browsers keep `:hover` after a tap and a second tap couldn't return the chart to rest.
- **Marks:** decorative and hidden from assistive technology, in Dorado Hondo strokes of 2 units ending in a dot, with the Pencil halo. On arrival the leader lines draw over 1100ms with an ease-out curve, 180ms apart. With reduced motion they appear already drawn, and the circle has no transition.
- **Swatches:** 3.5rem by 2rem images clipped to a hand-drawn smear. See The Real Tone Rule.
- **Pins:** 1.25rem Dorado Hondo circles with a Paper number, below 1024px only. On the photograph they carry a 1px Paper ring; the matching number beside each note has none.

The note wording is a draft pending the Artist's review. A single static note with a leader line also marks the Classes photograph. Pencil marks, swatches and notes stop after Classes for now, while the Bridal step numerals keep the hand (backlog D5).

### Navigation

On Paper, with a 15% Ink rule beneath it. Uppercase Label links in Ink sit on both sides of the centered signature from 1024px. A 2px Dorado Hondo underline grows on hover in 200ms and stays on the active page. Focus is a 2px Ink outline offset by 4px. Below 1024px, a menu icon opens a full-screen Ink panel that slides in over 300ms, with Headline-treatment links between Paper rules and the two WhatsApp actions at the bottom.

### Footer

An Ink field that closes every page with a Headline and two WhatsApp actions, Booking in Paper and Classes in Rosa Hondo. Below a 30% Paper rule are the signature, contact links with outline icons and social icons, at 85% Paper and rising to full Paper on hover.

### Floating WhatsApp Action

A 3rem square on every page, fixed in the bottom-right corner: Ink with a 1px Paper border and a one-color WhatsApp mark, turning Rosa Hondo on hover in 200ms. Its focus outline is also Rosa Hondo, offset by 2px.

### Signature

The Artist's handwritten signature over "MAKEUP" in spaced capitals, drawn as a single vector in the current text color: Ink on Paper and Paper on Ink. It is 190px wide, or 150px in the mobile header.

**The Untouchable Signature Rule.** The signature's drawing and proportions never change. It is not redrawn, restyled, reset in a font or given a second color.

### Photographs

Always real work, with square corners. Black and white comes from the photograph itself, never from a filter. Portfolio tiles are 3:4 and zoom to 105% over 500ms on hover, and Brand logos are turned to solid white on the Ink field.

## Do's and Don'ts

### Do:

- **Do** use `ActionLink` for every call to action in this world, and send every Booking and enquiry to WhatsApp with the up-right arrow.
- **Do** reserve Rosa Hondo actions for Classes, except on the Rosa field, where they are Ink.
- **Do** order lists with 1px rules in the section's own text color at reduced strength.
- **Do** sample each swatch from the feature it marks, in the photograph it annotates.
- **Do** guard any hover that changes the chart's state under `(hover: hover)`, and give every note a keyboard and a touch path.
- **Do** carry the chart past Classes through its native moves, such as a note on the bridal lip liner or hand captions in the Portfolio selection (backlog D5).
- **Do** migrate the remaining pages to this system, then remove Rubik, `ButtonLink` and the legacy tokens.
- **Do** keep the Google Maps attribution in its required grey and Roboto.

### Don't:

- **Don't** round an action, lift anything with a shadow or put a list item in a card.
- **Don't** set gradients in a field or surface.
- **Don't** set small text in Dorado Hondo on Beige (4.40:1) or Rosa (4.03:1).
- **Don't** use the handwriting face for headings, actions or running text.
- **Don't** alter or recolor the signature beyond its current text color.
- **Don't** invent notes about a photograph: the Artist reviews what is written on her chart.
- **Don't** copy the Classes photograph's static pencil mark: it keeps a 1.75 unit stroke without the Pencil halo. This is a current debt.
- **Don't** rely on the Rosa text selection on the Rosa field, where the highlight is the same color as its ground and can't be seen. This is a current debt.
- **Don't** use the unrevamped pages as a reference. `/servicios` and its subpages, `/clases`, `/portfolio` and the not-found page keep their old layouts in Rubik, on a white ground with blue-tinted foreground and border colors, inside the new header and footer. This is a current debt.
- **Don't** copy `ButtonLink` from those pages. Its rounded corners, 110% hover growth and browser-default focus belong to the previous system. This is a current debt.
- **Don't** copy the other habits of those pages: extra light text in weight 200, mixed heading styles, a different corner on each card, Class cards that rise on hover, lightbox shadows, or `gray` and `neutral` greys side by side. This is a current debt.
