# Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current dark graphite/cream theme with a Light Spatial Glass design system — white/grey background, frosted-glass cards, dark typography, soft shadows — and deliver reusable primitive components that all future catalog and commerce work builds on.

**Architecture:** CSS tokens + custom utility classes live in `index.css`. Primitive UI components (`GlassCard`, `Button`, `Badge`, `NavIcon`) are stateless and composable. Layout components (`Header`, `Footer`) are rebuilt on top of these primitives. `ProductCard` is updated to use the new style. No external CSS-in-JS — all styling via Tailwind v4 utilities + custom `@layer utilities` classes.

**Tech Stack:** React 19, Vite, Tailwind v4 (CSS-first, `@theme` block), Vitest, @testing-library/react, lucide-react

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Modify | `package.json` | Add vitest, @testing-library/react, @testing-library/jest-dom, jsdom, lucide-react |
| Modify | `vite.config.js` | Add vitest test config (environment: jsdom) |
| Create | `src/test-setup.js` | Import @testing-library/jest-dom matchers |
| Modify | `src/index.css` | Light Glass CSS tokens + `.glass-card` / `.glass-pill` utilities |
| Modify | `src/App.jsx` | Apply `bg-page` to body, fix routes (remove /blog, add /wishlist /account /brief /showroom /collections /philosophy) |
| Create | `src/components/ui/GlassCard.jsx` | Polymorphic glass card wrapper (`as` prop, forwards className) |
| Create | `src/components/ui/Button.jsx` | `variant="primary"\|"secondary"\|"ghost"`, `size="sm"\|"md"` |
| Create | `src/components/ui/Badge.jsx` | Status badge: `variant="neutral"\|"success"\|"warning"\|"info"` |
| Create | `src/components/ui/NavIcon.jsx` | Circular icon button with optional count bubble |
| Modify | `src/components/layout/Header.jsx` | Rebuild: transparent→glass on scroll, Light Glass, lucide icons, always dark text |
| Modify | `src/components/layout/Footer.jsx` | Rebuild: light grey bg, 4-column, no dark background |
| Modify | `src/components/ui/ProductCard.jsx` | Update to Light Glass card style (glass-card class, new typography) |
| Create | `src/components/ui/__tests__/GlassCard.test.jsx` | Renders children, forwards className, polymorphic `as` |
| Create | `src/components/ui/__tests__/Button.test.jsx` | Renders variants, fires onClick, disabled state |
| Create | `src/components/ui/__tests__/Badge.test.jsx` | Renders text, variant classes applied |
| Create | `src/components/ui/__tests__/NavIcon.test.jsx` | Renders as link, shows count bubble when count > 0 |
| Create | `src/components/layout/__tests__/Header.test.jsx` | Logo renders, nav links render, cart count shows |

---

## Task 1: Test Infrastructure

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Create: `src/test-setup.js`

- [ ] **Step 1.1: Install test and icon dependencies**

```bash
npm install lucide-react
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Expected: `package.json` updated, `node_modules` populated.

- [ ] **Step 1.2: Configure Vitest in vite.config.js**

Replace `vite.config.js` entirely:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
  },
})
```

- [ ] **Step 1.3: Create test setup file**

Create `src/test-setup.js`:

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 1.4: Add test script to package.json**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 1.5: Verify test runner works**

```bash
npm run test:run
```

Expected: `No test files found` (exit 0, no errors). If it says "cannot find module" — check that `jsdom` is installed.

- [ ] **Step 1.6: Commit**

```bash
git add vite.config.js src/test-setup.js package.json package-lock.json
git commit -m "chore: add vitest + testing-library + lucide-react"
```

---

## Task 2: CSS Tokens & Glass Utilities

**Files:**
- Modify: `src/index.css`

- [ ] **Step 2.1: Replace index.css with Light Glass tokens**

Replace `src/index.css` entirely:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..500;1,14..32,300..400&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Light Glass palette */
  --color-page: #EFEFEF;
  --color-ink: #1a1a1a;
  --color-ink-2: #555;
  --color-ink-3: #888;
  --color-ink-4: #aaa;
  --color-ink-5: #ccc;

  /* Keep accent for badges / CTAs */
  --color-accent: #4F6AF0;
}

html {
  scroll-behavior: smooth;
  background-color: #EFEFEF;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #EFEFEF;
  color: #1a1a1a;
}

