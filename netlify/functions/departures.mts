import type { Config } from '@netlify/functions'
import { getStore } from '@netlify/blobs'
import { randomUUID } from 'node:crypto'
import { publicList, validateDeparture, type Departure } from '../../src/shared/departures.ts'
import { isAuthorized, json } from '../lib/auth.mts'

const KEY = 'departures'
const store = () => getStore({ name: 'arame-gp', consistency: 'strong' })

async function load(): Promise<Departure[]> {
  const data = await store().get(KEY, { type: 'json' })
  return Array.isArray(data) ? (data as Departure[]) : []
}
const save = (list: Departure[]) => store().setJSON(KEY, list)

export default async (req: Request) => {
  const url = new URL(req.url)

  if (req.method === 'GET') {
    const list = await load()
    if (url.searchParams.get('all') === '1') {
      if (!isAuthorized(req)) return json({ error: 'Non autorisé' }, 401)
      return json(list.sort((a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999')), 200, { 'cache-control': 'no-store' })
    }
    return json(publicList(list), 200, { 'cache-control': 'public, max-age=0, s-maxage=30' })
  }

  if (!isAuthorized(req)) return json({ error: 'Session expirée, reconnectez-vous.' }, 401)

  if (req.method === 'POST') {
    const v = validateDeparture(await req.json().catch(() => null))
    if (!v.ok) return json({ error: v.error }, 400)
    const list = await load()
    const item: Departure = { id: randomUUID(), ...v.value }
    list.push(item)
    await save(list)
    return json(item, 201)
  }

  const id = url.searchParams.get('id')
  if (!id) return json({ error: 'Identifiant manquant' }, 400)
  const list = await load()
  const idx = list.findIndex((d) => d.id === id)
  if (idx === -1) return json({ error: 'Départ introuvable' }, 404)

  if (req.method === 'PUT') {
    const v = validateDeparture(await req.json().catch(() => null))
    if (!v.ok) return json({ error: v.error }, 400)
    list[idx] = { id, ...v.value }
    await save(list)
    return json(list[idx])
  }

  if (req.method === 'DELETE') {
    list.splice(idx, 1)
    await save(list)
    return json({ ok: true })
  }

  return json({ error: 'Méthode non autorisée' }, 405)
}

export const config: Config = { path: '/api/departures' }
