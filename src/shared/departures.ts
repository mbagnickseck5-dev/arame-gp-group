/* Modèle partagé entre le site, l'espace admin et l'API (Netlify Functions). */

export const COUNTRY_CODES = ['SN', 'MA', 'CI', 'AE'] as const
export type CountryCode = (typeof COUNTRY_CODES)[number]

export const COUNTRY_NAMES: Record<CountryCode, string> = {
  SN: 'Sénégal',
  MA: 'Maroc',
  CI: "Côte d'Ivoire",
  AE: 'Dubaï',
}

export const DEPARTURE_TYPES = ['voyage', 'colis', 'mixte'] as const
export const DEPARTURE_STATUSES = ['ouvert', 'complet', 'bientot'] as const

export const CURRENCIES = ['FCFA', 'DH', 'AED', 'EUR'] as const
export type Currency = (typeof CURRENCIES)[number]

/** Devise proposée par défaut selon le pays de départ */
export const DEFAULT_CURRENCY: Record<CountryCode, Currency> = { SN: 'FCFA', CI: 'FCFA', MA: 'DH', AE: 'AED' }

/**
 * Normalise un numéro saisi par l'admin vers le format international sans « + ».
 * Accepte « +221 77 123 45 67 », « 00221771234567 », « 77 123 45 67 » (Sénégal), « 06 12 34 56 78 » (Maroc).
 */
export function normalizePhone(input: string): string | null {
  let d = input.replace(/\D/g, '')
  if (d.startsWith('00')) d = d.slice(2)
  if (d.length === 9 && /^[73]/.test(d)) d = '221' + d // Sénégal sans indicatif
  else if (d.length === 10 && /^0[5-7]/.test(d)) d = '212' + d.slice(1) // Maroc sans indicatif
  return d.length >= 10 && d.length <= 15 ? d : null
}

/** Ex. '221771234567' → '+221 77 123 45 67' */
export function formatPhone(digits: string) {
  if (digits.startsWith('221') && digits.length === 12) return `+221 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`
  if (digits.startsWith('212') && digits.length === 12) return `+212 ${digits.slice(3, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`
  return '+' + digits.replace(/(\d{3})(?=\d)/g, '$1 ').trim()
}

/** Ex. 5000, 'FCFA' → '5 000 FCFA / kg' */
export const formatPrice = (amount: number, currency: Currency) => `${amount.toLocaleString('fr-FR')} ${currency} / kg`

export interface Departure {
  id: string
  from: CountryCode
  to: CountryCode
  type: (typeof DEPARTURE_TYPES)[number]
  /** Date au format AAAA-MM-JJ, ou null = « Date à annoncer » */
  date: string | null
  status: (typeof DEPARTURE_STATUSES)[number]
  /** Prix du kilo pour les colis, facultatif */
  pricePerKg?: number
  currency?: Currency
  /** Agent responsable du départ (facultatif) */
  agentName?: string
  /** WhatsApp de l'agent, chiffres au format international (ex. 221771234567). Vide = numéro principal */
  agentPhone?: string
  note?: string
}

export type DepartureInput = Omit<Departure, 'id'>

/** Vérifie et nettoie une saisie. Renvoie un message d'erreur ou l'objet propre. */
export function validateDeparture(raw: unknown): { ok: true; value: DepartureInput } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Données invalides.' }
  const r = raw as Record<string, unknown>
  const from = r.from as CountryCode
  const to = r.to as CountryCode
  if (!COUNTRY_CODES.includes(from) || !COUNTRY_CODES.includes(to)) return { ok: false, error: 'Pays invalide.' }
  if (from === to) return { ok: false, error: 'Le départ et la destination doivent être différents.' }
  const type = r.type as Departure['type']
  if (!DEPARTURE_TYPES.includes(type)) return { ok: false, error: 'Type invalide.' }
  const status = r.status as Departure['status']
  if (!DEPARTURE_STATUSES.includes(status)) return { ok: false, error: 'Statut invalide.' }
  let date: string | null = null
  if (r.date) {
    if (typeof r.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(r.date) || isNaN(Date.parse(r.date)))
      return { ok: false, error: 'Date invalide.' }
    date = r.date
  }
  let price: { pricePerKg: number; currency: Currency } | undefined
  if (r.pricePerKg !== undefined && r.pricePerKg !== null && r.pricePerKg !== '') {
    const k = Number(r.pricePerKg)
    if (!Number.isFinite(k) || k <= 0 || k > 10_000_000) return { ok: false, error: 'Prix au kilo invalide.' }
    const currency = (CURRENCIES as readonly string[]).includes(r.currency as string) ? (r.currency as Currency) : DEFAULT_CURRENCY[from]
    price = { pricePerKg: Math.round(k * 100) / 100, currency }
  }
  let agentPhone: string | undefined
  if (typeof r.agentPhone === 'string' && r.agentPhone.trim()) {
    const p = normalizePhone(r.agentPhone)
    if (!p) return { ok: false, error: 'Numéro WhatsApp de l’agent invalide (ex. +221 77 123 45 67).' }
    agentPhone = p
  }
  const agentName = typeof r.agentName === 'string' ? r.agentName.trim().slice(0, 40) : ''
  const note = typeof r.note === 'string' ? r.note.trim().slice(0, 140) : ''
  return { ok: true, value: { from, to, type, date, status, ...(price && type !== 'voyage' ? price : {}), ...(agentName ? { agentName } : {}), ...(agentPhone ? { agentPhone } : {}), ...(note ? { note } : {}) } }
}

/** Ex. '2026-12-15' → 'Mardi 15 décembre 2026' */
export function formatDate(iso: string | null) {
  if (!iso) return null
  const d = new Date(iso + 'T12:00:00')
  const s = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const todayISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Liste publique : retire les départs passés, trie par date (dates à annoncer en dernier). */
export function publicList(list: Departure[]) {
  const today = todayISO()
  return list
    .filter((d) => !d.date || d.date >= today)
    .sort((a, b) => (a.date ?? '9999') .localeCompare(b.date ?? '9999'))
}
