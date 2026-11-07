# Revue de sécurité : portfolio Cisse Vamourou

Modèle : `docs/modeles/revue-securite-conception.md` du dépôt `starter`. Mise à jour : 2026-11-07 (lot 1 à 4).

## 1. Ce qu'il faut protéger
| Actif | Où | Pourquoi |
|---|---|---|
| Coordonnées du propriétaire | e-mail Gmail, WhatsApp, « Abidjan » (choix du propriétaire) | spam, usurpation |
| Données du CV non publiables | date de naissance, situation familiale, nationalité, adresse précise, nom et téléphone de la référence | vie privée du propriétaire et d'un tiers |
| Compte GitHub | publication par GitHub Actions | prise de contrôle = site défiguré |
| Dépôts de projets à rendre publics | Markodience, ong-aicha-site, prixci, ivert, kateni | secrets dans l'historique |

Pas de comptes, pas de paiement, pas d'IA, pas de fichiers déposés, pas de base.

## 2. Frontières de confiance
- Navigateur ↔ fichiers statiques GitHub Pages : aucune donnée envoyée par le visiteur.
- GitHub Actions ↔ dépôt : permissions `contents: read`, `pages: write`, `id-token: write` (preuve : `.github/workflows/deploy.yml`).

## 3. Points d'entrée publics
| Route | Protection | Preuve |
|---|---|---|
| `/` | statique, lecture seule | `curl` local : 200 |
| `/mentions-legales/` | statique | `curl` local : 200 |
| `/sitemap.xml`, `/robots.txt`, `/og.jpg`, `/icon.png` | statiques | `curl` local : 200 |
| adresse inconnue | `404.html` | `curl` local `/inconnu` : 404 |
Aucune route ne reçoit de donnée : pas de formulaire (`form-action 'none'` dans la CSP).

## 4. Cas d'abus
- [x] Inondation, devinette, coût, concurrence, liens secrets, fichiers, IDOR, CSRF, cookies, prise de compte : **sans objet** (pas de serveur, pas de compte, aucun cookie).
- [x] Injection : contenu statique écrit dans `app/data.js` ; seul `dangerouslySetInnerHTML` = script de thème constant (`app/layout.js`).
- [x] Code livré : pas de source maps (`productionBrowserSourceMaps: false`, `scripts/check.mjs` échoue sur un `.map`).
- [x] Données personnelles : `scripts/check.mjs` échoue si la date de naissance, la situation familiale, la nationalité ou la référence apparaissent dans `out/` (précondition prouvée : un faux fichier contenant « 1997 » a bien été signalé).
- [x] Chaîne d'approvisionnement : versions figées, `npm ci`, `postcss` forcé en 8.5.23 (`overrides`) ; `npm audit` : 0 vulnérabilité (2026-10-30).
- [ ] Liens externes : `rel="noopener noreferrer"` partout (relu dans le code, pas de test automatique).

## 5. Menaces (STRIDE)
| Menace | Protection | Risque restant |
|---|---|---|
| Usurpation | compte GitHub du propriétaire | activer la double authentification GitHub : **à vérifier** |
| Falsification | publication seulement par Actions sur `main` | — |
| Divulgation | check des données interdites | e-mail et WhatsApp publics par choix (spam) |
| Déni de service | CDN GitHub Pages | hors de notre contrôle |
| Élévation de privilèges | sans objet | — |

## 6. Constats
- F1 (moyen) Données du CV : corrigé, test `scripts/check.mjs`.
- F2 (faible) E-mail et numéro publics : accepté par le propriétaire.
- F3 (moyen) GitHub Pages n'autorise pas d'en-têtes HTTP : CSP en balise meta (`app/layout.js`), `unsafe-inline` nécessaire à l'export Next ; pas de `frame-ancestors` ni HSTS contrôlables. HTTPS forcé : **à vérifier** après publication.
- F4 (moyen) Dépendances : corrigé (`overrides`, audit vide).
- F5 (moyen) Renommage EssicOuroumav → cissevamourou : mettre à jour les skills et remotes locaux ; ne laisser personne reprendre l'ancien nom. **En attente.**
- F7 (élevé → faible) Dépôts à rendre publics : audit gitleaks 8.30.1 de **tout l'historique** (2026-11-07) :
  - prixci (13 commits), ivert (1), kateni (92) : **0 fuite**. Les fichiers `*.command` de kateni ne contiennent aucune valeur : ils lancent des scripts qui lisent la clé depuis le presse-papiers.
  - Markodience (91 commits) : 3 alertes = mot de passe de comptes de test jetables `@example.com` dans `scripts/rls-smoke.mjs` et `scripts/payments-race.mjs`. Faux positif si ce mot de passe ne sert nulle part ailleurs : **à confirmer par le propriétaire**.
  - ong-aicha-site (37 commits) : 1 alerte = fausse clé `sk_live_…` dans `tests/errors.test.ts` (test du masquage des erreurs). Faux positif.
  - Passage en public : seulement après l'accord explicite du propriétaire, dépôt par dépôt.

## 7. Non couvert
Comportement des services tiers (Behance, WhatsApp, GitHub), essai d'intrusion, rendu sur le vrai téléphone du propriétaire.
