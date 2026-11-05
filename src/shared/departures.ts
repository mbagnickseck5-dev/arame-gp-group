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

export interface Departure {
  id: string
  from: CountryCode
  to: CountryCode
  type: (typeof DEPARTURE_TYPES)[number]
  /** Date au format AAAA-MM-JJ, ou null = « Date à annoncer » */
  date: string | null
  status: (typeof DEPARTURE_STATUSES)[number]
  /** Kilos disponibles (GP), facultatif */
  kilos?: number
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
  let kilos: number | undefined
  if (r.kilos !== undefined && r.kilos !== null && r.kilos !== '') {
    const k = Number(r.kilos)
    if (!Number.isFinite(k) || k < 0 || k > 100000) return { ok: false, error: 'Nombre de kilos invalide.' }
    kilos = Math.round(k)
  }
  const note = typeof r.note === 'string' ? r.note.trim().slice(0, 140) : ''
  return { ok: true, value: { from, to, type, date, status, ...(kilos !== undefined ? { kilos } : {}), ...(note ? { note } : {}) } }
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
