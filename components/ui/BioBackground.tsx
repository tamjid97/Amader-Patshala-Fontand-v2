import { Atom, CircleDot, Dna, FlaskConical, FlaskRound, Hexagon, Microscope } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type BioElement = {
  Icon: LucideIcon
  /** left position in % */
  left: number
  /** top position in % */
  top: number
  /** icon size in px */
  size: number
  opacity: number
  /** glow + stroke color */
  color: string
  glow: string
  duration: number
  delay: number
  rotate: number
  animation: "float-slow" | "float-drift" | "float-sway"
}

// Deterministic (hand-tuned "random") placement so server and client markup match.
const ELEMENTS: BioElement[] = [
  {
    Icon: Dna,
    left: 6,
    top: 12,
    size: 96,
    opacity: 0.5,
    color: "oklch(0.58 0.2 295)",
    glow: "oklch(0.7 0.19 295 / 0.55)",
    duration: 14,
    delay: 0,
    rotate: -12,
    animation: "float-slow",
  },
  {
    Icon: Atom,
    left: 22,
    top: 68,
    size: 72,
    opacity: 0.42,
    color: "oklch(0.6 0.17 250)",
    glow: "oklch(0.72 0.16 250 / 0.5)",
    duration: 18,
    delay: 2.4,
    rotate: 8,
    animation: "float-drift",
  },
  {
    Icon: Microscope,
    left: 84,
    top: 20,
    size: 88,
    opacity: 0.38,
    color: "oklch(0.62 0.15 165)",
    glow: "oklch(0.74 0.15 165 / 0.5)",
    duration: 16,
    delay: 1.2,
    rotate: 10,
    animation: "float-sway",
  },
  {
    Icon: FlaskConical,
    left: 68,
    top: 78,
    size: 64,
    opacity: 0.4,
    color: "oklch(0.66 0.19 350)",
    glow: "oklch(0.76 0.18 350 / 0.5)",
    duration: 13,
    delay: 3.6,
    rotate: -6,
    animation: "float-slow",
  },
  {
    Icon: Hexagon,
    left: 44,
    top: 8,
    size: 56,
    opacity: 0.3,
    color: "oklch(0.6 0.17 250)",
    glow: "oklch(0.72 0.16 250 / 0.45)",
    duration: 20,
    delay: 0.8,
    rotate: 16,
    animation: "float-drift",
  },
  {
    Icon: CircleDot,
    left: 12,
    top: 44,
    size: 44,
    opacity: 0.28,
    color: "oklch(0.62 0.15 165)",
    glow: "oklch(0.74 0.15 165 / 0.45)",
    duration: 11,
    delay: 4.2,
    rotate: 0,
    animation: "float-sway",
  },
  {
    Icon: Dna,
    left: 92,
    top: 62,
    size: 64,
    opacity: 0.34,
    color: "oklch(0.66 0.19 350)",
    glow: "oklch(0.76 0.18 350 / 0.45)",
    duration: 17,
    delay: 2,
    rotate: 24,
    animation: "float-slow",
  },
  {
    Icon: FlaskRound,
    left: 34,
    top: 88,
    size: 52,
    opacity: 0.26,
    color: "oklch(0.58 0.2 295)",
    glow: "oklch(0.7 0.19 295 / 0.45)",
    duration: 15,
    delay: 5,
    rotate: -14,
    animation: "float-drift",
  },
  {
    Icon: Atom,
    left: 56,
    top: 38,
    size: 120,
    opacity: 0.18,
    color: "oklch(0.6 0.17 250)",
    glow: "oklch(0.72 0.16 250 / 0.35)",
    duration: 22,
    delay: 1.6,
    rotate: 6,
    animation: "float-sway",
  },
  {
    Icon: Microscope,
    left: 74,
    top: 46,
    size: 40,
    opacity: 0.3,
    color: "oklch(0.58 0.2 295)",
    glow: "oklch(0.7 0.19 295 / 0.45)",
    duration: 12,
    delay: 3,
    rotate: -8,
    animation: "float-slow",
  },
  {
    Icon: Hexagon,
    left: 4,
    top: 82,
    size: 68,
    opacity: 0.24,
    color: "oklch(0.62 0.15 165)",
    glow: "oklch(0.74 0.15 165 / 0.4)",
    duration: 19,
    delay: 4.6,
    rotate: -20,
    animation: "float-drift",
  },
  {
    Icon: CircleDot,
    left: 48,
    top: 58,
    size: 36,
    opacity: 0.26,
    color: "oklch(0.66 0.19 350)",
    glow: "oklch(0.76 0.18 350 / 0.4)",
    duration: 10,
    delay: 0.4,
    rotate: 0,
    animation: "float-sway",
  },
  {
    Icon: Dna,
    left: 30,
    top: 26,
    size: 48,
    opacity: 0.28,
    color: "oklch(0.6 0.17 250)",
    glow: "oklch(0.72 0.16 250 / 0.4)",
    duration: 16,
    delay: 5.4,
    rotate: 32,
    animation: "float-drift",
  },
  {
    Icon: FlaskConical,
    left: 62,
    top: 14,
    size: 40,
    opacity: 0.24,
    color: "oklch(0.62 0.15 165)",
    glow: "oklch(0.74 0.15 165 / 0.4)",
    duration: 13,
    delay: 2.8,
    rotate: 12,
    animation: "float-slow",
  },
]

export function BioBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      {/* soft color washes */}
      <div className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-chart-1/15 blur-3xl" />
      <div className="absolute -right-24 top-1/3 size-[24rem] rounded-full bg-chart-2/12 blur-3xl" />
      <div className="absolute bottom-[-8rem] left-1/4 size-[26rem] rounded-full bg-chart-3/10 blur-3xl" />

      {/* subtle grid */}
      <div className="bio-grid absolute inset-0" />

      {/* floating biology elements */}
      {ELEMENTS.map((el, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            opacity: el.opacity,
            animation: `${el.animation} ${el.duration}s ease-in-out ${el.delay}s infinite`,
          }}
        >
          <el.Icon
            size={el.size}
            strokeWidth={1.25}
            style={{
              color: el.color,
              transform: `rotate(${el.rotate}deg)`,
              filter: `drop-shadow(0 0 12px ${el.glow}) drop-shadow(0 0 28px ${el.glow})`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
