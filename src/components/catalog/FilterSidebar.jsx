import { COLOR_MAP } from '../../data/colors'
import DualRangeSlider from './DualRangeSlider'

export default function FilterSidebar({
  products,
  minPrice,
  maxPrice,
  activeColors,
  onPriceChange,
  onColorChange,
  onReset,
}) {
  const globalMin = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0
  const globalMax = products.length > 0 ? Math.max(...products.map(p => p.price)) : 0
  const uniqueColors = [...new Set(products.flatMap(p => p.colors ?? []))]
  const hasActiveFilter =
    minPrice !== globalMin || maxPrice !== globalMax || activeColors.length > 0

  function toggleColor(color) {
    if (activeColors.includes(color)) {
      onColorChange(activeColors.filter(c => c !== color))
    } else {
      onColorChange([...activeColors, color])
    }
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-ink-4 mb-4">Цена</p>
      <DualRangeSlider
        min={globalMin}
        max={globalMax}
        valueMin={minPrice}
        valueMax={maxPrice}
        onChange={onPriceChange}
      />
      <div className="flex justify-between mt-2">
        <span className="text-xs text-ink-3">{minPrice.toLocaleString('ru-RU')} ₽</span>
        <span className="text-xs text-ink-3">{maxPrice.toLocaleString('ru-RU')} ₽</span>
      </div>

      {uniqueColors.length > 0 && (
        <>
          <p className="text-xs uppercase tracking-widest text-ink-4 mb-4 mt-6">Цвет</p>
          <div className="flex flex-wrap gap-2">
            {uniqueColors.map(color => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                title={color}
                aria-label={color}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  activeColors.includes(color) ? 'border-ink' : 'border-transparent'
                }`}
                style={{ backgroundColor: COLOR_MAP[color] ?? '#E5E7EB' }}
              />
            ))}
          </div>
        </>
      )}

      {hasActiveFilter && (
        <button
          onClick={onReset}
          className="text-xs text-ink-4 underline underline-offset-2 hover:text-ink mt-6 block"
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  )
}
