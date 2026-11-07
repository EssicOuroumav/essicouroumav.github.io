// Sous-dossier de publication (GitHub Pages de projet : /Portfolio). Vide en développement local.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Préfixe un chemin du dossier public/ ou une page du site.
export const withBase = (path) => `${BASE}${path}`;