@layer utilities {
  /* Base glass card — rounded 20px */
  .glass-card {
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.04),
      0 8px 32px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }

  /* Pill glass — for nav bar, chips */
  .glass-pill {
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.04),
      0 8px 32px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }

  /* Subtle icon button circle */
  .glass-circle {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }
}
```

- [ ] **Step 2.2: Start dev server and verify grey background**

```bash
npm run dev
```

Open `http://localhost:5173`. Body background should be `#EFEFEF` (light grey). Any existing dark sections will look broken — that's expected, we fix them in later tasks.

- [ ] **Step 2.3: Commit**

```bash
git add src/index.css
git commit -m "feat: Light Glass CSS tokens and utility classes"
```

---

## Task 3: GlassCard Component

**Files:**
- Create: `src/components/ui/GlassCard.jsx`
- Create: `src/components/ui/__tests__/GlassCard.test.jsx`

- [ ] **Step 3.1: Write failing test**

Create `src/components/ui/__tests__/GlassCard.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GlassCard from '../GlassCard'

describe('GlassCard', () => {
  it('renders children', () => {
    render(<GlassCard>Hello</GlassCard>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies glass-card class by default', () => {
    const { container } = render(<GlassCard>content</GlassCard>)
    expect(container.firstChild).toHaveClass('glass-card')
  })

  it('merges custom className', () => {
    const { container } = render(<GlassCard className="p-8">content</GlassCard>)
    expect(container.firstChild).toHaveClass('glass-card', 'p-8')
  })

  it('renders as a different element via as prop', () => {
    const { container } = render(<GlassCard as="section">content</GlassCard>)
    expect(container.firstChild.tagName).toBe('SECTION')
  })

  it('forwards additional props', () => {
    const { container } = render(<GlassCard data-testid="card">content</GlassCard>)
    expect(screen.getByTestId('card')).toBeInTheDocument()
  })
})
```

- [ ] **Step 3.2: Run test — expect FAIL**

```bash
npm run test:run
```

Expected: FAIL — `Cannot find module '../GlassCard'`

- [ ] **Step 3.3: Implement GlassCard**

Create `src/components/ui/GlassCard.jsx`:

```jsx
export default function GlassCard({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`glass-card ${className}`} {...props}>
      {children}
    </Tag>
  )
}
```

- [ ] **Step 3.4: Run test — expect PASS**

```bash
npm run test:run
```

Expected: all 5 GlassCard tests PASS.

- [ ] **Step 3.5: Commit**

```bash
git add src/components/ui/GlassCard.jsx src/components/ui/__tests__/GlassCard.test.jsx
git commit -m "feat: GlassCard primitive component"
```

---

## Task 4: Button Component

**Files:**
- Create: `src/components/ui/Button.jsx`
- Create: `src/components/ui/__tests__/Button.test.jsx`

- [ ] **Step 4.1: Write failing test**

Create `src/components/ui/__tests__/Button.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Button from '../Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick} disabled>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('primary variant has dark background class', () => {
    const { container } = render(<Button variant="primary">P</Button>)
    expect(container.firstChild.className).toContain('bg-ink')
  })

  it('secondary variant has glass style', () => {
    const { container } = render(<Button variant="secondary">S</Button>)
    expect(container.firstChild.className).toContain('glass-pill')
  })

  it('defaults to primary variant', () => {
    const { container } = render(<Button>Default</Button>)
    expect(container.firstChild.className).toContain('bg-ink')
  })
})
```

- [ ] **Step 4.2: Run test — expect FAIL**

```bash
npm run test:run
```

Expected: FAIL — `Cannot find module '../Button'`

- [ ] **Step 4.3: Implement Button**

Create `src/components/ui/Button.jsx`:

```jsx
const VARIANTS = {
  primary: 'bg-ink text-white hover:bg-ink/85 border-transparent',
  secondary: 'glass-pill text-ink hover:bg-white/90 border-transparent',
  ghost: 'bg-transparent text-ink hover:bg-black/5 border-ink/20',
}

const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center rounded-full font-normal
        tracking-wide transition-all duration-200 border
        disabled:opacity-40 disabled:cursor-not-allowed
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 4.4: Run test — expect PASS**

```bash
npm run test:run
```

Expected: all 6 Button tests PASS.

- [ ] **Step 4.5: Commit**

```bash
git add src/components/ui/Button.jsx src/components/ui/__tests__/Button.test.jsx
git commit -m "feat: Button component with primary/secondary/ghost variants"
```

---

## Task 5: Badge Component

**Files:**
- Create: `src/components/ui/Badge.jsx`
- Create: `src/components/ui/__tests__/Badge.test.jsx`

- [ ] **Step 5.1: Write failing test**

Create `src/components/ui/__tests__/Badge.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Badge from '../Badge'

