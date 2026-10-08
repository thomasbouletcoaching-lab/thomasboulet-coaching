# Site Thomas Boulet Coaching

Site vitrine et page de vente, hébergé gratuitement sur GitHub Pages.
L'app clients reste dans le dépôt `tb-coaching-app`.

## Pages

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : positionnement, différenciation, Méthode Charpente |
| `methode.html` | Mon histoire, la méthode, l'app TB my Coach, mes engagements |
| `coaching.html` | Page de vente du cycle de 12 semaines + formulaire de candidature |
| `offres.html` | Catalogue de toutes les offres (généré depuis `produits.js`) |
| `ressources.html` | Guides gratuits (téléchargement contre e-mail) |
| `mentions-legales.html` | Mentions légales (SIRET et adresse à compléter) |
| `404.html` | Page d'erreur |
| `style.css`, `site.js` | Mise en forme et scripts communs |

## Ajouter ou modifier une offre

Tout se passe dans **`produits.js`** : copier un bloc `{ ... }`, changer les textes, enregistrer.
La page Offres se met à jour toute seule. Pour vendre en ligne, mettre le lien de paiement Stripe
dans le champ `lien` et passer le `statut` à `"dispo"`.

## Où arrivent les demandes

Candidatures, téléchargements du guide et inscriptions aux listes d'attente arrivent dans la table
`leads` de Supabase (la même que l'app), avec dans `data` : `origine: "site"` et `demande`
(`candidature`, `guide-3h` ou `attente` + l'offre concernée).

## Brancher le nom de domaine (thomasboulet-coaching.fr)

1. Acheter le domaine (OVH, Gandi…).
2. Dans le dépôt GitHub : Settings → Pages → Custom domain → `thomasboulet-coaching.fr`, puis cocher « Enforce HTTPS ».
3. Chez le registraire, créer les enregistrements DNS indiqués par GitHub
   (4 enregistrements A vers 185.199.108.153, .109.153, .110.153, .111.153, et un CNAME `www` vers `thomasbouletcoaching-lab.github.io`).

## Faire une modification

Modifier le fichier sur GitHub (icône crayon), « Commit changes » sur `main` : le site est à jour en 1 à 2 minutes.
L'en-tête et le pied de page sont répétés dans chaque page : un changement de menu se fait dans toutes les pages.
