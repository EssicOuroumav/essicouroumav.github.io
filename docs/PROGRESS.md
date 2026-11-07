# Avancement : portfolio Cisse Vamourou

Plan validé le 2026-10-30. Next.js 15.5 export statique → GitHub Pages, dépôt `EssicOuroumav/essicouroumav.github.io`, adresse `https://essicouroumav.github.io` (v1 publiée un temps sous `/Portfolio/`, revenue à la racine le 2026-11-07 à la demande du propriétaire).

## Fait
- Lot 1 : socle Next.js figé, workflow GitHub Pages, `.gitignore`. `npm audit` : 2 alertes postcss (outil de build) corrigées par `overrides` sans montée majeure de Next.
- Lot 2 : 8 couvertures Behance (version source recadrée comme sur Behance, 1400 px), captures de markodience.vercel.app, ong-aicha-site.vercel.app, kerya.vercel.app (Chrome sans interface), logos copiés des dépôts (Markodience, ONG AICHA, PrixCI, IVERT, Kateni), photo 800 px, fond nuages (engin akyurt, Unsplash), logos d'outils Simple Icons (CC0), icône « CV » et image de partage 1200×630.
- Lot 3 : page unique (accueil, bande d'outils, /SERVICES en accordéon, /PROJETS avec filtres, /OUTILS, /PARCOURS, contact), clair nuageux / sombre, FR / EN mémorisés.
- Lot 4 : mentions légales, 404, sitemap, robots, CSP meta, `scripts/check.mjs` (clés FR/EN, traductions complètes, images présentes, données interdites, emoji, source maps, secrets).
- Vérifié en local (`out/` servi par `python3 -m http.server`) : bureau 1024 px, mobile 375 px, clair et sombre, FR et EN, menu mobile, aucune largeur qui déborde ; codes HTTP 200 / 404 attendus.

- v2 (2026-11-07) : refonte complète. Palette crème / bordeaux tirée de la capture « Beefy », Manrope + Fraunces italique + JetBrains Mono, navigation en pilule flottante, volets de projets à l'accueil, compétences en cartes illustrées, page `/projets/` en cartes portrait (capture dans un cadre de navigateur, visuel, couverture de marque ou vidéo), vrais logos d'outils fournis par le propriétaire (Figma, DaVinci Resolve, Affinity) + tuile Claude, 3 ans d'expérience. Fond nuageux retiré.

- v3 (2026-11-07) : refonte d'après la vidéo de référence du propriétaire (hero rouge profond, titre blanc et jaune, personnage qui suit le curseur, cartes en verre, cercle de texte qui tourne). Le portrait est la photo du propriétaire détourée avec l'outil Vision de macOS (gratuit), inclinée en 3D selon le curseur : la vidéo IA d'une tête qui tourne n'était pas possible (Higgsfield 0 crédit, modèles vidéo Figma réservés aux forfaits payants, Canva refusé par le propriétaire pour ne pas consommer sa limite IA). Curseur animé (point + anneau, « Voir » sur les projets). Accueil : index des projets avec aperçu qui suit le curseur. Page `/projets/` : grille éditoriale, filtres, `#motion` dans l'adresse ouvre le filtre Motion. 27 projets : 11 vidéos de motion (extraits de 8 s, < 1 Mo, depuis le dossier Bureau/1 ; vidéo complète = dossier Mega), 4 projets UI (IVERT cacao, IVERT recyclage, Essic Fitness+, Coupure AF) exportés depuis Figma, outils CapCut et Meta Ads ajoutés.

- v4 (2026-11-07) : abandon du rouge à la demande du propriétaire. Palette de Markodience (relevée dans son `app/globals.css` : #f5f5f7, #1d1d1f, #0071e3, #0058b8, #e8f2ff, #0b1220) et panneaux en verre dépoli sur des halos bleus ; portrait agrandi ; IVERT classé Web & Apps ; accueil : galerie horizontale qui défile au rythme du défilement vertical (section fixe) à la place de l'index en lignes. Dépôts Markodience, ong-aicha-site, prixci, ivert et kateni rendus publics à la demande du propriétaire après un nouvel audit gitleaks de tout l'historique (mêmes faux positifs qu'avant) et un contrôle des noms de fichiers sensibles ; liens « Code » ajoutés sur leurs cartes.

- v5 (2026-11-08) : police Inter partout (titres réduits, fin des majuscules larges), glassmorphism clair façon iOS dans les violets et lavandes des références du propriétaire (fond lavande à formes diagonales, hero dans une grande fenêtre de verre), cartes de projets façon « carte de destination » (visuel plein cadre, fondu teinté par la couleur dominante du projet calculée dans `app/tints.js`, bouton en verre « Voir le projet », icônes Code / Figma / Behance), carrousel à l'accueil avec la carte centrale surélevée, grille de ces cartes sur `/projets/`.

## Erreurs et décisions
- `scripts/check.mjs` a bloqué un « • » placé dans la ligne d'informations des cartes : remplacé par un point dessiné en CSS (`.dot-sep`). Le contrôle automatique a fait son travail.
- Section fixe (`position: sticky`) qui disparaît au défilement : un ancêtre en `overflow: hidden` (ici `main` puis `body`, devenu conteneur de défilement parce que `html` avait `overflow-x: clip`) casse `sticky`. Utiliser `overflow-x: clip` partout, jamais `hidden`, au-dessus d'un élément `sticky`.
- Texte en dégradé (`background-clip: text`) coupé : les lettres qui débordent de la boîte n'ont pas de fond. `width: max-content` sur le mot en dégradé.
- Cartes de projets invisibles après un changement de filtre : l'animation d'apparition (GSAP ScrollTrigger) masquait les cartes déjà montées et ne se recalculait pas. Pas d'animation d'apparition sur une grille filtrable. C'était probablement le « bug » vu par le propriétaire sur la v2.
- `.orbit svg` faisait aussi tourner l'icône flèche : même erreur que `.badge svg` en v2. Toujours cibler `> svg` quand un conteneur anime son SVG et contient une icône.
- Débordement horizontal : un mot très long en police large (« VAMOUROU » du pied de page) dépasse sa boîte sans l'agrandir ; en `vw`, la largeur fautive gonfle encore la police. Mesurer le texte avec un `Range`, réduire la taille, et `html { overflow-x: clip }` en garde-fou.
- Aperçu de « La Minute Rose » : l'image tirée à 4 s montrait une photo médicale crue ; extrait recoupé sur le générique.
- `next/font` a échoué une fois (ETIMEDOUT vers Google Fonts) : relancer le build ; ce n'est pas une erreur de code.
- `.badge svg` faisait aussi tourner l'icône flèche du badge : sélecteur restreint à `.badge > svg`.
- Volets : le texte recouvrait la capture du site ; texte à gauche (46 %) et cadre de navigateur à droite (50 %).
- Image de service géante : `<img height="1094">` sans `height: auto` gardait 1094 px. Corrigé par `img { height: auto }` global.
- Le navigateur gardait l'ancienne page en cache après un nouveau build : recharger avec un paramètre (`?v=2`) avant de conclure.
- Les couvertures Behance en `max_808` sont petites ; la version `source` est l'original non recadré : recadrer avec les valeurs encodées en base64 dans le nom du fichier (`crop,l,h,x,y`).
- Fond nuages assombri en mode sombre par `invert(1)` + faible opacité, pas d'image séparée.

- 2026-11-07 : le propriétaire ne rend **aucun dépôt de projet public pour l'instant** ; les cartes gardent seulement les liens vers les sites en ligne et Behance.

## À valider par le propriétaire
- Descriptions déduites : Kateni (« analyse et prédiction de matchs de football », d'après les fichiers du dépôt), Versatile Branding (« dont Nova Dermax », d'après la couverture), image du service Motion (couvertures e-books en attendant une vraie vignette vidéo).
- Les captures des sites sont celles du 2026-10-30.

## Reste à faire
- Propriétaire : vérifier les titres des vidéos (déduits des noms de fichiers : Adyen, MTN Skills Academy, Portail ODC présentés comme projets de motion), rendre les fichiers Figma consultables par lien (sinon le bouton Figma demandera un accès), captures de PrixCI et Kateni, AquaWater (logo, captures), dépôt Kerya, nom exact du projet « Eden ».
- Assistant : audit gitleaks des dépôts à rendre publics, puis publication, puis Lighthouse ×3 sur l'URL publiée.
