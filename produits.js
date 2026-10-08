/* CATALOGUE DES OFFRES
   C'est le seul fichier à modifier pour ajouter, retirer ou changer une offre.
   La page « Offres » se construit toute seule à partir de cette liste.

   Champs :
   - id         : identifiant court, sans espace ni accent
   - famille    : "accompagnement", "app" ou "ressources" (définit la rubrique)
   - titre      : nom de l'offre
   - statut     : "dispo" (disponible), "attente" (liste d'attente) ou "bientot"
   - desc       : une ou deux phrases
   - points     : liste de ce qui est inclus (facultatif)
   - prix       : texte du prix, ou "" pour ne rien afficher
   - note       : petite ligne sous le prix (facultatif)
   - bouton     : texte du bouton
   - lien       : où mène le bouton (page du site, lien Stripe, etc.)
                  laisser "" pour un statut "attente" : le bouton inscrit à la liste d'attente
   - phare      : true pour mettre l'offre en grand en haut de sa rubrique
*/
window.CATALOGUE = [
  {
    id: "cycle-12",
    famille: "accompagnement",
    titre: "Le cycle Charpente, 12 semaines",
    statut: "dispo",
    phare: true,
    desc: "L'accompagnement complet : un programme écrit pour toi, ton alimentation organisée autour de vrais plats, et un suivi chaque semaine dans l'app TB my Coach.",
    points: [
      "Programme individualisé, ajusté selon ton carnet",
      "Plan alimentaire sans régime, adapté à tes goûts",
      "Bilan hebdomadaire commenté et messagerie avec moi",
      "Bilan de fin de cycle et suite à donner"
    ],
    prix: "1 600 €",
    note: "Le cycle de 12 semaines. TVA non applicable, art. 293 B du CGI.",
    bouton: "Voir le cycle en détail",
    lien: "coaching.html"
  },
  {
    id: "suivi-mensuel",
    famille: "accompagnement",
    titre: "Le suivi mensuel",
    statut: "attente",
    desc: "Pour continuer après un cycle, ou démarrer plus léger : l'app TB my Coach et un suivi par ton coach, mois par mois, sans engagement long.",
    points: [
      "Programme et carnet dans l'app",
      "Ajustements réguliers par ton coach",
      "Messagerie"
    ],
    prix: "",
    note: "Tarif annoncé à l'ouverture.",
    bouton: "Être prévenu de l'ouverture",
    lien: ""
  },
  {
    id: "essai-app",
    famille: "app",
    titre: "30 jours d'essai de TB my Coach",
    statut: "attente",
    desc: "Utilise l'app en autonomie pendant un mois : ta routine, tes séances, tes photos et tes mensurations. À la fin, tu continues seul ou tu passes au suivi.",
    points: [
      "Accès gratuit pendant 30 jours",
      "Carnet d'entraînement et suivi de transformation",
      "Sans carte bancaire"
    ],
    prix: "Gratuit",
    note: "",
    bouton: "M'inscrire à l'essai",
    lien: ""
  },
  {
    id: "guide-3h",
    famille: "ressources",
    titre: "Guide « 3H qui changent tout »",
    statut: "dispo",
    desc: "Comment construire un corps solide avec trois heures par semaine : entraînement, posture, cardio utile et récupération, expliqués simplement.",
    prix: "Gratuit",
    note: "PDF à télécharger.",
    bouton: "Recevoir le guide",
    lien: "ressources.html#guide-3h"
  },
  {
    id: "guide-sec-30",
    famille: "ressources",
    titre: "Guide « Être sec et musclé après 30 ans »",
    statut: "attente",
    desc: "Ce qui change après 30 ans, et comment perdre le ventre sans perdre ta force ni ta vie sociale.",
    prix: "Gratuit",
    note: "",
    bouton: "Être prévenu de sa sortie",
    lien: ""
  },
  {
    id: "tableur-powerbuilding",
    famille: "ressources",
    titre: "Le tableur Powerbuilding",
    statut: "bientot",
    desc: "L'outil de suivi que j'utilise pour ma propre préparation en force : charges, séries, progression sur toute l'année.",
    prix: "",
    note: "",
    bouton: "Être prévenu de sa sortie",
    lien: ""
  },
  {
    id: "ebooks",
    famille: "ressources",
    titre: "E-books et programmes",
    statut: "bientot",
    desc: "Des programmes prêts à suivre selon ton matériel et ton temps, et des e-books pour comprendre ce que tu fais.",
    prix: "",
    note: "",
    bouton: "Être prévenu des sorties",
    lien: ""
  }
];

window.FAMILLES = {
  accompagnement: { titre: "Être accompagné", intro: "Un coach qui suit tes séances et ajuste ton plan chaque semaine." },
  app: { titre: "Avancer avec l'app", intro: "TB my Coach, l'application que j'ai construite pour mes clients." },
  ressources: { titre: "Apprendre et t'outiller", intro: "Des guides et des outils pour avancer seul, avec une méthode solide." }
};

/* RÉGLAGES DU SITE
   - vsl : lien de ta vidéo de présentation (YouTube, Vimeo, ou fichier .mp4 dans le dossier video/).
           Laisse "" tant qu'elle n'est pas prête : le bloc vidéo reste caché.
           Exemples : "https://www.youtube.com/watch?v=XXXXXXXXXXX" ou "video/vsl.mp4"
*/
window.SITE = {
  vsl: ""
};

/* RÉSULTATS CLIENTS
   La section « Ils l'ont fait » n'apparaît sur le site que lorsqu'il y a au moins un résultat ici.
   N'ajoute que des résultats réels, avec l'accord écrit du client (prénom ou initiale, chiffres, photo).

   Champs :
   - prenom   : "Arthur" ou "A."
   - profil   : "38 ans, cadre, 2 enfants"
   - duree    : "12 semaines"
   - chiffres : liste de résultats mesurés, ex. ["Squat : 80 → 110 kg", "Tour de taille : -6 cm"]
   - citation : sa phrase, mot pour mot
   - photo    : facultatif, ex. "img/clients/arthur.jpg" (avant/après, avec son accord)

   Exemple à copier (retire les // au début des lignes) :
   // {
   //   prenom: "A.",
   //   profil: "38 ans, cadre, 2 enfants",
   //   duree: "12 semaines",
   //   chiffres: ["Squat : 80 → 110 kg", "Tour de taille : -6 cm"],
   //   citation: "Pour la première fois, j'ai tenu trois mois sans lâcher.",
   //   photo: ""
   // },
*/
window.RESULTATS = [
];
