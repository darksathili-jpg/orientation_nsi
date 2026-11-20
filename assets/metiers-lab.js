(() => {
  "use strict";
  const cases = [
    {
      id: "cyber",
      title: "Cybersécurité",
      role: "Analyste en cybersécurité",
      prompt:
        "Une connexion inhabituelle apparaît à 3 h du matin. Quelle est la première décision professionnelle ?",
      choices: [
        [
          "Bloquer immédiatement tous les comptes",
          "Une réaction disproportionnée peut interrompre le service sans confirmer l’incident.",
          false,
        ],
        [
          "Recouper les journaux et vérifier le contexte",
          "Bonne démarche : qualifier le signal, préserver les traces et suivre une procédure documentée.",
          true,
        ],
        [
          "Ignorer l’alerte si le mot de passe est correct",
          "Une authentification réussie n’exclut pas une compromission.",
          false,
        ],
      ],
      work: "Surveiller des événements, enquêter, documenter et collaborer avec les équipes réseau et métier.",
      conditions:
        "Travail en équipe, astreintes possibles selon le poste, confidentialité et forte responsabilité.",
      entry:
        "Technicien réseau ou administrateur junior selon diplôme et expérience ; analyste sécurité junior selon compétences et recrutement.",
      training: [
        [
          "BUT informatique — Maubeuge",
          "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/iut-de-valenciennes-campus-de-maubeuge-universite-polytechnique-hauts-de-france",
        ],
        [
          "BTS SIO — Lycée Gaston Berger, Lille",
          "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-gaston-berger",
        ],
        [
          "Licence informatique — Université de Lille",
          "https://sciences-technologies.univ-lille.fr/informatique/FORMATIONS/",
        ],
      ],
    },
    {
      id: "dev",
      title: "Développement logiciel",
      role: "Développeur ou développeuse logiciel",
      prompt:
        "Une application calcule parfois un montant incorrect. Quelle méthode privilégier ?",
      choices: [
        [
          "Demander à une IA de réécrire toute l’application",
          "Réécrire sans diagnostic peut ajouter de nouvelles erreurs.",
          false,
        ],
        [
          "Reproduire l’erreur avec un test, puis corriger et vérifier",
          "Bonne démarche : isoler la cause et effectuer des tests de non-régression.",
          true,
        ],
        [
          "Corriger le résultat directement dans la base",
          "Cela masque le problème sans réparer le calcul.",
          false,
        ],
      ],
      work: "Lire des besoins, concevoir, programmer, relire du code, tester et maintenir des applications.",
      conditions:
        "Travail collectif, échanges avec les utilisateurs, revues de code et apprentissage continu.",
      entry:
        "Développeur junior, intégrateur ou testeur automatisation selon le parcours et les compétences.",
      training: [
        [
          "BUT informatique — IUT de Lens",
          "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/pas-de-calais/iut-de-lens-universite-d-artois",
        ],
        [
          "Licence informatique — UPHF Valenciennes",
          "https://formations.uphf.fr/fr/formations/licence-licence/licence-informatique-L06U2R2L.html",
        ],
        [
          "BTS SIO SLAM — Lycée Saint-Luc, Cambrai",
          "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/lycee-saint-luc/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers",
        ],
      ],
    },
    {
      id: "data",
      title: "Données et intelligence artificielle",
      role: "Analyste de données / ingénieur IA",
      prompt:
        "Un modèle obtient 95 % de bonnes réponses. Que peut-on conclure ?",
      choices: [
        [
          "Il est fiable pour tous les utilisateurs",
          "Un score global ne prouve pas la qualité pour chaque groupe ou situation.",
          false,
        ],
        [
          "Il faut examiner les erreurs, les données et les conditions de test",
          "Bonne démarche : comparer les métriques et étudier les limites et les biais.",
          true,
        ],
        [
          "Il remplacera forcément le professionnel",
          "Un résultat statistique ne démontre pas une substitution d’emploi.",
          false,
        ],
      ],
      work: "Préparer des données, construire des indicateurs, expérimenter, évaluer et expliquer des résultats.",
      conditions:
        "Collaboration avec experts métier, documentation, vigilance sur la confidentialité et les biais.",
      entry:
        "Analyste de données junior selon formation ; ingénieur IA généralement après études approfondies en informatique et mathématiques.",
      training: [
        [
          "Licence informatique — Université d’Artois, Lens",
          "https://www.sciences.univ-artois.fr/licence-informatique",
        ],
        [
          "Licence informatique — Université de Lille",
          "https://sciences-technologies.univ-lille.fr/informatique/FORMATIONS/",
        ],
        [
          "BUT informatique — IUT de Lille",
          "https://iut.univ-lille.fr/formation/but",
        ],
      ],
    },
  ];
  const lab = document.querySelector("#mission-lab");
  if (!lab) return;

  const tabs = lab.querySelector(".mission-tabs");
  const workspace = lab.querySelector(".mission-workspace");
  const status = lab.querySelector("#mission-status");
  const comparison = lab.querySelector("tbody");
  const progress = new Map();

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function render(mission) {
    for (const button of tabs.children) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.mission === mission.id),
      );
    }

    const title = element("h3", mission.role);
    title.tabIndex = -1;
    const options = element("div", "", "mission-options");
    const response = progress.get(mission.id);

    mission.choices.forEach(([label], index) => {
      const choice = element("button", label, "mission-choice");
      choice.type = "button";
      choice.disabled = response !== undefined;
      choice.setAttribute("aria-pressed", String(response === index));
      choice.addEventListener("click", () => {
        progress.set(mission.id, index);
        render(mission);
        workspace
          .querySelector(".mission-retry")
          .focus({ preventScroll: true });
      });
      options.append(choice);
    });

    workspace.replaceChildren(
      element("p", "Situation professionnelle", "mission-label"),
      title,
      element("p", mission.prompt, "mission-prompt"),
      options,
    );

    status.textContent = "";
    if (response !== undefined) {
      const [, detail, correct] = mission.choices[response];
      const summary = correct ? "Démarche pertinente" : "À réexaminer";
      const feedback = element("div", "", "mission-feedback");
      feedback.append(element("strong", summary), element("p", detail));
      const retry = element(
        "button",
        "Essayer une autre réponse",
        "mission-retry",
      );
      retry.type = "button";
      retry.addEventListener("click", () => {
        progress.delete(mission.id);
        render(mission);
        workspace.querySelector(".mission-choice").focus();
      });
      workspace.append(feedback, retry);
      status.textContent = summary + ". " + detail;
    }

    const training = element("ul", "", "mission-links");
    for (const [label, href] of mission.training) {
      const item = element("li");
      const link = element("a", label);
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      item.append(link);
      training.append(item);
    }

    workspace.append(
      element("h4", "Ce que fait réellement ce professionnel"),
      element("p", mission.work),
      element("h4", "Conditions d’exercice"),
      element("p", mission.conditions),
      element("h4", "Exemples de formations régionales à explorer"),
      training,
      element(
        "p",
        "Ces liens mènent aux établissements ou catalogues institutionnels. Ils ne garantissent ni l’ouverture de chaque parcours en 2027, ni une admission, ni un débouché professionnel. Vérifie l’offre précise et ses conditions sur la fiche officielle.",
        "mission-caveat",
      ),
    );
  }

  for (const mission of cases) {
    const button = element("button", mission.title, "mission-tab");
    button.type = "button";
    button.dataset.mission = mission.id;
    button.addEventListener("click", () => render(mission));
    tabs.append(button);

    const row = element("tr");
    const rowTitle = element("th", mission.role);
    rowTitle.scope = "row";
    row.append(
      rowTitle,
      element("td", mission.work),
      element("td", mission.conditions),
      element("td", mission.entry),
    );
    comparison.append(row);
  }

  document
    .querySelectorAll(".mission-preview [data-mission]")
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
          return;
        const mission = cases.find((item) => item.id === link.dataset.mission);
        if (!mission) return;
        render(mission);
        requestAnimationFrame(() =>
          document
            .querySelector("#missions-title")
            .focus({ preventScroll: true }),
        );
      });
    });

  render(cases[0]);
})();
