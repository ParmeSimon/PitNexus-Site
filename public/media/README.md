# Médias de la vitrine

Dépose ici les captures et vidéos. Vite sert ce dossier à la racine du site, donc
un fichier `public/media/x.png` est accessible via `/media/x.png` dans le code.

Tant qu'un fichier est absent, le composant `Media` (src/App.jsx) affiche un
placeholder aux couleurs du module — la page reste propre, rien ne casse.

## Fichiers attendus

Section « En action » (galerie) :

| Chemin                         | Type       | Rôle                                  |
| ------------------------------ | ---------- | ------------------------------------- |
| `demo.mp4`                     | vidéo 16:9 | Démo principale (autoplay, muet, loop)|
| `demo-poster.jpg`              | image 16:9 | Poster affiché avant lecture          |
| `screens/pitassistant.png`     | image 16:9 | Vignette galerie + carte module       |
| `screens/pitstats.png`         | image 16:9 | Vignette galerie + carte module       |
| `screens/pitteam.png`          | image 16:9 | Vignette galerie                      |
| `screens/pitengineer.png`      | image 16:9 | Carte module (repli si pas de clip)   |
| `screens/pitplanner.png`       | image 16:9 | Carte module                          |
| `clips/pitengineer.mp4`        | vidéo 16:9 | Carte module + galerie (prioritaire)  |

## Conseils

- Format **16:9** (les cadres sont en `aspect-ratio: 16/9`, `object-fit: cover`).
- Vidéos : **MP4 H.264 + AAC**, muettes, courtes (5–20 s pour les clips, ~90 s pour la démo),
  compressées (viser < 5 Mo/clip, < 20 Mo la démo) — elles se jouent en autoplay/loop.
- Captures : PNG ou JPG, largeur ≥ 1280 px.
- Extensions reconnues comme vidéo : `.mp4`, `.webm`, `.mov` ; tout le reste = image.

## Ajouter/retirer une entrée de galerie

Modifie `SHOWCASE` dans `site/src/data.js` (une entrée = `{ id, label, src, accent }`),
ou le champ `shot` / `clip` d'un module dans `MODULES`.
