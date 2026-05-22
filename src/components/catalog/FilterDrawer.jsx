import FilterSidebar from './FilterSidebar'

export default function FilterDrawer({
  isOpen,
  onClose,
  products,
  minPrice,
  maxPrice,
  activeColors,
  onPriceChange,
  onColorChange,
  onReset,
}) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-ink">Фильтры</p>
          <button onClick={onClose} className="text-xs text-ink-4 underline">
            Закрыть
          </button>
        </div>
        <FilterSidebar
          products={products}
          minPrice={minPrice}
          maxPrice={maxPrice}
          activeColors={activeColors}
          onPriceChange={onPriceChange}
          onColorChange={onColorChange}
          onReset={onReset}
        />
      </div>
    </>
  )
}
