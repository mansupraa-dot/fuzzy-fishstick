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
