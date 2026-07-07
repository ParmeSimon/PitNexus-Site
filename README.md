# PitNexus — vitrine & distribution

Repo **public** qui porte toute la présence publique de PitNexus :

- **Site vitrine** ([pitnexus.com](https://pitnexus.com)) — source Vite/React à la racine,
  publié sur **GitHub Pages** via [.github/workflows/deploy-site.yml](.github/workflows/deploy-site.yml).
- **Releases de l'app** — les installeurs Windows signés + `latest.yml` (auto-update
  electron-updater) sont publiés ici par le pipeline de release du repo de code privé
  (`ParmeSimon/PitHub`). Ce repo n'a pas besoin de workflow de release ; il n'est que la
  cible de publication.

## Site — développement

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # -> dist/ (ce qui est publié sur Pages)
```

## Domaine / Pages

- [public/CNAME](public/CNAME) contient `pitnexus.com` (embarqué dans chaque build).
- Config repo : Settings → Pages → Source = **GitHub Actions**, Custom domain = `pitnexus.com`.
- DNS chez le registrar de pitnexus.com :
  - `A @` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - `AAAA @` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
  - `CNAME www` → `parmesimon.github.io.`
- Une fois le DNS propagé : cocher **Enforce HTTPS**.

## Releases (auto-update)

La cible est déclarée dans le repo de code (`electron-builder.config.cjs`) :
`provider: github, owner: ParmeSimon, repo: PitNexus`. Voir `RELEASE.md` dans PitHub
pour la procédure de publication.
