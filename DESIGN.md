---
name: Fer Gutierrez MakeUp
description: The sober, monochrome website of a professional makeup artist, where the photographs carry the color.
colors:
  ink: '#000000'
  studio-graphite: '#525252'
  deep-graphite: '#404040'
  paper: '#ffffff'
  soft-mist: '#f3f4f6'
  card-mist: '#e5e7eb'
  body-slate: '#4b5563'
  heading-slate: '#374151'
  quiet-slate: '#6b7280'
  foreground-navy: 'hsl(222.2 47.4% 11.2%)'
  hairline: 'hsl(214.3 31.8% 91.4%)'
  dark-slate: '#111827'
  rule-grey: '#9ca3af'
  footer-silver: '#d1d5db'
  lipstick-rose: '#be123c'
typography:
  display:
    fontFamily: 'Rubik, sans-serif'
    fontSize: '2.25rem'
    fontWeight: 700
    lineHeight: 1.11
    letterSpacing: '-0.025em'
  headline:
    fontFamily: 'Rubik, sans-serif'
    fontSize: '1.875rem'
    fontWeight: 200
    lineHeight: 1.2
  title:
    fontFamily: 'Rubik, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 300
    lineHeight: 1.33
  body:
    fontFamily: 'Rubik, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 200
    lineHeight: 1.56
  label:
    fontFamily: 'Rubik, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 500
    lineHeight: 1.56
rounded:
  sm: '0.25rem'
  md: '0.375rem'
  lg: '0.5rem'
  xl: '0.75rem'
  2xl: '1rem'
  full: '9999px'
spacing:
  page-gutter: '1rem'
  page-gutter-lg: '2rem'
  card: '1rem'
  section: '3rem'
  container: '80rem'
components:
  button-primary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    rounded: '{rounded.md}'
    padding: '0.5rem 2rem'
  button-secondary:
    backgroundColor: '{colors.deep-graphite}'
    textColor: '{colors.paper}'
    rounded: '{rounded.md}'
    padding: '0.5rem 2rem'
  service-card:
    backgroundColor: '{colors.deep-graphite}'
    textColor: '{colors.paper}'
  class-card:
    backgroundColor: '{colors.card-mist}'
    textColor: '{colors.foreground-navy}'
    rounded: '{rounded.lg}'
    padding: '{spacing.card}'
  review-card:
    backgroundColor: '{colors.paper}'
    rounded: '{rounded.2xl}'
    padding: '1.5rem'
---

# Design System: Fer Gutierrez MakeUp

## Overview

**Creative North Star: "The Monochrome Studio"**

The site behaves like a makeup studio shot in black and white: ordered, professional and free of distractions. Graphite bands close the top and bottom of every page, white and pale grey surfaces hold the content, and the only rich color on screen comes from photographs of faces. The result is sober and professional. It builds trust and hands the leading role to the Artist's work.

Density is relaxed on content pages and generous around images. Rubik carries all the text, and the handwritten signature in the logo is the only personal flourish. Depth is rare, motion is short and appears mostly on hover.

This document describes the design as implemented. Known inconsistencies are listed under **Do's and Don'ts** as debts: they are part of the current site but shouldn't be copied into new work.

**Key Characteristics:**

- Greyscale interface, with color coming from the photographs.
- Graphite header and footer framing every page.
- One typeface, Rubik, from extra light to bold.
- Mostly flat surfaces, with shadows reserved for Review cards and overlays.
- Large photographs of faces, some of them in black and white.

## Colors

A neutral greyscale with one very small red accent, so the makeup in the photographs is the most colorful thing on the page.

### Primary