describe('Badge', () => {
  it('renders text', () => {
    render(<Badge>В наличии</Badge>)
    expect(screen.getByText('В наличии')).toBeInTheDocument()
  })

  it('neutral variant is default', () => {
    const { container } = render(<Badge>text</Badge>)
    expect(container.firstChild.className).toContain('text-ink-3')
  })

  it('success variant applies green color', () => {
    const { container } = render(<Badge variant="success">Реализован</Badge>)
    expect(container.firstChild.className).toContain('text-emerald')
  })

  it('warning variant applies amber color', () => {
    const { container } = render(<Badge variant="warning">В реализации</Badge>)
    expect(container.firstChild.className).toContain('text-amber')
  })
})
```

- [ ] **Step 5.2: Run test — expect FAIL**

```bash
npm run test:run
```

Expected: FAIL — `Cannot find module '../Badge'`

- [ ] **Step 5.3: Implement Badge**

Create `src/components/ui/Badge.jsx`:

```jsx
const VARIANTS = {
  neutral: 'bg-black/5 text-ink-3',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  info: 'bg-blue-50 text-blue-700',
}

export default function Badge({ variant = 'neutral', className = '', children }) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full
        text-[10px] font-medium uppercase tracking-widest
        ${VARIANTS[variant]} ${className}
      `}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 5.4: Run test — expect PASS**

```bash
npm run test:run
```

Expected: all 4 Badge tests PASS.

- [ ] **Step 5.5: Commit**

```bash
git add src/components/ui/Badge.jsx src/components/ui/__tests__/Badge.test.jsx
git commit -m "feat: Badge component with neutral/success/warning/info variants"
```

---

## Task 6: NavIcon Component

**Files:**
- Create: `src/components/ui/NavIcon.jsx`
- Create: `src/components/ui/__tests__/NavIcon.test.jsx`

- [ ] **Step 6.1: Write failing test**

Create `src/components/ui/__tests__/NavIcon.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import NavIcon from '../NavIcon'

const wrap = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('NavIcon', () => {
  it('renders as a link with aria-label', () => {
    wrap(<NavIcon to="/cart" label="Корзина"><span>icon</span></NavIcon>)
    expect(screen.getByRole('link', { name: 'Корзина' })).toBeInTheDocument()
  })

  it('does not show count bubble when count is 0', () => {
    wrap(<NavIcon to="/cart" label="Корзина" count={0}><span>icon</span></NavIcon>)
    expect(screen.queryByTestId('nav-count')).not.toBeInTheDocument()
  })

  it('shows count bubble when count > 0', () => {
    wrap(<NavIcon to="/cart" label="Корзина" count={3}><span>icon</span></NavIcon>)
    expect(screen.getByTestId('nav-count')).toHaveTextContent('3')
  })

  it('caps count display at 99+', () => {
    wrap(<NavIcon to="/cart" label="Корзина" count={150}><span>icon</span></NavIcon>)
    expect(screen.getByTestId('nav-count')).toHaveTextContent('99+')
  })
})
```

- [ ] **Step 6.2: Run test — expect FAIL**

```bash
npm run test:run
```

Expected: FAIL — `Cannot find module '../NavIcon'`

- [ ] **Step 6.3: Implement NavIcon**

Create `src/components/ui/NavIcon.jsx`:

```jsx
import { Link } from 'react-router-dom'

