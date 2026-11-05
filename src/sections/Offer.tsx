import { ArrowUpRight, BellRing, CalendarClock, CalendarDays, Package, PlaneTakeoff, Route, Truck, Weight } from 'lucide-react'
import { Flag, Reveal, SectionTitle, SmartImage, WhatsAppIcon } from '../components/ui'
import { useEffect, useState } from 'react'
import { DEPARTURES_API, DESTINATIONS, PARCEL_IMAGE } from '../config/site'
import { formatDate, publicList, type Departure } from '../shared/departures'
import { STATUS, TYPE_LABEL } from '../lib/departureLabels'
import { MSG, countryName, waLink } from '../lib/whatsapp'

/* ============ DESTINATIONS ============ */
export function Destinations() {
  return (
    <section id="destinations" className="section bg-white">
      <div className="container-x">
        <SectionTitle
          eyebrow="Nos destinations"
          title="Découvrez nos"
          accent="principales lignes"
          sub="Voyages et envois de colis entre le Sénégal, le Maroc, la Côte d’Ivoire et Dubaï."
        />
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.code} i={i} className="w-[78%] shrink-0 snap-center sm:w-auto">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-slate-200/70 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="relative">
                  <SmartImage src={d.image} alt={`Voyage et colis vers ${d.name}`} art={d.code} className="aspect-[4/3.4] transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-navy-900 shadow">
                    <Flag code={d.code} /> {d.name}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-xs font-medium uppercase tracking-wider text-royal-600">{d.city}</div>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate-600">{d.blurb}</p>
                  <a
                    href={waLink(MSG.destination(d.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-3 text-[13px] font-semibold leading-tight text-white transition group-hover:bg-wa"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Demander des informations
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ SERVICES ============ */
const SERVICES = [
  { icon: PlaneTakeoff, title: 'Voyages et accompagnement', text: 'Organisation de votre voyage et accompagnement personnalisé, de la préparation jusqu’à l’arrivée.', name: 'Voyages et accompagnement' },
  { icon: Package, title: 'Envoi de colis GP', text: 'Acheminement de vos colis, effets personnels et marchandises entre nos destinations.', name: 'Envoi de colis GP' },
  { icon: Truck, title: 'Livraison porte à porte', text: 'Récupération et remise de vos colis directement à l’adresse indiquée, selon la destination.', name: 'Livraison porte à porte' },
  { icon: CalendarClock, title: 'Infos prochains départs', text: 'Recevez les dates de départ confirmées et réservez votre place ou votre envoi à temps.', name: 'Informations sur les prochains départs' },
]

export function Services() {
  return (
    <section id="services" className="section relative overflow-hidden bg-slate-50">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative">
            <SmartImage src={PARCEL_IMAGE} alt="Colis prêts à être acheminés" className="aspect-[4/4.4] rounded-[32px] shadow-lift" fallback="from-brand-orange via-brand-orange2 to-navy-800" />
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-navy-950/70 via-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/95 p-5 shadow-lift backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand-orange">
                  <Route className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-navy-900">Un seul interlocuteur</div>
                  <div className="text-xs text-slate-500">Pour vos voyages comme pour vos colis</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full bg-brand-orange/15 blur-2xl" />
          <div className="absolute -bottom-8 -right-8 -z-10 h-48 w-48 rounded-full bg-royal-500/15 blur-2xl" />
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <div className="mb-3 inline-flex items-center gap-3 text-sm font-semibold text-brand-orange">
              <span className="h-px w-6 bg-brand-orange" /> Nos services
            </div>
            <h2 className="text-[28px] font-bold leading-tight tracking-tight text-navy-900 md:text-[40px]">
              Tout pour voyager et <span className="text-brand-orange">expédier sereinement</span>
            </h2>
            <p className="mt-4 max-w-xl text-slate-600">Une équipe qui s’occupe de tout, avec un suivi clair à chaque étape.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} i={i}>
                <a
                  href={waLink(MSG.service(s.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-royal-500/40 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-royal-500 to-navy-800 text-white shadow-card transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-brand-orange" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{s.text}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ PROCHAINS DÉPARTS (gérés depuis /admin) ============ */

function useDepartures() {
  const [list, setList] = useState<Departure[] | null>(null)
  useEffect(() => {
    fetch(DEPARTURES_API)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setList(Array.isArray(d) ? publicList(d) : []))
      .catch(() => setList([]))
  }, [])
  return list
}

const DEST_IMAGE = Object.fromEntries(DESTINATIONS.map((d) => [d.code, d.image])) as Record<string, string>

function DepartureCard({ dep }: { dep: Departure }) {
  const T = TYPE_LABEL[dep.type]
  const S = STATUS[dep.status]
  const from = countryName(dep.from)
  const to = countryName(dep.to)
  const dateLabel = formatDate(dep.date)
  const full = dep.status === 'complet'
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-slate-200/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      {/* photo du pays de destination */}
      <div className="relative">
        <SmartImage src={DEST_IMAGE[dep.to]} alt={`Départ vers ${to}`} art={dep.to} className={`aspect-[16/10] transition-transform duration-700 group-hover:scale-105 ${full ? 'grayscale-[40%]' : ''}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold ring-1 ${S.cls}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" /> {S.label}
        </span>
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 text-white">
          <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold"><Flag code={dep.from} className="h-4 w-6" /> {from}</span>
          <span className="flex flex-1 items-center">
            <span className="h-px flex-1 border-t border-dashed border-white/60" />
            <PlaneTakeoff className="mx-1 h-4 w-4 text-brand-orange" />
            <span className="h-px flex-1 border-t border-dashed border-white/60" />
          </span>
          <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold">{to} <Flag code={dep.to} className="h-4 w-6" /></span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2.5 text-[15px]">
          <CalendarDays className="h-[18px] w-[18px] shrink-0 text-brand-orange" />
          <span className="font-semibold text-navy-900">{dateLabel ?? 'Date à annoncer'}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-medium">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-royal-50 px-3 py-1.5 text-royal-600">
            <T.icon className="h-3.5 w-3.5" /> {T.label}
          </span>
          {dep.kilos !== undefined && dep.type !== 'voyage' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-brand-orange2">
              <Weight className="h-3.5 w-3.5" /> {dep.kilos === 0 ? 'Plus de place' : `${dep.kilos.toLocaleString('fr-FR')} kg disponibles`}
            </span>
          )}
        </div>
        {dep.note && <p className="mt-3 text-[13px] leading-snug text-slate-500">{dep.note}</p>}
        <div className="flex-1" />
        {full ? (
          <a href={waLink(MSG.departure(from, to, dateLabel))} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-200">
            Être informé du prochain départ
          </a>
        ) : (
          <a
            href={waLink(MSG.departure(from, to, dateLabel))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-wa px-4 py-3 text-[13px] font-semibold text-white shadow-wa transition hover:-translate-y-0.5 hover:bg-wa-dark"
          >
            <WhatsAppIcon className="h-4 w-4" /> {dep.date ? 'Réserver ce départ' : 'Être informé du départ'}
          </a>
        )}
      </div>
    </article>
  )
}

export function Departures() {
  const list = useDepartures()
  return (
    <section id="departs" className="section bg-slate-50">
      <div className="container-x">
        <SectionTitle
          eyebrow="Prochains départs"
          title="Nos prochains"
          accent="départs"
          sub="Les dates publiées ici sont confirmées par notre équipe. Réservez votre place ou votre envoi directement sur WhatsApp."
        />
        {list === null ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[300px] animate-pulse rounded-3xl bg-white ring-1 ring-slate-200/70" />
            ))}
          </div>
        ) : list.length === 0 ? (
          <Reveal>
            <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl bg-white p-8 text-center shadow-card ring-1 ring-slate-200/70 sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand-orange">
                <BellRing className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-navy-900">Les prochaines dates arrivent bientôt</h3>
              <p className="mt-2 max-w-md text-[15px] text-slate-600">Écrivez-nous sur WhatsApp pour connaître le prochain départ sur votre ligne et réserver votre place.</p>
              <a href={waLink(MSG.booking)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-wa px-6 py-3.5 text-[15px] font-semibold text-white shadow-wa transition hover:-translate-y-0.5 hover:bg-wa-dark">
                <WhatsAppIcon /> Être informé des départs
              </a>
            </div>
          </Reveal>
        ) : (
          <div className={`grid gap-4 sm:grid-cols-2 ${list.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {list.map((dep, i) => (
              <Reveal key={dep.id} i={i}>
                <DepartureCard dep={dep} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
