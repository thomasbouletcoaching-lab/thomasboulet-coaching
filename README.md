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

## Paiement (Stripe)

Produit « Cycle Charpente – coaching 12 semaines » à 1 600 € créé dans Stripe, avec un lien de paiement
(facture automatique, mention « TVA non applicable, art. 293 B du CGI »).
Tarif fondateur : prix à 790 € sur le même produit, avec un lien de paiement **limité à 10 ventes** (Stripe le désactive tout seul après la 10e).
Liens en mode test : 790 € https://buy.stripe.com/test_4gMbJ0axh4dy7hr3ML7Vm01 · 1 600 € https://buy.stripe.com/test_8x200ieNxcK41X75UT7Vm00
Ils sont **en mode test** : ils ne sont pas affichés sur le site. Le parcours reste candidature → appel → envoi du lien.
Quand le compte Stripe sera en production, recréer le lien en mode réel ; il pourra alors aller dans
le champ `lien` de l'offre `cycle-12` de `produits.js` si l'on veut proposer le paiement direct.

## Vidéo de présentation (VSL) et résultats clients

Tout se règle dans **`produits.js`**, en bas du fichier :
- `window.SITE.vsl` : coller le lien YouTube (ou Vimeo, ou `video/vsl.mp4`). Le bloc vidéo apparaît en haut de la page « Le cycle ». Vide = caché.
- `window.RESULTATS` : ajouter un bloc par client (modèle dans le fichier). La section « Ils l'ont fait » apparaît sur l'accueil et sur la page « Le cycle » dès qu'il y a un résultat. Uniquement des résultats réels, avec l'accord écrit du client.

## Tarif fondateur (790 € pour les 10 premières places)

Dans `produits.js`, `window.SITE.fondateur = { total: 10, prises: 0 }`.
À chaque client qui paie le tarif fondateur, augmenter `prises` de 1 : le compteur de places se met à jour sur l'accueil et la page « Le cycle ».
Quand `prises` atteint 10, le site affiche automatiquement le prix normal (1 600 €) partout.
