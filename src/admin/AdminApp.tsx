import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeftRight, CalendarDays, Check, ExternalLink, Loader2, LogOut, Pencil, Plus, Trash2, X } from 'lucide-react'
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Flag, Logo } from '../components/ui'
import {
  COUNTRY_CODES,
  COUNTRY_NAMES,
  formatDate,
  todayISO,
  type CountryCode,
  type Departure,
  type DepartureInput,
} from '../shared/departures'
import { STATUS, TYPE_LABEL } from '../lib/departureLabels'

const API = '/api/departures'
const TOKEN_KEY = 'arame-admin-token'

const storage = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },
  set: (t: string | null) => {
    try {
      if (t) localStorage.setItem(TOKEN_KEY, t)
      else localStorage.removeItem(TOKEN_KEY)
    } catch {
      /* stockage indisponible : la session durera le temps de l'onglet */
    }
  },
}

async function api<T>(token: string | null, path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}), ...init.headers },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error((data as { error?: string }).error || 'Erreur réseau, réessayez.'), { status: res.status })
  return data as T
}

/* ======================= CONNEXION ======================= */
function Login({ onLogin }: { onLogin: (t: string) => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const { token } = await api<{ token: string }>(null, '/api/admin-login', { method: 'POST', body: JSON.stringify({ password }) })
      onLogin(token)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <div className="grid min-h-dvh place-items-center bg-navy-900 bg-[radial-gradient(ellipse_at_0%_0%,rgba(36,99,224,.5),transparent_55%)] p-5">
      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="w-full max-w-sm rounded-[28px] bg-white p-7 shadow-2xl">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-6 text-center text-xl font-bold text-navy-900">Espace administration</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Gérez les prochains départs affichés sur le site.</p>
        <label className="mt-6 block">
          <span className="mb-1.5 block text-sm font-semibold text-navy-900">Mot de passe</span>
          <input type="password" autoFocus autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[16px] outline-none focus:border-royal-600 focus:ring-4 focus:ring-royal-600/10" />
        </label>
        {error && <p className="mt-3 text-sm font-medium text-red-500">{error}</p>}
        <button disabled={busy || !password} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3.5 font-semibold text-white transition hover:bg-royal-600 disabled:opacity-50">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Se connecter
        </button>
      </motion.form>
    </div>
  )
}

/* ======================= FORMULAIRE ======================= */
const EMPTY: DepartureInput = { from: 'SN', to: 'MA', type: 'mixte', date: null, status: 'ouvert', note: '' }

function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { v: T; label: string }[] }) {
  return (
    <div className="grid gap-1 rounded-2xl bg-slate-100 p-1" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0,1fr))` }}>
      {options.map((o) => (
        <button type="button" key={o.v} onClick={() => onChange(o.v)} className={`rounded-xl px-2 py-2.5 text-[13px] font-semibold transition ${value === o.v ? 'bg-white text-royal-600 shadow' : 'text-slate-500'}`}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

function CountryPicker({ value, onChange, disabled }: { value: CountryCode; onChange: (c: CountryCode) => void; disabled?: CountryCode }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {COUNTRY_CODES.map((c) => (
        <button
          type="button"
          key={c}
          disabled={c === disabled}
          onClick={() => onChange(c)}
          className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-[14px] font-medium transition ${
            value === c ? 'border-royal-600 bg-royal-50 text-royal-600 ring-2 ring-royal-600/15' : c === disabled ? 'border-slate-100 opacity-40' : 'border-slate-200 text-navy-900'
          }`}
        >
          <Flag code={c} /> {COUNTRY_NAMES[c]}
        </button>
      ))}
    </div>
  )
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-navy-900">{label}</div>
      {children}
    </div>
  )
}

