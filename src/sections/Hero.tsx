import { motion } from 'framer-motion'
import { ArrowRight, Headphones, PackageCheck, Plane, ShieldCheck } from 'lucide-react'
import { Button, Flag, SmartImage, WhatsAppIcon } from '../components/ui'
import { DESTINATIONS, HERO_IMAGE } from '../config/site'
import { MSG, waLink } from '../lib/whatsapp'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section id="top" className="relative pt-[72px] sm:pt-[80px]">
      <div className="relative overflow-hidden bg-navy-900">
        {/* fond */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,#1652C8_0%,transparent_55%),radial-gradient(ellipse_at_90%_100%,#14306F_0%,transparent_60%)]" />
        <SmartImage src={HERO_IMAGE} alt="" eager className="!absolute inset-0 opacity-45" fallback="from-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-navy-900/20" />

        {/* trajectoire animée */}
        <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1400 700" preserveAspectRatio="none" aria-hidden>
          <motion.path
            d="M-40 690 C 360 640, 640 690, 900 420 S 1300 120, 1460 80"
            fill="none"
            stroke="#F7931E"
            strokeWidth="2"
            strokeDasharray="2 12"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.3 }}
          />
        </svg>

        <div className="container-x relative grid items-center gap-12 pb-28 pt-12 md:pt-16 lg:grid-cols-[1.02fr_1fr] lg:pb-36 lg:pt-20">
          {/* texte */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-4 py-1.5 text-[13px] font-semibold text-white shadow-glow"
            >
              <Plane className="h-3.5 w-3.5" /> Voyages · Colis GP · Porte à porte
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="mt-6 text-[38px] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[60px]"
            >
              Vos voyages et colis, <span className="text-brand-orange">entre de bonnes mains.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.22 }}
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/80 md:text-lg"
            >
              Voyagez et envoyez vos colis entre le Sénégal, le Maroc et plusieurs destinations internationales avec Arame GP Group.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.34 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="#services" variant="orange">
                Découvrir nos services <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={waLink(MSG.general)} variant="white" external>
                <WhatsAppIcon className="h-5 w-5 text-wa" /> Contacter sur WhatsApp
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-white/70"
            >
              <span className="font-medium text-white/90">Nos lignes :</span>
              {DESTINATIONS.map((d) => (
                <span key={d.code} className="inline-flex items-center gap-1.5">
                  <Flag code={d.code} className="h-3 w-[18px]" /> {d.name}
                </span>
              ))}
            </motion.div>
          </div>

          {/* collage destinations */}
          <div className="relative">

            <div className="relative grid h-[320px] grid-cols-4 gap-2 sm:h-[400px] lg:h-[470px]">
              {DESTINATIONS.map((d, i) => (
                <motion.div
                  key={d.code}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl ring-1 ring-white/15"
                  style={{ marginTop: `${[24, 0, 36, 10][i]}px`, marginBottom: `${[16, 40, 0, 28][i]}px` }}
                >
                  <SmartImage src={d.image} alt={`Destination ${d.name}`} eager art={d.code} className="h-full w-full transition-transform duration-[1.4s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-3 flex flex-col items-center gap-1.5 px-1 text-center">
                    <Flag code={d.code} className="h-4 w-6" />
                    <span className="hidden text-[10px] font-semibold leading-tight text-white min-[420px]:block sm:text-xs">{d.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* cartes flottantes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6, ease }}
              className="absolute -bottom-6 -left-4 z-20 hidden items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lift backdrop-blur sm:flex lg:-left-8"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal-100 text-royal-600">
                <PackageCheck className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-navy-900">Colis en sécurité</div>
                <div className="text-xs text-slate-500">Suivi jusqu’à la livraison</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.6, ease }}
              className="absolute -right-4 top-[62%] z-20 hidden items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-lift backdrop-blur md:flex"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-green-50 text-wa">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-navy-900">Réponse rapide</div>
                <div className="text-xs text-slate-500">Équipe sur WhatsApp</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* vague */}
        <svg className="absolute -bottom-px left-0 w-full text-slate-50" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
          <path d="M0 60V30C240 0 480 0 720 22s480 30 720 0v38z" fill="currentColor" />
        </svg>
      </div>

      {/* barre de confiance */}
      <div className="container-x relative z-10 -mt-16 lg:-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-slate-200/70 shadow-lift ring-1 ring-slate-200 lg:grid-cols-4"
        >
          {[
            { icon: ShieldCheck, t: 'Fiabilité & sécurité', d: 'Vos colis manipulés avec soin' },
            { icon: Plane, t: '4 destinations', d: 'Sénégal, Maroc, Côte d’Ivoire, Dubaï' },
            { icon: PackageCheck, t: 'Porte à porte', d: 'Récupération et livraison' },
            { icon: Headphones, t: 'Support réactif', d: 'Une équipe sur WhatsApp' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-3 bg-white p-4 sm:p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal-50 text-royal-600">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[14px] font-semibold text-navy-900 sm:text-[15px]">{t}</div>
                <div className="mt-0.5 text-[12px] leading-snug text-slate-500 sm:text-[13px]">{d}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
