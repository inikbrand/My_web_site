# Iryna Nikolaieva — Marketing & Graphic Design Services

A one-page portfolio site for a freelance marketer and graphic designer, built from an original Figma design.

   **Live site:** https://inikbrand.github.io/My_web_site/

---

## What the page contains

Nine sections, top to bottom:

1. **Hero** — headline, intro line and two calls to action, with an animated portrait on a green disc
2. **Problem → solution** — three pairs of overlapping circles that appear as you scroll
3. **Why Me?** — four staggered credential cards over a photographic background
4. **Services** — three offer cards, each expanding to a detailed breakdown
5. **Portfolio** — six selected projects linking through to Behance
6. **Packages** — four pricing rows with timelines and prices
7. **How it works** — five development stages arranged along a vertical axis
8. **FAQ + contact form** — eight questions and an enquiry form
9. **Footer** — social links and privacy policy

## Features

- Fully responsive: a dedicated mobile layout below 768px, built from a separate 320px Figma frame
- Scroll-triggered animations, animated borders on hover, expanding accordions
- Contact forms wired to Google Forms — three entry points (hero popup, FAQ section, mobile form)
- Privacy policy modal meeting UK GDPR expectations
- No frameworks, no build step, no dependencies

## Built with

Plain HTML, CSS and JavaScript. Fonts are loaded from Google Fonts (Noto Sans, Roboto Flex).

Animation relies on `IntersectionObserver` for scroll triggers and the CSS `@property` rule for the rotating border glow.

## Project structure

```
├── index.html      markup for both the desktop and mobile layouts
├── style.css       all styling, scoped per section
├── script.js       accordions, scroll animations, form handling, modals
├── images/         background photography and portfolio covers
└── README.md
```

Styles are namespaced by section (`#hero`, `#portfolio`, `#packages`…) so that rules from one section cannot affect another. The mobile layout lives in `#mobile` and is scaled to the viewport from a fixed 320px canvas.

## Running locally

No build required — open `index.html` in a browser.

To serve it over HTTP instead:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

The site is static, so any host will do. Published via GitHub Pages from the `main` branch.

## Credits

Design and content by Iryna Nikolaieva. Portfolio work links through to [Behance](https://www.behance.net/inikbrand).