- **Ink** (#000000): main calls to action, page titles and active navigation.
- **Studio Graphite** (#525252): header, footer, mobile menu and rating stars. It is the color that identifies the site.
- **Deep Graphite** (#404040): secondary buttons and the caption band of Service cards.

### Tertiary

- **Lipstick Rose** (#be123c): only the check marks in the Class topic lists. It is the sole accent in the interface.

### Neutral

- **Paper** (#ffffff): default page background, Review cards.
- **Soft Mist** (#f3f4f6): alternating home sections and "Sobre mis trabajos".
- **Card Mist** (#e5e7eb): Class cards.
- **Body Slate** (#4b5563): running text on light backgrounds.
- **Heading Slate** (#374151): uppercase section titles and light headings.
- **Quiet Slate** (#6b7280): dates, breadcrumbs and other secondary text.
- **Foreground Navy** (hsl(222.2 47.4% 11.2%)): the inherited default text color, a near-black with a slight blue cast.
- **Hairline** (hsl(214.3 31.8% 91.4%)): the default border color.
- **Dark Slate** (#111827): Review text and the Reviews heading.
- **Rule Grey** (#9ca3af): the rules inside Class cards.
- **Footer Silver** (#d1d5db): text and icons in the footer.

The "Google Maps" attribution in the Reviews section uses its own grey (#5E5E5E) and Roboto, as Google requires. Both are outside this system.

### Named Rules

**The Color Comes From Faces Rule.** The interface stays neutral so that skin, lips and eye makeup are the most saturated things on screen. Lipstick Rose appears only as tiny check marks.

## Typography

**Display Font:** Rubik (with the system sans-serif as fallback)
**Body Font:** Rubik

**Character:** A single rounded, friendly sans-serif, with contrast created by weight rather than by pairing. Very light text suggests delicacy, and bold page titles provide structure.

### Hierarchy

- **Display** (700, 2.25rem, tight tracking): page titles above a thin rule, in Ink. The Reviews heading uses a similar bold treatment.
- **Headline** (200, 1.875rem): home and Services section headings. Uppercase section titles use weight 300 instead.
- **Title** (300, 1.5rem): Class card names.
- **Body** (200, 1.125rem): home paragraphs in Body Slate. The hero bio and detail pages use regular weight for longer reading.
- **Label** (500, 1.125rem, uppercase): navigation. Buttons are uppercase too, at 1.25rem regular (primary) or base size extra light (secondary).

### Named Rules

**The One Typeface Rule.** Rubik is the only typeface in the interface, apart from the Roboto that Google requires in the Maps attribution. The handwritten look belongs to the logo artwork, not to a font.

## Layout

Content sits in a centered container of 80rem (`max-w-7xl`), with some home rows narrower at 72rem. Page gutters are 1rem, growing to 1.5–2rem in the footer and to 2rem in Reviews.

The home page is a stack of full-width bands that alternate Paper and Soft Mist, most of them splitting into a text column and an image column at the `lg` breakpoint (1024px). Service cards use three equal columns from `md` (768px), and Class cards use two from `lg`. The Portfolio is a three-column mosaic with 350px rows on `md` and up, and a single column on phones, where each image is 350px tall.

Below `lg` the navigation collapses into a side menu and the logo is centered. A round WhatsApp button stays fixed in the bottom-right corner of every page, at every size.

## Elevation & Depth

The system is flat by default: depth comes from tonal bands and from photographs. Shadows appear only on Review cards and on overlays that float above the page, and there's no hierarchy of elevations beyond that.

### Shadow Vocabulary

- **Review card** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`, plus a 1px ring of 5% dark grey): lifts each Review from the Soft Mist band.
- **Overlay** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`): the mobile menu and the Portfolio lightbox.
- **Lightbox control** (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`): the round previous, next and close buttons.

### Named Rules

**The Flat-By-Default Rule.** Service cards, Class cards, buttons and page bands have no shadow. A new shadow has to justify itself as a card on a tinted band or as an overlay.

## Shapes

Corners are slight and functional: 0.375rem on buttons, 0.5rem on Class card tops and Portfolio images (whose links are 0.75rem). Review cards are the softest shape at 1rem. Home photographs and Service cards have square corners, and circles are limited to avatars, lightbox controls and the WhatsApp button. Thin 1px rules divide page titles from content and separate the metadata in Class cards.

## Components

### Buttons

Plain, uppercase and confident.

- **Shape:** gently rounded rectangle.
- **Primary:** Ink background with Paper text at 1.25rem, for Bookings and enquiries.
- **Secondary:** Deep Graphite background with Paper text in extra light, for navigation such as "Más info".
- **Hover / Focus:** the button grows to 110% in 300ms. Inside a Class card it doesn't scale, because the whole card reacts. Primary and secondary buttons have no designed focus state, except the Class card button, which has a 2px Ink outline.

### Cards / Containers

- **Service card:** a 5:6 portrait with a Deep Graphite caption band below, its name in extra light with the key word in semibold. On hover, thin lines draw a frame inside the image in 500ms. Square corners, no shadow.
- **Class card:** Card Mist body with a 300px photo on top and rounded top corners only. It holds a centered title, topics with Lipstick Rose checks, a metadata row with sessions and duration, and a full-width primary button. The whole card is the link and rises by 1rem on hover in 500ms.
- **Review card:** Paper with the softest corners, a shadow and a faint ring. A featured Review spans two columns with larger, heavier text.

### Navigation

Uppercase medium-weight links in pale grey over Studio Graphite, split around the centered logo on desktop. On hover the text turns Ink and an underline grows from the center in 200ms; the active page stays Ink and underlined. On small screens a menu button opens a Studio Graphite side panel.

### Logo

The Artist's handwritten signature in black over "MAKEUP" in spaced white capitals. It is an SVG and always sits on Studio Graphite.

### WhatsApp Button

A floating green WhatsApp icon, fixed to the bottom-right corner on every page. It is the only constant call to action and the only saturated interface element beyond the rose checks.

## Do's and Don'ts

### Do:

- **Do** keep the interface greyscale and let photographs supply the color.
- **Do** frame every page with the Studio Graphite header and footer.
- **Do** use primary buttons for Bookings and enquiries, and secondary buttons for navigation.
- **Do** use Rubik for all text, changing weight to create hierarchy.
- **Do** keep the Google Maps attribution in its required grey and Roboto.

### Don't:

- **Don't** copy the black active and hover state of the navigation onto Studio Graphite: it has a contrast of only 2.69:1. This is a current debt.
- **Don't** treat the black signature in the logo as an acceptable contrast pattern. On Studio Graphite it also reaches only 2.69:1, so it is hard to read. This is a current debt.
- **Don't** use extra light weight for long text. Body paragraphs in weight 200 are thin to read. This is a current debt.
- **Don't** add more heading styles. Section headings currently mix extra light, light uppercase and bold treatments. This is a current debt.
- **Don't** introduce another card shape. Service, Class, Review and Portfolio each have different corners today. This is a current debt.
- **Don't** mix more neutral families. The code uses `neutral`, `gray` and a blue-tinted foreground side by side. This is a current debt.
- **Don't** leave calls to action without a designed focus state. Buttons and Service cards rely on the browser's default, while navigation, footer links and Portfolio tiles have a 2px outline. This is a current debt.
