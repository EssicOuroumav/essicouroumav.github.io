// Récits détaillés (faits tirés de la documentation de chaque projet ; rien d'inventé).
// tagline : accroche ; facts : rôle, année, statut ; chapters : situation, choix, difficulté, aujourd'hui ; features : fonctions.
const role = { fr: "Conception, design et développement assisté par l'IA", en: "Concept, design and AI-assisted development" };

export const caseStudies = {
  markodience: {
    tagline: { fr: "Toute la stratégie d'une marque, au même endroit.", en: "A brand's whole strategy, in one place." },
    facts: { role, year: "2026", status: { fr: "En ligne", en: "Live" } },
    chapters: [
      {
        h: { fr: "Trop de marques, trop de documents.", en: "Too many brands, too many documents." },
        p: {
          fr: "Un community manager suit souvent plusieurs marques à la fois. La stratégie est dans un document, le calendrier dans un autre, l'audit ailleurs. Markodience part de là : un seul espace par marque, de l'identité au rapport.",
          en: "A community manager often handles several brands at once. Strategy lives in one document, the calendar in another, the audit elsewhere. Markodience starts there: one space per brand, from identity to report.",
        },
      },
      {
        h: { fr: "L'IA propose, l'utilisateur garde la main.", en: "AI suggests, the user stays in control." },
        p: {
          fr: "L'IA prépare l'identité, les piliers, la tonalité et la ligne éditoriale. Mais une proposition ne suffit pas : chaque publication du calendrier se modifie, du jour au format, et on peut en ajouter ou en supprimer.",
          en: "AI prepares the identity, pillars, tone of voice and editorial plan. But a suggestion is not enough: every post in the calendar can be edited, from day to format, and posts can be added or removed.",
        },
      },
      {
        h: { fr: "Le résultat était prêt, l'écran disait le contraire.", en: "The result was ready, the screen said otherwise." },
        p: {
          fr: "Certaines générations affichaient « Connexion impossible » alors que le travail était terminé et décompté. J'ai séparé la demande du travail : l'IA travaille en arrière-plan et la page vient chercher le résultat. Une demande relancée ne compte qu'une seule fois.",
          en: "Some generations showed a connection error even though the work was done and counted. I separated the request from the work: AI runs in the background and the page fetches the result. A retried request only counts once.",
        },
      },
      {
        h: { fr: "Aujourd'hui.", en: "Today." },
        p: {
          fr: "Markodience est en ligne, avec des comptes, trois formules (Gratuit, Pro, Agence) et plus de 140 tests automatiques pour éviter les mauvaises surprises à chaque mise à jour.",
          en: "Markodience is live, with accounts, three plans (Free, Pro, Agency) and more than 140 automated tests to avoid surprises with each update.",
        },
      },
    ],
    features: [
      { fr: "Identité, piliers et tonalité de marque", en: "Brand identity, pillars and tone of voice" },
      { fr: "Ligne éditoriale entièrement modifiable", en: "Fully editable editorial plan" },
      { fr: "Audit, indicateurs et guide des lives", en: "Audit, metrics and live-session guide" },
      { fr: "Plusieurs marques dans un même compte", en: "Several brands in one account" },
    ],
  },
  gescom: {
    tagline: { fr: "Du premier message au paiement, même sans réseau.", en: "From first message to payment, even offline." },
    facts: { role, year: "2026", status: { fr: "En service chez Civ'Art", en: "In use at Civ'Art" } },
    chapters: [
      {
        h: { fr: "Un studio géré entre WhatsApp et la mémoire.", en: "A studio run between WhatsApp and memory." },
        p: {
          fr: "Les prospects arrivaient sur WhatsApp et les devis se faisaient à la main. Difficile de savoir qui relancer et ce qui restait à encaisser. J'ai construit l'outil dont mon propre studio avait besoin.",
          en: "Leads came in through WhatsApp and quotes were made by hand. It was hard to know who to follow up and what was left to collect. I built the tool my own studio needed.",
        },
      },
      {
        h: { fr: "Ne jamais attendre le réseau.", en: "Never wait for the network." },
        p: {
          fr: "Le choix le plus important : l'application lit et écrit d'abord dans l'appareil, puis synchronise quand la connexion revient. Même les PDF sont créés sur le téléphone, puis partagés sur WhatsApp.",
          en: "The most important choice: the app reads and writes on the device first, then syncs when the connection returns. Even PDFs are created on the phone, then shared on WhatsApp.",
        },
      },
      {
        h: { fr: "Une facture ne s'efface pas.", en: "An invoice is never erased." },
        p: {
          fr: "Une facture définitive ne se modifie pas et ne se supprime pas : on la corrige par un avoir numéroté. Un devis peut devenir une pro-forma ou une facture, en FCFA, euro, dollar ou dollar canadien.",
          en: "A final invoice cannot be edited or deleted: it is corrected with a numbered credit note. A quote can become a pro-forma or an invoice, in CFA francs, euros, US or Canadian dollars.",
        },
      },
      {
        h: { fr: "Aujourd'hui.", en: "Today." },
        p: {
          fr: "GESCOM est en service depuis novembre 2026, sur téléphone et ordinateur. L'outil continue d'évoluer avec le terrain : on peut maintenant créer un prospect en collant simplement un message WhatsApp.",
          en: "GESCOM has been in use since November 2026, on phone and desktop. It keeps evolving with real use: a lead can now be created simply by pasting a WhatsApp message.",
        },
      },
    ],
    features: [
      { fr: "Contacts, relances et parcours client", en: "Contacts, follow-ups and sales pipeline" },
      { fr: "Devis, pro-forma, factures et avoirs en PDF", en: "Quotes, pro-formas, invoices and credit notes as PDFs" },
      { fr: "Paiements, reçus et soldes par compte", en: "Payments, receipts and account balances" },
      { fr: "Projets et tableau de bord du mois", en: "Projects and monthly dashboard" },
    ],
  },
  aquapay: {
    tagline: { fr: "Payer l'eau que l'on consomme, depuis son téléphone.", en: "Pay for the water you use, from your phone." },
    facts: { role, year: "2026", status: { fr: "En test", en: "In testing" } },
    chapters: [
      {
        h: { fr: "Recharger son eau comme son crédit.", en: "Topping up water like phone credit." },
        p: {
          fr: "Avec un compteur prépayé, il faut acheter un code pour avoir de l'eau. AquaPay ramène cette démarche à trois étapes : choisir son compteur, payer, recevoir son code.",
          en: "With a prepaid meter, you buy a code to get water. AquaPay brings this down to three steps: choose the meter, pay, receive the code.",
        },
      },
      {
        h: { fr: "Montrer l'eau, pas seulement un montant.", en: "Show the water, not just an amount." },
        p: {
          fr: "Les mètres cubes parlent peu. Sur l'écran de recharge, un réservoir se remplit selon le volume acheté et donne la durée estimée.",
          en: "Cubic metres mean little to most people. On the top-up screen, a tank fills up with the volume purchased and shows how long it should last.",
        },
      },
      {
        h: { fr: "Dire clairement ce qui est estimé.", en: "Be clear about what is estimated." },
        p: {
          fr: "Les compteurs visés ne transmettent pas leur consommation. Plutôt que d'afficher un faux temps réel, l'application annonce une estimation, que l'on recale en recopiant le chiffre affiché sur le compteur.",
          en: "The target meters do not transmit consumption. Rather than showing fake real-time data, the app presents an estimate, which users adjust by copying the figure shown on the meter.",
        },
      },
      {
        h: { fr: "Aujourd'hui.", en: "Today." },
        p: {
          fr: "Le parcours complet a été testé sur un vrai téléphone, avec un paiement fictif : compte, compteur, paiement, code reçu. Il reste à brancher les vrais codes et à mettre le service en ligne.",
          en: "The full journey was tested on a real phone with a sandbox payment: account, meter, payment, code received. Connecting real codes and launching the service are still to come.",
        },
      },
    ],
    features: [
      { fr: "Recharge par Mobile Money en trois étapes", en: "Three-step Mobile Money top-up" },
      { fr: "Suivi des compteurs et historique", en: "Meter tracking and history" },
      { fr: "Demandes d'installation et de dépannage avec photo", en: "Installation and repair requests with photo" },
      { fr: "Français et anglais, consultation hors connexion", en: "French and English, offline viewing" },
    ],
  },
};
