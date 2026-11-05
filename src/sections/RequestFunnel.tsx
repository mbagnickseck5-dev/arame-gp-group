import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowRightLeft, Check, Lock, Package, PlaneTakeoff } from 'lucide-react'
import { useState } from 'react'
import { Flag, Reveal, WhatsAppIcon } from '../components/ui'
import { DESTINATIONS, type CountryCode } from '../config/site'
import { buildRequestMessage, countryName, waLink, type RequestData } from '../lib/whatsapp'

const STEPS = ['Service', 'Trajet', 'Coordonnées', 'Envoi']

const initial: RequestData = { service: 'voyage', from: 'SN', to: 'MA', name: '', phone: '', date: '', extra: '', details: '' }

function CountrySelect({ label, value, onChange, exclude }: { label: string; value: CountryCode; onChange: (c: CountryCode) => void; exclude?: CountryCode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-navy-900">{label}</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {DESTINATIONS.map((d) => {
          const selected = value === d.code
          const disabled = exclude === d.code
          return (
            <button
              type="button"
              key={d.code}
              disabled={disabled}
              onClick={() => onChange(d.code)}
              aria-pressed={selected}
              className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-[13px] font-medium transition ${
                selected
                  ? 'border-royal-600 bg-royal-50 text-royal-600 ring-2 ring-royal-600/15'
                  : disabled
                    ? 'cursor-not-allowed border-slate-100 text-slate-300 opacity-50'
                    : 'border-slate-200 text-navy-900 hover:border-royal-400'
              }`}
            >
              <Flag code={d.code} className="h-4 w-6" /> <span className="truncate">{d.name}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy-900">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  )
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[16px] text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-royal-600 focus:ring-4 focus:ring-royal-600/10'

export default function RequestFunnel() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [data, setData] = useState<RequestData>(initial)
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState(false)

  const set = <K extends keyof RequestData>(k: K, v: RequestData[K]) => setData((d) => ({ ...d, [k]: v }))
  const phoneOk = data.phone.replace(/\D/g, '').length >= 8
  const nameOk = data.name.trim().length >= 2
  const canNext = step !== 2 || (phoneOk && nameOk)

  const go = (n: number) => {
    if (n > step && !canNext) {
      setTouched(true)
      return
    }
    setDir(n > step ? 1 : -1)
    setStep(n)
    document.getElementById('demande')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const setFrom = (c: CountryCode) => setData((d) => ({ ...d, from: c, to: d.to === c ? (c === 'SN' ? 'MA' : 'SN') : d.to }))
  const swap = () => setData((d) => ({ ...d, from: d.to, to: d.from }))

  const message = buildRequestMessage(data)

  const send = () => {
    window.open(waLink(message), '_blank', 'noopener,noreferrer')
    setSent(true)
    // Aucune donnée conservée : le formulaire est vidé après l'envoi.
    setTimeout(() => {
      setData(initial)
      setStep(0)
      setTouched(false)
    }, 400)
  }

  return (
    <section id="demande" className="section relative scroll-mt-20 overflow-hidden bg-navy-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(36,99,224,.55),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(247,147,30,.18),transparent_50%)]" />
      <div className="container-x relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* colonne gauche */}
        <Reveal className="text-white lg:pt-6">
          <div className="mb-3 inline-flex items-center gap-3 text-sm font-semibold text-brand-orange">
            <span className="h-px w-6 bg-brand-orange" /> Demande express
          </div>
          <h2 className="text-[30px] font-bold leading-tight tracking-tight md:text-[42px]">
            Votre demande prête <span className="text-brand-orange">en 1 minute</span>
          </h2>
          <p className="mt-4 max-w-md text-white/75">
            Répondez à quelques questions : nous préparons automatiquement votre message WhatsApp. Il ne vous reste qu’à l’envoyer.
          </p>
          <ol className="mt-8 space-y-4">
            {[
              ['Choisissez votre service', 'Voyage ou envoi de colis'],
              ['Indiquez votre trajet', 'Pays de départ et destination'],
              ['Ajoutez vos coordonnées', 'Nom, téléphone et détails'],
              ['Envoyez sur WhatsApp', 'Un conseiller vous répond'],
            ].map(([t, d], i) => (
              <li key={t} className="flex items-center gap-4">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold transition ${
                    i < step ? 'bg-wa text-white' : i === step ? 'bg-brand-orange text-white shadow-glow' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-white/60">{d}</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13px] text-white/80">
            <Lock className="h-4 w-4 text-brand-orange" /> Aucune donnée n’est enregistrée sur le site
          </div>
        </Reveal>

        {/* carte formulaire */}
        <Reveal i={1}>
          <div className="rounded-[28px] bg-white p-5 shadow-2xl sm:p-8">
            {/* progression */}
            <div className="mb-7">
              <div className="mb-2 flex justify-between text-[12px] font-medium text-slate-500">
                <span>
                  Étape {step + 1} / 4 · <span className="text-navy-900">{STEPS[step]}</span>
                </span>
                <span>{Math.round(((step + 1) / 4) * 100)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-royal-600 to-brand-orange" animate={{ width: `${((step + 1) / 4) * 100}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} />
              </div>
            </div>

            <div className="relative min-h-[360px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {step === 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-navy-900">Quel service vous intéresse ?</h3>
                      <p className="mt-1 text-sm text-slate-500">Sélectionnez une option pour continuer.</p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {(
                          [
                            { v: 'voyage', icon: PlaneTakeoff, t: 'Voyage', d: 'Réservation et accompagnement' },
                            { v: 'colis', icon: Package, t: 'Envoi de colis', d: 'GP, porte à porte' },
                          ] as const
                        ).map((o) => {
                          const sel = data.service === o.v
                          return (
                            <button
                              type="button"
                              key={o.v}
                              onClick={() => {
                                set('service', o.v)
                                set('extra', '')
                                setDir(1)
                                setStep(1)
                              }}
                              aria-pressed={sel}
                              className={`group relative flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all ${
                                sel ? 'border-royal-600 bg-royal-50' : 'border-slate-200 hover:-translate-y-0.5 hover:border-royal-400 hover:shadow-card'
                              }`}
                            >
                              <span className={`grid h-12 w-12 place-items-center rounded-xl ${sel ? 'bg-royal-600 text-white' : 'bg-royal-50 text-royal-600'}`}>
                                <o.icon className="h-6 w-6" />
                              </span>
                              <span className="mt-4 text-[17px] font-semibold text-navy-900">{o.t}</span>
                              <span className="text-sm text-slate-500">{o.d}</span>
                              {sel && (
                                <span className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-royal-600 text-white">
                                  <Check className="h-3.5 w-3.5" />
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                      <ul className="mt-6 grid gap-2.5 rounded-2xl bg-slate-50 p-5 text-[14px] text-slate-600">
                        {['Réponse d’un conseiller sur WhatsApp', 'Sans engagement, sans paiement en ligne', 'Aucune donnée enregistrée sur le site'].map((t) => (
                          <li key={t} className="flex items-center gap-2.5">
                            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-wa/15 text-wa-dark"><Check className="h-3 w-3" /></span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-navy-900">Quel est votre trajet ?</h3>
                        <p className="mt-1 text-sm text-slate-500">{data.service === 'voyage' ? 'Votre voyage' : 'Votre envoi de colis'}</p>
                      </div>
                      <CountrySelect label="Pays de départ" value={data.from} onChange={setFrom} />
                      <div className="flex justify-center">
                        <button type="button" onClick={swap} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-[13px] font-medium text-navy-900 hover:bg-royal-50" aria-label="Inverser départ et destination">
                          <ArrowRightLeft className="h-4 w-4 rotate-90 text-royal-600" /> Inverser
                        </button>
                      </div>
                      <CountrySelect label="Destination" value={data.to} onChange={(c) => set('to', c)} exclude={data.from} />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-navy-900">Vos coordonnées</h3>
                        <p className="mt-1 text-sm text-slate-500">Pour que notre équipe puisse vous recontacter.</p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Nom complet *">
                          <input className={`${inputCls} ${touched && !nameOk ? 'border-red-400' : ''}`} value={data.name} onChange={(e) => set('name', e.target.value)} placeholder="Ex. Aminata Diop" autoComplete="name" />
                        </Field>
                        <Field label="Téléphone *">
                          <input className={`${inputCls} ${touched && !phoneOk ? 'border-red-400' : ''}`} value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+221 77 000 00 00" inputMode="tel" autoComplete="tel" />
                        </Field>
                        <Field label={data.service === 'voyage' ? 'Date souhaitée' : 'Date d’envoi souhaitée'}>
                          <input className={inputCls} value={data.date} onChange={(e) => set('date', e.target.value)} placeholder="Ex. début décembre" />
                        </Field>
                        <Field label={data.service === 'voyage' ? 'Nombre de voyageurs' : 'Poids / taille estimés'}>
                          <input className={inputCls} value={data.extra} onChange={(e) => set('extra', e.target.value)} placeholder={data.service === 'voyage' ? 'Ex. 2 adultes' : 'Ex. 15 kg, 2 cartons'} />
                        </Field>
                      </div>
                      <Field label="Détails de la demande">
                        <textarea className={`${inputCls} min-h-[96px] resize-y`} value={data.details} onChange={(e) => set('details', e.target.value)} placeholder={data.service === 'voyage' ? 'Ville d’arrivée, besoins particuliers…' : 'Contenu du colis, livraison porte à porte souhaitée…'} />
                      </Field>
                      {touched && !canNext && <p className="text-sm font-medium text-red-500">Merci d’indiquer votre nom et un numéro de téléphone valide.</p>}
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="text-xl font-bold text-navy-900">Vérifiez votre message</h3>
                      <p className="mt-1 text-sm text-slate-500">Voici le message qui sera envoyé sur WhatsApp.</p>
                      <div className="mt-5 rounded-2xl bg-[#ECE5DD] p-4">
                        <div className="ml-auto max-w-[95%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-[#D9FDD3] p-4 text-[14px] leading-relaxed text-[#111B21] shadow-sm">
                          {message.replace(/\*/g, '')}
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-royal-50 px-3 py-1.5 font-medium text-royal-600">
                          <Flag code={data.from} className="h-3 w-[18px]" /> {countryName(data.from)} → <Flag code={data.to} className="h-3 w-[18px]" /> {countryName(data.to)}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* navigation */}
            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {step > 0 ? (
                <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                  <ArrowLeft className="h-4 w-4" /> Retour
                </button>
              ) : (
                <span className="hidden sm:block" />
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => go(step + 1)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-royal-600"
                >
                  Continuer <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={send}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-wa px-7 py-4 text-[15px] font-semibold text-white shadow-wa transition hover:-translate-y-0.5 hover:bg-wa-dark"
                >
                  <WhatsAppIcon /> Envoyer ma demande sur WhatsApp
                </button>
              )}
            </div>

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center gap-3 rounded-2xl bg-green-50 p-4 text-sm text-wa-dark"
                >
                  <Check className="h-5 w-5 shrink-0" />
                  <span>
                    WhatsApp s’est ouvert avec votre message. Il ne vous reste qu’à appuyer sur <b>Envoyer</b>.{' '}
                    <button className="underline" onClick={() => setSent(false)}>
                      Fermer
                    </button>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
