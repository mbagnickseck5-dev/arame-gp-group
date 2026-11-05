import { motion, type Variants } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import type { CountryCode } from '../config/site'
import logoPng from '../assets/logo-arame-gp.png'

/* ---------- Logo (fichier officiel : src/assets/logo-arame-gp.png) ---------- */
export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  const img = <img src={logoPng} alt="Arame GP Group" width={800} height={420} className="h-[52px] w-auto sm:h-[60px]" />
  // Sur fond sombre (footer), le logo est posé sur une pastille blanche pour rester lisible.
  return light ? <span className={`inline-block rounded-2xl bg-white px-4 py-2.5 ${className}`}>{img}</span> : <span className={`inline-block ${className}`}>{img}</span>
}

/* ---------- Drapeaux (SVG, rendu identique sur tous les appareils) ---------- */
export function Flag({ code, className = 'h-4 w-6' }: { code: CountryCode; className?: string }) {
  const common = { viewBox: '0 0 30 20', className: `${className} rounded-[3px] shadow-sm ring-1 ring-black/10 shrink-0`, 'aria-hidden': true } as const
  switch (code) {
    case 'SN':
      return (
        <svg {...common}>
          <rect width="10" height="20" fill="#00853F" /><rect x="10" width="10" height="20" fill="#FDEF42" /><rect x="20" width="10" height="20" fill="#E31B23" />
          <path d="M15 6.6l.95 2.9h3.05l-2.47 1.8.94 2.9L15 12.4l-2.47 1.8.94-2.9-2.47-1.8h3.05z" fill="#00853F" />
        </svg>
      )
    case 'MA':
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#C1272D" />
          <path d="M15 5.5l2.6 8-6.8-4.95h8.4l-6.8 4.95z" fill="none" stroke="#006233" strokeWidth="1" />
        </svg>
      )
    case 'CI':
      return (
        <svg {...common}>
          <rect width="10" height="20" fill="#F77F00" /><rect x="10" width="10" height="20" fill="#fff" /><rect x="20" width="10" height="20" fill="#009E60" />
        </svg>
      )
    case 'AE':
      return (
        <svg {...common}>
          <rect width="30" height="6.67" fill="#00732F" /><rect y="6.67" width="30" height="6.67" fill="#fff" /><rect y="13.33" width="30" height="6.67" fill="#000" />
          <rect width="8" height="20" fill="#FF0000" />
        </svg>
      )
  }
}

/* ---------- Icônes de marques (absentes de Lucide) ---------- */
export function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.43 9.43 0 01-4.8-1.32l-.35-.2-3.57.93.96-3.48-.23-.36A9.4 9.4 0 012.6 12C2.6 6.8 6.84 2.56 12.06 2.56c2.53 0 4.9.99 6.69 2.78a9.39 9.39 0 012.76 6.68c0 5.2-4.24 9.45-9.46 9.45m8.05-17.5A11.33 11.33 0 0012.05.67C5.78.67.67 5.77.67 12.04c0 2 .53 3.96 1.52 5.69L.58 23.6l6.01-1.58a11.33 11.33 0 005.45 1.39h.01c6.27 0 11.37-5.1 11.38-11.37 0-3.04-1.18-5.9-3.33-8.04" />
    </svg>
  )
}

export function SocialIcon({ name, className = 'h-4 w-4' }: { name: 'facebook' | 'instagram' | 'tiktok'; className?: string }) {
  const paths = {
    facebook: 'M13.5 22v-8.2h2.75l.41-3.2H13.5V8.56c0-.93.26-1.56 1.59-1.56h1.7V4.14A22.7 22.7 0 0014.31 4C11.86 4 10.2 5.49 10.2 8.24v2.36H7.44v3.2h2.76V22h3.3z',
    instagram: 'M12 7.38a4.62 4.62 0 100 9.24 4.62 4.62 0 000-9.24zm0 7.62a3 3 0 110-6 3 3 0 010 6zm5.88-7.81a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0zM21.94 8.3c-.07-1.47-.4-2.78-1.48-3.86S18.07 3.03 16.6 2.96C15.08 2.87 8.92 2.87 7.4 2.96 5.94 3.03 4.63 3.36 3.54 4.44S2.13 6.83 2.06 8.3c-.09 1.52-.09 7.68 0 9.2.07 1.47.4 2.78 1.48 3.86s2.39 1.41 3.86 1.48c1.52.09 7.68.09 9.2 0 1.47-.07 2.78-.4 3.86-1.48s1.41-2.39 1.48-3.86c.09-1.52.09-7.68 0-9.2z',
    tiktok: 'M16.6 5.82A4.28 4.28 0 0115.54 3h-3.09v12.4a2.59 2.59 0 01-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 004.3 1.38V7.3s-1.88.09-3.24-1.48z',
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={paths[name]} />
    </svg>
  )
}

/* ---------- Image avec repli élégant ---------- */
const ART_BG: Record<CountryCode, string> = {
  SN: 'from-[#F9A23B] via-[#E0602A] to-[#4A1B3D]',
  MA: 'from-[#F2B26B] via-[#C8553D] to-[#3B1E4F]',
  CI: 'from-[#5FC28A] via-[#1F7A5C] to-[#0E2558]',
  AE: 'from-[#7FB2FF] via-[#2463E0] to-[#0A1A3F]',
}

