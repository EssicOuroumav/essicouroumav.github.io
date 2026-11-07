// Contenu du portfolio. Chaque texte a sa version française (fr) et anglaise (en).
// Ajouter un projet = ajouter une entrée dans `projects` (image dans public/images/projects/).

export const SITE_URL = "https://essicouroumav.github.io";

export const profile = {
  name: "Cisse Vamourou",
  email: "vamourou.ciisse@gmail.com",
  whatsapp: "https://wa.me/2250777543648",
  whatsappLabel: "+225 07 77 54 36 48",
  behance: "https://www.behance.net/essicouroumav",
  photo: "/images/cisse-vamourou.jpg",
  experienceYears: 3,
  coords: "5.36° N · 4.01° W",
  timeZone: "Africa/Abidjan",
};

// Filtres de la grille de projets, dans l'ordre d'affichage.
export const categories = ["web", "uiux", "motion", "branding", "print"];

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
    image: "/videos/civart.jpg",
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

// visual : "browser" = capture de site dans un cadre de navigateur ; "image" = visuel plein cadre ;
// "brand" = logo sur fond de couleur ; "video" = boucle muette (video + poster dans public/videos/).
// featured : affiché dans l'index de l'accueil.
const MEGA = "https://mega.nz/folder/raAhBDbS#qW3neTURkLv3MXl07_U2Hw";

const motion = (key, title, client, fr, en, featured = false) => ({
  key,
  title,
  client,
  category: "motion",
  visual: "video",
  featured,
  video: `/videos/${key}.mp4`,
  poster: `/videos/${key}.jpg`,
  tags: ["Motion design", "DaVinci Resolve"],
  desc: { fr, en },
  links: { video: MEGA },
});