function DepartureForm({ initial, onCancel, onSave }: { initial: DepartureInput; onCancel: () => void; onSave: (d: DepartureInput) => Promise<void> }) {
  const [d, setD] = useState<DepartureInput>(initial)
  const isNew = initial === EMPTY
  const [noDate, setNoDate] = useState(!isNew && !initial.date)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const set = <K extends keyof DepartureInput>(k: K, v: DepartureInput[K]) => setD((x) => ({ ...x, [k]: v }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!noDate && !d.date) return setError('Choisissez une date ou cochez « Date à annoncer ».')
    setBusy(true)
    setError('')
    try {
      await onSave({ ...d, date: noDate ? null : d.date, status: noDate && d.status === 'ouvert' ? 'bientot' : d.status })
    } catch (err) {
      setError((err as Error).message)
      setBusy(false)
    }
  }

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onCancel} />
      <motion.form
        onSubmit={submit}
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        exit={{ y: 60 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[28px] bg-white p-5 pb-8 sm:rounded-[28px] sm:p-7"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-900">{isNew ? 'Nouveau départ' : 'Modifier le départ'}</h2>
          <button type="button" onClick={onCancel} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100" aria-label="Fermer"><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-5">
          <Block label="Départ">
            <CountryPicker value={d.from} onChange={(c) => setD((x) => ({ ...x, from: c, to: x.to === c ? (c === 'SN' ? 'MA' : 'SN') : x.to }))} />
          </Block>
          <div className="flex justify-center">
            <button type="button" onClick={() => setD((x) => ({ ...x, from: x.to, to: x.from }))} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-[13px] font-medium text-navy-900">
              <ArrowLeftRight className="h-4 w-4 rotate-90 text-royal-600" /> Inverser
            </button>
          </div>
          <Block label="Destination">
            <CountryPicker value={d.to} onChange={(c) => set('to', c)} disabled={d.from} />
          </Block>
          <Block label="Type">
            <Segmented value={d.type} onChange={(v) => set('type', v)} options={[{ v: 'voyage', label: 'Voyage' }, { v: 'colis', label: 'Colis' }, { v: 'mixte', label: 'Les deux' }]} />
          </Block>
          <Block label="Date du départ">
            <input type="date" min={todayISO()} disabled={noDate} value={d.date ?? ''} onChange={(e) => set('date', e.target.value || null)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[16px] text-navy-900 outline-none focus:border-royal-600 disabled:bg-slate-50 disabled:text-slate-400" />
            <label className="mt-3 flex items-center gap-3 text-[14px] text-slate-600">
              <input type="checkbox" checked={noDate} onChange={(e) => setNoDate(e.target.checked)} className="h-5 w-5 accent-royal-600" /> Date à annoncer (pas encore confirmée)
            </label>
          </Block>
          <Block label="Statut">
            <Segmented value={d.status} onChange={(v) => set('status', v)} options={[{ v: 'ouvert', label: 'Ouvert' }, { v: 'complet', label: 'Complet' }, { v: 'bientot', label: 'Bientôt' }]} />
          </Block>
          <Block label="Remarque (facultatif)">
            <input value={d.note ?? ''} maxLength={140} onChange={(e) => set('note', e.target.value)} placeholder="Ex. Dépôt des colis jusqu’au jeudi" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[16px] outline-none focus:border-royal-600" />
          </Block>
        </div>
        {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}
        <button disabled={busy} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wa px-6 py-4 font-semibold text-white shadow-wa transition hover:bg-wa-dark disabled:opacity-60">
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />} Publier sur le site
        </button>
      </motion.form>
    </motion.div>
  )
}

