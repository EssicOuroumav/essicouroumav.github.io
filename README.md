# Portfolio de Cisse Vamourou

Designer graphique, UI/UX, web, motion design et gestion des réseaux sociaux, Abidjan.
En ligne : https://essicouroumav.github.io

## Modifier le contenu
Tout est dans `app/data.js` (projets, compétences, outils, parcours) et `app/dict.js` (textes de l'interface), en français et en anglais.
Ajouter un projet : déposer l'image dans `public/images/projects/`, ajouter une entrée dans `projects` avec ses liens (`site`, `github`, `behance`, `video`).

## Commandes
```bash
npm ci
npm run dev      # développement
npm run build    # export statique dans out/
npm run check    # contrôles avant publication
```
Chaque `push` sur `main` publie le site par GitHub Actions (`.github/workflows/deploy.yml`).

## Crédits
Photo de fond : engin akyurt (Unsplash). Logos d'outils : Simple Icons (CC0).