/** Illustration de repli (silhouette de paysage) quand la photo n'est pas disponible. */
function Landmark({ code }: { code: CountryCode }) {
  const sil = 'rgba(10,20,50,.55)'
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <circle cx="140" cy="70" r="26" fill="#fff" opacity=".35" />
      <path d="M0 165 Q50 150 100 160 T200 155 V200 H0z" fill={sil} opacity=".5" />
      {code === 'SN' && (
        <g fill={sil}>
          <path d="M70 200V120c-4-2-14-8-30-6 12-6 22-4 28 0-6-10-20-14-34-12 16-8 30-2 36 8 0-12-8-22-20-26 16 0 24 12 26 24 4-12 16-20 30-20-12 6-20 16-22 26 8-8 22-10 34-4-14 0-24 6-28 12 14-4 26 0 32 6-14-4-26-2-32 4v88z" />
          <rect x="128" y="132" width="40" height="68" rx="2" />
        </g>
      )}
      {code === 'MA' && (
        <g fill={sil}>
          <rect x="88" y="62" width="30" height="138" />
          <rect x="96" y="44" width="14" height="20" />
          <path d="M103 30l3 14h-6z" />
          <rect x="20" y="150" width="60" height="50" />
          <rect x="125" y="140" width="70" height="60" />
        </g>
      )}
      {code === 'CI' && (
        <g fill={sil}>
          <path d="M60 200v-50h80v50z" />
          <path d="M70 150a30 30 0 0160 0z" />
          <rect x="97" y="96" width="6" height="26" />
          <path d="M28 200l4-70M32 130c-10-4-20 0-26 6 8-2 16 0 26-6-6-8-16-10-24-8 10 0 18 4 24 8 2-10 10-14 18-14-8 4-12 10-14 14 8-4 16-2 22 2-8-2-16 0-24 6z" stroke={sil} strokeWidth="3" />
          <rect x="150" y="120" width="22" height="80" />
          <rect x="176" y="140" width="20" height="60" />
        </g>
      )}
      {code === 'AE' && (
        <g fill={sil}>
          <path d="M98 200V70l2-40 2 40v130z" />
          <path d="M92 200V100h16v100z" />
          <rect x="30" y="140" width="22" height="60" />
          <rect x="56" y="120" width="18" height="80" />
          <rect x="124" y="130" width="20" height="70" />
          <rect x="148" y="110" width="16" height="90" />
          <rect x="168" y="150" width="24" height="50" />
        </g>
      )}
    </svg>
  )
}

export function SmartImage({
  src, alt, className = '', fallback = 'from-royal-600 via-navy-800 to-navy-950', eager = false, art,
}: { src: string; alt: string; className?: string; fallback?: string; eager?: boolean; art?: CountryCode }) {
  const [ok, setOk] = useState(Boolean(src))
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${art ? ART_BG[art] : fallback} ${className}`}>
      {!ok && art && <Landmark code={art} />}
      {!ok && !art && (
        <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
          <defs>
            <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.4" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      )}
      {ok && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  )
}

/* ---------- Animations ---------- */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
}

export function Reveal({ children, i = 0, className = '' }: { children: ReactNode; i?: number; className?: string }) {
  return (
    <motion.div variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className={className}>
      {children}
    </motion.div>
  )
}

export function SectionTitle({ eyebrow, title, accent, sub, light = false }: { eyebrow: string; title: string; accent?: string; sub?: string; light?: boolean }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
      <div className="mb-3 inline-flex items-center gap-3 text-sm font-semibold text-brand-orange">
        <span className="h-px w-6 bg-brand-orange" />
        {eyebrow}
        <span className="h-px w-6 bg-brand-orange" />
      </div>
      <h2 className={`text-[28px] font-bold leading-tight tracking-tight md:text-[40px] ${light ? 'text-white' : 'text-navy-900'}`}>
        {title} {accent && <span className="text-brand-orange">{accent}</span>}
      </h2>
      {sub && <p className={`mt-4 text-[15px] leading-relaxed md:text-base ${light ? 'text-white/70' : 'text-slate-600'}`}>{sub}</p>}
    </Reveal>
  )
}

/* ---------- Boutons ---------- */
type BtnProps = { href: string; children: ReactNode; variant?: 'wa' | 'orange' | 'white' | 'outline' | 'ghostLight'; className?: string; external?: boolean; onClick?: () => void }
export function Button({ href, children, variant = 'wa', className = '', external, onClick }: BtnProps) {
  const styles = {
    wa: 'bg-wa text-white shadow-wa hover:bg-wa-dark',
    orange: 'bg-gradient-to-r from-brand-orange to-brand-orange2 text-white shadow-glow hover:brightness-105',
    white: 'bg-white text-navy-900 shadow-card hover:bg-royal-50',
    outline: 'border border-royal-600/25 bg-white text-royal-600 hover:border-royal-600 hover:bg-royal-50',
    ghostLight: 'border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20',
  }[variant]
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${styles} ${className}`}
    >
      {children}
    </a>
  )
}
