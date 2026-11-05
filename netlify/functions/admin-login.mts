import type { Config } from '@netlify/functions'
import { checkPassword, createToken, json } from '../lib/auth.mts'

export default async (req: Request) => {
  if (req.method !== 'POST') return json({ error: 'Méthode non autorisée' }, 405)
  if (!process.env.ADMIN_PASSWORD) return json({ error: 'Mot de passe admin non configuré sur Netlify.' }, 500)
  const body = await req.json().catch(() => ({}))
  if (!checkPassword((body as { password?: unknown }).password)) {
    await new Promise((r) => setTimeout(r, 800)) // ralentit les essais en série
    return json({ error: 'Mot de passe incorrect.' }, 401)
  }
  return json({ token: createToken() })
}

export const config: Config = { path: '/api/admin-login' }
