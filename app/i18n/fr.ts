import type { Dict } from "./en";

// French copy. Mirrors en.ts key for key.
export const fr: Dict = {
  lang: "fr",
  // The page's <title> and search/social description.
  meta: {
    title: "DockPops — Dossiers personnalisés pour le Dock de votre Mac",
    description:
      "De superbes dossiers personnalisés pour votre Dock. Regroupez apps, fichiers et liens dans des Pops, puis donnez à chacun votre style avec des thèmes, des fonds PopFX animés et des icônes du Dock assorties. Sans abonnement.",
  },
  // Names for screen readers (not shown).
  a11y: {
    site: "Site",
    dock: "Dock",
    footer: "Pied de page",
    facts: "DockPops en bref",
  },
  menu: {
    features: "Fonctions",
    pricing: "Tarifs",
    faq: "FAQ",
    support: "Assistance",
    download: "Télécharger",
  },
  hero: {
    title: "Dossiers sur mesure pour votre Dock.",
    body:
      "Cliquez sur une icône DockPops : une grille de vos apps, fichiers, dossiers et liens s’ouvre exactement là où vous l’attendez. Donnez ensuite à chaque Pop votre style.",
    free: "Téléchargement gratuit. Premium : un seul achat, sans abonnement.",
    hint: "Cliquez sur un Pop dans le Dock pour l’ouvrir.",
    hintTouch: "Touchez un Pop dans le Dock pour l’ouvrir.",
    // A Dock tile's accessible name: {name} the Pop's, {theme} its theme's.
    tile: "{name}, un Pop au thème {theme}",
  },
  // A Dock tile's tooltip: the Pop's look in the inspector's own words.
  look: {
    line: "{theme}, présentation {view}, remplissage {fill}, libellés {labels}",
    views: { grid: "Grille", list: "Liste", tiles: "Tuiles" },
    fills: { glass: "verre", color: "couleur", gradient: "dégradé", popfx: "PopFX" },
    fonts: { system: "système", rounded: "arrondis", serif: "serif", mono: "à chasse fixe", papyrus: "Papyrus" },
  },
  trust: [
    "Téléchargement gratuit",
    "Un seul achat, sans abonnement",
    "Aucun pistage, aucune publicité",
    "App Mac native pour macOS 14 ou version ultérieure",
  ],
  files: {
    title: "Apps, fichiers et dossiers.",
    body:
      "Regroupez jusqu’à 25 apps, fichiers ou dossiers dans un Pop. Faites-les glisser depuis n’importe où sur votre Mac, parcourez un dossier directement dans le Pop et appuyez sur la barre d’espace pour un aperçu Coup d’œil.",
    drill: "Parcourez les dossiers sans quitter le Pop",
    quickLook: "Coup d’œil sur tout fichier avec la barre d’espace",
  },
  themes: {
    title: "Personnalisable à l’infini.",
    body:
      "23 thèmes intégrés, ou enregistrez le vôtre et réutilisez-le dans plusieurs Pops. Donnez à chaque Pop une couleur, un dégradé, votre propre photo ou un fond PopFX, ajoutez une bordure, choisissez la police des libellés et affichez-le en présentation Grille, Liste ou Tuiles. Son icône du Dock se met au diapason.",
    view: "Présentation",
    theme: "Thème",
  },
  popfx: {
    title: "Il est vivant !",
    body:
      "Les fonds PopFX bougent et réagissent à votre pointeur : arcs, rideaux, vagues, marbre, neige, braises, pluie de glyphes et bien plus encore.",
    count: "23 thèmes intégrés, dont 11 thèmes PopFX.",
  },
  assistant: {
    title: "Il suffit de demander.",
    body:
      "Dites à l’Assistant ce que vous voulez, par exemple « ajoute Pages », « passe en présentation Liste » ou « donne-lui l’ambiance de l’heure dorée », et il modifie votre Pop sous vos yeux. Chaque modification, sauf une suppression, peut être annulée.",
    note: "Fonctionne avec Apple Intelligence. L’Assistant nécessite macOS 27 et DockPops Premium.",
    panel: "Assistant",
    // The Assistant's own replies (DockPops 6.0, on-device), each with what it changed.
    exchanges: [
      {
        ask: "Ajoute Pages",
        reply: "J’ai ajouté Pages au Pop, car c’est une app de productivité qui correspond à l’ajout demandé.",
        changed: "Modifié : éléments",
      },
      {
        ask: "Passe en présentation Liste",
        reply: "J’ai réglé la présentation du Pop sur Liste, car vous souhaitiez un affichage sous forme de liste.",
        changed: "Modifié : disposition",
      },
      {
        ask: "Donne-lui l’ambiance de l’heure dorée",
        reply: "J’ai remplacé le thème du Pop par Gold Leaf, car vous souhaitiez l’ambiance de l’heure dorée, qui correspond bien au thème Gold Leaf.",
        changed: "Modifié : Thème",
      },
    ],
    undo: "Annuler cette modification",
    placeholder: "Demander une modification…",
    replay: "Rejouer",
  },
  everyday: {
    title: "Un Pop pour chaque moment de la journée.",
    body: "Le travail, un lancement, un voyage, le week-end. Tout ce qu’il faut à chacun, à un clic dans votre Dock.",
  },
  pricing: {
    title: "Téléchargez gratuitement. Payez une seule fois.",
    free: "Gratuit",
    freeLine: "Gratuit pour toujours",
    premium: "Premium",
    premiumLine: "Un seul achat, sans abonnement",
    once: "achat unique",
    freeItems: [
      "2 Pops de 6 apps ou liens maximum chacun",
      "Icônes du Dock dynamiques, et une icône du Dock pour chaque Pop",
      "Balayage entre les Pops et navigation dans les dossiers",
      "Présentation Grille, libellés, espacement et surbrillance au survol",
      "Enregistrement de liens depuis le menu Partager de n’importe quelle app",
      "Mode barre des menus",
    ],
    premiumItems: [
      "Jusqu’à 100 Pops de 25 éléments chacun",
      "Fichiers et dossiers dans vos Pops",
      "23 thèmes, fonds PopFX, remplissage et bordure personnalisés",
      "Présentations Liste et Tuiles",
      "Un raccourci clavier pour chaque Pop",
      "Choix des Pops qu’affiche chaque icône du Dock",
      "Pops épinglés, « Tout ouvrir » et d’autres ordres de tri",
      "L’Assistant (macOS 27) et les suggestions Apple Intelligence (macOS 26)",
    ],
  },
  faq: {
    title: "Vos questions, nos réponses.",
    items: [
      {
        q: "Le Dock ne sait-il pas déjà faire ça ?",
        a: "Pas tout à fait. Un dossier du Dock (une pile) affiche le contenu d’un seul dossier sur le disque, trié par nom, date ou type. Un Pop est un ensemble que vous composez : n’importe quel mélange d’apps, de fichiers, de dossiers et de liens, dans l’ordre de votre choix, avec son propre nom, son propre thème et sa propre icône du Dock. Vous pouvez regrouper plusieurs Pops derrière une même icône du Dock et passer de l’un à l’autre d’un balayage, ouvrir n’importe quel Pop avec son propre raccourci clavier, parcourir des dossiers dans un Pop et afficher un fichier en Coup d’œil avec la barre d’espace.",
      },
      {
        q: "Ai-je besoin de DockPops Companion pour avoir plusieurs icônes du Dock ?",
        a: "Uniquement avec la version Mac App Store. macOS ne permet pas à une app en sandbox d’ajouter plus d’une icône au Dock : l’app gratuite DockPops Companion crée donc une petite app de lancement pour chaque Pop et garde son icône synchronisée. Elle ne communique qu’avec DockPops, sur votre Mac. La version en téléchargement direct n’est pas en sandbox : elle ajoute elle-même les icônes du Dock.",
      },
      {
        q: "macOS Tahoe a supprimé Launchpad. DockPops peut-il le remplacer ?",
        a: "Il répond à un besoin similaire : une grille d’apps que vous ouvrez depuis votre Dock. La différence, c’est que vous composez chaque Pop vous-même : vous pouvez donc en avoir un pour le travail, un pour un projet et un pour le week-end, chacun à un clic.",
      },
      {
        q: "Qu’est-ce que PopFX ?",
        a: "Un type de fond qui bouge et réagit à votre pointeur : arcs, rideaux, vagues, marbre, neige, braises, pluie de glyphes et bien plus encore. Parmi les 23 thèmes intégrés, 11 l’utilisent. PopFX se met en pause quand un Pop est fermé, et reste immobile lorsque Réduire les animations ou le mode Économie d’énergie est activé.",
      },
      {
        q: "Que fait l’Assistant de mes demandes ?",
        a: "Il modifie le Pop sélectionné : son thème, son remplissage, sa bordure, ses libellés et sa présentation ; son icône du Dock ; son nom et ses éléments. Il fonctionne avec Apple Intelligence : il nécessite donc macOS 27 et un Mac compatible avec Apple Intelligence, ainsi que DockPops Premium. Dans la version Mac App Store, Apple Intelligence peut utiliser Private Cloud Compute d’Apple pour répondre.",
      },
      {
        q: "En quoi DockPops diffère-t-il d’Alfred, de Raycast ou de Spotlight ?",
        a: "Ce sont des fenêtres de recherche que vous appelez avec un raccourci clavier. DockPops vit dans votre Dock : vos Pops sont déjà organisés, à un clic. Beaucoup de gens utilisent les deux.",
      },
      {
        q: "Combien coûte Premium ?",
        a: "Premium s’achète une seule fois, jamais sous forme d’abonnement. Il débloque jusqu’à 100 Pops de 25 éléments chacun, les fichiers et dossiers, les thèmes et PopFX, les présentations Liste et Tuiles, un raccourci clavier pour chaque Pop, l’Assistant et bien plus encore. La version gratuite de DockPops vous donne 2 Pops de 6 éléments chacun, de quoi l’essayer vraiment.",
      },
      {
        q: "DockPops collecte-t-il des données sur moi ?",
        a: "Non. Aucun outil d’analyse, aucun pistage, aucune publicité. Vos Pops restent sur votre Mac. Les suggestions d’apps sont générées sur votre Mac. L’Assistant utilise Apple Intelligence, qui, dans la version Mac App Store, peut répondre via Private Cloud Compute d’Apple.",
      },
      {
        q: "Sur quels Mac DockPops fonctionne-t-il ?",
        a: "Sur tout Mac équipé de macOS Sonoma (14) ou version ultérieure. Les suggestions Apple Intelligence nécessitent macOS 26, et l’Assistant nécessite macOS 27 et DockPops Premium.",
      },
    ],
  },
  support: {
    title: "Besoin d’un coup de main ?",
    body: "Écrivez-nous. Nous répondons généralement sous deux jours.",
    email: "dockpops@pixleygrowth.com",
  },
  footer: {
    rights: "Pixley Growth LLC. Tous droits réservés.",
    privacy: "Politique de confidentialité",
    support: "Assistance",
    language: "Langue",
  },
  download: {
    appStore: "Télécharger dans le Mac App Store",
    direct: "Téléchargement direct",
  },
};
