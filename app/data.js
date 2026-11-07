// Contenu du portfolio. Chaque texte a sa version française (fr) et anglaise (en).
// Ajouter un projet = ajouter une entrée dans `projects` (image dans public/images/projects/).

export const SITE_URL = "https://cissevamourou.github.io";

export const profile = {
  name: "Cisse Vamourou",
  email: "vamourou.ciisse@gmail.com",
  whatsapp: "https://wa.me/2250777543648",
  whatsappLabel: "+225 07 77 54 36 48",
  behance: "https://www.behance.net/essicouroumav",
  photo: "/images/cisse-vamourou.jpg",
  since: 2021,
};

// Filtres de la grille de projets, dans l'ordre d'affichage.
export const categories = ["web", "uiux", "branding", "print", "motion"];

export const services = [
  {
    key: "graphic",
    title: { fr: "Graphic Design", en: "Graphic Design" },
    desc: {
      fr: "Affiches, flyers, carrousels et supports print qui captent l'attention et respectent votre identité.",
      en: "Posters, flyers, carousels and print materials that grab attention and stay true to your identity.",
    },
    image: "/images/projects/print-medical.jpg",
  },
  {
    key: "uiux",
    title: { fr: "UI/UX Design", en: "UI/UX Design" },
    desc: {
      fr: "Des interfaces claires et évolutives pour applications mobiles, tableaux de bord et sites web, conçues sur Figma.",
      en: "Clear, scalable interfaces for mobile apps, dashboards and websites, designed in Figma.",
    },
    image: "/images/projects/essic-fitness.jpg",
  },
  {
    key: "web",
    title: { fr: "Web Design & Dev", en: "Web Design & Dev" },
    desc: {
      fr: "Sites et applications web rapides, du design au déploiement, développés avec l'IA (Claude Code).",
      en: "Fast websites and web apps, from design to deployment, built with AI (Claude Code).",
    },
    image: "/images/projects/markodience.jpg",
  },
  {
    key: "motion",
    title: { fr: "Motions & Animations", en: "Motions & Animations" },
    desc: {
      fr: "Vidéos promotionnelles, motion design et titres animés montés sur DaVinci Resolve.",
      en: "Promotional videos, motion design and animated titles edited in DaVinci Resolve.",
    },
    image: "/images/projects/covers.jpg",
  },
  {
    key: "social",
    title: { fr: "Gestion des réseaux sociaux", en: "Social Media Management" },
    desc: {
      fr: "Ligne éditoriale, publications, animation de communauté et suivi des performances (Meta Business Suite).",
      en: "Editorial planning, publishing, community management and performance tracking (Meta Business Suite).",
    },
    image: "/images/projects/ong-aicha.jpg",
  },
];

