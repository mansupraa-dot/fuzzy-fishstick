# Plan 4: Lead-gen + Content — Design Spec

**Date:** 2026-05-20
**Scope:** Two sequential mini-plans — 4a (Light Glass rebuilds) and 4b (new pages).

---

## Context

Project: premium e-commerce site (furniture + lighting + plumbing), Russian market, single founder (architect/designer). Visual system: Light Spatial Glass — `#EFEFEF` background, `rgba(255,255,255,0.72)` glass cards, `text-ink` / `text-ink-2..5` tokens.

Three content pages already exist (`ServicesPage`, `ProcessPage`, `PortfolioPage`) but use old design tokens (`bg-graphite`, `bg-cream`, `text-stone-*`). Three new pages are needed (`PhilosophyPage`, `BriefPage`, `ShowroomPage`). `PortfolioItemPage` is also new.

All CTA buttons that previously linked to `/contact` now link to `/brief` (the primary lead-gen form).

---

## Plan 4a — Light Glass Rebuilds

### Goal

Rebuild ServicesPage, ProcessPage to Light Glass. Create PhilosophyPage. No logic changes — content stays identical, only visual layer is replaced.

### Pages

#### ServicesPage

- Remove: `bg-graphite`, `bg-cream`, `text-stone-*`, `text-graphite`, `text-accent`
- Dark hero section removed — page starts with `pt-20` + heading on `#EFEFEF` background
- Service items wrapped in `glass-card` with `p-8`
- «Что входит» list: dashes replaced with Light Glass dividers
- CTA button «Обсудить проект» → `/brief` (was `/contact`)
- Test: heading renders, CTA `<Link>` has `href="/brief"`

#### ProcessPage

- Same token replacement as ServicesPage
- Step numbers styled as large `text-ink/8` (near-transparent ink) — same as current but using correct token
- FAQ section: question in `text-ink`, answer in `text-ink-3`
- CTA «Готовы начать?» → `/brief` (was `/contact`)
- Test: heading renders, CTA `<Link>` has `href="/brief"`

#### PhilosophyPage (new)

Three sections on plain `#EFEFEF` background:

1. **Заголовок**: «О проекте» — `pt-20`, `text-2xl font-light text-ink`
2. **Зачем объединили**: short paragraph why one place for furniture + lighting + plumbing (architectural coherence)
3. **Подход**: architectural view on interior — we select, not sell; no commissions from manufacturers; specification-driven
4. **CTA**: `glass-card` with «Расскажите о своём проекте» → `<Link to="/brief">`

Content is a hardcoded constant in the file (no data file needed).

Test: heading «О проекте» renders, CTA link points to `/brief`.

### File Map (Plan 4a)

| Action | File |
|--------|------|
| Modify | `src/pages/ServicesPage.jsx` |
| Modify | `src/pages/ProcessPage.jsx` |
| Create | `src/pages/PhilosophyPage.jsx` |
| Modify | `src/App.jsx` (wire PhilosophyPage) |
| Create | `src/pages/__tests__/ServicesPage.test.jsx` |
| Create | `src/pages/__tests__/ProcessPage.test.jsx` |
| Create | `src/pages/__tests__/PhilosophyPage.test.jsx` |

### Tests (Plan 4a)

~6 tests total (2 per page):
- ServicesPage: heading «Подбор, а не продажа» renders; CTA link href=«/brief»
- ProcessPage: heading «Как это работает» renders; CTA link href=«/brief»
- PhilosophyPage: heading «О проекте» renders; CTA link href=«/brief»

---

## Plan 4b — New Pages

### Goal

Create portfolio data layer + rebuild PortfolioPage + create PortfolioItemPage, BriefPage, ShowroomPage. Wire new routes in App.jsx.

### Data Layer

#### `src/data/portfolio.js`

```js
// Shape of each project:
{
  id: Number,
  slug: String,          // kebab-case, e.g. 'studiya-petrogradskaya'
  title: String,
  area: String,          // e.g. '38 м²'
  tags: String[],        // e.g. ['Мебель', 'Свет']
  year: String,
  status: 'completed' | 'in_progress' | 'concept',
  description: String,   // 1–2 sentences about the task
  details: String[],     // 3–5 bullet points: what was done
}
```

Exports:
- `PROJECTS` — array of 6 items (migrated from current PortfolioPage inline data, enriched with slug/status/description/details)
- `getProjectBySlug(slug)` — returns project or `undefined`

Status distribution across 6 projects: ~3 completed, 2 in_progress, 1 concept.

### Pages

#### PortfolioPage (rebuild)