/* ======================= TABLEAU DE BORD ======================= */
function Row({ dep, past, onEdit, onDelete }: { dep: Departure; past?: boolean; onEdit: () => void; onDelete: () => void }) {
  const S = STATUS[dep.status]
  return (
    <div className={`rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-200/70 ${past ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-semibold text-navy-900">
            <Flag code={dep.from} /> {COUNTRY_NAMES[dep.from]} <span className="text-slate-400">→</span> <Flag code={dep.to} /> {COUNTRY_NAMES[dep.to]}
          </div>
          <div className="mt-2 flex items-center gap-2 text-[14px] text-slate-600">
            <CalendarDays className="h-4 w-4 text-brand-orange" /> {formatDate(dep.date) ?? 'Date à annoncer'}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]">
            <span className={`rounded-full px-2.5 py-1 font-semibold ring-1 ${S.cls}`}>{S.label}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">{TYPE_LABEL[dep.type].label}</span>
            {past && <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-500">Passé · masqué du site</span>}
          </div>
          {dep.note && <p className="mt-2 text-[13px] text-slate-500">{dep.note}</p>}
        </div>
        <div className="flex shrink-0 gap-1.5">
          <button onClick={onEdit} className="grid h-10 w-10 place-items-center rounded-full bg-royal-50 text-royal-600" aria-label="Modifier"><Pencil className="h-4 w-4" /></button>
          <button onClick={onDelete} className="grid h-10 w-10 place-items-center rounded-full bg-red-50 text-red-500" aria-label="Supprimer"><Trash2 className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  )
}

export default function AdminApp() {
  const [token, setToken] = useState<string | null>(() => storage.get())
  const [list, setList] = useState<Departure[] | null>(null)
  const [editing, setEditing] = useState<{ id?: string; data: DepartureInput } | null>(null)
  const [toast, setToast] = useState('')
  const [error, setError] = useState('')

  const logout = useCallback(() => {
    storage.set(null)
    setToken(null)
    setList(null)
  }, [])

  const handle = useCallback(
    (err: unknown) => {
      if ((err as { status?: number }).status === 401) logout()
      throw err
    },
    [logout],
  )

  const refresh = useCallback(async () => {
    if (!token) return
    try {
      setList(await api<Departure[]>(token, `${API}?all=1`).catch(handle))
      setError('')
    } catch (err) {
      setError((err as Error).message)
    }
  }, [token, handle])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2500)
    return () => clearTimeout(t)
  }, [toast])

  if (!token)
    return (
      <Login
        onLogin={(t) => {
          storage.set(t)
          setToken(t)
        }}
      />
    )

  const save = async (data: DepartureInput) => {
    if (editing?.id) await api(token, `${API}?id=${encodeURIComponent(editing.id)}`, { method: 'PUT', body: JSON.stringify(data) }).catch(handle)
    else await api(token, API, { method: 'POST', body: JSON.stringify(data) }).catch(handle)
    setEditing(null)
    setToast(editing?.id ? 'Départ mis à jour ✓' : 'Départ publié sur le site ✓')
    refresh()
  }

  const remove = async (dep: Departure) => {
    if (!confirm(`Supprimer le départ ${COUNTRY_NAMES[dep.from]} → ${COUNTRY_NAMES[dep.to]} ?`)) return
    try {
      await api(token, `${API}?id=${encodeURIComponent(dep.id)}`, { method: 'DELETE' }).catch(handle)
      setToast('Départ supprimé')
      refresh()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const today = todayISO()
  const upcoming = (list ?? []).filter((d) => !d.date || d.date >= today)
  const past = (list ?? []).filter((d) => d.date && d.date < today).reverse()

  return (
    <div className="min-h-dvh bg-slate-50 pb-32">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-2.5">
          <Logo />
          <div className="flex items-center gap-1.5">
            <a href="/" target="_blank" className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-navy-900" aria-label="Voir le site"><ExternalLink className="h-4 w-4" /></a>
            <button onClick={logout} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-navy-900" aria-label="Se déconnecter"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pt-7">
        <h1 className="text-2xl font-bold text-navy-900">Prochains départs</h1>
        <p className="mt-1 text-[14px] text-slate-500">Ce que vous publiez ici apparaît aussitôt sur le site. Les départs passés sont masqués automatiquement.</p>

        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}

        {list === null ? (
          <div className="mt-10 flex justify-center text-slate-400"><Loader2 className="h-6 w-6 animate-spin" /></div>
        ) : (
          <>
            <div className="mt-6 space-y-3">
              {upcoming.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-500">
                  Aucun départ publié pour le moment.<br />Appuyez sur « Ajouter un départ » pour commencer.
                </div>
              )}
              {upcoming.map((d) => (
                <Row key={d.id} dep={d} onEdit={() => setEditing({ id: d.id, data: { ...d } })} onDelete={() => remove(d)} />
              ))}
            </div>
            {past.length > 0 && (
              <>
                <h2 className="mt-10 text-sm font-semibold uppercase tracking-wider text-slate-400">Départs passés</h2>
                <div className="mt-3 space-y-3">
                  {past.map((d) => (
                    <Row key={d.id} dep={d} past onEdit={() => setEditing({ id: d.id, data: { ...d } })} onDelete={() => remove(d)} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent px-5 pb-6 pt-8">
        <button onClick={() => setEditing({ data: EMPTY })} className="mx-auto flex w-full max-w-3xl items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-4 font-semibold text-white shadow-lift transition hover:bg-royal-600">
          <Plus className="h-5 w-5" /> Ajouter un départ
        </button>
      </div>

      <AnimatePresence>{editing && <DepartureForm initial={editing.data} onCancel={() => setEditing(null)} onSave={save} />}</AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-28 left-1/2 z-[60] -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-900 px-5 py-3 text-sm font-medium text-white shadow-lift">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
