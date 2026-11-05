import senegalImg from '../assets/senegal.jpg'
import marocImg from '../assets/maroc.jpg'
import coteIvoireImg from '../assets/cote-ivoire.jpg'
import dubaiImg from '../assets/dubai.jpg'
import heroImg from '../assets/hero-avion.jpg'
import colisImg from '../assets/colis.jpg'
import ctaImg from '../assets/cta-passeport.jpg'

/* =====================================================================
   ARAME GP GROUP — FICHIER DE CONFIGURATION
   Toutes les informations modifiables du site sont centralisées ici.
   ===================================================================== */

/**
 * ⚠️ NUMÉRO WHATSAPP PRINCIPAL — À CONFIRMER AVANT MISE EN LIGNE
 * Format international, chiffres uniquement, sans "+" ni espaces.
 * Toutes les demandes du site (tunnel, boutons, bouton flottant) arrivent sur ce numéro.
 */

export const WHATSAPP_NUMBER = '221774427454'

export const SITE = {
  name: 'Arame GP Group',
  url: 'https://arame-gp-group.netlify.app', // ← à remplacer par le domaine final
  email: '', // ← laisser vide pour masquer l'e-mail, ou renseigner l'adresse réelle
  tagline: 'Voyages & GP International',
  socials: {
    facebook: '', // ex. 'https://facebook.com/...'  (vide = icône masquée)
    instagram: '',
    tiktok: '',
  },
}

/* ---------------------------------------------------------------------
   PAYS / DESTINATIONS
   Les visuels sont dans src/assets/ (remplacez le fichier pour changer l'image).
   En cas d'image indisponible, un fond dégradé élégant s'affiche automatiquement.
   --------------------------------------------------------------------- */
export type { CountryCode } from '../shared/departures'
import type { CountryCode } from '../shared/departures'

export interface Destination {
  code: CountryCode
  name: string
  city: string
  blurb: string
  image: string
}

export const DESTINATIONS: Destination[] = [
  {
    code: 'SN',
    name: 'Sénégal',
    city: 'Dakar',
    blurb: 'Départs et arrivées depuis Dakar, colis livrés porte à porte.',
    image: senegalImg,
  },
  {
    code: 'MA',
    name: 'Maroc',
    city: 'Casablanca · Rabat',
    blurb: 'La ligne historique Sénégal ⇄ Maroc, voyages et envois réguliers.',
    image: marocImg,
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    city: 'Abidjan',
    blurb: 'Accompagnement voyage et acheminement de colis vers Abidjan.',
    image: coteIvoireImg,
  },
  {
    code: 'AE',
    name: 'Dubaï',
    city: 'Émirats arabes unis',
    blurb: 'Voyages d’affaires, achats et colis en provenance de Dubaï.',
    image: dubaiImg,
  },
]

// Visuels du site (fichiers dans src/assets/)
export const HERO_IMAGE = heroImg // avion au décollage
export const PARCEL_IMAGE = colisImg // agent GP et colis
export const CTA_IMAGE = ctaImg // passeport + coucher de soleil

/* ---------------------------------------------------------------------
   PROCHAINS DÉPARTS
   Les départs sont gérés par le client depuis l'espace admin (/admin)
   et stockés sur Netlify (voir netlify/functions/departures.mts).
   --------------------------------------------------------------------- */
export const DEPARTURES_API = '/api/departures'

/* ---------------------------------------------------------------------
   POINTS DE CONTACT (agences)
   --------------------------------------------------------------------- */
export interface Agency {
  name: string
  area: string
  phones: string[] // format affiché : '+221 77 442 74 54'
}

export const AGENCIES: Agency[] = [
  { name: 'Ouakam Cité Avion', area: 'Dakar', phones: ['+221 77 442 74 54', '+221 77 225 46 69'] },
  { name: 'HLM 2', area: 'Dakar', phones: ['+221 77 354 32 91'] },
  { name: 'Keur Massar', area: 'Dakar', phones: ['+221 78 472 06 41'] },
]

/* ---------------------------------------------------------------------
   FAQ
   --------------------------------------------------------------------- */
export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Comment connaître les prochaines dates de départ ?',
    a: 'Les départs confirmés sont affichés dans la section « Prochains départs ». Pour la date la plus à jour, envoyez-nous un message sur WhatsApp : notre équipe vous répond avec les disponibilités du moment.',
  },
  {
    q: 'Comment envoyer un colis avec Arame GP Group ?',
    a: 'Remplissez le formulaire de demande (service « Envoi de colis »), indiquez le trajet et une description du colis. Votre demande arrive directement sur WhatsApp et un conseiller vous confirme le tarif, le lieu de dépôt et la date d’acheminement.',
  },
  {
    q: 'Quels types de colis acceptez-vous ?',
    a: 'Nous acheminons la plupart des effets personnels, vêtements, produits et marchandises. Les produits interdits ou dangereux sont refusés. En cas de doute, décrivez votre colis sur WhatsApp avant de le déposer.',
  },
  {
    q: 'Proposez-vous la livraison porte à porte ?',
    a: 'Oui. Selon la destination, votre colis peut être récupéré et livré directement à l’adresse indiquée. Précisez-le dans votre demande pour obtenir les conditions.',
  },
  {
    q: 'Comment réserver un voyage ?',
    a: 'Choisissez « Voyage » dans le formulaire, indiquez votre trajet et vos préférences. Un conseiller vous accompagne ensuite sur WhatsApp pour finaliser votre réservation et préparer votre départ.',
  },
  {
    q: 'Faut-il payer en ligne ?',
    a: 'Non. Aucun paiement n’est demandé sur le site. Les modalités sont convenues directement avec notre équipe, en agence ou par WhatsApp.',
  },
  {
    q: 'Où se trouvent vos agences ?',
    a: 'Nous vous accueillons à Ouakam Cité Avion, HLM 2 et Keur Massar. Les numéros de chaque point de contact sont indiqués dans la section « Nos points de contact ».',
  },
  {
    q: 'Mes informations sont-elles enregistrées sur le site ?',
    a: 'Non. Le formulaire prépare simplement un message WhatsApp. Aucune donnée personnelle n’est stockée sur le site : vous choisissez vous-même d’envoyer le message.',
  },
]
