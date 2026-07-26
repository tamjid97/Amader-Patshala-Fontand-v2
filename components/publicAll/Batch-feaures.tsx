'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'


import { batchFeatures } from '@/lib/batch-features'
import { FeatureModal } from '../ui/batch-modal'

export function BatchFeatures() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeFeature = batchFeatures.find((item) => item.id === activeId)

  return (
    <section
      aria-labelledby="batch-features-title"
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <header className="flex flex-col items-center gap-3 text-center">
        <span className="rounded-full border border-brand/20 bg-brand-soft px-4 py-1 text-sm font-medium text-brand">
          যা যা পাচ্ছো এই ব্যাচে
        </span>
        <h2
          id="batch-features-title"
          className="text-4xl font-bold text-brand text-balance drop-shadow-sm sm:text-5xl"
          style={{ textShadow: '0 2px 12px oklch(0.53 0.135 156.5 / 0.22)' }}
        >
          ব্যাচ ফিচার
        </h2>
        <p className="max-w-xl leading-relaxed text-muted-foreground text-pretty">
          প্রতিটি ফিচারে ক্লিক করে বিস্তারিত জেনে নাও — কী কী থাকছে, কীভাবে
          সাহায্য করবে সব একসাথে।
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {batchFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <li key={feature.id}>
              <button
                type="button"
                onClick={() => setActiveId(feature.id)}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col items-start gap-4 rounded-2xl border border-amber-to/40 bg-gradient-to-br from-amber-from to-amber-to p-6 text-left shadow-[0_8px_20px_-8px_oklch(0.55_0.12_92/0.55)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-12px_oklch(0.55_0.12_92/0.7)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-background/70 text-brand shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block text-lg leading-relaxed font-bold text-ink text-balance">
                    {feature.title}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-ink/70">
                    {feature.subtitle}
                  </span>
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-brand">
                  বিস্তারিত দেখুন
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {activeFeature && (
        <FeatureModal
          feature={activeFeature}
          onClose={() => setActiveId(null)}
        />
      )}
    </section>
  )
}
