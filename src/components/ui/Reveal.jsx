import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function Reveal({ children, className = '', delay = 0 }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  )
}
