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

- v6 (2026-11-08) : palette tirée de la tenue du propriétaire (veste #161929, cravate bleu marine #26335c, chemise blanche) ; 6 objets 3D des métiers du numérique (ordinateur, Figma, caméra, palette, mégaphone, téléphone ; 3dicons, CC0) qui flottent et suivent le curseur en profondeur ; projet AquaPay ajouté à la une (captures de l'application mobile en priorité, à la demande du propriétaire, plus le site) ; Nova Dermax = branding de services esthétiques ; Adyen, MTN Skills Academy, Portail ODC = projets personnels ; mentions légales : fondateur de Civ'Art (Port-Bouët), d'après le dossier MARKETING DIGITAL.

- v7 (2026-11-08) : couverture AquaPay = les 3 écrans d'onboarding de l'application ; carte « AquaPay, site web » ajoutée ; PrixCI : 3 vrais écrans (onboarding, accueil, « Où acheter ? » avec les prix officiels) ; cartes de projets plus grandes et plus carrées (environ 420 × 440 px sur ordinateur).

## Erreurs et décisions
- Onboarding AquaPay vide en mode web : la liste horizontale (FlatList) donne une hauteur nulle aux diapositives (`flex: 1` dans une rangée). Pour la capture seulement, hauteur forcée dans la page, sans toucher au projet.
- PrixCI en mode web : copie du projet dans le scratchpad (l'original n'est pas modifié), ajout de react-native-web, `wasm` dans `assetExts` de Metro et en-têtes COOP/COEP dans le relais pour SQLite. Le message de débogage « Failed to fetch » (serveur en ligne injoignable depuis la copie) a été masqué avant capture. Deux premières captures ratées (chargement infini, écran vide) écartées après vérification, comme l'a signalé le propriétaire.
- Captures d'applications Expo : l'émulateur Android est resté hors ligne (adb) puis son service `package` a planté ; Xcode absent, donc pas de simulateur iOS. Contournement pour AquaPay : mode web d'Expo + un relais local (scratchpad, hors du projet AquaPay) qui remplace les appels natifs de `expo-secure-store` par un stockage en mémoire. Écrans publics seulement (connexion, inscription, aide) : la connexion enverrait des identifiants à un Supabase en ligne, donc pas de connexion. PrixCI : non capturé (react-native-web absent et émulateur instable) ; Expo a remplacé Expo Go 58 par 57 sur l'émulateur.
- Kateni : application Streamlit privée (redirection vers `share.streamlit.io/-/auth/app`) ; capture impossible sans le compte du propriétaire. Le lien avec jeton `?s=` n'est enregistré nulle part.
- Capture sans interface de Chrome en format téléphone : largeur de mise en page fausse (contenu coupé) ; utiliser le navigateur intégré réglé sur 390×844.
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
- Kateni : en attente (2026-11-08). Le propriétaire refait le design et ajoute de nouvelles données ; ensuite, intégrer ses nouvelles captures (accueil, prédiction, statistiques) dans la carte Kateni. L'accès à l'application est lié à l'appareil (code personnel), donc les captures viendront du propriétaire.
- Propriétaire : captures de PrixCI, dépôt Kerya, nom exact du projet « Eden ». Fait : partage Figma public, titres des vidéos confirmés, AquaWater = AquaPay.
- Assistant : audit gitleaks des dépôts à rendre publics, puis publication, puis Lighthouse ×3 sur l'URL publiée.

## v8 (accueil façon Nexora)
- Accueil allégé : grande carte blanche, mots violets en Poppins 800 (« Designer graphique & UI/UX », « Web, motion & DIGITAL »), panneau violet avec titre, bouton noir, preuve (logos + 29 projets, 3 ans), 3 métiers et projet à la une (AquaPay).
- Palette violette (#6f52cc, lavande #f1eef8), police Poppins.
- Cartes projets nettes : plus de flou (backdrop-filter et masques retirés), dégradé limité au bas de la carte, cartes voisines non estompées.
- Outils : Photoshop, After Effects et Flutter ajoutés (9 outils).

## v8.1
- Photo de l'accueil agrandie (jusqu'à 880 px), mots UI/UX et DIGITAL réduits.
- Carte Markodience recadrée sur les visages, sans le texte du site sous le titre.
- Vitesse : images des projets réduites à 1100 px (3,9 Mo -> 1,6 Mo), avatar de 160 px, derniers flous (backdrop-filter) retirés, une seule variante italique de Poppins.
- Lighthouse mobile avant : performance 38, accessibilité 96, bonnes pratiques 100, SEO 100. À remesurer après publication.

## v8.2
- Anneau et objets 3D retirés derrière la photo, remplacés par un décor digital : grille de points, cadre de sélection façon Figma autour du visage, pastilles « </> » et « #6F52CC », curseur nommé « Cisse » (allégé sur mobile).
- Photo encore agrandie (jusqu'à 980 px), UI/UX et DIGITAL réduits (48 px max sur ordinateur, petites lignes 26 px).
- Crédits mis à jour (Adobe, Google ; 3dicons retiré).
- UI/UX ne touche plus la ligne du dessus (interligne 1 et 10 px d'écart).
- Effet 3D au curseur renforcé : la photo pivote (16° / 8°) avec une ombre qui suit, et le décor bouge en parallaxe à plusieurs profondeurs (ordinateur uniquement, désactivé si l'utilisateur réduit les animations).

## v8.3 (2026-11-21)
- Novembre Bleu (ONG AICHA, campagne cancer de la prostate) : version v8 demandée par le propriétaire, extrait de 8 s (14-22 s, 440 Ko), aperçu centré (visage à 20 s), à la une ; fin de vidéo évitée (numéros de téléphone en clair).
- GESCOM (CRM de Civ'Art) : mockup ordinateur + 2 téléphones à partir de vraies captures web (Chrome) et mobiles (Galaxy S21 par adb) faites avec des données fictives créées pour l'occasion (3 contacts, 1 devis CIVART-DV-2026-002, 1 projet, 1 facture d'acompte laissée en brouillon, notes « DONNÉE FICTIVE ») ; le vrai contact masqué à l'écran pendant les captures. Dépôt gardé privé ; bouton « Démo sur demande » qui ouvre WhatsApp avec un message prérempli.
- Constats : base Supabase de GESCOM en pause (NXDOMAIN), restaurée par le propriétaire ; restauration ≈ 10 min (503 puis 404 « schema cache » puis normal). Sur téléphone, le tableau de bord de GESCOM déborde en largeur (nom de projet long) : à corriger dans GESCOM.
- À faire par le propriétaire : archiver les données fictives dans GESCOM.

## v8.4 (2026-11-24)
- Accueil : pastille « Fondateur de Civ'Art » (logo officiel tiré de GESCOM, 160 px) sous « Disponible en indépendant », FR et EN.
- 2026-11-24 : mention déplacée sous le nom, dans l'en-tête (« Fondateur de [logo] Civ'Art », visible sur toutes les pages) ; la pastille du panneau violet se collait à « Disponible en indépendant » sur grand écran.
- 2026-11-24 : à la demande du propriétaire, pastille arrondie (logo + « Fondateur de Civ'Art » + « Studio créatif · Abidjan ») remise dans la ligne Accueil / Projets / Parcours ; sous 1320 px (et sur mobile) elle laisse place à la ligne sous le nom, pour ne pas toucher le nom ni faire déborder l'en-tête.
- 2026-11-24 : pastille et ligne « Fondateur de Civ'Art » cliquables vers https://linktr.ee/civart.ci (nouvel onglet, lien vérifié : 200).

## v9 (2026-11-27) : cartes et pages projet
- Inspiré de la page Projets de référence (adelynnemalubay.vercel.app) : capture dégagée en haut de la carte, bloc clair en dessous avec catégorie, client, titre, description, outils, bouton « Voir le projet » (page détail) et lien principal (site, vidéo, Behance, Figma, code ou démo). Même carte dans le carrousel de l'accueil et la grille /projets/.
- Une page statique par projet (/projets/<clé>/, 31 pages, dans le sitemap, contrôlées par scripts/check.mjs) : titre, description, grand visuel (vidéo jouée à l'écran), outils, tous les liens, « Le défi / La réponse / Le résultat » pour 7 projets phares (Markodience, GESCOM, AquaPay, PrixCI, IVERT, ONG AICHA, Novembre Bleu), puis 3 autres projets.
- Textes « défi / réponse / résultat » rédigés d'après les projets : à valider par le propriétaire (aucun chiffre ajouté). Corrigé avant envoi : titres de la page détail invisibles en mode sombre.
- Pas d'année affichée : aucune source fiable pour la date de chaque projet.
- 2026-11-27 : sites web (Markodience, Kerya, ONG AICHA, site AquaPay) affichés en capture entière 16:10 dans le cadre de navigateur, sans recadrage ; captures refaites en ligne à 1440 × 900 (×2) pour Markodience, Kerya et ONG AICHA (Kerya montre sa fenêtre « Installer l'application ») ; image Markodience recadrée supprimée.
- 2026-11-27 (suite) : à la demande du propriétaire (référence adelynnemalubay), visuels des 4 sites refaits en « page entière » : capture complète par Playwright (1440 px de large, toute la hauteur), assemblée en 1600 × 1200 (grande colonne pour le haut, le reste de la page à droite ; une colonne centrée pour les pages courtes). AquaPay : aquapay.vercel.app n'est pas le site du propriétaire (page espagnole « Bienvenido ») ; site capturé en local (npm run dev, sans modifier le projet). Étiquettes d'outils sur fond lavande.
- 2026-11-27 : Kateni : nouvelle capture fournie par le propriétaire (page Calendrier, après sa refonte) ; boutons réservés au propriétaire (Share, GitHub, « Manage app ») retirés ; carte en visuel image au lieu du logo.
- 2026-11-27 (fin) : le propriétaire voulait simplement le site bord à bord, comme la référence : zone image des cartes passée en 16:10, et pour les 4 sites le premier écran (1440 × 900) sans fond ni cadre ni colonnes. L'assemblage en colonnes est abandonné.

## v9.1 (2026-11-27) : corrections après l'audit
- Parcours : « Fondateur de Civ'Art » en tête (date de création inconnue : affiché « Aujourd'hui ») ; Kerya / Wina Services expliqués.
- Services : noms en français dans la version FR, anglais correct (« Motion design & video » au lieu de « Motions & Animations »).
- Projet à la une : Markodience (en ligne) à la place d'AquaPay (pas encore en ligne).
- LinkedIn ajouté au contact et au pied de page ; Civ'Art (Linktree) dans le pied de page.
- Bouton « Devis gratuit » dans l'accueil : WhatsApp avec message prérempli.

## v9.2 (2026-11-27) : galerie Design graphique
- Nouvelle page `/design-graphique/` : 125 visuels (flyers, affiches, carrousels, kakémonos, photocalls, e-books, logos) répartis en 10 catégories, avec filtres, une mosaïque et une vue agrandie (clavier : flèches, Échap). Aucun lien externe (pas de Mega).
- Visuels issus du dossier `design` du Bureau, convertis en WebP (1400 px max, 2000 px pour les kakémonos), 14 Mo au total ; première page des PDF ; un doublon écarté. Données dans `app/designs.js`.
- Compétences : cartes au format des projets (visuel dégagé, texte sur fond clair) avec un lien « Voir les réalisations » (Design graphique vers la galerie, les autres vers les filtres de /projets/).
- Bandeau vers la galerie en bas de /projets/ ; page ajoutée au sitemap et à `scripts/check.mjs`.
- Galerie réorganisée : une section par catégorie (titre, nombre, description), puis quatre familles de formats (verticaux, carrés, horizontaux, grand format vertical), chacune en grille régulière. Chaque visuel a un titre, un client et sa nature (affiche, bannière, mise en situation, menu...). Données : `client`, `title`, `k`, `f` dans `app/designs.js`.
- Galerie plus visible : entrée « Design » dans le menu et le pied de page, bandeau en haut de /projets/. Cartes agrandies : 3 par ligne (4 pour les grands formats verticaux, 2 sous 900 px, 1 sur mobile), image entière à ses propres proportions. Pastille Civ'Art compacte sous 1500 px pour laisser la place au menu.

## v9.3 (2026-11-28) : récits de projets
- Markodience, GESCOM et AquaPay : accroche, fiche (rôle, année, statut), récit en quatre chapitres et fonctions (`app/stories.js`). Les quatre autres récits gardent la forme défi / réponse / résultat.
- Faits tirés de la documentation des projets ; aucun partenaire ni donnée interne cités.