- Light Glass ребилд: remove `bg-graphite`, `bg-stone-200`, `bg-cream`, `text-stone-*`
- Imports `PROJECTS` from `src/data/portfolio.js`
- Grid: `grid-cols-2 md:grid-cols-3` gap-4, each card is a `<Link to={/portfolio/${p.slug}}>`
- Each card: `glass-card overflow-hidden` with aspect-ratio image placeholder + info panel
- Status badge on each card:
  - `completed` → «Реализован» — `bg-emerald-50 text-emerald-700 border-emerald-200`
  - `in_progress` → «В реализации» — `bg-amber-50 text-amber-700 border-amber-200`
  - `concept` → «Концепт» — `bg-black/5 text-ink-3 border-black/10`
- CTA at bottom → `/brief`
- Test: heading renders, at least one status badge visible

#### PortfolioItemPage (new)

Route: `/portfolio/:slug`

- Uses `useParams()` to get slug, calls `getProjectBySlug(slug)`
- If not found: renders «Проект не найден» with link to `/portfolio`
- If found:
  - Breadcrumbs: Портфолио → {title} (same pattern as ProductPage)
  - Heading: `{title}` in `text-2xl font-light text-ink`
  - Meta row: `{area} · {tags.join(', ')} · {year}`
  - Status badge (same style as PortfolioPage)
  - Description paragraph
  - «Что сделали» list: `details[]` items with `—` dashes
  - CTA `glass-card`: «Хотите такой результат?» → `<Link to="/brief">`
- Tests: renders project title for valid slug; renders «Проект не найден» for unknown slug; CTA links to `/brief`

#### BriefPage (new)

Route: `/brief`

Minimal lead-gen form. Three fields:
1. «Имя» — text input, `aria-label="Имя"`, required
2. «Телефон или email» — text input, `aria-label="Телефон или email"`, required
3. «Расскажите о проекте» — textarea, `aria-label="Расскажите о проекте"`, optional, rows=4

Submit behavior (no real backend in MVP):
- `onSubmit`: validates name + contact not empty; if invalid → inline error; if valid → sets `submitted = true`
- When `submitted`: replaces form with confirmation message «Спасибо! Свяжемся в течение дня.» + link back to `/catalog`
- No external fetch, no loading state

Tests: heading renders; fields present by aria-label; submit with empty name shows error; submit with valid data shows confirmation.

#### ShowroomPage (new)

Route: `/showroom`

Two sections:

**Section 1 — Info:**
- Heading «Шоурум»
- Address placeholder: «Санкт-Петербург, ул. Примерная, 1» (hardcoded)
- Hours: «Пн–Пт 10:00–19:00, Сб 11:00–17:00»
- Note: «Здесь вы можете увидеть образцы материалов — ткани, дерево, металл — и обсудить проект лично.»

**Section 2 — Appointment form:**
- «Имя» — text input, required
- «Телефон» — text input, required
- «Удобное время» — text input, optional (placeholder «например: в четверг утром»)
- Submit → same pattern as BriefPage (inline confirmation, no fetch)

Tests: heading renders; form fields present; submit shows confirmation.

### File Map (Plan 4b)

| Action | File |
|--------|------|
| Create | `src/data/portfolio.js` |
| Modify | `src/pages/PortfolioPage.jsx` |
| Create | `src/pages/PortfolioItemPage.jsx` |
| Create | `src/pages/BriefPage.jsx` |
| Create | `src/pages/ShowroomPage.jsx` |
| Modify | `src/App.jsx` |
| Create | `src/data/__tests__/portfolio.test.js` |
| Create | `src/pages/__tests__/PortfolioPage.test.jsx` |
| Create | `src/pages/__tests__/PortfolioItemPage.test.jsx` |
| Create | `src/pages/__tests__/BriefPage.test.jsx` |
| Create | `src/pages/__tests__/ShowroomPage.test.jsx` |

### Tests (Plan 4b)

~18 tests total:
- `portfolio.test.js`: getProjectBySlug returns correct project; getProjectBySlug returns undefined for unknown slug (2)
- `PortfolioPage.test.jsx`: heading renders; at least one status badge present (2)
- `PortfolioItemPage.test.jsx`: renders project title for valid slug; «Проект не найден» for unknown; CTA href="/brief" (3)
- `BriefPage.test.jsx`: heading renders; fields present; error on empty submit; confirmation on valid submit (4)
- `ShowroomPage.test.jsx`: heading renders; name field present; submit shows confirmation (3+)

---

## Decisions Not in Scope

- No real form submission (no email/CRM integration) — MVP uses inline confirmation only
- No `/philosophy` page details (added to Plan 4a as PhilosophyPage with hardcoded content)
- No calendar widget for showroom booking — free-text «удобное время»
- No individual project images — placeholder divs as in existing PortfolioPage
- No `/collections` page — remains PlaceholderPage (not in Plan 4 scope)
