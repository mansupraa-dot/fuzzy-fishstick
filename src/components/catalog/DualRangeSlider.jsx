export default function DualRangeSlider({ min, max, valueMin, valueMax, onChange }) {
  const step = 1000
  const range = max - min || 1
  const pctMin = ((valueMin - min) / range) * 100
  const pctMax = ((valueMax - min) / range) * 100

  function handleMin(e) {
    const val = Math.min(Number(e.target.value), valueMax - step)
    onChange(val, valueMax)
  }

  function handleMax(e) {
    const val = Math.max(Number(e.target.value), valueMin + step)
    onChange(valueMin, val)
  }

  return (
    <div className="relative h-5 flex items-center">
      {/* Visual track */}
      <div className="absolute inset-x-0 h-[3px] bg-black/10 rounded-full">
        <div
          className="absolute h-full bg-ink rounded-full"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
        />
      </div>
      {/* Min thumb — invisible input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMin}
        onChange={handleMin}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ zIndex: valueMin > max - step ? 5 : 3 }}
      />
      {/* Max thumb — invisible input */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMax}
        onChange={handleMax}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        style={{ zIndex: 4 }}
      />
    </div>
  )
}
