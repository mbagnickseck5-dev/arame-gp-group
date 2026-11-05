import { Package, PlaneTakeoff, Users } from 'lucide-react'

export const TYPE_LABEL = {
  voyage: { label: 'Voyage', icon: Users },
  colis: { label: 'Colis', icon: Package },
  mixte: { label: 'Voyage & colis', icon: PlaneTakeoff },
}

export const STATUS = {
  ouvert: { label: 'Réservations ouvertes', cls: 'bg-green-50 text-wa-dark ring-green-200' },
  complet: { label: 'Complet', cls: 'bg-red-50 text-red-600 ring-red-200' },
  bientot: { label: 'Prochainement', cls: 'bg-brand-soft text-brand-orange2 ring-orange-200' },
}
