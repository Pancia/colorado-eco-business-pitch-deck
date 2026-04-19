# The Summit — Landing Site

A two-audience GitHub Pages landing site for The Summit (working name), a men's eco-village forming in rural Durango, Colorado.

- **`/`** — splash with audience split
- **`/invest.html`** — for partners, collaborators, investors
- **`/join.html`** — for prospective members, guests, work-trade

V1 is intentionally placeholder-heavy. Every placeholder is marked so it can be found and swapped without digging.

## Run locally

```bash
npm install
npm run build        # compile Tailwind once
npm run dev          # watch mode while editing
npm run serve        # serve at http://localhost:8080
```

Then open http://localhost:8080.

## Deploy to GitHub Pages

1. Create a new GitHub repo and push this directory.
2. Repo Settings → Pages → Build from branch → `main` / `(root)`.
3. Your site will be at `https://<username>.github.io/<repo-name>/`.
4. Canonical URLs and sitemap already point at `https://pancia.github.io/colorado-eco-business-pitch-deck/`. If the repo is ever renamed or transferred, update those URLs in `index.html`, `invest.html`, `join.html`, `robots.txt`, and `sitemap.xml`.

No GitHub Action is needed — Pages serves the committed HTML + CSS directly.

## Swapping placeholders

Every placeholder is marked with an HTML comment like `<!-- PLACEHOLDER: ... -->` so search finds them all:

```bash
grep -rn "PLACEHOLDER" --exclude-dir=node_modules
```

| What | Where | Replace with |
|---|---|---|
| Stock imagery | Unsplash URLs in all three pages | Real property + AI-rendered vision photos in `assets/images/` |
| Vision copy | `invest.html` Vision section | Final copy in founder's voice |
| Lineage copy | `invest.html` "Why Men's Academy" section | Final acknowledgment of Men's Academy / Kristian / Wisdom Warriors |
| Financial numbers | `invest.html` Financials section (`~$X`, `$Y`) | Real figures from the one-pager |
| Pricing / capacity | `join.html` Paths in (`From $X`) | Real residency pricing and terms |
| Testimonials | `join.html` Proof section | Real Men's Academy brother quotes (collect 5–10, pick top 3) |
| Cal.com link | `config.js` → `CAL_COM_URL` | Real booking URL (changes everywhere at once) |
| Contact email | `config.js` → `CONTACT_EMAIL` | Real address |
| Brand name | `config.js` → `BRAND` | Final brand name if it changes from "The Summit" |

The brand name propagates via `data-brand` attributes in every page, so renaming the project is a one-line change in `config.js`.

## Wiring real email capture

The waitlist forms currently show a thank-you modal on submit — no emails are captured. To wire a real provider:

1. Open `scripts/waitlist.js`.
2. Find the `// TODO: wire to Substack / ConvertKit / Buttondown / Formspree here.` comment.
3. Replace the `modal.open()` line with a `fetch()` to your provider's subscribe endpoint, or replace the `<form>` elements on each page with the provider's iframe embed.

Recommended: **Substack** with two publications (one for partners, one for members) — free, unlimited subscribers, native audience segmentation.

## Accessibility

- Slideshow respects `prefers-reduced-motion` (no autoplay), has a visible pause button, dot-nav, keyboard arrow controls, `aria-live` region.
- All imagery has real `alt` text (update as you swap photos).
- Modal has `role="dialog"`, `aria-modal`, `Escape` to close, focus on the close button when opened.

## File map

```
.
├── index.html              splash page
├── invest.html             partners page
├── join.html               members page
├── 404.html                branded not-found
├── robots.txt
├── sitemap.xml
├── config.js               brand name, Cal.com URL, contact email
├── package.json            tailwindcss dev dep only
├── tailwind.config.js      theme tokens (colors, fonts)
├── styles/
│   ├── input.css           Tailwind source
│   └── dist.css            compiled output (committed — Pages serves this)
├── scripts/
│   ├── slideshow.js        a11y-compliant fade carousel
│   └── waitlist.js         placeholder form handler with modal
└── assets/
    ├── favicon.svg
    ├── apple-touch-icon.svg
    ├── og-image.svg        1200×630 social card
    ├── images/             property + lifestyle photos
    ├── video/              optional drone / founder video
    └── fonts/              self-host Fraunces + Inter for v2
```

## Roadmap for v2

- Self-host Fraunces + Inter (remove external Google Fonts request).
- Export real photography to AVIF + WebP + JPEG via Squoosh and use `<picture>` elements.
- Replace Unsplash hotlinks with committed local images.
- Wire real email provider.
- Add GoatCounter or Plausible analytics.
- Add founder video to `invest.html` below the hero.
