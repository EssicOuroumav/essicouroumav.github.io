# Avancement : portfolio Cisse Vamourou

Plan validé le 2026-10-30. Next.js 15.5 export statique → GitHub Pages (publié d'abord sur `essicouroumav.github.io` le 2026-11-07, à la demande du propriétaire ; renommage en `cissevamourou` reporté).

## Fait
- Lot 1 : socle Next.js figé, workflow GitHub Pages, `.gitignore`. `npm audit` : 2 alertes postcss (outil de build) corrigées par `overrides` sans montée majeure de Next.
- Lot 2 : 8 couvertures Behance (version source recadrée comme sur Behance, 1400 px), captures de markodience.vercel.app, ong-aicha-site.vercel.app, kerya.vercel.app (Chrome sans interface), logos copiés des dépôts (Markodience, ONG AICHA, PrixCI, IVERT, Kateni), photo 800 px, fond nuages (engin akyurt, Unsplash), logos d'outils Simple Icons (CC0), icône « CV » et image de partage 1200×630.
- Lot 3 : page unique (accueil, bande d'outils, /SERVICES en accordéon, /PROJETS avec filtres, /OUTILS, /PARCOURS, contact), clair nuageux / sombre, FR / EN mémorisés.
- Lot 4 : mentions légales, 404, sitemap, robots, CSP meta, `scripts/check.mjs` (clés FR/EN, traductions complètes, images présentes, données interdites, emoji, source maps, secrets).
- Vérifié en local (`out/` servi par `python3 -m http.server`) : bureau 1024 px, mobile 375 px, clair et sombre, FR et EN, menu mobile, aucune largeur qui déborde ; codes HTTP 200 / 404 attendus.

## Erreurs et décisions
- Image de service géante : `<img height="1094">` sans `height: auto` gardait 1094 px. Corrigé par `img { height: auto }` global.
- Le navigateur gardait l'ancienne page en cache après un nouveau build : recharger avec un paramètre (`?v=2`) avant de conclure.
- Les couvertures Behance en `max_808` sont petites ; la version `source` est l'original non recadré : recadrer avec les valeurs encodées en base64 dans le nom du fichier (`crop,l,h,x,y`).
- Fond nuages assombri en mode sombre par `invert(1)` + faible opacité, pas d'image séparée.

- 2026-11-07 : le propriétaire ne rend **aucun dépôt de projet public pour l'instant** ; les cartes gardent seulement les liens vers les sites en ligne et Behance.

## À valider par le propriétaire
- Descriptions déduites : Kateni (« analyse et prédiction de matchs de football », d'après les fichiers du dépôt), Versatile Branding (« dont Nova Dermax », d'après la couverture), image du service Motion (couvertures e-books en attendant une vraie vignette vidéo).
- Les captures des sites sont celles du 2026-10-30.

## Reste à faire
- Propriétaire : renommer le compte GitHub en `cissevamourou` ; fournir liens Figma, liens vidéos motion (Mega…), Kerya (dépôt), AquaWater (logo, captures), nom exact du projet « Eden ».
- Assistant : audit gitleaks des dépôts à rendre publics, puis publication, puis Lighthouse ×3 sur l'URL publiée.
