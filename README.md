# Arame GP Group — Landing page

Site one page (React + TypeScript + Tailwind CSS + Framer Motion + Lucide) pour Arame GP Group :
voyages, envoi de colis GP et livraison porte à porte. Objectif : convertir les visiteurs en demandes WhatsApp.

## Démarrer
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de production → dist/
```

## Personnaliser (tout est dans `src/config/site.ts`)
| Élément | Où |
|---|---|
| **Numéro WhatsApp principal** (⚠️ à confirmer avant mise en ligne) | `WHATSAPP_NUMBER` |
| Agences et téléphones | `AGENCIES` |
| Destinations, textes, photos | `DESTINATIONS`, `HERO_IMAGE`, `PARCEL_IMAGE` |
| FAQ | `FAQ` |
| Domaine, e-mail, réseaux sociaux | `SITE` (laisser vide = masqué) |

**Photos** : les visuels des destinations sont dans `src/assets/` (senegal.jpg, maroc.jpg, cote-ivoire.jpg, dubai.jpg). Remplacez un fichier en gardant le même nom.
Si une photo ne charge pas, une illustration de repli s'affiche automatiquement.

**Domaine** : remplacez `https://arame-gp-group.netlify.app` dans `index.html`, `public/robots.txt` et `public/sitemap.xml`.
Ajoutez une image de partage `public/og-image.jpg` (1200×630).

**Mentions légales** : compléter forme juridique / NINEA / RCCM dans `src/sections/Closing.tsx` (`LegalModal`).

## Espace admin : gestion des départs (`/admin`)
Le client publie lui-même ses départs depuis son téléphone sur **https://VOTRE-DOMAINE/admin** :
ajouter, modifier, passer en « Complet », supprimer. Les départs passés disparaissent du site automatiquement.

- **Mot de passe** : à définir dans Netlify → *Site configuration → Environment variables* → `ADMIN_PASSWORD`
  (puis *Deploys → Trigger deploy*). Changer ce mot de passe déconnecte toutes les sessions.
- **Stockage** : Netlify Blobs (inclus, aucune base de données à gérer).
- **Code** : `netlify/functions/departures.mts` (API), `netlify/functions/admin-login.mts` (connexion),
  `src/admin/AdminApp.tsx` (interface), `src/shared/departures.ts` (modèle commun).
- Astuce client : ouvrir `/admin` dans Safari/Chrome → « Ajouter à l'écran d'accueil » pour l'avoir comme une appli.

## Déployer
- **Netlify** : importer le dépôt GitHub (recommandé) — `netlify.toml` configure tout (build, fonctions, `/admin`).
  ⚠️ Le glisser-déposer du dossier `dist/` ne suffit plus : les fonctions de l'admin doivent être déployées avec le projet
  (dépôt GitHub, ou `netlify deploy --prod` depuis le dossier du projet).

## Données personnelles
Aucune donnée n'est stockée : le tunnel compose un message et ouvre `wa.me` ; le formulaire est vidé après l'envoi.