// visual : "shot" = capture ou visuel plein cadre ; "logo" = logo centré sur fond de couleur.
export const projects = [
  {
    key: "markodience",
    title: "Markodience",
    category: "web",
    visual: "shot",
    image: "/images/projects/markodience.jpg",
    logo: "/images/logos/markodience.png",
    tags: ["Next.js", "Supabase", "IA"],
    desc: {
      fr: "Plateforme pour community managers : stratégie de marque, ligne éditoriale, audit et reporting assistés par l'IA.",
      en: "Platform for community managers: brand strategy, editorial planning, audits and reporting assisted by AI.",
    },
    links: { site: "https://markodience.vercel.app" },
  },
  {
    key: "ong-aicha",
    title: "ONG AICHA",
    category: "web",
    visual: "shot",
    image: "/images/projects/ong-aicha.jpg",
    logo: "/images/logos/ong-aicha.png",
    tags: ["Next.js", "Prisma", "FR / EN / AR"],
    desc: {
      fr: "Site associatif trilingue avec dons en ligne, parrainage et espace d'administration.",
      en: "Trilingual non-profit website with online donations, sponsorship and an admin area.",
    },
    links: { site: "https://ong-aicha-site.vercel.app" },
  },
  {
    key: "kerya",
    title: "Kerya",
    category: "web",
    visual: "shot",
    image: "/images/projects/kerya.jpg",
    tags: ["Vibe coding", "IA", "Vercel"],
    desc: {
      fr: "Plateforme de formation au Prompt Engineering : 9 modules, environ 12 h de contenu, exercices corrigés par l'IA.",
      en: "Prompt Engineering training platform: 9 modules, about 12 hours of content, AI-graded exercises.",
    },
    links: { site: "https://kerya.vercel.app" },
  },
  {
    key: "prixci",
    title: "PrixCI",
    category: "web",
    visual: "logo",
    tint: "#E8F5EC",
    logo: "/images/logos/prixci.png",
    tags: ["React Native", "Expo", "Supabase"],
    desc: {
      fr: "Application mobile citoyenne pour consulter et signaler les prix des denrées et des transports à Abidjan, même hors ligne.",
      en: "Civic mobile app to check and report food and transport prices in Abidjan, even offline.",
    },
    links: {},
  },
  {
    key: "ivert",
    title: "IVERT",
    category: "web",
    visual: "logo",
    tint: "#EEF3E6",
    logo: "/images/logos/ivert.png",
    tags: ["Flutter", "TensorFlow Lite", "UI/UX"],
    desc: {
      fr: "Diagnostic par IA, sans connexion, des maladies du cacao et de l'anacarde à partir d'une photo.",
      en: "Offline AI diagnosis of cocoa and cashew diseases from a single photo.",
    },
    links: {},
  },
  {
    key: "kateni",
    title: "Kateni",
    category: "web",
    visual: "logo",
    tint: "#FBE9E9",
    logo: "/images/logos/kateni.png",
    tags: ["Python", "Streamlit", "Data"],
    desc: {
      fr: "Application d'analyse et de prédiction de matchs de football à partir des statistiques et des cotes.",
      en: "Football match analysis and prediction app built on statistics and betting odds.",
    },
    links: {},
  },
  {
    key: "essic-fitness",
    title: "Essic Fitness+",
    category: "uiux",
    visual: "shot",
    image: "/images/projects/essic-fitness.jpg",
    tags: ["UI/UX", "Figma"],
    desc: {
      fr: "Refonte de l'expérience Apple Fitness+ : parcours, écrans et identité visuelle.",
      en: "A redesign of the Apple Fitness+ experience: user flows, screens and visual identity.",
    },
    links: { behance: "https://www.behance.net/gallery/248433957/Refonte-Apple-Fitness-Essic-Fitness" },
  },
  {
    key: "obraise",
    title: "O'Braisé chez Camara",
    category: "branding",
    visual: "shot",
    image: "/images/projects/obraise.jpg",
    tags: ["Identité visuelle", "Logo"],
    desc: {
      fr: "Identité visuelle d'un restaurant de braisés : logo, sous-bocks, gobelets et supports.",
      en: "Visual identity for a grill restaurant: logo, coasters, cups and brand materials.",
    },
    links: { behance: "https://www.behance.net/gallery/256437501/IDENTITE-VISUELLE-0BRAISE-CHEZ-CAMARA" },
  },
  {
    key: "verdi",
    title: "VERDI",
    category: "branding",
    visual: "shot",
    image: "/images/projects/verdi.jpg",
    tags: ["Brand guidelines", "Identité"],
    desc: {
      fr: "Charte graphique et identité visuelle complète de la marque VERDI.",
      en: "Brand guidelines and complete visual identity for the VERDI brand.",
    },
    links: { behance: "https://www.behance.net/gallery/240415357/VERDI-Brand-Guidelines-Visual-Identity" },
  },
  {
    key: "versatile-branding",
    title: "Versatile Branding",
    category: "branding",
    visual: "shot",
    image: "/images/projects/versatile-branding.jpg",
    tags: ["Branding", "Système visuel"],
    desc: {
      fr: "Un même cadre graphique décliné pour plusieurs marques, dont Nova Dermax.",
      en: "One shared visual framework adapted to several brands, including Nova Dermax.",
    },
    links: { behance: "https://www.behance.net/gallery/247505103/Versatile-Branding-The-Power-of-a-Shared-Framework" },
  },
  {
    key: "beauty-shop",
    title: "The Beauty Shop Cosmetics",
    category: "branding",
    visual: "shot",
    image: "/images/projects/beauty-shop.jpg",
    tags: ["Packaging", "Branding"],
    desc: {
      fr: "Identité et packaging d'une gamme de cosmétiques.",
      en: "Identity and packaging for a cosmetics range.",
    },
    links: { behance: "https://www.behance.net/gallery/240166029/The-Beauty-Shop-Cosmetics" },
  },
  {
    key: "ekm",
    title: "EKM Senteurs de Luxe",
    category: "print",
    visual: "shot",
    image: "/images/projects/ekm.jpg",
    tags: ["Flyers", "Campagne"],
    desc: {
      fr: "Visuels de campagne et flyers promotionnels pour une marque de parfums.",
      en: "Campaign visuals and promotional flyers for a fragrance brand.",
    },
    links: { behance: "https://www.behance.net/gallery/240455241/EKM-Senteurs-de-Luxe" },
  },
  {
    key: "print-medical",
    title: { fr: "Supports print, formations médicales", en: "Print materials, medical training" },
    category: "print",
    visual: "shot",
    image: "/images/projects/print-medical.jpg",
    tags: ["Affiches", "Print"],
    desc: {
      fr: "Collection d'affiches et de supports pour des ateliers de formation médicale.",
      en: "A collection of posters and materials for medical training workshops.",
    },
    links: { behance: "https://www.behance.net/gallery/240209603/Collection-de-Supports-Print-Formations-Mdicales" },
  },
  {
    key: "covers",
    title: "Modern Cover Design Collection",
    category: "print",
    visual: "shot",
    image: "/images/projects/covers.jpg",
    tags: ["Couvertures", "E-books"],
    desc: {
      fr: "Modèles de couvertures d'e-books pour produits numériques.",
      en: "E-book cover templates for digital products.",
    },
    links: { behance: "https://www.behance.net/gallery/251970933/Modern-Cover-Design-Collection" },
  },
];

