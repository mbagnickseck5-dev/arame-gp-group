import { AnimatePresence, motion } from 'framer-motion'
import { Clock, HeartHandshake, MapPin, Mail, Phone, Plus, ShieldCheck, Truck, X, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button, Flag, Logo, Reveal, SectionTitle, SmartImage, SocialIcon, WhatsAppIcon } from '../components/ui'
import { AGENCIES, CTA_IMAGE, DESTINATIONS, FAQ as FAQ_ITEMS, SITE, WHATSAPP_NUMBER } from '../config/site'
import { MSG, telLink, waLink } from '../lib/whatsapp'
import { NAV } from './Header'

/* ============ POINTS DE CONTACT ============ */
export function Contacts() {
  return (
    <section id="contact" className="section scroll-mt-20 bg-white">
      <div className="container-x">
        <SectionTitle eyebrow="Nos points de contact" title="Venez nous voir ou" accent="appelez-nous" sub="Trois points de contact à Dakar pour vous accueillir, déposer vos colis et préparer vos voyages." />
        <div className="grid gap-5 md:grid-cols-3">
          {AGENCIES.map((a, i) => (
            <Reveal key={a.name} i={i}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-royal-50 transition-transform duration-500 group-hover:scale-125" />
                <div className="relative flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-orange">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900">{a.name}</h3>
                    <div className="text-sm text-slate-500">{a.area}, Sénégal</div>
                  </div>
                </div>
                <ul className="relative mt-6 space-y-3">
                  {a.phones.map((p) => (
                    <li key={p}>
                      <a href={telLink(p)} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 transition hover:bg-royal-600 hover:text-white">
                        <span className="flex items-center gap-3 font-semibold tracking-wide">
                          <Phone className="h-4 w-4 text-royal-600 group-hover:text-current" /> {p}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-royal-600 shadow-sm">Appeler</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <div className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-gradient-to-r from-wa to-[#17944A] p-6 text-white sm:flex-row sm:p-8">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15">
                <WhatsAppIcon className="h-7 w-7" />
              </span>
              <div>
                <div className="text-lg font-semibold">WhatsApp principal</div>
                <div className="text-white/85">Le moyen le plus rapide pour obtenir une réponse.</div>
              </div>
            </div>
            <Button href={waLink(MSG.general)} variant="white" external className="w-full sm:w-auto">
              <WhatsAppIcon className="h-5 w-5 text-wa" /> Écrire sur WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============ POURQUOI NOUS ============ */
const REASONS = [
  { icon: ShieldCheck, t: 'Colis en sécurité', d: 'Chaque colis est manipulé avec soin et suivi jusqu’à sa remise.' },
  { icon: Truck, t: 'Livraison rapide porte à porte', d: 'Récupération et livraison directement chez vous, selon la destination.' },
  { icon: Zap, t: 'Service fiable', d: 'Des informations claires et des engagements tenus, à chaque départ.' },
  { icon: HeartHandshake, t: 'Accompagnement personnalisé', d: 'Une équipe humaine et disponible pour répondre à vos questions.' },
]

export function WhyUs() {
  return (
    <section className="section bg-slate-50">
      <div className="container-x">
        <SectionTitle eyebrow="Pourquoi nous choisir ?" title="Pourquoi choisir" accent="Arame GP Group ?" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.t} i={i}>
              <div className="group h-full rounded-3xl bg-white p-7 text-center shadow-card ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-royal-50 text-royal-600 transition-all duration-500 group-hover:bg-royal-600 group-hover:text-white">
                  <r.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-[17px] font-semibold text-navy-900">{r.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ FAQ ============ */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="section scroll-mt-20 bg-white">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="mb-3 inline-flex items-center gap-3 text-sm font-semibold text-brand-orange">
            <span className="h-px w-6 bg-brand-orange" /> FAQ
          </div>
          <h2 className="text-[28px] font-bold leading-tight tracking-tight text-navy-900 md:text-[40px]">
            Questions <span className="text-brand-orange">fréquentes</span>
          </h2>
          <p className="mt-4 text-slate-600">Départs, colis, réservations, contacts : l’essentiel en un coup d’œil. Une autre question ? Écrivez-nous.</p>
          <Button href={waLink('Bonjour Arame GP Group 👋, j’ai une question :')} variant="wa" external className="mt-7">
            <WhatsAppIcon /> Poser ma question
          </Button>
        </Reveal>
        <div className="space-y-3">
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} i={i * 0.5}>
                <div className={`rounded-2xl border transition-colors ${isOpen ? 'border-royal-500/30 bg-royal-50/60' : 'border-slate-200 bg-white'}`}>
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5">
                    <span className="text-[15px] font-semibold text-navy-900 sm:text-base">{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${isOpen ? 'bg-royal-600 text-white' : 'bg-slate-100 text-navy-900'}`}>
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="px-5 pb-5 text-[14px] leading-relaxed text-slate-600 sm:px-6">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ============ CTA FINAL ============ */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 md:py-24">
      <SmartImage src={CTA_IMAGE} alt="" className="!absolute inset-0" fallback="from-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,14,38,.72)_0%,rgba(5,14,38,.35)_55%,rgba(5,14,38,.15)_100%)]" />
      <div className="container-x relative text-center text-white">
        <Reveal>
          <h2 className="text-[30px] font-bold leading-tight md:text-5xl">
            Prêt à voyager ou <span className="text-brand-orange">à envoyer un colis ?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Contactez dès maintenant Arame GP Group et planifiez votre prochain départ en toute tranquillité.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={waLink(MSG.general)} variant="wa" external>
              <WhatsAppIcon /> Discuter sur WhatsApp
            </Button>
            <Button href="#demande" variant="ghostLight">
              Faire une demande guidée
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============ MENTIONS LÉGALES ============ */
function LegalModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', k)
      document.body.style.overflow = ''
    }
  }, [onClose])
  return (
    <motion.div className="fixed inset-0 z-[70] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal aria-label="Mentions légales">
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-9">
        <button onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-slate-100" aria-label="Fermer">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-navy-900">Mentions légales & confidentialité</h2>
        <div className="mt-5 space-y-4 text-[14px] leading-relaxed text-slate-600">
          <p><b className="text-navy-900">Éditeur :</b> Arame GP Group — Dakar, Sénégal. {/* ← compléter : forme juridique, NINEA, RCCM, responsable de publication */}Informations légales complètes communiquées sur demande.</p>
          <p><b className="text-navy-900">Contact :</b> {AGENCIES[0].phones[0]}{SITE.email && ` · ${SITE.email}`}</p>
          <p><b className="text-navy-900">Hébergement :</b> site hébergé par un prestataire d’hébergement web (Vercel ou Netlify).</p>
          <p><b className="text-navy-900">Données personnelles :</b> ce site ne collecte ni ne conserve aucune donnée personnelle. Le formulaire de demande génère uniquement un message que vous envoyez vous-même via WhatsApp. Les échanges sur WhatsApp sont soumis aux conditions de WhatsApp.</p>
          <p><b className="text-navy-900">Cookies :</b> aucun cookie de suivi n’est déposé par ce site.</p>
          <p><b className="text-navy-900">Crédits photos :</b> photographies d’illustration.</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============ FOOTER ============ */
export function Footer() {
  const [legal, setLegal] = useState(false)
  const socials = (Object.entries(SITE.socials) as [keyof typeof SITE.socials, string][]).filter(([, url]) => url)
  return (
    <footer className="bg-navy-950 pb-28 pt-16 text-white/70 sm:pb-10">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed">Voyages, envois de colis GP et livraison porte à porte entre le Sénégal, le Maroc, la Côte d’Ivoire et Dubaï.</p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-2">
              {socials.map(([n, url]) => (
                <a key={n} href={url} target="_blank" rel="noopener noreferrer" aria-label={n} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand-orange">
                  <SocialIcon name={n} />
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Liens utiles</h3>
          <ul className="space-y-2.5 text-[14px]">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} className="transition hover:text-brand-orange">{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Destinations</h3>
          <ul className="space-y-2.5 text-[14px]">
            {DESTINATIONS.map((d) => (
              <li key={d.code}>
                <a href={waLink(MSG.destination(d.name))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-brand-orange">
                  <Flag code={d.code} className="h-3 w-[18px]" /> {d.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Coordonnées</h3>
          <ul className="space-y-3 text-[14px]">
            {AGENCIES.map((a) => (
              <li key={a.name} className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <span>
                  <span className="font-medium text-white">{a.name}</span>
                  <br />
                  {a.phones.map((p, i) => (
                    <a key={p} href={telLink(p)} className="hover:text-brand-orange">{p}{i < a.phones.length - 1 ? ' · ' : ''}</a>
                  ))}
                </span>
              </li>
            ))}
            <li className="flex gap-3">
              <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-wa" />
              <a href={waLink(MSG.general)} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange">WhatsApp : +{WHATSAPP_NUMBER.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}</a>
            </li>
            {SITE.email && (
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            )}
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" /> Réponse rapide sur WhatsApp</li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] sm:flex-row">
        <span>© {new Date().getFullYear()} Arame GP Group. Tous droits réservés.</span>
        <button onClick={() => setLegal(true)} className="transition hover:text-brand-orange">Mentions légales & confidentialité</button>
      </div>
      <AnimatePresence>{legal && <LegalModal onClose={() => setLegal(false)} />}</AnimatePresence>
    </footer>
  )
}

/* ============ BOUTON WHATSAPP FLOTTANT ============ */
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  const [tip, setTip] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    const t = setTimeout(() => setTip(true), 6000)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(t)
    }
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.6 }} className="fixed bottom-5 right-5 z-40 flex items-end gap-3">
          <AnimatePresence>
            {tip && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="relative mb-2 hidden max-w-[220px] rounded-2xl bg-white p-3 pr-8 text-[13px] text-navy-900 shadow-lift sm:block">
                <b>Besoin d’aide ?</b> Écrivez-nous, on vous répond rapidement.
                <button onClick={() => setTip(false)} className="absolute right-2 top-2 text-slate-400" aria-label="Fermer"><X className="h-4 w-4" /></button>
              </motion.div>
            )}
          </AnimatePresence>
          <a href={waLink(MSG.general)} target="_blank" rel="noopener noreferrer" aria-label="Discuter sur WhatsApp" className="relative grid h-16 w-16 place-items-center rounded-full bg-wa text-white shadow-wa transition hover:scale-105">
            <span className="absolute inset-0 animate-ping rounded-full bg-wa opacity-30" />
            <WhatsAppIcon className="relative h-8 w-8" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