export const projects = [
  {
    key: "markodience",
    title: "Markodience",
    client: "SaaS",
    category: "web",
    visual: "browser",
    featured: true,
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
    key: "coupure-af",
    title: "Coupure AF",
    client: "Dashboard",
    category: "uiux",
    visual: "image",
    featured: true,
    image: "/images/projects/coupure-af.jpg",
    tags: ["Figma", "Dashboard", "UI"],
    desc: {
      fr: "Tableau de bord de signalement des coupures d'électricité : suivi des signalements citoyens, prise en charge et résolution.",
      en: "Power outage reporting dashboard: tracking citizen reports, assignment and resolution.",
    },
    links: { figma: "https://www.figma.com/design/3hiEXTUINIDBVY7tBaggld/Projet-nike?node-id=1104-532" },
  },
  motion("octobre-rose", "La Minute Rose", "ONG AICHA", "Film de sensibilisation au dépistage du cancer du sein pour Octobre Rose.", "Breast cancer screening awareness film for Pink October.", true),
  {
    key: "ivert",
    title: "IVERT",
    client: "Agritech",
    category: "uiux",
    visual: "image",
    featured: true,
    image: "/images/projects/ivert-cacao.jpg",
    logo: "/images/logos/ivert.png",
    tags: ["Figma", "Flutter", "TensorFlow Lite"],
    desc: {
      fr: "Diagnostic par IA, sans connexion, des maladies du cacao et de l'anacarde à partir d'une photo.",
      en: "Offline AI diagnosis of cocoa and cashew diseases from a single photo.",
    },
    links: { figma: "https://www.figma.com/design/RvoSoU2NLOxhpIU01OkVSc/IVERT?node-id=84-2" },
  },
  {
    key: "obraise",
    title: "O'Braisé chez Camara",
    client: "Restaurant",
    category: "branding",
    visual: "image",
    featured: true,
    image: "/images/projects/obraise.jpg",
    tags: ["Identité visuelle", "Logo"],
    desc: {
      fr: "Identité visuelle d'un restaurant de braisés : logo, sous-bocks, gobelets et supports.",
      en: "Visual identity for a grill restaurant: logo, coasters, cups and brand materials.",
    },
    links: { behance: "https://www.behance.net/gallery/256437501/IDENTITE-VISUELLE-0BRAISE-CHEZ-CAMARA" },
  },
  motion("civart", "Civ'Art Studio", "Civ'Art", "Film de présentation du studio : motion design, vidéo et identité.", "Studio showreel: motion design, video and identity.", true),
  {
    key: "ong-aicha",
    title: "ONG AICHA",
    client: "ONG",
    category: "web",
    visual: "browser",
    featured: true,
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
    key: "verdi",
    title: "VERDI",
    client: "Mode",
    category: "branding",
    visual: "image",
    featured: true,
    image: "/images/projects/verdi.jpg",
    tags: ["Brand guidelines", "Identité"],
    desc: {
      fr: "Charte graphique et identité visuelle complète de la marque VERDI.",
      en: "Brand guidelines and complete visual identity for the VERDI brand.",
    },
    links: { behance: "https://www.behance.net/gallery/240415357/VERDI-Brand-Guidelines-Visual-Identity" },
  },
  {
    key: "kerya",
    title: "Kerya",
    client: "EdTech",
    category: "web",
    visual: "browser",
    image: "/images/projects/kerya.jpg",
    tags: ["Vibe coding", "IA", "Vercel"],
    desc: {
      fr: "Plateforme de formation au Prompt Engineering : 9 modules, environ 12 h de contenu, exercices corrigés par l'IA.",
      en: "Prompt Engineering training platform: 9 modules, about 12 hours of content, AI-graded exercises.",
    },
    links: { site: "https://kerya.vercel.app" },
  },
  {
    key: "ivert-dechets",
    title: "IVERT Recyclage",
    client: "GreenTech",
    category: "uiux",
    visual: "image",
    image: "/images/projects/ivert-dechets.jpg",
    tags: ["Figma", "Application mobile"],
    desc: {
      fr: "Application écologique de tri et de collecte des déchets : carte des points de collecte, QR code de dépôt, points et récompenses.",
      en: "Eco app for sorting and collecting waste: collection-point map, drop-off QR code, points and rewards.",
    },
    links: { figma: "https://www.figma.com/design/n0cWGXthMHX2YFNGH3yFyA/IVERT?node-id=0-1" },
  },
  {
    key: "essic-fitness",
    title: "Essic Fitness+",
    client: "Sport",
    category: "uiux",
    visual: "image",
    image: "/images/projects/essic-fitness.jpg",
    tags: ["UI/UX", "Figma", "E-commerce"],
    desc: {
      fr: "Coaching personnalisé et vente de matériel de sport : site, boutique et espace adhérent.",
      en: "Personal coaching and sports equipment store: website, shop and member area.",
    },
    links: {
      figma: "https://www.figma.com/design/zAypvjRI3DhfEbd4LmLmIH/Essic-Fitness--?node-id=1-2",
      behance: "https://www.behance.net/gallery/248433957/Refonte-Apple-Fitness-Essic-Fitness",
    },
  },
  {
    key: "prixci",
    title: "PrixCI",
    client: "Civic tech",
    category: "web",
    visual: "brand",
    tint: "#1D6B3C",
    logo: "/images/logos/prixci.png",
    tags: ["React Native", "Expo", "Supabase"],
    desc: {
      fr: "Application mobile citoyenne pour consulter et signaler les prix des denrées et des transports à Abidjan, même hors ligne.",
      en: "Civic mobile app to check and report food and transport prices in Abidjan, even offline.",
    },
    links: {},
  },
  {
    key: "kateni",
    title: "Kateni",
    client: "Data",
    category: "web",
    visual: "brand",
    tint: "#A3111B",
    logo: "/images/logos/kateni.png",
    tags: ["Python", "Streamlit", "Data"],
    desc: {
      fr: "Application d'analyse et de prédiction de matchs de football à partir des statistiques et des cotes.",
      en: "Football match analysis and prediction app built on statistics and betting odds.",
    },
    links: {},
  },
  motion("vague-rose", "Vague Rose", "ONG AICHA", "Campagne vidéo Octobre Rose : « Femmes, prenez soin de vous ».", "Pink October video campaign: \"Women, take care of yourselves\"."),
  motion("spot-depigmentation", "Spot dépigmentation", "ONG AICHA", "Spot de sensibilisation aux risques de la dépigmentation de la peau.", "Awareness spot on the risks of skin bleaching."),
  motion("ong-aicha-don", "Faire un don", "ONG AICHA", "Vidéo de promotion du don en ligne sur le site de l'ONG.", "Promo video for online donations on the NGO website."),
  motion("nova-dermax-nouvel-an", "Promo Nouvel An", "Nova Dermax", "Vidéo promotionnelle des offres du Nouvel An d'un cabinet de dermatologie.", "New Year offers promo video for a dermatology clinic."),
  motion("nova-dermax-services", "Nos soins", "Nova Dermax", "Présentation vidéo des soins du cabinet Nova Dermax.", "Video showcase of the Nova Dermax clinic's treatments."),
  motion("gomycode", "GOMYCODE", "GOMYCODE", "Vidéo de présentation des formations GOMYCODE.", "Video showcasing GOMYCODE's training programs."),
  motion("odc-portail", "Portail ODC", "Orange Digital Center", "Motion design de présentation du portail de formations Orange Digital Center.", "Motion design presenting the Orange Digital Center training portal."),
  motion("mtn-skills-academy", "MTN Skills Academy", "MTN", "Motion design de présentation des cours gratuits de MTN Skills Academy.", "Motion design presenting MTN Skills Academy's free courses."),
  motion("adyen", "Adyen", "Concept", "Motion design de présentation d'une plateforme de paiements.", "Motion design presenting a payments platform."),
  {
    key: "versatile-branding",
    title: "Versatile Branding",
    client: "Nova Dermax",
    category: "branding",
    visual: "image",
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
    title: "The Beauty Shop",
    client: "Cosmétique",
    category: "branding",
    visual: "image",
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
    client: "Parfumerie",
    category: "print",
    visual: "image",
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
    title: { fr: "Formations médicales", en: "Medical training" },
    client: "Santé",
    category: "print",
    visual: "image",
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
    title: "Modern Covers",
    client: "Édition",
    category: "print",
    visual: "image",
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
  { key: "claude", name: "Claude Code", logo: "/images/tools/claude.png", desc: { fr: "Sites et applications avec l'IA", en: "AI-assisted websites and apps" } },
  { key: "figma", name: "Figma", logo: "/images/tools/figma.png", desc: { fr: "Maquettes UI/UX et prototypes", en: "UI/UX mockups and prototypes" } },
  { key: "davinciresolve", name: "DaVinci Resolve", logo: "/images/tools/davinci-resolve.png", desc: { fr: "Montage, étalonnage et motion", en: "Editing, grading and motion" } },
  { key: "capcut", name: "CapCut", logo: "/images/tools/capcut.png", desc: { fr: "Vidéos courtes pour les réseaux", en: "Short-form social videos" } },
  { key: "affinitydesigner", name: "Affinity Designer", logo: "/images/tools/affinity-designer.png", desc: { fr: "Logos et identités visuelles", en: "Logos and visual identities" } },
  { key: "meta", name: "Meta Ads", logo: "/images/tools/meta-ads.png", desc: { fr: "Campagnes Facebook et Instagram", en: "Facebook and Instagram campaigns" } },
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
