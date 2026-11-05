import { DESTINATIONS, WHATSAPP_NUMBER, type CountryCode } from '../config/site'

export const countryName = (code: CountryCode) =>
  DESTINATIONS.find((d) => d.code === code)?.name ?? code

/** Construit un lien wa.me avec un message prérempli. */
export function waLink(message?: string, number: string = WHATSAPP_NUMBER) {
  const base = `https://wa.me/${number.replace(/\D/g, '')}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const telLink = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

export const MSG = {
  general: 'Bonjour Arame GP Group 👋, je souhaite avoir des informations sur vos voyages et envois de colis.',
  booking: 'Bonjour Arame GP Group 👋, je souhaite réserver. Pouvez-vous me donner les prochaines disponibilités ?',
  destination: (name: string) =>
    `Bonjour Arame GP Group 👋, je souhaite des informations pour la destination : *${name}* (voyage et/ou envoi de colis).`,
  service: (service: string) => `Bonjour Arame GP Group 👋, je suis intéressé(e) par votre service : *${service}*.`,
  departure: (from: string, to: string, date: string | null) =>
    `Bonjour Arame GP Group 👋, je souhaite des informations sur le départ *${from} → ${to}*${
      date ? ` du ${date}` : ''
    }.`,
}

export interface RequestData {
  service: 'voyage' | 'colis'
  from: CountryCode
  to: CountryCode
  name: string
  phone: string
  date: string
  extra: string
  details: string
}

/** Message structuré envoyé à la fin du tunnel de conversion. */
export function buildRequestMessage(d: RequestData) {
  const lines = [
    'Bonjour Arame GP Group 👋',
    `Je souhaite faire une demande : *${d.service === 'voyage' ? 'Voyage' : 'Envoi de colis'}*`,
    '',
    `📍 Trajet : ${countryName(d.from)} → ${countryName(d.to)}`,
    d.date ? `📅 ${d.service === 'voyage' ? 'Date souhaitée' : 'Date d’envoi souhaitée'} : ${d.date}` : null,
    d.extra ? (d.service === 'voyage' ? `👥 Voyageurs : ${d.extra}` : `📦 Poids / taille estimés : ${d.extra}`) : null,
    '',
    `👤 Nom : ${d.name}`,
    `📞 Téléphone : ${d.phone}`,
    d.details ? `📝 Détails : ${d.details}` : null,
    '',
    'Merci de me recontacter.',
  ]
  return lines.filter((l): l is string => l !== null).join('\n')
}
