// Contenu de la page. Les libellés viennent du catalogue réel de l'app
// (src/core/catalog.ts) pour rester fidèle à ce que le pilote installe.

export const MODULES = [
  {
    id: 'pitengineer',
    name: 'PitEngineer',
    kicker: 'Ton ingénieur dans le casque',
    tagline: 'Un ingénieur de course qui te parle en direct, relais après relais.',
    body: "Il lit ta télémétrie en temps réel et te prévient avant que ça tourne mal : un rival qui revient, le carburant qui descend, les pneus qui lâchent, la pluie qui arrive. À la fin du relais, il fait le débrief à voix haute. En Pro, tu lui réponds et il ajuste la stratégie pendant que tu roules.",
    standard: [
      'Ingénieur vocal en direct (FR / EN)',
      'Alertes live : rivaux, carburant, pneus, météo',
      'Debrief vocal après chaque relais'
    ],
    pro: [
      'Tu parles, il répond en temps réel',
      'Connexion directe à PitAssistant',
      'Stratégie de course adaptative',
      'Sauvegarde et sync cloud multi PC'
    ],
    accent: '#ff5a3c',
    price: 'à partir de 8,99 € / mois',
    // Média illustrant le module. `shot` = image (png/jpg/webp), `clip` = vidéo (mp4)
    // qui prend le dessus si présente. Déposer les fichiers dans site/public/media/.
    shot: '/media/screens/pitengineer.png',
    clip: '/media/clips/pitengineer.mp4'
  },
  {
    id: 'pitassistant',
    name: 'PitAssistant',
    kicker: 'La stratégie sur le pit wall',
    tagline: 'Stratégie d’arrêt, télémétrie et circuits, à portée de main.',
    body: "Le copilote du muret. Il te conseille la bonne fenêtre d'arrêt, affiche ta télémétrie vive et connaît chaque circuit et chaque gomme. Il repère tes sims et les lance pour toi. En Pro, il compare les scénarios (undercut, éco carburant) et envoie tout vers PitStats dès l'arrivée.",
    standard: [
      'Stratégie d’arrêt conseillée',
      'Vue télémétrie temps réel',
      'Stats par circuit et par gomme',
      'Détection et lancement des sims'
    ],
    pro: [
      'Comparateur de stratégies (undercut, éco carburant)',
      'Export CSV',
      'Sauvegarde et sync cloud multi PC',
      'Envoi auto vers PitStats en fin de course'
    ],
    accent: '#f5b301',
    price: 'gratuit, Pro à 4,99 € / mois',
    shot: '/media/screens/pitassistant.png'
  },
  {
    id: 'pitplanner',
    name: 'PitPlanner',
    kicker: 'Le programme avant la course',
    tagline: 'Prépare tes semaines d’entraînement avant un événement.',
    body: "Une course d'endurance se gagne dans les jours qui la précèdent. PitPlanner pose ton planning semaine par semaine, fixe des objectifs par événement et te rappelle tes séances. En Pro, les plans deviennent adaptatifs et suivent ta progression sur plusieurs événements.",
    standard: ['Planning hebdomadaire', 'Objectifs par événement', 'Rappels'],
    pro: [
      'Plans adaptatifs IA',
      'Suivi de progression',
      'Sync multi événements',
      'Sauvegarde et sync cloud multi PC'
    ],
    accent: '#3ddc97',
    price: 'gratuit, Pro à 3,99 € / mois',
    shot: '/media/screens/pitplanner.png'
  },
  {
    id: 'pitstats',
    name: 'PitStats',
    kicker: 'La mémoire de ta carrière',
    tagline: 'Journal de bord, palmarès et analyse post course.',
    body: "Chaque course s'archive toute seule : tours, conso, arrêts, places gagnées, messages de l'ingénieur sur une timeline. Ton palmarès se construit sans que tu lèves le petit doigt. En Pro, un analyste IA lit ta carrière, pointe tes faiblesses, te situe face à la communauté et raconte ta saison.",
    standard: [
      'Historique auto de tes courses',
      'Palmarès : podiums, victoires, places gagnées',
      'Détail par course : tours, conso, stands',
      'Timeline des messages ingénieur'
    ],
    pro: [
      'Analyste de carrière IA (faiblesses et plan)',
      'Benchmark communauté (voiture / circuit)',
      'Rapport narratif IA (texte et voix)',
      'Sauvegarde et sync cloud multi PC'
    ],
    accent: '#5b9dff',
    price: 'gratuit, Pro à 5,99 € / mois',
    shot: '/media/screens/pitstats.png'
  }
]

// Section « En action » : vidéo démo principale + galerie de captures/clips que le
// visiteur peut mettre en avant. Déposer les fichiers dans site/public/media/
// (voir site/public/media/README.md pour les noms attendus). Chaque média dégrade
// proprement en placeholder tant que le fichier n'existe pas.
export const SHOWCASE = {
  demo: {
    src: '/media/demo.mp4',
    poster: '/media/demo-poster.jpg',
    label: 'PitNexus en course — 90 secondes'
  },
  shots: [
    { id: 'pitengineer', label: 'Ingénieur en direct', src: '/media/screens/pitengineer.png', accent: '#ff5a3c' },
    { id: 'pitassistant', label: 'Stratégie au muret', src: '/media/screens/pitassistant.png', accent: '#f5b301' },
    { id: 'pitstats', label: 'Palmarès de carrière', src: '/media/screens/pitstats.png', accent: '#5b9dff' },
    { id: 'pitteam', label: 'Écurie & classement', src: '/media/screens/pitteam.png', accent: '#3ddc97' }
  ]
}

// PitTeam a son propre traitement : gratuit, social, pas un module vendu.
export const TEAM = {
  name: 'PitTeam',
  kicker: 'Cours en écurie',
  tagline: 'Monte ton écurie, compare tes résultats, grimpe au classement.',
  body: "Crée ton écurie, invite tes pilotes, brande ta page aux couleurs de la maison. Les résultats issus de la télémétrie sont classés ; ceux saisis à la main restent visibles mais hors classement, pour garder les leaderboards propres. Le cœur est gratuit pour tout pilote connecté.",
  points: [
    'Écurie brandée : couleurs, logo, devise',
    'Feed social et page « Découvrir »',
    'Classement anti triche basé sur la télémétrie réelle',
    'Team Pro à vie : membres illimités et planning partagé'
  ]
}

// Bandeau radio : ce que l'ingénieur pourrait te lâcher dans le casque.
export const RADIO = [
  { t: 'ENGINEER', m: 'Box this lap, box this lap. La fenêtre est ouverte.' },
  { t: 'ALERTE', m: 'Carburant : deux tours de marge, pas plus.' },
  { t: 'MÉTÉO', m: 'Pluie annoncée dans huit minutes, secteur trois.' },
  { t: 'RIVAL', m: 'La 7 revient à trois dixièmes par tour.' },
  { t: 'PNEUS', m: 'Avant droit en surchauffe, lève le pied en entrée.' },
  { t: 'DEBRIEF', m: 'Relais propre. On a gagné deux places au stand.' }
]

export const STATS = [
  { value: 4, prefix: '+', suffix: ' places', label: 'gagnées en course par undercut bien timé' },
  { value: 18, prefix: '-', suffix: ' s', label: 'perdus dans une mauvaise fenêtre de pit' },
  { value: 31, prefix: '+', suffix: ' %', label: 'de podiums sur les pilotes qui l\'utilisent' },
  { value: 0, prefix: '', suffix: ' €', label: 'pour commencer à rouler' }
]
