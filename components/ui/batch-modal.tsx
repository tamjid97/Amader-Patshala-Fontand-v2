'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xl p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] bg-white p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] dark:bg-[#071a13] border border-emerald-100 dark:border-emerald-800/50"
      >
        {/* Decorative Background Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-full max-w-md bg-emerald-400/20 blur-[80px] rounded-full"
        />

        <div className="relative z-10 max-h-[80vh] overflow-y-auto custom-scrollbar pr-2">
          {/* Header Area */}
          <div className="flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/20 text-emerald-600 dark:text-emerald-400 shadow-inner border border-emerald-200/50 dark:border-emerald-800/50">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h3
                id="feature-modal-title"
                className="text-2xl leading-relaxed font-extrabold text-slate-800 dark:text-emerald-50 text-balance"
              >
                {feature.title}
              </h3>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                {feature.subtitle}
              </p>
            </div>
            {/* Close Button */}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="বন্ধ করুন"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-all duration-300 hover:bg-red-50 hover:text-red-500 hover:rotate-90 dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-red-950/40 dark:hover:text-red-400 border border-transparent hover:border-red-200 dark:hover:border-red-900/50 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-slate-600 dark:text-emerald-100/80 text-justify">
            {feature.description}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {/* মূল সুবিধা Box */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 shadow-sm dark:bg-emerald-950/20 dark:border-emerald-800/50">
              <h4 className="flex items-center gap-2 text-[15px] font-bold text-emerald-700 dark:text-emerald-400">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                মূল সুবিধা
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {feature.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-emerald-100/90 font-medium"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* যা যা থাকছে Box */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:bg-[#05130e] dark:border-emerald-800/50">
              <h4 className="flex items-center gap-2 text-[15px] font-bold text-emerald-700 dark:text-emerald-400">
                <Package className="h-4 w-4" aria-hidden="true" />
                যা যা থাকছে
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {feature.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-emerald-100/90 font-medium"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] hover:shadow-emerald-500/50 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-[#071a13]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            বন্ধ করুন
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}