export const tools = [
  { key: "claude", name: "Claude Code", desc: { fr: "Développement web et applications avec l'IA", en: "AI-assisted web and app development" } },
  { key: "figma", name: "Figma", desc: { fr: "Maquettes UI/UX et prototypes", en: "UI/UX mockups and prototypes" } },
  { key: "affinitydesigner", name: "Affinity Designer", desc: { fr: "Logos, identités et illustrations vectorielles", en: "Logos, identities and vector illustration" } },
  { key: "davinciresolve", name: "DaVinci Resolve", desc: { fr: "Montage vidéo et motion design", en: "Video editing and motion design" } },
];

export const journey = [
  {
    when: { fr: "2021 – aujourd'hui", en: "2021 – present" },
    title: { fr: "Designer graphique & Community Manager", en: "Graphic Designer & Community Manager" },
    place: { fr: "ONG AICHA, Port-Bouët (bénévolat)", en: "ONG AICHA, Port-Bouët (volunteer)" },
    desc: {
      fr: "Vidéos, affiches et carrousels pour les campagnes de sensibilisation et de collecte de fonds, gestion des communautés Facebook et Instagram, rapports de performance.",
      en: "Videos, posters and carousels for awareness and fundraising campaigns, Facebook and Instagram community management, performance reports.",
    },
  },
  {
    when: { fr: "Fév. – avr. 2023", en: "Feb. – Apr. 2023" },
    title: { fr: "Assistant Community Manager", en: "Assistant Community Manager" },
    place: { fr: "Web Services, Yopougon", en: "Web Services, Yopougon" },
    desc: {
      fr: "Promotion de l'image de marque, création et fidélisation de communautés, analyse des audiences et veille de l'e-réputation.",
      en: "Brand promotion, community building and retention, audience analysis and e-reputation monitoring.",
    },
  },
  {
    when: { fr: "Projets", en: "Projects" },
    title: { fr: "Kerya et Wina Services", en: "Kerya and Wina Services" },
    place: { fr: "Projets créatifs", en: "Creative projects" },
    desc: {
      fr: "Conception d'une plateforme de formation au Prompt Engineering, et supports de branding personnel et contenus pédagogiques pour un programme de coaching en 6 modules.",
      en: "Built a Prompt Engineering training platform, and created personal branding materials and course content for a 6-module coaching program.",
    },
  },
  {
    when: { fr: "2020 – 2022", en: "2020 – 2022" },
    title: { fr: "BTS Gestion Commerciale", en: "BTS in Business Management" },
    place: { fr: "CBCG CI", en: "CBCG CI" },
    desc: { fr: "", en: "" },
  },
];

export const certifications = [
  { fr: "Marketing Digital, Orange Digital Center / Coursera", en: "Digital Marketing, Orange Digital Center / Coursera" },
  { fr: "Intelligence Artificielle, Orange Digital Center / Coursera", en: "Artificial Intelligence, Orange Digital Center / Coursera" },
  { fr: "Appliquer l'IA : analyser les avis des clients, Cybastion IT Academy", en: "Applied AI: analysing customer reviews, Cybastion IT Academy" },
  { fr: "Informatique & équipements mobiles, Cisco Networking Academy", en: "IT & mobile devices, Cisco Networking Academy" },
];
