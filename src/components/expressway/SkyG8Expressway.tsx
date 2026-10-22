import { Link } from 'react-router-dom'
import { T } from '@/components/i18n/T'
import { SKY_G8_EXPRESSWAY } from '@/lib/expresswayStrings'

export function SkyG8Expressway() {
  return (
    <section
      aria-label="Sky G8 Chemistry Expressway"
      className="relative overflow-hidden rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-surface to-teal-500/5 p-5 shadow-sm transition-all sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/15 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300">
            <span>⚡</span>
            <T value={SKY_G8_EXPRESSWAY.headerBadge} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
            <T value={SKY_G8_EXPRESSWAY.title} />
          </h2>
          <p className="max-w-2xl text-xs text-ink-soft sm:text-sm">
            <T value={SKY_G8_EXPRESSWAY.subtitle} />
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKY_G8_EXPRESSWAY.cards.map((card) => (
          <Link
            key={card.id}
            to={card.path}
            className="group flex flex-col justify-between rounded-xl border border-line bg-surface/90 p-4 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md dark:hover:border-teal-400"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-2xl" role="img" aria-hidden="true">
                  {card.icon}
                </span>
                <span className="rounded-md border border-line/80 bg-canvas/60 px-2 py-0.5 text-[11px] font-medium text-ink-soft">
                  <T value={card.badge} />
                </span>
              </div>
              <h3 className="text-base font-semibold text-ink group-hover:text-teal-600 dark:group-hover:text-teal-400">
                <T value={card.title} />
              </h3>
              <p className="text-xs leading-relaxed text-ink-soft">
                <T value={card.desc} />
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-end text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
              <T value={card.cta} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
