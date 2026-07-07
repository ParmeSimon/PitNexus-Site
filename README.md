# pitnexus-site — vitrine PitNexus

Repo **public** dédié au **site vitrine** de PitNexus ([pitnexus.com](https://pitnexus.com)) —
source Vite/React à la racine, publié sur **GitHub Pages** via
[.github/workflows/deploy-site.yml](.github/workflows/deploy-site.yml).

> Le **code de l'app** est dans le repo privé `ParmeSimon/PitHub`.
> Les **releases** (installeurs + auto-update) sont publiées dans le repo privé
> `ParmeSimon/PitNexus` (cible déclarée dans `electron-builder.config.cjs` de PitHub) —
> pas ici.

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
