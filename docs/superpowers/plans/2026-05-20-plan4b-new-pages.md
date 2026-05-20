# Plan 4b: New Pages — Portfolio, Brief, Showroom

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create portfolio data layer + rebuild PortfolioPage + add PortfolioItemPage, BriefPage, ShowroomPage.

**Architecture:** Task 1 creates `src/data/portfolio.js` — the single source of truth for 6 projects (slug, status, description, details). Tasks 2–3 use this data: PortfolioPage (grid with status badges) and PortfolioItemPage (detail page per slug). Tasks 4–5 are independent: BriefPage (minimal lead form) and ShowroomPage (info + appointment form). All CTA links point to `/brief`. App.jsx is updated in Tasks 3, 4, and 5.

**Tech Stack:** React 19, React Router v7 (`useParams`, `Link`), react-helmet-async, Tailwind v4, Vitest + @testing-library/react

---

## Codebase context (read before implementing)

**Design tokens** (`src/index.css`):
- Background `#EFEFEF` — set globally on `html`/`body`, never add bg class to pages
- `text-ink` (#1a1a1a), `text-ink-3` (#888), `text-ink-4` (#aaa), `text-ink-5` (#ccc)
- `.glass-card` — white/72, blur, border-radius 20px
- **Never use:** `bg-graphite`, `bg-stone-*`, `text-stone-*`, `text-graphite`, `text-accent`, `bg-cream`

**Reveal component** — IntersectionObserver mock already in `src/test-setup.js`. Just use `<Reveal>content</Reveal>`.

**Existing App.jsx routes** (current state after Plan 4a):
```jsx
<Route path="/portfolio" element={<PortfolioPage />} />
<Route path="/portfolio/:slug" element={<PortfolioPage />} />   // ← will become PortfolioItemPage
<Route path="/brief" element={<PlaceholderPage title="Рассказать о проекте" />} />  // ← will become BriefPage
<Route path="/showroom" element={<PlaceholderPage title="Шоурум" />} />  // ← will become ShowroomPage
```

**Test command:** `npm run test:run`

**Starting test count:** 67 (after Plan 4a). After this plan: 67 + 16 = **83 total**.

---

## File Map

| Action | File |
|--------|------|
| Create | `src/data/portfolio.js` |
| Create | `src/data/__tests__/portfolio.test.js` |
| Modify | `src/pages/PortfolioPage.jsx` |
| Create | `src/pages/__tests__/PortfolioPage.test.jsx` |
| Create | `src/pages/PortfolioItemPage.jsx` |
| Create | `src/pages/__tests__/PortfolioItemPage.test.jsx` |
| Modify | `src/App.jsx` (Task 3) |
| Create | `src/pages/BriefPage.jsx` |
| Create | `src/pages/__tests__/BriefPage.test.jsx` |
| Modify | `src/App.jsx` (Task 4) |
| Create | `src/pages/ShowroomPage.jsx` |
| Create | `src/pages/__tests__/ShowroomPage.test.jsx` |
| Modify | `src/App.jsx` (Task 5) |

---

## Task 1: Portfolio Data Layer

**Files:**
- Create: `src/data/portfolio.js`
- Create: `src/data/__tests__/portfolio.test.js`

> Context: The 6 projects currently live as an inline `PROJECTS` array inside `PortfolioPage.jsx`. This task extracts them into a standalone data file and adds a `getProjectBySlug` utility. PortfolioPage and PortfolioItemPage will both import from this file. Each project gets `slug`, `status`, `description`, and `details` fields in addition to the existing `id`, `title`, `area`, `tags`, `year`.

- [ ] **Step 1: Write failing portfolio data tests**

Create `src/data/__tests__/portfolio.test.js`:

```js
import { describe, test, expect } from 'vitest'
import { PROJECTS, getProjectBySlug } from '../../data/portfolio'

describe('portfolio data', () => {
  test('PROJECTS has 6 items', () => {
    expect(PROJECTS).toHaveLength(6)
  })

  test('getProjectBySlug returns correct project', () => {
    const p = getProjectBySlug('studiya-petrogradskaya')
    expect(p).toBeDefined()
    expect(p.title).toBe('Студия на Петроградской')
  })

  test('getProjectBySlug returns undefined for unknown slug', () => {
    expect(getProjectBySlug('unknown-slug')).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run — expect 3 failures**

```
npm run test:run -- portfolio
```

Expected: 3 failures with "Cannot find module '../../data/portfolio'"

- [ ] **Step 3: Create portfolio.js**

Create `src/data/portfolio.js`:

```js
export const PROJECTS = [
  {
    id: 1,
    slug: 'studiya-petrogradskaya',
    title: 'Студия на Петроградской',
    area: '38 м²',
    tags: ['Мебель', 'Свет'],
    year: '2024',
    status: 'completed',
    description:
      'Студия с открытой планировкой и деревянной мебелью. Задача — максимально использовать площадь без потери воздуха.',
    details: [
      'Подбор модульного дивана для трансформации гостиной в спальню',
      'Световая схема с точечным освещением и настольными лампами',
      'Кухонный остров как зонирование без стен',
      'Единая деревянная текстура по всей зоне',
    ],
  },
  {
    id: 2,
    slug: 'dvushka-vasilevsky',
    title: '2-комнатная на Васильевском',
    area: '62 м²',
    tags: ['Мебель', 'Свет', 'Сантехника'],
    year: '2024',
    status: 'completed',
    description:
      'Комплексный подбор для двушки: мебель, освещение и ванная в единой тёплой гамме.',
    details: [
      'Подбор гостиной и спальни в единой цветовой гамме',
      'Многоуровневый свет: люстра, бра, точечные',
      'Ванная с матовой сантехникой',
      'Спецификация на 47 позиций с источниками',
    ],
  },
  {
    id: 3,
    slug: 'vannaya-novostroyke',
    title: 'Мастер-ванная в новостройке',
    area: '8 м²',
    tags: ['Сантехника', 'Свет'],
    year: '2024',
    status: 'completed',
    description:
      'Ванная с нишей и подсветкой в новостройке. Матовая сантехника и скрытое освещение.',
    details: [
      'Подбор ванны с матовым покрытием',
      'Подсветка ниши: лента + диммер',
      'Смесители в чёрной матовой отделке',
      'Расчёт совместимости с черновой разводкой',
    ],
  },
  {
    id: 4,
    slug: 'spalnya-komendantsky',
    title: 'Спальня на Комендантском',
    area: '18 м²',
    tags: ['Мебель', 'Свет'],
    year: '2023',
    status: 'completed',
    description: 'Минималистичная спальня с прикроватными бра и шкафом-купе.',
    details: [
      'Кровать с мягким изголовьем под размер ниши',
      'Прикроватные бра вместо настольных ламп',
      'Шкаф-купе с зеркальными фасадами',
      'Единый нейтральный тон материалов',
    ],
  },
  {
    id: 5,
    slug: 'kukhnya-taunhaus',
    title: 'Кухня в таунхаусе',
    area: '24 м²',
    tags: ['Мебель', 'Свет'],
    year: '2025',
    status: 'in_progress',
    description:
      'Кухня-гостиная с островом и скрытым освещением под шкафами. В реализации.',
    details: [
      'Остров 120×80 как обеденная зона',
      'Скрытая подсветка под навесными шкафами',
      'Техника встраивается в нижние модули',
      'Согласование с бригадой по коммуникациям',
    ],
  },
  {
    id: 6,
    slug: 'trehkomnatnaya-moskovsky',
    title: '3-комнатная на Московском',
    area: '88 м²',
    tags: ['Мебель', 'Свет', 'Сантехника'],
    year: '2025',
    status: 'concept',
    description:
      'Концепт подбора для трёхкомнатной квартиры: мебель + комплексное освещение + две ванные.',
    details: [
      'Мебель для гостиной, двух спален и кабинета',
      'Световые сценарии для каждой зоны',
      'Две ванные в одной стилистике',
      'Концепт ожидает подтверждения бюджета',
    ],
  },
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}
```

- [ ] **Step 4: Run portfolio tests — expect 3 pass**

```
npm run test:run -- portfolio
```

Expected: `3 passed`

- [ ] **Step 5: Run full suite**

```
npm run test:run
```

Expected: 67 + 3 = **70 passed**

- [ ] **Step 6: Commit**

```
git add src/data/portfolio.js src/data/__tests__/portfolio.test.js
git commit -m "feat: add portfolio data layer with getProjectBySlug"
```

---

## Task 2: PortfolioPage — Light Glass Rebuild

**Files:**
- Modify: `src/pages/PortfolioPage.jsx`
- Create: `src/pages/__tests__/PortfolioPage.test.jsx`

> Context: PortfolioPage already exists at `/portfolio`. It uses old tokens and has an inline PROJECTS array. This task rebuilds it to Light Glass and imports PROJECTS from `src/data/portfolio.js`. Each card becomes a `glass-card` with a status badge. Clicking a card navigates to `/portfolio/:slug` (wired in Task 3).

**Status badge styles:**
```
completed  → 'bg-emerald-50 text-emerald-700 border border-emerald-200'
in_progress → 'bg-amber-50 text-amber-700 border border-amber-200'
concept    → 'bg-black/5 text-ink-3 border border-black/10'
```

**Status label strings:**
```
completed  → 'Реализован'
in_progress → 'В реализации'
concept    → 'Концепт'
```

- [ ] **Step 1: Write failing PortfolioPage test**

Create `src/pages/__tests__/PortfolioPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PortfolioPage from '../PortfolioPage'

function renderPortfolio() {
  return render(<MemoryRouter><PortfolioPage /></MemoryRouter>)
}

describe('PortfolioPage', () => {
  test('renders heading', () => {
    renderPortfolio()
    expect(screen.getByRole('heading', { name: 'Портфолио' })).toBeInTheDocument()
  })

  test('shows at least one Реализован status badge', () => {
    renderPortfolio()
    expect(screen.getAllByText('Реализован').length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run — expect 2 failures**

```
npm run test:run -- PortfolioPage
```

Expected: 2 failures (current heading is «Подобранные интерьеры...» and no status badges exist).

- [ ] **Step 3: Replace PortfolioPage.jsx**

Full replacement of `src/pages/PortfolioPage.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { PROJECTS } from '../data/portfolio'

const STATUS_LABELS = {
  completed: 'Реализован',
  in_progress: 'В реализации',
  concept: 'Концепт',
}

const STATUS_STYLES = {
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  in_progress: 'bg-amber-50 text-amber-700 border border-amber-200',
  concept: 'bg-black/5 text-ink-3 border border-black/10',
}

export default function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Портфолио — Pufflux</title>
        <meta
          name="description"
          content="Проекты подбора мебели, освещения и сантехники для квартир в Санкт-Петербурге."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-10">Портфолио</h1>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 60}>
                <Link to={`/portfolio/${p.slug}`} className="group block">
                  <div className="glass-card overflow-hidden">
                    <div className="aspect-[4/3] bg-white/40 flex items-center justify-center text-ink-5 text-xs tracking-widest group-hover:scale-105 transition-transform duration-500">
                      Фото
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-[13px] font-normal text-ink leading-snug">
                          {p.title}
                        </h3>
                        <span
                          className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full ${STATUS_STYLES[p.status]}`}
                        >
                          {STATUS_LABELS[p.status]}
                        </span>
                      </div>
                      <p className="text-xs text-ink-4">
                        {p.area} · {p.tags.join(', ')} · {p.year}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="glass-card p-8 text-center">
              <h2 className="text-xl font-light text-ink mb-3">Хотите такой результат?</h2>
              <p className="text-sm text-ink-3 mb-6">Расскажите о вашем проекте.</p>
              <Link
                to="/brief"
                className="inline-block bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
              >
                Обсудить проект
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Run PortfolioPage tests — expect 2 pass**

```
npm run test:run -- PortfolioPage
```

Expected: `2 passed`

- [ ] **Step 5: Run full suite**

```
npm run test:run
```

Expected: 70 + 2 = **72 passed**

- [ ] **Step 6: Commit**

```
git add src/pages/PortfolioPage.jsx src/pages/__tests__/PortfolioPage.test.jsx
git commit -m "feat: rebuild PortfolioPage in Light Glass style with status badges"
```

---

## Task 3: PortfolioItemPage — Individual Project Page

**Files:**
- Create: `src/pages/PortfolioItemPage.jsx`
- Create: `src/pages/__tests__/PortfolioItemPage.test.jsx`
- Modify: `src/App.jsx`

> Context: `/portfolio/:slug` currently renders PortfolioPage (the same grid). This task creates PortfolioItemPage which reads the slug from `useParams()`, calls `getProjectBySlug(slug)`, and renders the project detail. If not found → «Проект не найден». App.jsx gets `/portfolio/:slug` rewired to PortfolioItemPage.

- [ ] **Step 1: Write failing PortfolioItemPage tests**

Create `src/pages/__tests__/PortfolioItemPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PortfolioItemPage from '../PortfolioItemPage'

function renderItem(slug = 'studiya-petrogradskaya') {
  return render(
    <MemoryRouter initialEntries={[`/portfolio/${slug}`]}>
      <Routes>
        <Route path="/portfolio/:slug" element={<PortfolioItemPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('PortfolioItemPage', () => {
  test('renders project title for valid slug', () => {
    renderItem()
    expect(
      screen.getByRole('heading', { name: 'Студия на Петроградской' })
    ).toBeInTheDocument()
  })

  test('renders Проект не найден for unknown slug', () => {
    renderItem('unknown-slug')
    expect(screen.getByText('Проект не найден')).toBeInTheDocument()
  })

  test('CTA links to /brief for valid slug', () => {
    renderItem()
    expect(screen.getByRole('link', { name: 'Обсудить проект' })).toHaveAttribute(
      'href',
      '/brief'
    )
  })
})
```

- [ ] **Step 2: Run — expect 3 failures**

```
npm run test:run -- PortfolioItemPage
```

Expected: 3 failures with "Cannot find module '../PortfolioItemPage'"

- [ ] **Step 3: Create PortfolioItemPage.jsx**

Create `src/pages/PortfolioItemPage.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'
import { getProjectBySlug } from '../data/portfolio'

const STATUS_LABELS = {
  completed: 'Реализован',
  in_progress: 'В реализации',
  concept: 'Концепт',
}

const STATUS_STYLES = {
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  in_progress: 'bg-amber-50 text-amber-700 border border-amber-200',
  concept: 'bg-black/5 text-ink-3 border border-black/10',
}

export default function PortfolioItemPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-ink-3 mb-4">Проект не найден</p>
          <Link to="/portfolio" className="text-sm text-ink border-b border-ink/30 pb-0.5">
            Вернуться в портфолио
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{project.title} — Pufflux</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <nav className="flex items-center gap-2 text-xs text-ink-4 mb-8">
              <Link to="/portfolio" className="hover:text-ink transition-colors">
                Портфолио
              </Link>
              <span>/</span>
              <span className="text-ink-3">{project.title}</span>
            </nav>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <h1 className="text-2xl font-light text-ink">{project.title}</h1>
              <span
                className={`text-[10px] px-2.5 py-1 rounded-full ${STATUS_STYLES[project.status]}`}
              >
                {STATUS_LABELS[project.status]}
              </span>
            </div>
            <p className="text-sm text-ink-4 mb-8">
              {project.area} · {project.tags.join(', ')} · {project.year}
            </p>
          </Reveal>

          <Reveal>
            <div className="glass-card aspect-video flex items-center justify-center text-ink-5 text-xs tracking-widest mb-10">
              Фото проекта
            </div>
          </Reveal>

          <Reveal>
            <p className="text-sm text-ink-3 leading-relaxed mb-8">{project.description}</p>
            <p className="text-[10px] uppercase tracking-widest text-ink-4 mb-4">Что сделали</p>
            <ul className="flex flex-col gap-3 mb-16">
              {project.details.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-3">
                  <span className="text-ink-4 shrink-0 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <div className="glass-card p-8 text-center">
              <h2 className="text-xl font-light text-ink mb-3">Хотите такой результат?</h2>
              <Link
                to="/brief"
                className="inline-block bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
              >
                Обсудить проект
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Wire PortfolioItemPage in App.jsx**

Add import after the existing page imports in `src/App.jsx`:

```jsx
import PortfolioItemPage from './pages/PortfolioItemPage'
```

Change the `/portfolio/:slug` route from:

```jsx
<Route path="/portfolio/:slug" element={<PortfolioPage />} />
```

to:

```jsx
<Route path="/portfolio/:slug" element={<PortfolioItemPage />} />
```

- [ ] **Step 5: Run PortfolioItemPage tests — expect 3 pass**

```
npm run test:run -- PortfolioItemPage
```

Expected: `3 passed`

- [ ] **Step 6: Run full suite**

```
npm run test:run
```

Expected: 72 + 3 = **75 passed**

- [ ] **Step 7: Commit**

```
git add src/pages/PortfolioItemPage.jsx src/pages/__tests__/PortfolioItemPage.test.jsx src/App.jsx
git commit -m "feat: add PortfolioItemPage and wire /portfolio/:slug route"
```

---

## Task 4: BriefPage — Lead-Gen Form

**Files:**
- Create: `src/pages/BriefPage.jsx`
- Create: `src/pages/__tests__/BriefPage.test.jsx`
- Modify: `src/App.jsx`

> Context: `/brief` is currently a `<PlaceholderPage title="Рассказать о проекте" />`. This task creates the primary lead-gen form. Three fields: имя (required), телефон или email (required), textarea (optional). On submit with valid data → replace form with confirmation message. On submit with empty required fields → inline error. No network request — MVP stub.

- [ ] **Step 1: Write failing BriefPage tests**

Create `src/pages/__tests__/BriefPage.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BriefPage from '../BriefPage'

function renderBrief() {
  return render(<MemoryRouter><BriefPage /></MemoryRouter>)
}

describe('BriefPage', () => {
  test('renders heading', () => {
    renderBrief()
    expect(screen.getByRole('heading', { name: 'Рассказать о проекте' })).toBeInTheDocument()
  })

  test('has Имя input', () => {
    renderBrief()
    expect(screen.getByLabelText('Имя')).toBeInTheDocument()
  })

  test('has Телефон или email input', () => {
    renderBrief()
    expect(screen.getByLabelText('Телефон или email')).toBeInTheDocument()
  })

  test('shows error on submit with empty required fields', () => {
    renderBrief()
    fireEvent.click(screen.getByRole('button', { name: 'Отправить' }))
    expect(screen.getByText(/заполните/i)).toBeInTheDocument()
  })

  test('shows confirmation after valid submit', () => {
    renderBrief()
    fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Анна' } })
    fireEvent.change(screen.getByLabelText('Телефон или email'), {
      target: { value: '+7 999 123 45 67' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Отправить' }))
    expect(screen.getByText('Спасибо!')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run — expect 5 failures**

```
npm run test:run -- BriefPage
```

Expected: 5 failures with "Cannot find module '../BriefPage'"

- [ ] **Step 3: Create BriefPage.jsx**

Create `src/pages/BriefPage.jsx`:

```jsx
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function BriefPage() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) {
      setError('Пожалуйста, заполните Имя и Телефон или email')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <>
      <Helmet>
        <title>Рассказать о проекте — Pufflux</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-lg mx-auto px-6 py-10 md:py-16">
          <h1 className="text-2xl font-light text-ink mb-8">Рассказать о проекте</h1>

          {submitted ? (
            <div className="glass-card p-8 text-center flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                <span className="text-emerald-700 text-xl">✓</span>
              </div>
              <h2 className="text-xl font-light text-ink">Спасибо!</h2>
              <p className="text-sm text-ink-3">Свяжемся в течение дня.</p>
              <Link
                to="/catalog"
                className="mt-2 text-sm text-ink border-b border-ink/30 pb-0.5 self-center"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя *"
                aria-label="Имя"
                className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4 bg-transparent focus:outline-none focus:border-ink transition-colors"
              />
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Телефон или email *"
                aria-label="Телефон или email"
                className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4 bg-transparent focus:outline-none focus:border-ink transition-colors"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Расскажите о проекте"
                aria-label="Расскажите о проекте"
                rows={4}
                className="border border-black/10 rounded-xl p-3 text-sm text-ink placeholder-ink-4 bg-white/60 focus:outline-none focus:border-ink transition-colors resize-none"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
                >
                  Отправить
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Wire BriefPage in App.jsx**

Add import in `src/App.jsx`:

```jsx
import BriefPage from './pages/BriefPage'
```

Change the `/brief` route from:

```jsx
<Route path="/brief" element={<PlaceholderPage title="Рассказать о проекте" />} />
```

to:

```jsx
<Route path="/brief" element={<BriefPage />} />
```

- [ ] **Step 5: Run BriefPage tests — expect 5 pass**

```
npm run test:run -- BriefPage
```

Expected: `5 passed`

- [ ] **Step 6: Run full suite**

```
npm run test:run
```

Expected: 75 + 5 = **80 passed**

- [ ] **Step 7: Commit**

```
git add src/pages/BriefPage.jsx src/pages/__tests__/BriefPage.test.jsx src/App.jsx
git commit -m "feat: add BriefPage lead-gen form and wire /brief route"
```

---

## Task 5: ShowroomPage — Info + Appointment Form

**Files:**
- Create: `src/pages/ShowroomPage.jsx`
- Create: `src/pages/__tests__/ShowroomPage.test.jsx`
- Modify: `src/App.jsx`

> Context: `/showroom` is currently `<PlaceholderPage title="Шоурум" />`. This task creates a two-section page: (1) showroom info (address placeholder, hours, note about material samples), (2) appointment booking form — name (required) + phone (required) + optional «удобное время» text input. Same submit pattern as BriefPage: inline confirmation, no network request.

- [ ] **Step 1: Write failing ShowroomPage tests**

Create `src/pages/__tests__/ShowroomPage.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ShowroomPage from '../ShowroomPage'

function renderShowroom() {
  return render(<MemoryRouter><ShowroomPage /></MemoryRouter>)
}

describe('ShowroomPage', () => {
  test('renders heading', () => {
    renderShowroom()
    expect(screen.getByRole('heading', { name: 'Шоурум' })).toBeInTheDocument()
  })

  test('has Имя input', () => {
    renderShowroom()
    expect(screen.getByLabelText('Имя')).toBeInTheDocument()
  })

  test('has Телефон input', () => {
    renderShowroom()
    expect(screen.getByLabelText('Телефон')).toBeInTheDocument()
  })

  test('shows confirmation after valid submit', () => {
    renderShowroom()
    fireEvent.change(screen.getByLabelText('Имя'), { target: { value: 'Анна' } })
    fireEvent.change(screen.getByLabelText('Телефон'), { target: { value: '+7 999 123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Записаться' }))
    expect(screen.getByText('Заявка принята!')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run — expect 4 failures**

```
npm run test:run -- ShowroomPage
```

Expected: 4 failures with "Cannot find module '../ShowroomPage'"

- [ ] **Step 3: Create ShowroomPage.jsx**

Create `src/pages/ShowroomPage.jsx`:

```jsx
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Reveal from '../components/ui/Reveal'

export default function ShowroomPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError('Пожалуйста, заполните Имя и Телефон')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <>
      <Helmet>
        <title>Шоурум — Pufflux</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-10">Шоурум</h1>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Info */}
            <Reveal>
              <div>
                <div className="glass-card p-8 mb-6">
                  <p className="text-[10px] uppercase tracking-widest text-ink-4 mb-4">Адрес</p>
                  <p className="text-sm text-ink mb-6">Санкт-Петербург, ул. Примерная, 1</p>
                  <p className="text-[10px] uppercase tracking-widest text-ink-4 mb-4">
                    Часы работы
                  </p>
                  <p className="text-sm text-ink">Пн–Пт 10:00–19:00</p>
                  <p className="text-sm text-ink">Сб 11:00–17:00</p>
                </div>
                <p className="text-sm text-ink-3 leading-relaxed">
                  Здесь вы можете увидеть образцы материалов — ткани, дерево, металл — и обсудить
                  проект лично.
                </p>
              </div>
            </Reveal>

            {/* Booking form */}
            <Reveal delay={80}>
              <div>
                <h2 className="text-base font-normal text-ink mb-6">Записаться на визит</h2>
                {submitted ? (
                  <div className="glass-card p-8 text-center flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                      <span className="text-emerald-700">✓</span>
                    </div>
                    <p className="text-sm text-ink">Заявка принята!</p>
                    <p className="text-sm text-ink-3">
                      Свяжемся для подтверждения в течение дня.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass-card p-8 flex flex-col gap-5">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Имя *"
                      aria-label="Имя"
                      className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4 bg-transparent focus:outline-none focus:border-ink transition-colors"
                    />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Телефон *"
                      aria-label="Телефон"
                      className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4 bg-transparent focus:outline-none focus:border-ink transition-colors"
                    />
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="Удобное время (необязательно)"
                      aria-label="Удобное время"
                      className="border-b border-black/15 py-3 text-sm text-ink placeholder-ink-4 bg-transparent focus:outline-none focus:border-ink transition-colors"
                    />
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
                      >
                        Записаться
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Wire ShowroomPage in App.jsx**

Add import in `src/App.jsx`:

```jsx
import ShowroomPage from './pages/ShowroomPage'
```

Change the `/showroom` route from:

```jsx
<Route path="/showroom" element={<PlaceholderPage title="Шоурум" />} />
```

to:

```jsx
<Route path="/showroom" element={<ShowroomPage />} />
```

- [ ] **Step 5: Run ShowroomPage tests — expect 4 pass**

```
npm run test:run -- ShowroomPage
```

Expected: `4 passed`

- [ ] **Step 6: Run full suite**

```
npm run test:run
```

Expected: 80 + 4 = **84 passed**

Wait — recount: 67 (after 4a) + 3 (Task 1) + 2 (Task 2) + 3 (Task 3) + 5 (Task 4) + 4 (Task 5) = **84 total**.

- [ ] **Step 7: Commit**

```
git add src/pages/ShowroomPage.jsx src/pages/__tests__/ShowroomPage.test.jsx src/App.jsx
git commit -m "feat: add ShowroomPage with appointment form and wire /showroom route"
```
