import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo, WhatsAppIcon } from '../components/ui'
import { MSG, waLink } from '../lib/whatsapp'

export const NAV = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#services', label: 'Services' },
  { href: '#departs', label: 'Départs' },
  { href: '#demande', label: 'Demande' },
  { href: '#contact', label: 'Contact' },
  { href: '#faq', label: 'FAQ' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach((n) => {
      const el = document.querySelector(n.href)
      if (el) obs.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 py-1.5 shadow-[0_8px_30px_-18px_rgba(10,26,63,.35)] backdrop-blur-xl' : 'bg-white py-2.5'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-4">
        <a href="#top" aria-label="Arame GP Group — accueil">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`relative rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${
                active === n.href ? 'text-royal-600' : 'text-navy-900/80 hover:text-royal-600'
              }`}
            >
              {n.label}
              {active === n.href && (
                <motion.span layoutId="nav-dot" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-royal-600" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink(MSG.booking)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-wa px-5 py-2.5 text-[14px] font-semibold text-white shadow-wa transition hover:-translate-y-0.5 hover:bg-wa-dark sm:inline-flex"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Réserver sur WhatsApp
          </a>
          <button
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full bg-royal-50 text-navy-900 lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-royal-50" aria-label="Fermer le menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                    className="rounded-2xl px-4 py-3.5 text-lg font-semibold text-navy-900 hover:bg-royal-50"
                  >
                    {n.label}
                  </motion.a>
                ))}
              </nav>
              <a
                href={waLink(MSG.booking)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-wa px-6 py-4 font-semibold text-white shadow-wa"
              >
                <WhatsAppIcon /> Réserver sur WhatsApp
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