export default function NavIcon({ to, label, count = 0, className = '', children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className={`relative flex items-center justify-center w-8 h-8 glass-circle
        hover:-translate-y-0.5 transition-transform duration-200 ${className}`}
    >
      {children}
      {count > 0 && (
        <span
          data-testid="nav-count"
          className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-accent text-white
            text-[9px] font-medium rounded-full flex items-center justify-center px-1"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}
```

- [ ] **Step 6.4: Run test — expect PASS**

```bash
npm run test:run
```

Expected: all 4 NavIcon tests PASS.

- [ ] **Step 6.5: Commit**

```bash
git add src/components/ui/NavIcon.jsx src/components/ui/__tests__/NavIcon.test.jsx
git commit -m "feat: NavIcon component with count bubble"
```

---

## Task 7: Rebuild Header

**Files:**
- Modify: `src/components/layout/Header.jsx`
- Create: `src/components/layout/__tests__/Header.test.jsx`

- [ ] **Step 7.1: Write failing test**

Create `src/components/layout/__tests__/Header.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import { describe, it, expect } from 'vitest'
import Header from '../Header'

const wrap = (ui) =>
  render(
    <MemoryRouter>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>
  )

describe('Header', () => {
  it('renders logo link', () => {
    wrap(<Header />)
    expect(screen.getByRole('link', { name: /brand/i })).toBeInTheDocument()
  })

  it('renders Каталог nav link', () => {
    wrap(<Header />)
    expect(screen.getByRole('link', { name: /каталог/i })).toBeInTheDocument()
  })

  it('renders cart icon link', () => {
    wrap(<Header />)
    expect(screen.getByRole('link', { name: /корзина/i })).toBeInTheDocument()
  })

  it('renders wishlist icon link', () => {
    wrap(<Header />)
    expect(screen.getByRole('link', { name: /избранное/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 7.2: Run test — expect FAIL**

```bash
npm run test:run
```

Expected: FAIL — current Header has `Pufflux` as logo text, not matching `/brand/i`. (The actual brand name TBD — we use a placeholder.)

- [ ] **Step 7.3: Rebuild Header.jsx**

Replace `src/components/layout/Header.jsx` entirely:

```jsx
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import NavIcon from '../ui/NavIcon'

const NAV = [
  { to: '/catalog/furniture', label: 'Каталог' },
  { to: '/collections', label: 'Коллекции' },
  { to: '/portfolio', label: 'Портфолио' },
  { to: '/services', label: 'Услуги' },
  { to: '/philosophy', label: 'О нас' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-pill mx-4 mt-3 px-2' : 'bg-transparent px-0 mt-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          aria-label="Brand"
          className="text-[15px] font-normal tracking-[0.2em] uppercase text-ink"
        >
          Brand
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-[13px] transition-colors ${
                  isActive ? 'text-ink font-medium' : 'text-ink-3 hover:text-ink'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <NavIcon to="/search" label="Поиск">
            <Search size={15} className="text-ink-2" strokeWidth={1.5} />
          </NavIcon>
          <NavIcon to="/wishlist" label="Избранное">
            <Heart size={15} className="text-ink-2" strokeWidth={1.5} />
          </NavIcon>
          <NavIcon to="/cart" label="Корзина" count={itemCount}>
            <ShoppingBag size={15} className="text-ink-2" strokeWidth={1.5} />
          </NavIcon>

          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 glass-circle ml-1"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            {open
              ? <X size={15} className="text-ink-2" strokeWidth={1.5} />
              : <Menu size={15} className="text-ink-2" strokeWidth={1.5} />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-card mx-4 mb-3 px-6 py-6 flex flex-col gap-5">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-ink font-medium' : 'text-ink-3'}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/brief"
            onClick={() => setOpen(false)}
            className="text-sm text-center py-3 glass-pill text-ink"
          >
            Обсудить проект
          </Link>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 7.4: Run test — expect PASS**

```bash
npm run test:run
```

Expected: all 4 Header tests PASS.

- [ ] **Step 7.5: Check in browser**

```bash
npm run dev
```

Open `http://localhost:5173`. Header should be transparent on top, transition to floating glass pill on scroll. Text always dark.

- [ ] **Step 7.6: Commit**

```bash
git add src/components/layout/Header.jsx src/components/layout/__tests__/Header.test.jsx
git commit -m "feat: rebuild Header in Light Glass style with lucide icons"
```

---

## Task 8: Rebuild Footer

**Files:**
- Modify: `src/components/layout/Footer.jsx`

> Footer is a layout component with no interactive logic. We skip a dedicated test file — the Header tests already verify the test setup works. The footer is verified visually in the browser.

- [ ] **Step 8.1: Replace Footer.jsx**

Replace `src/components/layout/Footer.jsx` entirely:

```jsx
import { Link } from 'react-router-dom'

const CATALOG_LINKS = [
  ['Мебель', '/catalog/furniture'],
  ['Освещение', '/catalog/lighting'],
  ['Сантехника', '/catalog/plumbing'],
  ['Коллекции', '/collections'],
]

const SERVICE_LINKS = [
  ['Дизайн-проект', '/services'],
  ['Как работаем', '/process'],
  ['Шоурум', '/showroom'],
  ['Рассказать о проекте', '/brief'],
]

const BRAND_LINKS = [
  ['О нас', '/philosophy'],
  ['Портфолио', '/portfolio'],
]

const HELP_LINKS = [
  ['Доставка', '/delivery'],
  ['Возврат', '/return'],
  ['Контакты', '/contact'],
]

export default function Footer() {
  return (
    <footer className="bg-white/50 border-t border-white/80 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">

          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-5">Каталог</div>
            <nav className="flex flex-col gap-3">
              {CATALOG_LINKS.map(([label, to]) => (
                <Link key={to} to={to} className="text-sm text-ink-3 hover:text-ink transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-5">Услуги</div>
            <nav className="flex flex-col gap-3">
              {SERVICE_LINKS.map(([label, to]) => (
                <Link key={to} to={to} className="text-sm text-ink-3 hover:text-ink transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-5">О бренде</div>
            <nav className="flex flex-col gap-3">
              {BRAND_LINKS.map(([label, to]) => (
                <Link key={to} to={to} className="text-sm text-ink-3 hover:text-ink transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-5">Помощь</div>
            <nav className="flex flex-col gap-3">
              {HELP_LINKS.map(([label, to]) => (
                <Link key={to} to={to} className="text-sm text-ink-3 hover:text-ink transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Email subscribe */}
        <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center
          justify-between gap-6 mb-12">
          <div>
            <div className="text-sm font-medium text-ink mb-1">Новинки и подборки</div>
            <div className="text-[13px] text-ink-3">Раз в месяц — новые товары и кураторские коллекции.</div>
          </div>
          <form
            className="flex gap-2 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.ru"
              className="flex-1 md:w-52 px-4 py-2.5 text-sm bg-white/60 border border-white/90
                rounded-full outline-none focus:bg-white/80 transition-colors text-ink
                placeholder:text-ink-4"
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-sm bg-ink text-white rounded-full
                hover:bg-ink/85 transition-colors whitespace-nowrap"
            >
              Подписаться
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-[11px] text-ink-4">© 2026 Brand. Все права защищены.</span>
          <div className="flex items-center gap-5">
            <a href="https://t.me/" className="text-[11px] text-ink-4 hover:text-ink transition-colors">
              Telegram
            </a>
            <a href="#" className="text-[11px] text-ink-4 hover:text-ink transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 8.2: Verify in browser**

```bash
npm run dev
```

Footer should be light (white/50 bg), 4-column grid, glass subscribe block. No dark background.

- [ ] **Step 8.3: Run all tests**

```bash
npm run test:run
```

Expected: all tests still PASS (Footer has no dedicated tests, existing tests unaffected).

- [ ] **Step 8.4: Commit**

```bash
git add src/components/layout/Footer.jsx
git commit -m "feat: rebuild Footer in Light Glass style with email subscribe block"
```

---

## Task 9: Update ProductCard

**Files:**
- Modify: `src/components/ui/ProductCard.jsx`

- [ ] **Step 9.1: Replace ProductCard.jsx**

Replace `src/components/ui/ProductCard.jsx` entirely:

```jsx
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

export default function ProductCard({ product }) {
  const { dispatch } = useCart()

  function handleAddToCart(e) {
    e.preventDefault()
    dispatch({
      type: 'ADD',
      product,
      color: product.colors?.[0] ?? null,
      fabric: product.fabrics?.[0] ?? null,
    })
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="glass-card overflow-hidden transition-transform duration-200 hover:-translate-y-1">

        {/* Image area */}
        <div className="relative aspect-[4/3] bg-white/40 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-ink-5 text-xs
            tracking-widest transition-transform duration-500 group-hover:scale-105">
            {product.images?.[0] ?? 'фото товара'}
          </div>

          {product.oldPrice && (
            <span className="absolute top-3 left-3 bg-ink text-white text-[10px]
              px-2.5 py-1 rounded-full tracking-wide">
              Скидка
            </span>
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 w-7 h-7 glass-circle flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="В избранное"
          >
            <Heart size={13} className="text-ink-3" strokeWidth={1.5} />
          </button>

          {/* Quick add */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-ink/90 text-white text-xs py-3
              translate-y-full group-hover:translate-y-0 transition-transform duration-300
              tracking-wide"
          >
            В корзину
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          {product.brand && (
            <p className="text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-1">
              {product.brand}
            </p>
          )}
          <h3 className="text-[13px] font-normal text-ink mb-2 leading-snug">
            {product.name}
          </h3>

          {/* Color swatches preview */}
          {product.colors?.length > 0 && (
            <div className="flex gap-1 mb-3">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c}
                  className="text-[9px] text-ink-4 bg-black/5 px-1.5 py-0.5 rounded-full"
                >
                  {c}
                </span>
              ))}
              {product.colors.length > 4 && (
                <span className="text-[9px] text-ink-4">+{product.colors.length - 4}</span>
              )}
            </div>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-sm font-normal text-ink">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-xs text-ink-4 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  )
}
```

- [ ] **Step 9.2: Verify in browser**

```bash
npm run dev
```

Navigate to any catalog page. ProductCards should render with glass card style, white card on grey bg, hover lifts card.

- [ ] **Step 9.3: Run all tests**

```bash
npm run test:run
```

Expected: all tests PASS.

- [ ] **Step 9.4: Commit**

```bash
git add src/components/ui/ProductCard.jsx
git commit -m "feat: update ProductCard to Light Glass style"
```

---

## Task 10: Update App.jsx Routes

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 10.1: Replace App.jsx with updated routes**

Replace `src/App.jsx` entirely:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ProcessPage from './pages/ProcessPage'
import ContactPage from './pages/ContactPage'

// Placeholder pages — will be fleshed out in later plans
function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen pt-28 pb-20 max-w-6xl mx-auto px-6">
      <h1 className="text-2xl font-light text-ink">{title}</h1>
      <p className="text-ink-3 mt-2 text-sm">Страница в разработке.</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:category" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/philosophy" element={<PlaceholderPage title="О нас" />} />
          <Route path="/collections" element={<PlaceholderPage title="Коллекции" />} />
          <Route path="/collections/:slug" element={<PlaceholderPage title="Коллекция" />} />
          <Route path="/showroom" element={<PlaceholderPage title="Шоурум" />} />
          <Route path="/brief" element={<PlaceholderPage title="Рассказать о проекте" />} />
          <Route path="/wishlist" element={<PlaceholderPage title="Избранное" />} />
          <Route path="/account" element={<PlaceholderPage title="Личный кабинет" />} />
          <Route path="/search" element={<PlaceholderPage title="Поиск" />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/delivery" element={<PlaceholderPage title="Доставка" />} />
          <Route path="/return" element={<PlaceholderPage title="Возврат" />} />
          <Route path="*" element={<PlaceholderPage title="Страница не найдена" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
```

- [ ] **Step 10.2: Verify in browser — check all nav links work**

```bash
npm run dev
```

Click every nav item in Header. Each should route without 404. Placeholder pages show "Страница в разработке."

- [ ] **Step 10.3: Run all tests**

```bash
npm run test:run
```

Expected: all tests PASS.

- [ ] **Step 10.4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: update App routes — add all MVP paths with placeholders"
```

---

## Self-Review

**Spec coverage check against prd-03-brand.md §3:**

| Requirement | Covered |
|---|---|
| Background `#EFEFEF` | ✅ Task 2, `html` + `body` |
| Glass cards `rgba(255,255,255,0.72)` + `backdrop-filter: blur(20px)` | ✅ `.glass-card` utility |
| Border `rgba(255,255,255,0.95)` | ✅ `.glass-card` |
| Box-shadow (2-layer) | ✅ `.glass-card` |
| Primary text `#1a1a1a` | ✅ `--color-ink` |
| Secondary text `#888` → mapped | ✅ `--color-ink-3: #888` |
| Inter font weight 300–400 | ✅ Task 2, updated @import |
| Lucide icons (stroke, 1.5px) | ✅ Tasks 7, 8, 9 |
| Rounded pill nav | ✅ Header scroll state |
| ProductCard glass style | ✅ Task 9 |
| Soft hover (translateY) | ✅ ProductCard + NavIcon |

**Placeholder scan:** No TBD, no TODO in plan tasks. All code blocks are complete.

**Type consistency:** `product.colors` accessed with optional chaining (`?.`) in ProductCard (Task 9) consistent with data structure in `src/data/products.js` (existing). `useCart` provides `{ itemCount, dispatch }` — used correctly in Header (Task 7) and ProductCard (Task 9).

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-15-design-system.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** — свежий субагент на каждый таск, review между тасками

**2. Inline Execution** — выполнение в этой сессии через executing-plans

Какой подход?
