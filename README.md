# Lumen Studio — Photography Booking Website

**Inovegen Internship — Task 4: Final Project (Professional Responsive Web Application)**
**Domain:** Web Development — Front-End
**Author:** Laiba Aftab

**Live demo:** _add your GitHub Pages link here after deploying_

## Concept

Lumen Studio is a fictional photography business offering wedding, portrait, and event coverage. The site is a genuine **multi-page application** (not a single scrolling page) so visitors can browse a filterable portfolio, compare priced packages, and submit a validated booking request.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home — introduction, highlights, testimonial carousel |
| `portfolio.html` | Filterable image gallery with a lightbox modal |
| `services.html` | Pricing packages and an FAQ accordion |
| `booking.html` | Booking request form with full client-side validation |

Navigation, theming, and footer are consistent across all four pages, sharing one `styles.css` and one `script.js`.

## Technologies

- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<form>`) on every page
- CSS3 — custom properties for a shared design system, Flexbox and Grid for layout, hover and `:focus-visible` states throughout
- Vanilla JavaScript (no frameworks or libraries), shared across pages with feature detection so each script only runs on pages that need it
- Google Fonts: Spectral (headings) and Karla (body)

## JavaScript interactivity (7 features)

1. **Mobile navigation menu** — hamburger toggle, shared on every page
2. **Dark/light theme toggle** — persists via `localStorage`, shared on every page
3. **Testimonial carousel** — previous/next controls with dot indicators (Home)
4. **Gallery category filter** — switches visible images by category (Portfolio)
5. **Lightbox modal** — opens a larger view on click, closes via button, click-outside, or Escape (Portfolio)
6. **FAQ accordion** — expand/collapse, one open at a time (Services)
7. **Booking form validation** — required fields, email format, and future-date checks on blur and submit, with inline errors and a success message (Booking)

## Accessibility

- Semantic landmarks and heading hierarchy on every page
- Visible `:focus-visible` outlines on all interactive elements
- `aria-expanded` on toggles (menu, theme, FAQ), `aria-current="page"` on active nav links
- Form fields paired with `<label>` elements; errors announced via adjacent text
- Respects `prefers-reduced-motion`

## Responsiveness

- Built with CSS Grid and Flexbox throughout; no fixed pixel layouts
- Breakpoints at 860px and 720px adjust grid columns and switch navigation to a mobile menu
- Tested across desktop, tablet, and mobile widths

## Project structure

```
├── index.html
├── portfolio.html
├── services.html
├── booking.html
├── styles.css       → shared design system and layout
├── script.js         → shared interactivity (feature-detected per page)
├── favicon.svg
├── screenshots/
└── README.md
```

## How to run

No build step or dependencies required. Open `index.html` in any browser, or serve the folder locally:

```
npx serve .
```

## How to deploy (GitHub Pages)

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**, set the source to the `main` branch, root folder.
3. The site will be live at `https://<username>.github.io/<repo-name>/`.

## Notes

- This is an original build — concept, copy, color system, and illustrations were created for this task rather than adapted from a template.
- Images are custom inline SVG compositions rather than stock photos, kept visually consistent across the gallery.
- Screenshots for desktop, tablet, and mobile are included in `/screenshots`, as required by the task deliverables.
