# Plan 4a: Content Pages Light Glass Rebuild

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild ServicesPage and ProcessPage from old design tokens to Light Glass; create PhilosophyPage from scratch.

**Architecture:** Three independent page tasks. ServicesPage and ProcessPage already have correct content — only the visual layer is replaced (old tokens `bg-graphite`, `bg-cream`, `text-stone-*`, `text-graphite`, `text-accent` → Light Glass tokens). PhilosophyPage is a new static page with hardcoded content. All CTA buttons now link to `/brief` instead of `/contact`. App.jsx gains one new route for PhilosophyPage.

**Tech Stack:** React 19, react-helmet-async, React Router v7 (`Link`), Tailwind v4 CSS-first, Vitest + @testing-library/react

---

## Codebase context (read before implementing)

**Design tokens** (`src/index.css`):
- Background `#EFEFEF` — set on `html` and `body` globally, never add a bg class to page containers
- `text-ink` (#1a1a1a), `text-ink-2` (#555), `text-ink-3` (#888), `text-ink-4` (#aaa), `text-ink-5` (#ccc)
- `.glass-card` — white/72 background, blur, border-radius 20px
- `.glass-pill` — pill shape
- **Never use:** `bg-graphite`, `bg-cream`, `text-graphite`, `text-stone-*`, `text-accent`

**Reveal component** (`src/components/ui/Reveal.jsx`):
- Wraps children in a scroll-reveal animation via IntersectionObserver
- IntersectionObserver is mocked in `src/test-setup.js` — no setup needed in tests
- Usage: `<Reveal>content</Reveal>` or `<Reveal delay={100}>content</Reveal>`

**Test pattern for simple pages** (no CartContext, no WishlistContext needed):
```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MyPage from '../MyPage'

function renderPage() {
  return render(<MemoryRouter><MyPage /></MemoryRouter>)
}
```

**Test command:** `npm run test:run`

---

## File Map

| Action | File |
|--------|------|
| Modify | `src/pages/ServicesPage.jsx` |
| Create | `src/pages/__tests__/ServicesPage.test.jsx` |
| Modify | `src/pages/ProcessPage.jsx` |
| Create | `src/pages/__tests__/ProcessPage.test.jsx` |
| Create | `src/pages/PhilosophyPage.jsx` |
| Create | `src/pages/__tests__/PhilosophyPage.test.jsx` |
| Modify | `src/App.jsx` |

---

## Task 1: ServicesPage — Light Glass Rebuild

**Files:**
- Modify: `src/pages/ServicesPage.jsx`
- Create: `src/pages/__tests__/ServicesPage.test.jsx`

> Context: ServicesPage already exists at `/services` and is wired in App.jsx. It uses old tokens (`bg-graphite`, `bg-cream`, `text-stone-*`, `text-graphite`). The content (4 services with includes) is correct — only the visual layer changes. CTA links to `/contact` — must change to `/brief`.

- [ ] **Step 1: Write failing ServicesPage test**

Create `src/pages/__tests__/ServicesPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ServicesPage from '../ServicesPage'

function renderServices() {
  return render(<MemoryRouter><ServicesPage /></MemoryRouter>)
}

describe('ServicesPage', () => {
  test('renders heading', () => {
    renderServices()
    expect(screen.getByRole('heading', { name: 'Подбор, а не продажа' })).toBeInTheDocument()
  })

  test('CTA links to /brief', () => {
    renderServices()
    expect(screen.getByRole('link', { name: 'Обсудить проект' })).toHaveAttribute('href', '/brief')
  })
})
```

- [ ] **Step 2: Run — expect 2 failures**

```
npm run test:run -- ServicesPage
```

Expected: 2 failures — heading role mismatch (current heading is inside `bg-graphite` section with different structure) and link points to `/contact`.

- [ ] **Step 3: Replace ServicesPage.jsx**

Full replacement of `src/pages/ServicesPage.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const SERVICES = [
  {
    title: 'Мебель',
    price: 'от 25 000 ₽',
    description:
      'Подбор мебели под планировку, высоту потолков и сценарии использования. Гостиная, спальня, кухня, детская — с учётом пропорций и материалов.',
    includes: [
      'Анализ планировки и замеры',
      'Подбор по каталогам и шоурумам',
      'Спецификация с артикулами и ценами',
      'Обоснование каждого выбора',
    ],
  },
  {
    title: 'Освещение',
    price: 'от 15 000 ₽',
    description:
      'Световые сценарии под каждую зону. Рабочий свет, акцентный, фоновый. Подбор люстр, точечных светильников, бра и напольных ламп.',
    includes: [
      'Световая схема по зонам',
      'Подбор типов и мощности',
      'Список позиций с источниками',
      'Совместимость с диммерами',
    ],
  },
  {
    title: 'Сантехника',
    price: 'от 20 000 ₽',
    description:
      'Ванна, душевая, унитаз, смесители — под габариты ванной комнаты и бюджет. Без переплат за бренд, с акцентом на надёжность.',
    includes: [
      'Подбор под размеры помещения',
      'Рекомендации по установке',
      'Альтернативные варианты',
      'Сравнение по характеристикам',
    ],
  },
  {
    title: 'Комплексный подбор',
    price: 'от 55 000 ₽',
    description:
      'Мебель, свет и сантехника как единая согласованная система. Одно техзадание, один архитектор, один результат.',
    includes: [
      'Всё из трёх направлений',
      'Единая цветовая и материальная гамма',
      'Полная спецификация под ключ',
      'Сопровождение при покупке',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Услуги — Pufflux</title>
        <meta
          name="description"
          content="Подбор мебели, освещения и сантехники в Санкт-Петербурге. Архитектурный подход — единая спецификация для вашей квартиры."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-2">Подбор, а не продажа</h1>
            <p className="text-sm text-ink-3 mb-12">
              Архитектурный подход к выбору мебели, света и сантехники
            </p>
          </Reveal>

          <div className="flex flex-col gap-6">
            {SERVICES.map(({ title, price, description, includes }) => (
              <Reveal key={title}>
                <div className="glass-card p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <div className="flex items-baseline gap-3 mb-4">
                        <h2 className="text-xl font-light text-ink">{title}</h2>
                        <span className="text-sm text-ink-4">{price}</span>
                      </div>
                      <p className="text-sm text-ink-3 leading-relaxed">{description}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink-4 mb-3">
                        Что входит
                      </p>
                      <ul className="flex flex-col gap-2">
                        {includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-ink-3">
                            <span className="text-ink-4 shrink-0 mt-0.5">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="glass-card p-8 mt-12 text-center">
              <h2 className="text-xl font-light text-ink mb-3">Не знаете, с чего начать?</h2>
              <p className="text-sm text-ink-3 mb-6">
                Расскажите о проекте — поможем разобраться, что нужно именно вам.
              </p>
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

- [ ] **Step 4: Run ServicesPage tests — expect 2 pass**

```
npm run test:run -- ServicesPage
```

Expected: `2 passed`

- [ ] **Step 5: Run full suite — no regressions**

```
npm run test:run
```

Expected: 61 existing + 2 new = **63 passed**

- [ ] **Step 6: Commit**

```
git add src/pages/ServicesPage.jsx src/pages/__tests__/ServicesPage.test.jsx
git commit -m "feat: rebuild ServicesPage in Light Glass style, CTA → /brief"
```

---

## Task 2: ProcessPage — Light Glass Rebuild

**Files:**
- Modify: `src/pages/ProcessPage.jsx`
- Create: `src/pages/__tests__/ProcessPage.test.jsx`

> Context: ProcessPage already exists at `/process`. It uses old tokens (`bg-graphite`, `bg-cream`, `text-stone-*`, `text-graphite`). Content (3 steps + FAQ) is correct. CTA links to `/contact` — must change to `/brief`. The step numbers use `text-graphite/8` (near-transparent) — in Light Glass this becomes `text-ink/8`.

- [ ] **Step 1: Write failing ProcessPage test**

Create `src/pages/__tests__/ProcessPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProcessPage from '../ProcessPage'

function renderProcess() {
  return render(<MemoryRouter><ProcessPage /></MemoryRouter>)
}

describe('ProcessPage', () => {
  test('renders heading', () => {
    renderProcess()
    expect(screen.getByRole('heading', { name: 'Как это работает' })).toBeInTheDocument()
  })

  test('CTA links to /brief', () => {
    renderProcess()
    expect(screen.getByRole('link', { name: 'Обсудить проект' })).toHaveAttribute('href', '/brief')
  })
})
```

- [ ] **Step 2: Run — expect 2 failures**

```
npm run test:run -- ProcessPage
```

Expected: 2 failures (heading in old layout, link points to `/contact`).

- [ ] **Step 3: Replace ProcessPage.jsx**

Full replacement of `src/pages/ProcessPage.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const STEPS = [
  {
    number: '01',
    title: 'Разговор',
    duration: '30–60 минут',
    description:
      'Всё начинается с разговора. Вы рассказываете о квартире: площадь, планировка, высота потолков. О том, как вы хотите жить: один, с семьёй, с питомцами.',
    details: [
      'Параметры помещения и планировка',
      'Сценарии использования по зонам',
      'Бюджет и ценовые ориентиры',
      'Предпочтения по материалам и стилю',
    ],
  },
  {
    number: '02',
    title: 'Подбор',
    duration: '3–7 рабочих дней',
    description:
      'Архитектор работает с планом помещения и вашими пожеланиями. Анализирует сотни позиций, проверяет пропорции, согласует материалы между собой.',
    details: [
      'Анализ геометрии и пропорций',
      'Подбор по каталогам и шоурумам',
      'Проверка совместимости элементов',
      'Подготовка обоснованной спецификации',
    ],
  },
  {
    number: '03',
    title: 'Результат',
    duration: 'Финальный документ',
    description:
      'Вы получаете точный список позиций с артикулами, источниками и обоснованием каждого выбора. Покупаете сами или с нашей помощью.',
    details: [
      'Полная спецификация с ценами',
      'Источники и альтернативы',
      'Объяснение каждого решения',
      'Сопровождение при необходимости',
    ],
  },
]

const FAQ = [
  {
    q: 'Вы продаёте мебель или только консультируете?',
    a: 'Только подбираем. Мы не магазин и не получаем комиссию от производителей. Цель — найти лучшее для вашего пространства, а не продать дороже.',
  },
  {
    q: 'Нужен ли готовый проект дизайнера?',
    a: 'Нет. Мы работаем с планировкой и вашими пожеланиями. Если есть дизайн-проект — хорошо, но он не обязателен.',
  },
  {
    q: 'Как происходит оплата?',
    a: 'Фиксированная стоимость за подбор. Никаких скрытых наценок на товары. Вы платите только за работу архитектора.',
  },
  {
    q: 'Работаете ли вы за пределами СПб?',
    a: 'Да, удалённо — по всей России. Нужен только план помещения и возможность пообщаться онлайн.',
  },
]

export default function ProcessPage() {
  return (
    <>
      <Helmet>
        <title>Как работаем — Pufflux</title>
        <meta
          name="description"
          content="Три шага архитектурного подбора мебели и интерьера в СПб: разговор, подбор, результат. Без наценок и навязанного стиля."
        />
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-12">Как это работает</h1>
          </Reveal>

          <div className="flex flex-col gap-16 mb-20">
            {STEPS.map(({ number, title, duration, description, details }) => (
              <Reveal key={number}>
                <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
                  <div>
                    <div className="text-6xl font-light text-ink/8 mb-3 leading-none select-none">
                      {number}
                    </div>
                    <h2 className="text-xl font-light text-ink mb-1">{title}</h2>
                    <p className="text-sm text-ink-4">{duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-ink-3 leading-relaxed mb-6">{description}</p>
                    <ul className="flex flex-col gap-2">
                      {details.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ink-3">
                          <span className="text-ink-4 shrink-0 mt-0.5">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="border-t border-black/8 pt-12 mb-16">
              <p className="text-[10px] uppercase tracking-widest text-ink-4 mb-8">Вопросы</p>
              <h2 className="text-xl font-light text-ink mb-10">FAQ</h2>
              <div className="flex flex-col gap-8 max-w-2xl">
                {FAQ.map(({ q, a }) => (
                  <Reveal key={q}>
                    <div>
                      <h3 className="text-sm font-normal text-ink mb-2">{q}</h3>
                      <p className="text-sm text-ink-3 leading-relaxed">{a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass-card p-8 text-center">
              <h2 className="text-xl font-light text-ink mb-3">Готовы начать?</h2>
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

- [ ] **Step 4: Run ProcessPage tests — expect 2 pass**

```
npm run test:run -- ProcessPage
```

Expected: `2 passed`

- [ ] **Step 5: Run full suite — no regressions**

```
npm run test:run
```

Expected: 63 + 2 = **65 passed**

- [ ] **Step 6: Commit**

```
git add src/pages/ProcessPage.jsx src/pages/__tests__/ProcessPage.test.jsx
git commit -m "feat: rebuild ProcessPage in Light Glass style, CTA → /brief"
```

---

## Task 3: PhilosophyPage — New Static Page

**Files:**
- Create: `src/pages/PhilosophyPage.jsx`
- Create: `src/pages/__tests__/PhilosophyPage.test.jsx`
- Modify: `src/App.jsx`

> Context: `/philosophy` is currently `<PlaceholderPage title="О нас" />`. This task creates a real page and wires it. Content: 3 principle cards + CTA → `/brief`. All content is hardcoded in the component — no data file needed.

- [ ] **Step 1: Write failing PhilosophyPage test**

Create `src/pages/__tests__/PhilosophyPage.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PhilosophyPage from '../PhilosophyPage'

function renderPhilosophy() {
  return render(<MemoryRouter><PhilosophyPage /></MemoryRouter>)
}

describe('PhilosophyPage', () => {
  test('renders heading', () => {
    renderPhilosophy()
    expect(screen.getByRole('heading', { name: 'О проекте' })).toBeInTheDocument()
  })

  test('CTA links to /brief', () => {
    renderPhilosophy()
    expect(screen.getByRole('link', { name: 'Начать' })).toHaveAttribute('href', '/brief')
  })
})
```

- [ ] **Step 2: Run — expect 2 failures**

```
npm run test:run -- PhilosophyPage
```

Expected: 2 failures with "Cannot find module '../PhilosophyPage'"

- [ ] **Step 3: Create PhilosophyPage.jsx**

Create `src/pages/PhilosophyPage.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

const PRINCIPLES = [
  {
    title: 'Пространство как система',
    body: 'Мебель, свет и сантехника — не отдельные категории, а части одного интерьера. Мы работаем с ними вместе: проверяем пропорции, согласуем материалы, обеспечиваем целостность результата.',
  },
  {
    title: 'Подбор, а не продажа',
    body: 'Мы не получаем комиссию от производителей. Задача — найти лучшее для вашего пространства, а не то, что выгоднее продать. Спецификация строится на логике, а не на ассортименте.',
  },
  {
    title: 'Один архитектор — один результат',
    body: 'Вы работаете с одним специалистом от первого разговора до финальной спецификации. Не менеджер → архитектор → менеджер, а прямой контакт с человеком, который принимает решения.',
  },
]

export default function PhilosophyPage() {
  return (
    <>
      <Helmet>
        <title>О проекте — Pufflux</title>
      </Helmet>

      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          <Reveal>
            <h1 className="text-2xl font-light text-ink mb-3">О проекте</h1>
            <p className="text-sm text-ink-3 mb-12 max-w-xl leading-relaxed">
              Мы объединили мебель, освещение и сантехнику в одном месте — потому что хороший
              интерьер складывается из всего сразу, а не по частям.
            </p>
          </Reveal>

          <div className="flex flex-col gap-6 mb-16">
            {PRINCIPLES.map(({ title, body }) => (
              <Reveal key={title}>
                <div className="glass-card p-8">
                  <h2 className="text-base font-normal text-ink mb-3">{title}</h2>
                  <p className="text-sm text-ink-3 leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="glass-card p-8 text-center">
              <h2 className="text-xl font-light text-ink mb-3">
                Расскажите о своём проекте
              </h2>
              <p className="text-sm text-ink-3 mb-6">Разберёмся вместе, что нужно именно вам.</p>
              <Link
                to="/brief"
                className="inline-block bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
              >
                Начать
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Wire PhilosophyPage in App.jsx**

In `src/App.jsx`, add the import after the existing page imports:

```jsx
import PhilosophyPage from './pages/PhilosophyPage'
```

Change the `/philosophy` route from:

```jsx
<Route path="/philosophy" element={<PlaceholderPage title="О нас" />} />
```

to:

```jsx
<Route path="/philosophy" element={<PhilosophyPage />} />
```

- [ ] **Step 5: Run PhilosophyPage tests — expect 2 pass**

```
npm run test:run -- PhilosophyPage
```

Expected: `2 passed`

- [ ] **Step 6: Run full suite — no regressions**

```
npm run test:run
```

Expected: 65 + 2 = **67 passed**

- [ ] **Step 7: Commit**

```
git add src/pages/PhilosophyPage.jsx src/pages/__tests__/PhilosophyPage.test.jsx src/App.jsx
git commit -m "feat: add PhilosophyPage and wire /philosophy route"
```
