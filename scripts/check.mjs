// Contrôles avant publication, lancés après `npm run build` (aussi dans GitHub Actions).
// 1. dictionnaires FR/EN identiques ; 2. chaque texte { fr, en } complet ;
// 3. dans out/ : fichiers requis présents, aucune source map, aucun emoji, aucune donnée personnelle exclue, aucun secret.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { dict } from "../app/dict.js";
import * as data from "../app/data.js";

const errors = [];
const fail = (msg) => errors.push(msg);

// 1. Mêmes clés dans les deux langues, récursivement.
function keys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}${Array.isArray(v) ? `[${v.length}]` : ""}`],
  );
}
const fr = keys(dict.fr).sort().join("\n");
const en = keys(dict.en).sort().join("\n");
if (fr !== en) fail("dict.fr et dict.en n'ont pas les mêmes clés");

// 2. Tout objet { fr, en } du contenu doit avoir les deux langues.
function walk(v, path) {
  if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${path}[${i}]`));
  if (v && typeof v === "object") {
    if ("fr" in v || "en" in v) {
      if (typeof v.fr !== "string" || typeof v.en !== "string") fail(`traduction incomplète : ${path}`);
      return;
    }
    Object.entries(v).forEach(([k, x]) => walk(x, `${path}.${k}`));
  }
}
walk(data, "data");

// Chaque image référencée par le contenu existe.
const refs = JSON.stringify(data).match(/\/images\/[^"]+/g) || [];
for (const r of new Set(refs)) if (!existsSync(join("public", r))) fail(`image manquante : public${r}`);

// 3. Dossier exporté.
const OUT = "out";
if (!existsSync(OUT)) {
  fail("dossier out/ absent : lance npm run build");
} else {
  for (const f of ["index.html", "404.html", "mentions-legales/index.html", "sitemap.xml", "robots.txt", "og.jpg", "icon.png", "apple-icon.png", "images/clouds.jpg"]) {
    if (!existsSync(join(OUT, f))) fail(`fichier attendu absent : out/${f}`);
  }

  const files = [];
  const list = (dir) =>
    readdirSync(dir).forEach((n) => {
      const p = join(dir, n);
      statSync(p).isDirectory() ? list(p) : files.push(p);
    });
  list(OUT);

  // Données du CV qui ne doivent jamais être publiées, et motifs de secrets.
  const forbidden = [
    [/1997/, "date de naissance"],
    [/[Cc]élibataire/, "situation familiale"],
    [/Ivoirien/, "nationalité"],
    [/0707725982|07 07 72 59 82/, "téléphone de la référence"],
    [/Kourouma/, "nom de la référence"],
    [/sk-ant-|ghp_|gho_|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY/, "secret"],
  ];
  // Emoji et symboles typographiques utilisés comme icônes (règle : vraies icônes uniquement).
  const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}•✓✔×]/u;

  for (const f of files) {
    if (f.endsWith(".map")) fail(`source map publiée : ${f}`);
    if (!/\.(html|txt|xml|js|css|json)$/.test(f)) continue;
    const text = readFileSync(f, "utf8");
    for (const [re, label] of forbidden) if (re.test(text)) fail(`${label} trouvé dans ${f}`);
    if (/\.(html|txt)$/.test(f)) {
      const visible = text.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
      const m = visible.match(emoji);
      if (m) fail(`symbole ou emoji « ${m[0]} » dans ${f}`);
    }
  }
}

if (errors.length) {
  console.error(`Contrôle : ${errors.length} problème(s)\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("Contrôle : tout est conforme.");
