# Plan 5: Home — Design Spec

**Date:** 2026-05-20
**Scope:** Rebuild HomePage and its sections to Light Glass. No new functionality — content stays, visual layer is replaced.

---

## Context

Project: premium e-commerce site (furniture + lighting + plumbing), Russian market, single founder (architect/designer). Visual system: Light Spatial Glass — `#EFEFEF` background, `rgba(255,255,255,0.72)` glass cards, `text-ink` / `text-ink-2..5` tokens.

After Plan 4, all inner pages use Light Glass. The homepage (`HomePage.jsx`) and its sections still use old tokens (`bg-white`, `bg-cream`, `text-graphite`, `text-stone-*`, `text-accent`). Plan 5 rebuilds the homepage to match.

---

## Section Structure (final)

```
Hero               — keep as-is (no token changes needed)
Categories         — inline in HomePage, Light Glass rebuild
HowWeWork          — HowWeWork.jsx, Light Glass rebuild
Portfolio preview  — Portfolio.jsx, 3 projects from portfolio.js, status badges
CTA                — CTA.jsx, Light Glass rebuild, → /brief
```

Removed from homepage: `<Philosophy />` section, popular products inline section.

---

## Hero (`src/sections/Hero.jsx`)

No changes. Hero uses only inline styles (`rgba(...)`, `linear-gradient(...)`) — no forbidden class tokens. Dark style (dark backdrop for full-screen rooms) is intentional and correct for a hero.

---

## Categories (inline in `src/pages/HomePage.jsx`)

**Remove:** `bg-white`, `bg-stone-100`, `text-graphite`, `text-stone-*`, `bg-gradient-to-br from-stone-100 to-stone-200`

**Replace with:** three `glass-card` tiles in a `grid md:grid-cols-3 gap-6` grid.

Each tile is a `<Link>` with:
- Aspect-ratio placeholder div (`aspect-[4/3] bg-white/40`) — same pattern as PortfolioPage cards
- Label: `text-base font-light text-ink`
- Description: `text-sm text-ink-3`
- Arrow: `text-ink-4 group-hover:text-ink transition-colors`

Data stays hardcoded (same 3 items: Мебель, Освещение, Сантехника with their descriptions and `/catalog/:category` links).

Section heading: `text-2xl font-light text-ink` — «Каталог».

---

## HowWeWork (`src/sections/HowWeWork.jsx`)

**Remove:** `bg-cream`, `bg-white`, `text-graphite`, `text-stone-*`, `text-accent`

**Replace with:** plain `#EFEFEF` background (no bg class needed — inherits from body). Three steps displayed as a vertical list or grid.

Each step:
- Large near-transparent step number: `text-6xl font-light text-ink/8 select-none`
- Title: `text-xl font-light text-ink`
- Description: `text-sm text-ink-3 leading-relaxed`

Layout: `grid md:grid-cols-3 gap-10` — three columns on desktop, stacked on mobile.

Section heading: `text-2xl font-light text-ink` — «Как это работает».

Content (3 steps) stays identical to existing HowWeWork.jsx.

---

## Portfolio Preview (`src/sections/Portfolio.jsx`)

**Remove:** inline `PROJECTS` array and all old tokens.

**Add:**
- `import { PROJECTS } from '../data/portfolio'`
- Show `PROJECTS.slice(0, 3)` — first 3 projects

Grid: `grid md:grid-cols-3 gap-4`.

Each card: `glass-card overflow-hidden` + `<Link to={/portfolio/${p.slug}}>`:
- Aspect-ratio placeholder: `aspect-[4/3] bg-white/40`
- Info panel `p-4`:
  - Title: `text-[13px] font-normal text-ink`
  - Status badge (same styles as PortfolioPage and PortfolioItemPage):
    - `completed` → `bg-emerald-50 text-emerald-700 border border-emerald-200` + «Реализован»
    - `in_progress` → `bg-amber-50 text-amber-700 border border-amber-200` + «В реализации»
    - `concept` → `bg-black/5 text-ink-3 border border-black/10` + «Концепт»
  - Meta: `text-xs text-ink-4` — `{area} · {tags.join(', ')}`

CTA at bottom: `text-sm text-ink border-b border-ink/30` link «Смотреть все проекты» → `/portfolio`.

Section heading: `text-2xl font-light text-ink` — «Портфолио».

---

## CTA (`src/sections/CTA.jsx`)

**Remove:** `bg-white`, `text-graphite`, `text-stone-*`, Telegram link (no real account in MVP).

**Replace with:** single `glass-card p-10 md:p-16 text-center` centered block.

Content:
- Heading: `text-2xl font-light text-ink` — «Расскажите о проекте»
- Subtext: `text-sm text-ink-3` — «Оставьте контакт — свяжемся в течение дня.»
- Button: `<Link to="/brief">` styled as `bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85`

---

## HomePage (`src/pages/HomePage.jsx`)

**Remove imports:** `Philosophy`, `getPopularProducts` (and the popular products section block).

**Add import:** `HowWeWork` from `../sections/HowWeWork`

**Section order:**
```jsx
<Hero />
{/* Categories — inline glass-card grid */}
<section className="py-20">…</section>
<HowWeWork />
<Portfolio />
<CTA />
```

No `<Helmet>` changes — title and meta stay identical.

---

## File Map

| Action | File |
|--------|------|
| No change | `src/sections/Hero.jsx` |
| Modify | `src/pages/HomePage.jsx` |
| Modify | `src/sections/HowWeWork.jsx` |
| Modify | `src/sections/Portfolio.jsx` |
| Modify | `src/sections/CTA.jsx` |
| Create | `src/pages/__tests__/HomePage.test.jsx` |
| Create | `src/sections/__tests__/HowWeWork.test.jsx` |
| Create | `src/sections/__tests__/Portfolio.test.jsx` |
| Create | `src/sections/__tests__/CTA.test.jsx` |

---

## Tests

~8 tests total (84 existing → 92 after Plan 5):

**HomePage.test.jsx** (2 tests):
- Renders without crash
- Category links to `/catalog/furniture`, `/catalog/lighting`, `/catalog/plumbing` are present

**HowWeWork.test.jsx** (2 tests):
- Heading «Как это работает» renders
- Three step numbers «01», «02», «03» are visible

**Portfolio.test.jsx** (section, 2 tests):
- Heading «Портфолио» renders
- At least one status badge «Реализован» is visible

**CTA.test.jsx** (2 tests):
- Heading «Расскажите о проекте» renders
- CTA link has `href="/brief"`

---

## Out of Scope

- `BlogPreview.jsx`, `Stats.jsx`, `Testimonials.jsx`, `Positioning.jsx`, `Services.jsx` — not used on homepage, not modified
- `Philosophy.jsx` section — removed from homepage (PhilosophyPage exists at /philosophy)
- Hero animation, slides, product tags — untouched
- Any real form submission or backend
