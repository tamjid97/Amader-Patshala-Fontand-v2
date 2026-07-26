'use client'

import { useEffect, useRef } from 'react'
import { Check, Package, Sparkles, X } from 'lucide-react'
import type { BatchFeature } from '@/lib/batch-features'


type FeatureModalProps = {
  feature: BatchFeature
  onClose: () => void
}

export function FeatureModal({ feature, onClose }: FeatureModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const Icon = feature.icon

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-modal-title"
    >
      <button
        type="button"
        aria-label="বন্ধ করুন"
        onClick={onClose}
        className="animate-in fade-in absolute inset-0 cursor-default bg-ink/70 backdrop-blur-md duration-200"
      />

      <div className="animate-in fade-in zoom-in-95 slide-in-from-bottom-4 relative w-full max-w-lg overflow-hidden rounded-3xl border border-background/70 bg-background/92 shadow-2xl backdrop-blur-2xl duration-300 sm:max-w-2xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-amber-from/50 blur-3xl"
        />

        <div className="relative max-h-[80vh] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-from to-amber-to text-ink shadow-md">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h3
                id="feature-modal-title"
                className="text-xl leading-relaxed font-bold text-brand text-balance sm:text-2xl"
              >
                {feature.title}
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {feature.subtitle}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="বন্ধ করুন"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground transition-colors hover:bg-brand hover:text-brand-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-5 leading-relaxed text-foreground/80">
            {feature.description}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-brand-soft/70 p-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-brand">
                <Sparkles className="size-4" aria-hidden="true" />
                মূল সুবিধা
              </h4>
              <ul className="mt-3 flex flex-col gap-2">
                {feature.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm leading-relaxed text-foreground/80"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-brand">
                <Package className="size-4" aria-hidden="true" />
                যা যা থাকছে
              </h4>
              <ul className="mt-3 flex flex-col gap-2">
                {feature.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-foreground/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-to"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3 text-base font-semibold text-brand-foreground shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <X className="size-4" aria-hidden="true" />
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  )
}
