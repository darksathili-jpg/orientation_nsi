(() => {
  "use strict";

  const customGlyphs = {
    shield:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 5 39 11v12c0 11-7 18-15 22C16 41 9 34 9 23V11Z"/><path d="m16 24 6 6 11-13"/></svg>',
    brain:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 10c-5-6-15-2-14 6-8 4-6 14 0 16-1 8 9 12 14 6 5 6 15 2 14-6 6-2 8-12 0-16 1-8-9-12-14-6Z"/><path d="M24 10v28M15 17l5 4-5 5m18-9-5 4 5 5"/></svg>',
    code: '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="8" width="38" height="32" rx="6"/><path d="m19 18-7 6 7 6m10-12 7 6-7 6m-3-14-4 20"/></svg>',
    network:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="24" r="7"/><circle cx="9" cy="9" r="4"/><circle cx="39" cy="9" r="4"/><circle cx="9" cy="39" r="4"/><circle cx="39" cy="39" r="4"/><path d="m19 19-7-7m17 7 7-7M19 29l-7 7m17-7 7 7"/></svg>',
    graduate:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 17 20-10 20 10-20 10Z"/><path d="M12 22v11c7 7 17 7 24 0V22M44 17v16"/></svg>',
    rocket:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 31c1-13 11-23 25-25-2 14-12 24-25 25Z"/><circle cx="31" cy="17" r="4"/><path d="m17 31-7 7m8-20-9 2-4 10 12-2m13 1-2 12-10 4 2-9M8 40l-3 5 5-3"/></svg>',
    circuit:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="14" y="14" width="20" height="20" rx="3"/><path d="M20 20h8v8h-8zM19 6v8m10-8v8M19 34v8m10-8v8M6 19h8m-8 10h8m20-10h8m-8 10h8"/></svg>',
    puzzle:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 9h12c-2 7 8 7 6 0h12v12c-7-2-7 8 0 6v12H27c2-7-8-7-6 0H9V27c7 2 7-8 0-6Z"/></svg>',
    database:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="24" cy="11" rx="15" ry="6"/><path d="M9 11v25c0 8 30 8 30 0V11M9 23c0 8 30 8 30 0"/></svg>',
    architecture:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="29" y="5" width="14" height="14" rx="2"/><rect x="17" y="29" width="14" height="14" rx="2"/><path d="M12 19v5h12v5m12-10v5H24"/></svg>',
    cloud:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 36h25c11-1 10-17 0-18-3-13-21-13-25 0-12 0-13 18 0 18Z"/><path d="M24 25v16m-6-6 6 6 6-6"/></svg>',
    robot:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="10" y="15" width="28" height="24" rx="7"/><path d="M24 15V7m-4 0h8M10 25H5m33 0h5M17 32h14"/><circle cx="18" cy="24" r="2"/><circle cx="30" cy="24" r="2"/></svg>',
    search:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="21" cy="21" r="12"/><path d="m30 30 12 12M16 21h10m-5-5v10"/></svg>',
    flask:
      '<svg class="art-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 5h12m-9 0v15L10 38c-2 4 1 6 5 6h18c4 0 7-2 5-6L27 20V5M15 32h18"/></svg>',
  };
  const careers = [
    {
      icon: "shield",
      title: "Ingénieur cybersécurité",
      cat: "protection",
      status: "Perspectives favorables",
      desc: "Protéger les systèmes, enquêter sur les incidents et anticiper les attaques.",
      skills:
        "Réseaux, Linux, programmation, cryptographie, analyse des risques.",
      path: "BUT informatique ou réseaux et télécommunications → spécialisation sécurité / master / école d’ingénieurs.",
      why: "L’IA aide à détecter les menaces, mais elle crée aussi de nouveaux risques à maîtriser.",
    },
    {
      icon: "database",
      title: "Ingénieur en données",
      cat: "science",
      status: "Perspectives favorables",
      desc: "Construire des chaînes de données fiables qui alimentent les applications et les IA.",
      skills: "SQL, Python, bases de données, qualité des données, cloud.",
      path: "BUT ou licence informatique → master données ou école d’ingénieurs.",
      why: "Les modèles d’IA dépendent de données fiables, bien organisées et gouvernées.",
    },
    {
      icon: "brain",
      title: "Ingénieur en IA",
      cat: "science",
      status: "Perspectives favorables",
      desc: "Concevoir, adapter, tester et déployer des modèles d’intelligence artificielle.",
      skills:
        "Mathématiques, probabilités, Python, apprentissage automatique, évaluation.",
      path: "Licence informatique ou mathématiques → master IA / école d’ingénieurs.",
      why: "Les besoins progressent, mais les postes spécialisés exigent souvent une solide formation.",
    },
    {
      icon: "architecture",
      title: "Architecte logiciel",
      cat: "creation",
      status: "Métier d’expérience",
      desc: "Concevoir les structures techniques de logiciels fiables, évolutifs et sécurisés.",
      skills:
        "Algorithmique, conception logicielle, tests, systèmes distribués, sécurité.",
      path: "Formation informatique générale → expérience en développement → architecture.",
      why: "Produire du code ne suffit pas : les choix d’architecture engagent tout le système.",
    },
    {
      icon: "cloud",
      title: "Ingénieur cloud et systèmes",
      cat: "infrastructure",
      status: "Perspectives favorables",
      desc: "Faire fonctionner les serveurs, réseaux et services qui hébergent les applications.",
      skills: "Linux, réseaux, automatisation, supervision, sécurité, cloud.",
      path: "BUT informatique ou réseaux → spécialisation infrastructures.",
      why: "L’IA exige des ressources de calcul et des services disponibles et sûrs.",
    },
    {
      icon: "robot",
      title: "Ingénieur robotique",
      cat: "creation",
      status: "Piste industrielle solide",
      desc: "Programmer des systèmes qui interagissent avec le monde physique.",
      skills:
        "Programmation, électronique, capteurs, automatique, mathématiques.",
      path: "BUT GEII, informatique industrielle ou école d’ingénieurs.",
      why: "La combinaison logiciel + matériel + contraintes physiques ouvre des débouchés spécialisés.",
    },
    {
      icon: "code",
      title: "Développeur logiciel",
      cat: "creation",
      status: "À approfondir",
      desc: "Créer des applications, résoudre des problèmes et maintenir des logiciels.",
      skills:
        "Algorithmique, structures de données, Git, tests, architecture, IA assistée.",
      path: "BUT informatique, licence, BTS SIO ou école d’ingénieurs.",
      why: "Le code standard est davantage automatisable : comprendre, tester et concevoir devient crucial.",
    },
    {
      icon: "search",
      title: "Analyste de données",
      cat: "science",
      status: "À spécialiser",
      desc: "Explorer des données pour aider à prendre des décisions.",
      skills: "Statistiques, SQL, Python, visualisation, esprit critique.",
      path: "BUT ou licence avec statistiques et informatique, puis spécialisation.",
      why: "Les tableaux et analyses répétitives s’automatisent ; la qualité de l’interprétation reste décisive.",
    },
    {
      icon: "flask",
      title: "Ingénieur fiabilité IA",
      cat: "protection",
      status: "Spécialité émergente",
      desc: "Évaluer la robustesse, la sécurité et le comportement de systèmes d’IA.",
      skills:
        "Tests, statistiques, programmation, sécurité, méthodes d’évaluation.",
      path: "Formation informatique ou mathématiques → spécialisation IA, qualité et sécurité.",
      why: "Les organisations doivent contrôler les erreurs et risques des systèmes qu’elles déploient.",
    },
  ];

  // Coordonnées indicatives de campus : affichage pédagogique, pas navigation.
  const schoolOrigin = { lat: 50.3593, lon: 3.5265 }; // Coordonnées indicatives, adresse officielle : 20 boulevard Pater, 59300 Valenciennes
  // Implantations géographiques indicatives ; la localisation précise doit être vérifiée avant déplacement.
  const cards = document.querySelector("#careerCards");
  function render(filter = "all") {
    cards.replaceChildren();
    careers
      .filter((c) => filter === "all" || c.cat === filter)
      .forEach((c) => {
        const article = document.createElement("article");
        article.className = "card";
        const tags =
          c.status === "À approfondir" || c.status === "À spécialiser"
            ? "tag warn"
            : "tag";
        article.innerHTML = `<div class="icon" aria-hidden="true">${customGlyphs[c.icon]}</div><h3>${c.title}</h3><span class="${tags}">${c.status}</span><p>${c.desc}</p><button type="button" aria-expanded="false">Découvrir les missions et les études ＋</button><div class="detail"><p><strong>Compétences :</strong> ${c.skills}</p><p><strong>Parcours possible :</strong> ${c.path}</p><p><strong>Pourquoi ce métier évolue :</strong> ${c.why}</p></div>`;
        const b = article.querySelector("button");
        b.addEventListener("click", () => {
          const open = article.classList.toggle("open");
          b.setAttribute("aria-expanded", String(open));
          b.textContent = open
            ? "Refermer la fiche −"
            : "Découvrir les missions et les études ＋";
        });
        cards.append(article);
      });
  }
  render();
  document.querySelectorAll("[data-filter]").forEach((b) =>
    b.addEventListener("click", () => {
      document
        .querySelectorAll("[data-filter]")
        .forEach((x) => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
      render(b.dataset.filter);
    }),
  );
  document.querySelector("#profileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = new FormData(e.currentTarget).get("interest");
    const suggestions = {
      protection:
        "Explore les fiches « Ingénieur cybersécurité » et « Ingénieur fiabilité IA ».",
      creation:
        "Explore les fiches « Développeur logiciel », « Architecte logiciel » et « Ingénieur robotique ».",
      science:
        "Explore les fiches « Ingénieur en IA », « Ingénieur en données » et « Analyste de données ».",
      infrastructure:
        "Explore la fiche « Ingénieur cloud et systèmes » et les métiers des réseaux.",
    };
    document.querySelector("#result").textContent =
      (suggestions[v] || "Choisis une réponse.") +
      " Ce n’est qu’une piste : teste plusieurs univers !";
  });
  const schools = [
    {
      id: "artoislic",
      name: "Université d’Artois — licence informatique",
      city: "Lens · Faculté des sciences Jean Perrin",
      lat: 50.427,
      lon: 2.834,
      level: "bac",
      domains: ["logiciel", "ia"],
      program:
        "Licence informatique (3 ans après le bac) ; établissement public ; campus de Lens. Admission 2027 à vérifier.",
      url: "https://www.sciences.univ-artois.fr/licence-informatique",
    },
    {
      id: "ulcolic",
      name: "Université du Littoral Côte d’Opale — licence informatique",
      city: "Calais · site universitaire de la Mi-Voix",
      lat: 50.95,
      lon: 1.86,
      level: "bac",
      domains: ["logiciel", "cyber"],
      program:
        "Licence informatique (3 ans après le bac) ; établissement public ; site de la Mi-Voix à Calais. Admission 2027 à vérifier.",
      url: "https://www.univ-littoral.fr/formation/offre-de-formation/licences/licence-informatique/",
    },

    {
      id: "uphf",
      name: "Université Polytechnique Hauts-de-France",
      city: "Valenciennes · Mont Houy",
      lat: 50.328,
      lon: 3.513,
      level: "bac",
      domains: ["logiciel", "ia"],
      program:
        "Licence informatique (bac+3), puis poursuite possible en master",
      url: "https://formations.uphf.fr/fr/formations/licence-licence/licence-informatique-L06U2R2L.html",
      source: "Catalogue officiel UPHF",
    },
    {
      id: "insa",
      name: "INSA Hauts-de-France",
      city: "Valenciennes · Mont Houy",
      lat: 50.329,
      lon: 3.514,
      level: "suite",
      domains: ["logiciel", "robotique"],
      program:
        "Parcours d’ingénierie et licences, dont informatique et systèmes automatisés. Les modalités d’entrée varient selon la formation.",
      url: "https://www.uphf.fr/insa-hdf/formation/licences",
      source: "Site officiel INSA Hauts-de-France",
    },
    {
      id: "maubeuge",
      name: "IUT de Valenciennes — site de Maubeuge",
      city: "Maubeuge",
      lat: 50.279,
      lon: 3.97,
      level: "bac",
      domains: ["logiciel", "cyber"],
      program:
        "BUT informatique : réalisation d’applications ou déploiement d’applications communicantes et sécurisées (bac+3)",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/iut-de-valenciennes-campus-de-maubeuge-universite-polytechnique-hauts-de-france",
      source:
        "Onisep, établissement et deux parcours confirmés (consultation novembre 2026)",
    },
    {
      id: "lillebut",
      name: "IUT de Lille — Cité scientifique",
      city: "Villeneuve-d’Ascq",
      lat: 50.607,
      lon: 3.142,
      level: "bac",
      domains: ["logiciel", "ia", "robotique"],
      program:
        "BUT informatique et BUT génie électrique et informatique industrielle (GEII)",
      url: "https://iut.univ-lille.fr/formation/but",
      source: "Catalogue officiel IUT de Lille",
    },
    {
      id: "lillelic",
      name: "Université de Lille — informatique",
      city: "Villeneuve-d’Ascq",
      lat: 50.609,
      lon: 3.14,
      level: "bac",
      domains: ["logiciel", "ia", "cyber"],
      program:
        "Licence informatique ; poursuites en masters informatique, IA, données, cybersécurité et génie logiciel",
      url: "https://sciences-technologies.univ-lille.fr/informatique/FORMATIONS/",
      source: "Département informatique, Université de Lille",
    },
    {
      id: "polytech",
      name: "Polytech Lille",
      city: "Villeneuve-d’Ascq",
      lat: 50.606,
      lon: 3.138,
      level: "suite",
      domains: ["logiciel", "ia", "cyber"],
      program:
        "Ingénierie informatique et statistique ; internet des objets et cybersécurité (conditions d’accès à vérifier)",
      url: "https://informatique.univ-lille.fr/",
      source: "Portail officiel des formations informatiques de Lille",
    },
    {
      id: "wallon",
      name: "Lycée Henri Wallon — BTS SIO",
      city: "Valenciennes",
      lat: 50.3618,
      lon: 3.5257,
      level: "bac",
      domains: ["logiciel", "cyber"],
      program:
        "BTS SIO options SLAM et SISR (temps plein et apprentissage) ; CPGE MP2I et MPI.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-henri-wallon",
      source: "Onisep, fiche établissement",
    },
    {
      id: "dampierre",
      name: "Lycée Dampierre / Valarep — BTS SIO",
      city: "Valenciennes",
      lat: 50.3488,
      lon: 3.5109,
      level: "bac",
      domains: ["logiciel", "cyber"],
      program:
        "BTS SIO : options SISR (réseaux) et SLAM (logiciel), attestées par l’Onisep.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-dampierre",
      source:
        "Onisep — fiches des deux options SIO, consultées en novembre 2026",
    },
    {
      id: "hainaut",
      name: "Lycée du Hainaut — parcours techniques",
      city: "Valenciennes",
      lat: 50.3685,
      lon: 3.536,
      level: "bac",
      domains: ["robotique"],
      program:
        "CPGE TSI et BTS électrotechnique ; pas de BTS SIO/CIEL dans la liste Onisep consultée",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-du-hainaut",
      source: "Onisep — fiche établissement, 20/11/2026",
    },
    {
      id: "gaston",
      name: "Lycée Gaston Berger — BTS SIO",
      city: "Lille",
      lat: 50.617,
      lon: 3.066,
      level: "bac",
      domains: ["logiciel", "cyber"],
      program: "BTS SIO options SISR et SLAM, temps plein ou apprentissage.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-gaston-berger",
      source: "Annuaire Onisep / lycée",
    },
    {
      id: "malraux",
      name: "Lycée André Malraux",
      city: "Béthune",
      lat: 50.531,
      lon: 2.638,
      level: "bac",
      domains: ["logiciel", "cyber", "robotique"],
      program:
        "BTS SIO options SISR et SLAM ; BTS CIEL option informatique et réseaux ; BTS conception et réalisation de systèmes automatiques.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/pas-de-calais/lycee-general-et-technologique-andre-malraux",
      source:
        "Aucune fiche locale établissement-formation confirmée, 20/11/2026",
    },
    {
      id: "guymollet",
      name: "Lycée Guy Mollet",
      city: "Arras",
      lat: 50.286,
      lon: 2.783,
      level: "bac",
      domains: ["logiciel", "cyber"],
      program: "BTS SIO options SISR et SLAM ; CPGE MP2I puis MPI.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/pas-de-calais/lycee-polyvalent-guy-mollet",
      source: "Onisep — fiche établissement, 2026",
    },
    {
      id: "saintjoseph",
      name: "Campus Saint-Joseph",
      city: "Saint-Martin-Boulogne",
      lat: 50.728,
      lon: 1.631,
      level: "bac",
      domains: ["logiciel", "cyber", "robotique"],
      program:
        "Offre numérique post-bac non confirmée pour le campus de Saint-Martin-Boulogne ; attention aux établissements homonymes",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/pas-de-calais/lycee-polyvalent-prive-et-campus-saint-joseph",
      source:
        "Aucune fiche locale établissement-formation confirmée, 20/11/2026",
    },
    {
      id: "jeanbart",
      name: "Lycée Jean Bart",
      city: "Dunkerque",
      lat: 51.036,
      lon: 2.378,
      level: "bac",
      domains: ["logiciel", "cyber"],
      program:
        "BTS SIO options SISR et SLAM, temps plein ; CPGE scientifiques MPSI, PCSI, MP, PC*, PSI",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-jean-bart",
      source: "Onisep — fiche établissement et BTS SIO, 20/11/2026",
    },
    {
      id: "saintremi",
      name: "Lycée Saint-Rémi",
      city: "Roubaix",
      lat: 50.69,
      lon: 3.171,
      level: "bac",
      domains: ["logiciel", "cyber"],
      program: "BTS SIO : options SISR et SLAM, attestées par l’Onisep.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-saint-remi",
      source: "Onisep — fiche établissement, 2026",
    },
    {
      id: "ndgrace",
      name: "Lycée Notre-Dame de Grâce",
      city: "Maubeuge",
      lat: 50.279,
      lon: 3.973,
      level: "bac",
      domains: ["cyber", "logiciel"],
      program:
        "BTS SIO option SISR, en apprentissage ; CPGE MPSI/MP et cycles préparatoires associés",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-notre-dame-de-grace",
      source: "Onisep — fiche établissement et BTS SIO, 20/11/2026",
    },
    {
      id: "lens",
      name: "IUT de Lens — Université d’Artois",
      city: "Lens",
      lat: 50.427,
      lon: 2.834,
      level: "bac",
      domains: ["logiciel", "ia"],
      program:
        "BUT informatique, parcours réalisation d’applications : conception, développement, validation.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/pas-de-calais/iut-de-lens-universite-d-artois",
      source: "Onisep — fiche établissement, 2026",
    },
    {
      id: "calais",
      name: "IUT du Littoral — Calais",
      city: "Calais",
      lat: 50.95,
      lon: 1.86,
      level: "bac",
      domains: ["logiciel", "ia", "cyber", "robotique"],
      program:
        "BUT informatique (parcours applications, données et déploiement sécurisé) ; BUT GEII électronique et systèmes embarqués.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/pas-de-calais/iut-du-littoral-de-calais-universite-du-littoral-cote-d-opale",
      source: "Onisep — fiche établissement, 2026",
    },
    {
      id: "saintluc",
      name: "Lycée Saint-Luc — BTS SIO",
      city: "Cambrai",
      lat: 50.176,
      lon: 3.235,
      level: "bac",
      domains: ["logiciel"],
      program:
        "BTS SIO option SLAM, formation de deux ans attestée par l’Onisep. Frais de scolarité à consulter sur la fiche officielle.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-saint-luc/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers",
      source: "Onisep — fiche de formation, consultée en novembre 2026",
    },
    {
      id: "baggio",
      name: "Lycée César Baggio — BTS CIEL",
      city: "Lille",
      lat: 50.629,
      lon: 3.058,
      level: "bac",
      domains: ["cyber", "robotique"],
      program:
        "BTS CIEL options informatique et réseaux ET électronique et réseaux ; CPGE PTSI et PCSI.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-cesar-baggio",
      source: "Onisep — liste des établissements proposant le BTS CIEL",
    },
    {
      id: "lemonnier",
      name: "Lycée Élisa Lemonnier — BTS CIEL",
      city: "Douai",
      lat: 50.37,
      lon: 3.08,
      level: "bac",
      domains: ["cyber", "robotique"],
      program:
        "BTS CIEL option électronique et réseaux — établissement cité par l’Onisep. Localisation indicative au centre-ville.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-polyvalent-elisa-lemonnier",
      source: "Onisep — liste des établissements proposant le BTS CIEL",
    },
    {
      id: "epsi",
      name: "EPSI — campus Lille",
      city: "Lille",
      lat: 50.637,
      lon: 3.063,
      level: "bac",
      domains: ["logiciel", "cyber", "ia"],
      program:
        "BTS SIO SISR et SLAM ; cursus développeur en intelligence artificielle. Établissement privé : consulter frais, statut des titres et modalités.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ecole-privee-des-sciences-informatiques-campus-lille",
      source: "Onisep — fiche établissement et formations",
    },
    {
      id: "ipssi",
      name: "IPSSI — campus Lille",
      city: "Lille",
      lat: 50.626,
      lon: 3.067,
      level: "bac",
      domains: ["logiciel", "cyber"],
      program:
        "BTS SIO options SISR et SLAM ; TP administrateur système DevOps en apprentissage ; établissement privé hors contrat.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ipssi-campus-de-lille",
      source: "Onisep — fiche établissement et formations",
    },
    {
      id: "ynov",
      name: "Lille Ynov Campus",
      city: "Croix",
      lat: 50.677,
      lon: 3.151,
      level: "bac",
      domains: ["logiciel", "cyber"],
      program:
        "BTS SIO options SISR et SLAM ; BTS CIEL option informatique et réseaux ; établissement privé à but lucratif.",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lille-ynov-campus",
      source: "Onisep — fiche établissement et formations",
    },
    {
      id: "imt",
      name: "IMT Nord Europe — campus de Douai",
      city: "Douai",
      lat: 50.371,
      lon: 3.078,
      level: "suite",
      domains: ["logiciel", "cyber", "ia"],
      program:
        "Formation d’ingénieur généraliste avec possibilités de spécialisation numérique selon le cursus",
      url: "https://imt-nord-europe.fr/",
      source: "Site officiel IMT Nord Europe",
    },
  ];
  const auditNov2026 = {
    wallon: {
      address: "16 place de la République, 59300 Valenciennes, France",
      offer: "BTS SIO SISR et SLAM, temps plein et apprentissage ; CPGE MP2I",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-henri-wallon",
    },
    epsi: {
      address: "2 rue Alphonse Colas, 59800 Lille, France",
      offer:
        "BTS SIO SISR et SLAM, temps plein ; développeur en intelligence artificielle",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ecole-privee-des-sciences-informatiques-campus-lille",
    },
    ipssi: {
      address: "24 boulevard Louis XIV, 59000 Lille, France",
      offer: "BTS SIO SISR et SLAM, temps plein ou apprentissage",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ipssi-campus-de-lille",
    },
  };
  const officialAudit2026 = {
    malraux: {
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/pas-de-calais/lycee-general-et-technologique-andre-malraux",
      address: "700 rue de l’Université, 62400 Béthune, France",
    },
    guymollet: {
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/pas-de-calais/lycee-polyvalent-guy-mollet",
      address: null,
    },
    gaston: {
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-gaston-berger",
      address: "Avenue Gaston Berger, 59000 Lille, France",
    },
    baggio: {
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-cesar-baggio",
      address: "332 boulevard d’Alsace, 59000 Lille, France",
    },
    ynov: {
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lille-ynov-campus",
      address: "25 rue Isaac Holden Crothers, 59170 Croix, France",
    },
    ipssi: {
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ipssi-campus-de-lille",
      address: "24 boulevard Louis XIV, 59000 Lille, France",
    },
    dampierre: {
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-dampierre",
      address: "85 avenue de Denain, 59300 Valenciennes, France",
    },
    lemonnier: {
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-polyvalent-elisa-lemonnier",
      address: "817 rue Charles Bourseul, 59500 Douai, France",
    },
  };
  const auditedSources = {
    wallon: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-henri-wallon/bts-services-informatiques-aux-organisations-option-a-solutions-d-infrastructure-systemes-et-reseaux",
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-henri-wallon/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers",
    ],
    dampierre: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-dampierre/bts-services-informatiques-aux-organisations-option-a-solutions-d-infrastructure-systemes-et-reseaux",
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-dampierre/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers",
    ],
    saintremi: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-saint-remi/bts-services-informatiques-aux-organisations-option-a-solutions-d-infrastructure-systemes-et-reseaux",
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-saint-remi/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers",
    ],
    saintluc: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-saint-luc/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers",
    ],
    maubeuge: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/iut-de-valenciennes-campus-de-maubeuge-universite-polytechnique-hauts-de-france",
    ],
    lens: [
      "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-informatique-parcours-realisation-d-applications-conception-developpement-validation",
    ],
    lillebut: [
      "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-informatique-parcours-realisation-d-applications-conception-developpement-validation",
    ],
    calais: [
      "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-informatique-parcours-administration-gestion-et-exploitation-des-donnees",
      "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-informatique-parcours-realisation-d-applications-conception-developpement-validation",
    ],
  };
  Object.assign(auditedSources, {
    gaston: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-gaston-berger/bts-services-informatiques-aux-organisations-option-a-solutions-d-infrastructure-systemes-et-reseaux",
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-gaston-berger/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers",
    ],
    baggio: [
      "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/bts-cybersecurite-informatique-et-reseaux-electronique-option-b-electronique-et-reseaux",
    ],
    lemonnier: [
      "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/bts-cybersecurite-informatique-et-reseaux-electronique-option-b-electronique-et-reseaux",
    ],
    epsi: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ecole-privee-des-sciences-informatiques-campus-lille",
    ],
    ipssi: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ipssi-campus-de-lille",
    ],
    ynov: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lille-ynov-campus",
    ],
  });

  const auditV7 = {
    ndgrace: {
      status: "confirme",
      offer:
        "BTS SIO option SISR, en apprentissage ; CPGE MPSI/MP et cycles préparatoires associés",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-notre-dame-de-grace",
      source: "Onisep — fiche établissement et BTS SIO, 20/11/2026",
      evidence: [
        "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-notre-dame-de-grace",
        "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-notre-dame-de-grace/bts-services-informatiques-aux-organisations-option-a-solutions-d-infrastructure-systemes-et-reseaux",
      ],
    },
    jeanbart: {
      status: "confirme",
      offer:
        "BTS SIO options SISR et SLAM, temps plein ; CPGE scientifiques MPSI, PCSI, MP, PC*, PSI",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-jean-bart",
      source: "Onisep — fiche établissement et BTS SIO, 20/11/2026",
      evidence: [
        "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-jean-bart",
        "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-jean-bart/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers",
      ],
    },
    hainaut: {
      status: "confirme-partiel",
      offer:
        "CPGE TSI et BTS électrotechnique ; pas de BTS SIO/CIEL dans la liste Onisep consultée",
      url: "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-du-hainaut",
      source: "Onisep — fiche établissement, 20/11/2026",
      evidence: [
        "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-du-hainaut",
      ],
    },
    malraux: {
      status: "a-verifier",
      offer:
        "Offre numérique post-bac non confirmée pour le lycée André Malraux de Béthune ; attention aux établissements homonymes",
      source:
        "Aucune fiche locale établissement-formation confirmée, 20/11/2026",
      evidence: [],
    },
    saintjoseph: {
      status: "a-verifier",
      offer:
        "Offre numérique post-bac non confirmée pour le campus de Saint-Martin-Boulogne ; attention aux établissements homonymes",
      source:
        "Aucune fiche locale établissement-formation confirmée, 20/11/2026",
      evidence: [],
    },
  };
  const verifiedOffers = {
    wallon: "BTS SIO SISR et SLAM — fiches Onisep vérifiées en novembre 2026",
    dampierre:
      "BTS SIO SISR et SLAM — fiches Onisep vérifiées en novembre 2026",
    saintremi:
      "BTS SIO SISR et SLAM — fiches Onisep vérifiées en novembre 2026",
    saintluc: "BTS SIO SLAM — fiche Onisep vérifiée en novembre 2026",
    maubeuge:
      "BUT informatique — parcours recensés dans les fiches Onisep antérieurement consultées",
    lens: "BUT informatique — parcours réalisation d’applications recensé dans l’Onisep",
    lillebut:
      "BUT informatique — parcours réalisation d’applications recensé dans l’Onisep",
    calais:
      "BUT informatique — parcours applications et données recensés dans l’Onisep",
  };
  const universityLicenceSources = {
    uphf: "https://formations.uphf.fr/fr/formations/licence-licence/licence-informatique-L06U2R2L.html",
    lillelic:
      "https://formation.univ-lille.fr/fr/offre-de-formation/licence-lmd-XA/licence-informatique-MG002001.html",
    artoislic: "https://www.sciences.univ-artois.fr/licence-informatique",
    ulcolic:
      "https://www.univ-littoral.fr/formation/offre-de-formation/licences/licence-informatique/",
  };
  const documentedCampus = new Set([
    "uphf",
    "lillelic",
    "artoislic",
    "ulcolic",
    "wallon",
    "dampierre",
    "gaston",
    "guymollet",
    "jeanbart",
    "saintremi",
    "ndgrace",
    "saintluc",
    "baggio",
    "ynov",
    "epsi",
    "ipssi",
  ]);
  const rad = (x) => (x * Math.PI) / 180;
  function schoolKm(a, b) {
    let dlat = rad(b.lat - a.lat),
      dlon = rad(b.lon - a.lon),
      q =
        Math.sin(dlat / 2) ** 2 +
        Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dlon / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q));
  }
  const list = document.getElementById("schoolList"),
    detail = document.getElementById("schoolDetail");
  let selectedSchool = "wallon";
  let leafletMap = null;
  const markers = new Map();
  const schoolMarker = (s) =>
    L.circleMarker([s.lat, s.lon], {
      radius: 8,
      color: "#e8faff",
      weight: 2,
      dashArray: "3 4",
      fillColor: "#6f9bff",
      fillOpacity: 0.35,
    });
  function initMap() {
    if (!window.L) {
      document.getElementById("schoolMap").innerHTML =
        '<div class="school-map-error">La carte nécessite une connexion Internet. Les établissements restent accessibles dans la liste.</div>';
      return;
    }
    leafletMap = L.map("schoolMap", { scrollWheelZoom: false }).setView(
      [50.46, 3.43],
      9,
    );
    const tiles = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    );
    const notice = document.getElementById("schoolMapNotice");
    tiles.on("tileerror", () => {
      notice.hidden = false;
    });
    tiles.on("tileload", () => {
      notice.hidden = true;
    });
    tiles.addTo(leafletMap);
    L.circleMarker([schoolOrigin.lat, schoolOrigin.lon], {
      radius: 11,
      color: "#fff",
      fillColor: "#ffbd65",
      fillOpacity: 1,
      weight: 3,
    })
      .addTo(leafletMap)
      .bindPopup(
        "<strong>Lycée Watteau</strong><br>Repère géographique approximatif · non géocodé",
      );
  }
  // Classement pédagogique : plusieurs formations peuvent appartenir au même établissement.
  // Ce filtre n'est pas une certification d'ouverture pour 2027.
  function schoolPaths(s) {
    const p = (s.program + " " + s.name).toLocaleLowerCase("fr");
    const tags = [];
    if (/\bcpge\b|\bmp2i\b|\bmpsi\b|\bpcsi\b|\bptsi\b|\btsi\b|\bmpi\b/.test(p))
      tags.push("cpge");
    if (/\blicence\b/.test(p)) tags.push("licence");
    if (/\bbut\b|\biut\b/.test(p)) tags.push("but");
    if (/\bbts\b/.test(p)) tags.push("bts");
    if (/ingénieur|ingénierie|polytech|insa|imt nord/.test(p))
      tags.push("ingenieur");
    if (/\bmaster\b/.test(p)) tags.push("master");
    return tags;
  }
  const normalizeSearch = (value) =>
    value
      .toLocaleLowerCase("fr")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  function renderSchools() {
    const domain = document.getElementById("schoolDomain").value,
      level = document.getElementById("schoolLevel").value,
      type = document.getElementById("schoolType").value;
    const query = normalizeSearch(document.getElementById("schoolSearch").value)
      .trim()
      .split(/\s+/);
    const evidenceMode = document.getElementById("schoolEvidence").value;
    const path = document.getElementById("schoolPath").value;
    const visible = schools
      .filter(
        (s) =>
          (path === "all" || schoolPaths(s).includes(path)) &&
          (evidenceMode === "all" || documentedCampus.has(s.id)) &&
          query.every((term) =>
            normalizeSearch(s.name + " " + s.city + " " + s.program).includes(
              term,
            ),
          ) &&
          (domain === "all" || s.domains.includes(domain)) &&
          (level === "all" || s.level === level) &&
          (type === "all" ||
            (type === "lycee"
              ? s.name.startsWith("Lycée") || s.name.startsWith("Campus")
              : !(s.name.startsWith("Lycée") || s.name.startsWith("Campus")))),
      )
      .sort((a, b) => schoolKm(schoolOrigin, a) - schoolKm(schoolOrigin, b));
    document.getElementById("schoolCount").textContent =
      visible.length +
      " établissements" +
      (visible.length === 0 ? " — modifier les filtres" : "");
    if (!visible.some((s) => s.id === selectedSchool))
      selectedSchool = visible[0]?.id || null;
    list.replaceChildren();
    if (leafletMap) {
      markers.forEach((m) => leafletMap.removeLayer(m));
      markers.clear();
    }
    for (const s of visible) {
      if (leafletMap) {
        const m = schoolMarker(s).addTo(leafletMap);
        m.bindTooltip(s.name);
        m.on("click", () => chooseSchool(s.id));
        markers.set(s.id, m);
      }
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.school = s.id;
      b.setAttribute("aria-pressed", String(s.id === selectedSchool));
      b.className = "school" + (s.id === selectedSchool ? " active" : "");
      const title = document.createElement("strong");
      title.textContent = s.name;
      const subtitle = document.createElement("small");
      subtitle.textContent =
        s.city +
        " · distance non certifiée · " +
        (auditV7[s.id]?.status === "confirme"
          ? "offre confirmée · position indicative"
          : auditV7[s.id]?.status === "a-verifier"
            ? "offre non confirmée · position indicative"
            : documentedCampus.has(s.id)
              ? "offre documentée · position indicative"
              : "offre à vérifier · position indicative");
      b.append(title, subtitle);
      b.addEventListener("click", () => {
        chooseSchool(s.id);
        list
          .querySelector('[data-school="' + s.id + '"]')
          ?.focus({ preventScroll: true });
      });
      list.append(b);
    }
    const s = schools.find((s) => s.id === selectedSchool);
    detail.replaceChildren();
    if (!s) {
      detail.textContent =
        "Aucun résultat pour cette combinaison. Les CPGE sont généralement proposées dans des lycées : choisir « Tous » dans Établissement ou cliquer sur « Réinitialiser les filtres ». Le répertoire n’est pas exhaustif.";
      return;
    }
    const h = document.createElement("h3");
    h.textContent = s.name;
    const p = document.createElement("p");
    p.textContent = s.program;
    const t = document.createElement("p");
    t.textContent =
      s.city +
      " · distance non affichée : coordonnées des campus non certifiées";
    const a = document.createElement("a");
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = "Consulter la fiche de formation ↗";
    const status = document.createElement("p");
    status.className = "school-audit";
    status.textContent = !documentedCampus.has(s.id)
      ? "Fiche exploratoire non certifiée : offre exacte et conditions à vérifier auprès de l’établissement. Position indicative ; admission 2027 non confirmée."
      : auditV7[s.id]
        ? (auditV7[s.id].status === "confirme"
            ? "Offre confirmée sur Onisep le 20/11/2026. "
            : "Offre à contrôler : ") +
          auditV7[s.id].offer +
          " · Coordonnées et rentrée 2027 non certifiées."
        : verifiedOffers[s.id]
          ? "Formation documentée dans les références précédentes : " +
            verifiedOffers[s.id] +
            " ; vérifier la fiche de cet établissement, son adresse et son admission 2027."
          : "À confirmer : intitulé exact, campus, admission et ouverture à la rentrée 2027. Ne pas considérer cette fiche comme une validation Parcoursup.";
    const nav = document.createElement("span");
    nav.textContent =
      "Itinéraire désactivé : coordonnées précises non vérifiées.";
    const src = document.createElement("small");
    src.textContent =
      "Référence : " +
      s.source +
      " · Position cartographique indicative, non auditée à l’adresse du bâtiment";
    detail.append(h, p, t, status, a, nav, src);
    const currentAudit = auditNov2026[s.id] || officialAudit2026[s.id];
    const check = document.createElement("p");
    check.className = "school-audit";
    check.textContent = currentAudit
      ? "Référence documentaire Onisep consultée en novembre 2026. Adresse postale vérifiée" +
        (currentAudit.address
          ? " : " + currentAudit.address
          : " partiellement") +
        ". Coordonnées de la carte non géocodées : repère indicatif uniquement. Admission 2027 à vérifier après le 17 décembre 2026."
      : "Formation et adresse à contrôler individuellement. Coordonnées non géocodées et admission 2027 non confirmée.";
    detail.append(check);
    if (universityLicenceSources[s.id]) {
      check.textContent =
        "Licence informatique confirmée sur le site officiel de cette université publique (novembre 2026). Position sur la carte indicative, non géocodée à l’adresse ; admission 2027 à confirmer.";
      const a = document.createElement("a");
      a.href = universityLicenceSources[s.id];
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent =
        "Consulter la fiche officielle de la licence informatique";
      detail.append(a);
    }
    if (currentAudit?.url) {
      const official = document.createElement("a");
      official.href = currentAudit.url;
      official.target = "_blank";
      official.rel = "noopener noreferrer";
      official.textContent =
        "Fiche Onisep de cet établissement (source officielle)";
      detail.append(official);
    }
    if (auditV7[s.id]?.evidence?.length) {
      const evidence = document.createElement("div");
      evidence.className = "school-evidence";
      for (const [i, u] of auditV7[s.id].evidence.entries()) {
        const a = document.createElement("a");
        a.href = u;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Source Onisep vérifiée " + (i + 1);
        evidence.append(a);
      }
      detail.append(evidence);
    }
    if (auditedSources[s.id]) {
      const evidence = document.createElement("div");
      evidence.className = "school-evidence";
      const heading = document.createElement("strong");
      heading.textContent =
        "Références Onisep à consulter (lien ne garantit pas à lui seul l’offre de cet établissement) : ";
      evidence.append(heading);
      auditedSources[s.id].forEach((u, i) => {
        const link = document.createElement("a");
        link.href = u;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Fiche Onisep " + (i + 1);
        evidence.append(link);
      });
      detail.append(evidence);
    }
    if (leafletMap && markers.has(s.id)) {
      markers.forEach((m, id) =>
        m.setStyle({
          fillColor: id === s.id ? "#ffbd65" : "#6f9bff",
          radius: id === s.id ? 11 : 8,
        }),
      );
    }
  }
  function chooseSchool(id) {
    selectedSchool = id;
    renderSchools();
    const s = schools.find((s) => s.id === id);
    if (s && leafletMap) {
      const reducedMotion = matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      leafletMap.setView([s.lat, s.lon], Math.max(leafletMap.getZoom(), 11), {
        animate: !reducedMotion,
      });
      markers.get(id)?.openTooltip();
    }
  }
  document.getElementById("publicLicences").addEventListener("click", () => {
    document.getElementById("schoolType").value = "superieur";
    document.getElementById("schoolPath").value = "licence";
    document.getElementById("schoolDomain").value = "all";
    document.getElementById("schoolLevel").value = "all";
    document.getElementById("schoolSearch").value = "";
    document.getElementById("schoolEvidence").value = "documented";
    renderSchools();
  });
  const schoolFilters = [
    "schoolType",
    "schoolPath",
    "schoolDomain",
    "schoolLevel",
    "schoolEvidence",
  ];
  for (const id of schoolFilters) {
    document.getElementById(id).addEventListener("change", renderSchools);
  }
  document
    .getElementById("schoolSearch")
    .addEventListener("input", renderSchools);
  document.getElementById("schoolReset").addEventListener("click", () => {
    for (const id of schoolFilters) document.getElementById(id).value = "all";
    document.getElementById("schoolSearch").value = "";
    document.getElementById("schoolEvidence").value = "documented";
    renderSchools();
    if (leafletMap) {
      leafletMap.setView([50.55, 2.9], 8);
    }
  });
  initMap();
  renderSchools();
  if (leafletMap) {
    requestAnimationFrame(() => leafletMap.invalidateSize());
    window.addEventListener("resize", () => leafletMap.invalidateSize());
  }
})();
