import { Link } from 'react-router-dom'
import Reveal from '../components/ui/Reveal'

export default function CTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="glass-card p-10 md:p-16 text-center">
            <h2 className="text-2xl font-light text-ink mb-4">
              Расскажите о проекте
            </h2>
            <p className="text-sm text-ink-3 mb-8">
              Оставьте контакт — свяжемся в течение дня.
            </p>
            <Link
              to="/brief"
              className="inline-block bg-ink text-white text-sm px-8 py-3 rounded-full hover:bg-ink/85 transition-colors"
            >
              Оставить заявку
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
