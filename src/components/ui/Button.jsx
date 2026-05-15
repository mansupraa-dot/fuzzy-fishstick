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
