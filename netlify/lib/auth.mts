import { createHmac, timingSafeEqual } from 'node:crypto'

/* Le mot de passe admin se règle dans Netlify : Site settings → Environment variables → ADMIN_PASSWORD */
const secret = () => {
  const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD
  if (!s) throw new Error('ADMIN_PASSWORD non configuré')
  return s
}

const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('base64url')

const TOKEN_DAYS = 7

export function createToken() {
  const exp = String(Date.now() + TOKEN_DAYS * 86_400_000)
  return `${exp}.${sign(exp)}`
}

export function checkPassword(input: unknown) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || typeof input !== 'string') return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export function isAuthorized(req: Request) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ?? ''
  const [exp, sig] = token.split('.')
  if (!exp || !sig || Number(exp) < Date.now()) return false
  try {
    const a = Buffer.from(sig)
    const b = Buffer.from(sign(exp))
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...headers } })
