import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, CATEGORY_LABELS } from '../data/products'

function formatPrice(n) {
  return n.toLocaleString('ru-RU') + ' ₽'
}

// ─── Vision Pro floating product tag ─────────────────────────────────────────
function Tag({ productId, style, visible, delay = 0 }) {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) return null

  return (
    <Link
      to={`/product/${product.id}`}
      className={`absolute z-20 flex flex-col items-center pointer-events-auto select-none
        transition-all duration-600 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : '0ms' }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Pulsing hotspot dot */}
      <div className="relative mb-1.5 flex items-center justify-center">
        <div
          className="absolute w-5 h-5 rounded-full animate-ping"
          style={{ background: 'rgba(255,255,255,0.2)', animationDuration: '2.4s' }}
        />
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: 'white', boxShadow: '0 0 0 3px rgba(255,255,255,0.25)' }}
        />
      </div>

      {/* Thin connector line */}
      <div
        className="mb-1"
        style={{ width: '1px', height: '20px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0.05))' }}
      />

      {/* Glass card */}
      <div
        className="rounded-2xl px-3.5 py-3 min-w-[155px] max-w-[195px] cursor-pointer group/tag"
        style={{
          background: 'rgba(12, 12, 16, 0.52)',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          border: '0.5px solid rgba(255,255,255,0.22)',
          boxShadow:
            '0 16px 48px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.14)',
        }}
      >
        {/* Category label */}
        <p
          className="mb-1.5 font-medium"
          style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)' }}
        >
          {CATEGORY_LABELS[product.category]}
        </p>

        {/* Product name */}
        <p className="text-white text-sm font-medium leading-snug mb-2.5 truncate">
          {product.name}
        </p>

        {/* Price + arrow */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-white font-semibold text-sm tracking-tight">
            {formatPrice(product.price)}
          </span>
          <div
            className="flex items-center justify-center w-6 h-6 rounded-full transition-all group-hover/tag:scale-110"
            style={{
              background: 'rgba(255,255,255,0.13)',
              border: '0.5px solid rgba(255,255,255,0.22)',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '13px',
            }}
          >
            →
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── Room 1: Living room ──────────────────────────────────────────────────────
function LivingRoom() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Wall */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #EAE0D2 0%, #D5C9B6 100%)' }} />

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '40%', background: 'linear-gradient(to top, #A08A68, #BFAA82)' }} />
      <div className="absolute left-0 right-0" style={{ bottom: '40%', height: '2px', background: 'rgba(0,0,0,0.14)' }} />
      <div className="absolute left-0 right-0" style={{ bottom: '40%', height: '30px', background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)' }} />

      {/* Window */}
      <div className="absolute" style={{ top: '5%', right: '10%', width: '18%', height: '52%' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(175deg, #C0D8EC 0%, #B0CCEA 100%)', opacity: 0.7 }} />
        <div className="absolute inset-0" style={{ border: '5px solid #CBBEA8' }} />
        <div className="absolute top-0 bottom-0" style={{ left: '50%', width: '5px', background: '#CBBEA8', transform: 'translateX(-50%)' }} />
        <div className="absolute left-0 right-0" style={{ top: '50%', height: '5px', background: '#CBBEA8', transform: 'translateY(-50%)' }} />
        {/* Glass shimmer */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)' }} />
      </div>
      {/* Window light on floor */}
      <div className="absolute" style={{ bottom: 0, right: '7%', width: '23%', height: '40%', background: 'linear-gradient(165deg, rgba(255,238,200,0.24) 0%, transparent 70%)' }} />

      {/* Sofa */}
      <div className="absolute" style={{ bottom: '39%', left: '8%', width: '40%', height: '22%' }}>
        <div className="absolute top-0 left-0 right-0" style={{ height: '48%', background: 'linear-gradient(to bottom, #9E9082, #8C7E70)', borderRadius: '3px 3px 0 0' }} />
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '57%', background: '#7C7060' }}>
          <div className="absolute inset-1.5 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 h-full" style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '2px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }} />
            ))}
          </div>
        </div>
        <div className="absolute top-0 bottom-0 left-0" style={{ width: '7%', background: '#9E9082', borderRadius: '3px 0 0 0' }} />
        <div className="absolute top-0 bottom-0 right-0" style={{ width: '7%', background: '#9E9082', borderRadius: '0 3px 0 0' }} />
      </div>
      <div className="absolute" style={{ bottom: '36%', left: '9%', width: '37%', height: '5px', background: 'rgba(0,0,0,0.12)', filter: 'blur(5px)', borderRadius: '50%' }} />

      {/* Coffee table */}
      <div className="absolute" style={{ bottom: '39%', left: '52%', width: '13%' }}>
        <div style={{ height: '28px', background: '#58504A', borderRadius: '2px', boxShadow: '0 2px 8px rgba(0,0,0,0.28)' }} />
        <div className="flex justify-between" style={{ padding: '0 8px' }}>
          <div style={{ width: '3px', height: '10px', background: '#48403A' }} />
          <div style={{ width: '3px', height: '10px', background: '#48403A' }} />
        </div>
      </div>

      {/* Sideboard left */}
      <div className="absolute" style={{ bottom: '39%', left: 0, width: '7%', height: '31%', background: 'linear-gradient(to right, #706458, #686050)', boxShadow: '3px 0 10px rgba(0,0,0,0.18)' }}>
        <div className="absolute inset-1 flex flex-col gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(0,0,0,0.08)' }} />
          ))}
        </div>
      </div>

      {/* Rug */}
      <div className="absolute" style={{ bottom: '39%', left: '6%', width: '54%', height: '4px', background: 'rgba(140,118,90,0.42)', borderRadius: '2px' }} />

      {/* Painting on wall */}
      <div className="absolute" style={{ top: '10%', left: '22%', width: '20%', height: '28%', background: '#D2C4B0', border: '5px solid #C0B2A0', boxShadow: '2px 5px 15px rgba(0,0,0,0.2)' }}>
        <div className="absolute inset-1.5" style={{ background: 'linear-gradient(135deg, #8090A0, #607090, #7A8E7A)', opacity: 0.85 }} />
      </div>

      {/* Floor lamp */}
      <div className="absolute" style={{ bottom: '39%', right: '6%', width: '6px', height: '38%', background: '#7A7262', transform: 'translateX(-50%)' }} />
      <div className="absolute" style={{ bottom: '74%', right: '5.3%', width: '36px', height: '20px', background: 'linear-gradient(to bottom, #D4B870, #8A6830)', borderRadius: '50% 50% 40% 40%', transform: 'translateX(-50%)' }} />
      <div className="absolute" style={{ bottom: '55%', right: '1%', width: '10%', height: '24%', background: 'radial-gradient(ellipse at 40% 10%, rgba(255,218,130,0.2) 0%, transparent 70%)' }} />

      {/* Vignette + gradient */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 55% 45%, transparent 30%, rgba(0,0,0,0.32) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 30%, rgba(0,0,0,0.6) 100%)' }} />
    </div>
  )
}

// ─── Room 2: Lit interior ─────────────────────────────────────────────────────
function LightingRoom() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #1C1A18 0%, #242220 100%)' }} />
      <div className="absolute top-0 left-0 right-0" style={{ height: '30%', background: 'linear-gradient(to bottom, #2A2826, #1E1C1A)' }} />
      <div className="absolute left-0 right-0" style={{ top: '30%', height: '1px', background: 'rgba(255,255,255,0.04)' }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '36%', background: 'linear-gradient(to top, #141210, #1E1C1A)' }} />

      {/* Pendant light */}
      <div className="absolute" style={{ top: '5%', left: '50%', width: '1px', height: '20%', background: 'rgba(200,180,140,0.35)', transform: 'translateX(-50%)' }} />
      <div className="absolute" style={{ top: '23%', left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ width: '56px', height: '32px', background: 'linear-gradient(to bottom, #D4A850, #8C6828)', borderRadius: '50% 50% 35% 35%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 90%, rgba(255,220,140,0.7) 0%, transparent 60%)' }} />
      </div>
      {/* Pendant cone of light */}
      <div className="absolute" style={{ top: '28%', left: '25%', width: '50%', height: '56%', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,200,90,0.25) 0%, transparent 60%)' }} />

      {/* Track rail */}
      <div className="absolute" style={{ top: '4%', left: '10%', width: '80%', height: '5px', background: '#2E2C2A', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.06)' }} />
      {/* Track lights */}
      {[18, 36, 64, 82].map((pct, i) => (
        <div key={i} className="absolute" style={{ top: '4%', left: `${pct}%`, transform: 'translateX(-50%)' }}>
          <div style={{ width: '16px', height: '20px', background: '#343230', borderRadius: '2px 2px 7px 7px', border: '1px solid rgba(255,255,255,0.07)', marginTop: '3px' }} />
          <div style={{ position: 'absolute', top: '22px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `44px solid rgba(255,215,130,0.09)` }} />
        </div>
      ))}

      {/* Wall sconce */}
      <div className="absolute" style={{ top: '38%', left: '5%' }}>
        <div style={{ width: '18px', height: '28px', background: '#2E2C28', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '2px' }} />
        <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '24px solid transparent', borderRight: '24px solid transparent', borderBottom: '32px solid rgba(255,200,90,0.16)' }} />
      </div>

      {/* Dining table */}
      <div className="absolute" style={{ bottom: '35%', left: '28%', width: '44%', height: '7%', background: '#242018', borderRadius: '2px', boxShadow: '0 4px 24px rgba(0,0,0,0.6)' }} />
      {[34, 65].map((l, i) => (
        <div key={i} className="absolute" style={{ bottom: '22%', left: `${l}%`, width: '2%', height: '14%', background: '#1C1A16' }} />
      ))}
      {/* Table glow */}
      <div className="absolute" style={{ bottom: '36%', left: '32%', width: '36%', height: '7%', background: 'radial-gradient(ellipse at 50% 0%, rgba(255,200,100,0.14) 0%, transparent 70%)' }} />

      {/* Ambient light spots */}
      <div className="absolute" style={{ top: '20%', left: '15%', width: '20%', height: '30%', background: 'radial-gradient(ellipse, rgba(255,200,80,0.08) 0%, transparent 70%)' }} />
      <div className="absolute" style={{ top: '20%', right: '15%', width: '20%', height: '30%', background: 'radial-gradient(ellipse, rgba(255,200,80,0.08) 0%, transparent 70%)' }} />

      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 28%, rgba(0,0,0,0.55) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.72) 100%)' }} />
    </div>
  )
}

// ─── Room 3: Bathroom ─────────────────────────────────────────────────────────
function BathroomRoom() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, #D6D2CC 0%, #C8C4BE 100%)' }} />
      {/* Tile grid */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '38%', background: 'linear-gradient(to top, #AEAAA4, #C0BCB6)' }} />
      <div className="absolute left-0 right-0" style={{ bottom: '38%', height: '2px', background: 'rgba(0,0,0,0.12)' }} />
      <div className="absolute left-0 right-0" style={{ bottom: '38%', height: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.08), transparent)' }} />

      {/* Mirror / window */}
      <div className="absolute" style={{ top: '4%', right: '6%', width: '27%', height: '56%' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #C4D4DC, #B4C8D4)', opacity: 0.6 }} />
        <div className="absolute inset-0" style={{ border: '6px solid #B4AEA8' }} />
        <div className="absolute" style={{ inset: '6px', background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(200,220,230,0.08) 100%)' }} />
        <div className="absolute top-0 bottom-0" style={{ left: '50%', width: '6px', background: '#B4AEA8', transform: 'translateX(-50%)' }} />
      </div>

      {/* Bathtub */}
      <div className="absolute" style={{ bottom: '37%', left: '6%', width: '42%', height: '16%' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #F2EFEA, #E4E0DB)', borderRadius: '10px 10px 0 0', boxShadow: 'inset 0 4px 14px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.14)' }} />
        {/* Water / interior */}
        <div className="absolute" style={{ top: '18%', left: '5%', right: '5%', bottom: '14%', background: 'linear-gradient(to bottom, rgba(170,210,230,0.4), rgba(140,190,215,0.3))', borderRadius: '6px' }} />
        {/* Rim highlight */}
        <div className="absolute top-0 left-0 right-0" style={{ height: '3px', background: 'rgba(255,255,255,0.7)', borderRadius: '10px 10px 0 0' }} />
        {/* Legs */}
        {[10, 82].map((l, i) => (
          <div key={i} className="absolute" style={{ bottom: '-16%', left: `${l}%`, width: '5%', height: '16%', background: 'linear-gradient(to bottom, #C8C0B4, #B0A89C)', borderRadius: '0 0 3px 3px' }} />
        ))}
        {/* Faucet */}
        <div className="absolute" style={{ top: '-22%', right: '18%', width: '4%', height: '22%', background: '#B8B0A8', borderRadius: '2px 2px 0 0' }} />
        <div className="absolute" style={{ top: '-22%', right: '15.5%', width: '9%', height: '5%', background: '#B8B0A8', borderRadius: '2px' }} />
      </div>

      {/* Vanity */}
      <div className="absolute" style={{ bottom: '37%', right: '4%', width: '28%', height: '23%' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #EAE6E0, #DAD6D0)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          {[45, 68].map((t, i) => (
            <div key={i} className="absolute" style={{ top: `${t}%`, left: '8%', right: '8%', height: '1px', background: 'rgba(0,0,0,0.08)' }} />
          ))}
          {[36, 57, 79].map((t, i) => (
            <div key={i} className="absolute" style={{ top: `${t}%`, left: '46%', width: '8%', height: '3%', background: '#B4ACA4', borderRadius: '1px', transform: 'translateX(-50%)' }} />
          ))}
        </div>
        {/* Sink on top */}
        <div className="absolute" style={{ top: '-22%', left: '8%', right: '8%', height: '24%', background: 'linear-gradient(to bottom, #F0EDE8, #E4E0DA)', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.14), inset 0 2px 5px rgba(0,0,0,0.07)' }}>
          <div className="absolute" style={{ inset: '20%', background: 'rgba(0,0,0,0.04)', borderRadius: '3px' }} />
        </div>
        {/* Tap */}
        <div className="absolute" style={{ top: '-42%', left: '46%', width: '4%', height: '22%', background: 'linear-gradient(to right, #C0B8B0, #A8A09A)', borderRadius: '2px 2px 0 0', transform: 'translateX(-50%)' }} />
        <div className="absolute" style={{ top: '-43%', left: '40%', width: '12%', height: '4%', background: '#B4ACA4', borderRadius: '2px' }} />
      </div>

      {/* Towel rail */}
      <div className="absolute" style={{ top: '35%', left: '4%', width: '3px', height: '24%', background: '#B8B0A8' }} />
      <div className="absolute" style={{ top: '35%', left: '1.5%', width: '3%', height: '3px', background: '#B8B0A8', borderRadius: '1px' }} />
      <div className="absolute" style={{ top: '55%', left: '1.5%', width: '3%', height: '3px', background: '#B8B0A8', borderRadius: '1px' }} />
      {/* Towel */}
      <div className="absolute" style={{ top: '37%', left: '2%', width: '2%', height: '16%', background: 'rgba(220,210,200,0.8)', borderRadius: '1px' }} />

      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(0,0,0,0.28) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, transparent 25%, rgba(0,0,0,0.58) 100%)' }} />
    </div>
  )
}

// ─── Slides configuration ─────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 0,
    Room: LivingRoom,
    heading: 'Мебель для жизни',
    sub: 'Подобранная под пропорции вашего пространства',
    tags: [
      { productId: 3,  style: { left: '28%', top: '38%' }, delay: 200 },
      { productId: 7,  style: { left: '58%', top: '44%' }, delay: 380 },
      { productId: 6,  style: { left: '5%',  top: '32%' }, delay: 560 },
    ],
    cats: [
      { label: 'Диваны',  count: '3 модели', to: '/catalog/furniture?sub=sofas'  },
      { label: 'Кровати', count: '2 модели', to: '/catalog/furniture?sub=beds'   },
      { label: 'Столы',   count: '2 модели', to: '/catalog/furniture?sub=tables' },
    ],
  },
  {
    id: 1,
    Room: LightingRoom,
    heading: 'Архитектура света',
    sub: 'Техническое и декоративное освещение как единая система',
    tags: [
      { productId: 11, style: { left: '49%', top: '16%' }, delay: 200 },
      { productId: 8,  style: { left: '20%', top: '10%' }, delay: 380 },
      { productId: 13, style: { left: '8%',  top: '30%' }, delay: 560 },
    ],
    cats: [
      { label: 'Техническое',  count: '3 модели',     to: '/catalog/lighting?sub=technical'  },
      { label: 'Декоративное', count: '3 модели',     to: '/catalog/lighting?sub=decorative' },
      { label: 'Весь каталог', count: 'Смотреть все', to: '/catalog/lighting'                },
    ],
  },
  {
    id: 2,
    Room: BathroomRoom,
    heading: 'Точность деталей',
    sub: 'Сантехника без переплат за лейбл',
    tags: [
      { productId: 19, style: { left: '26%', top: '40%' }, delay: 200 },
      { productId: 16, style: { left: '77%', top: '32%' }, delay: 380 },
      { productId: 14, style: { left: '72%', top: '16%' }, delay: 560 },
    ],
    cats: [
      { label: 'Смесители', count: '2 модели', to: '/catalog/plumbing?sub=faucets'  },
      { label: 'Раковины',  count: '2 модели', to: '/catalog/plumbing?sub=sinks'    },
      { label: 'Ванны',     count: '2 модели', to: '/catalog/plumbing?sub=bathtubs' },
    ],
  },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), [])
  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => {
        const isActive = i === current
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-800 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* CSS room illustration */}
            <slide.Room />

            {/* Product tags — hidden on mobile */}
            <div className="absolute inset-0 hidden md:block pointer-events-none">
              {slide.tags.map((tag, ti) => (
                <Tag key={ti} {...tag} visible={isActive} />
              ))}
            </div>

            {/* Slide text */}
            <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
              <div className="max-w-6xl mx-auto px-6 w-full pb-[calc(4.5rem+1px)]">
                <h1
                  className={`text-4xl md:text-6xl font-light text-white tracking-tight leading-[1.1] max-w-xl
                    transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: isActive ? '100ms' : '0ms' }}
                >
                  {slide.heading}
                </h1>
                <p
                  className={`mt-3 text-white/60 text-base md:text-lg max-w-sm
                    transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: isActive ? '250ms' : '0ms' }}
                >
                  {slide.sub}
                </p>
              </div>

              {/* Category bar */}
              <div
                className="border-t pointer-events-auto"
                style={{
                  background: 'rgba(10,10,12,0.62)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderColor: 'rgba(255,255,255,0.09)',
                }}
              >
                <div className="max-w-6xl mx-auto px-6">
                  <div className="grid grid-cols-3">
                    {slide.cats.map((cat, ci) => (
                      <Link
                        key={cat.label}
                        to={cat.to}
                        className={`group flex flex-col justify-center py-4 px-4 md:px-6 transition-colors hover:bg-white/5
                          ${ci < 2 ? 'border-r' : ''}`}
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        <span className="text-white text-sm font-medium group-hover:text-accent transition-colors">
                          {cat.label}
                        </span>
                        <span className="text-white/35 text-xs mt-0.5">{cat.count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center text-white text-xl transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)' }}
        aria-label="Предыдущий"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center text-white text-xl transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)' }}
        aria-label="Следующий"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute z-20 flex gap-1.5" style={{ bottom: 'calc(4.5rem + 14px)', left: '50%', transform: 'translateX(-50%)' }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '24px' : '6px',
              height: '6px',
              background: i === current ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
            }}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
