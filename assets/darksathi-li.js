(() => {
  "use strict";

  const dock = document.querySelector(".assistant-dock");
  const catalogue = document.body.classList.contains("catalogue-page");
  const filterIds = catalogue
    ? {
        search: "q",
        diploma: "degree",
        reset: "reset",
        apprenticeship: "apprentice",
      }
    : { search: "schoolSearch", diploma: "schoolPath", reset: "schoolReset" };
  const find = (id) => document.getElementById(id);
  const search = find(filterIds.search);
  if (!dock || !search) return;

  const root = document.createElement("aside");
  root.id = "darksathi-assistant";
  root.setAttribute("aria-label", "Assistant d’orientation");
  root.innerHTML = `
    <button class="pill" id="darksathi-open" type="button" aria-expanded="false" aria-controls="darksathi-panel">
      <img class="darksathi-avatar" src="assets/maquette/darksathi-avatar.png" width="244" height="203" alt="">
      Demander à Darksathi Li
    </button>
    <section id="darksathi-panel" aria-labelledby="darksathi-title" hidden>
      <h3 id="darksathi-title">Darksathi Li</h3>
      <p>Décris ton projet et je règle les filtres disponibles.</p>
      <form id="darksathi-form">
        <label for="darksathi-query">Que recherches-tu ?</label>
        <input id="darksathi-query" type="search" placeholder="Ex. BUT informatique à Lille" required>
        <button class="action action-primary" type="submit">Rechercher</button>
      </form>
      <div class="darksathi-examples">
        <button class="pill" type="button" data-query="BUT informatique">BUT informatique</button>
        <button class="pill" type="button" data-query="BTS cybersécurité">BTS cybersécurité</button>
        <button class="pill" type="button" data-query="licence informatique">Licences</button>
        <button class="pill" type="button" data-query="alternance">Alternance</button>
        <button class="pill" type="button" data-query="tout">Tout afficher</button>
      </div>
      <p id="darksathi-status" role="status"></p>
    </section>`;
  dock.append(root);

  const panel = find("darksathi-panel");
  const open = find("darksathi-open");
  const query = find("darksathi-query");
  const status = find("darksathi-status");
  const normalize = (value) =>
    value
      .toLocaleLowerCase("fr")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const diplomaPattern = /\b(but|bts|licence|master|cpge|mp2i|mpsi|prepa)\b/;
  const cityPattern =
    /(?:^|\s)(?:a|sur|pres de)\s+(lille|amiens|valenciennes|lens|arras|calais|maubeuge|dunkerque|douai|bethune|compiegne|beauvais|cambrai|roubaix|tourcoing)\b/;
  const apprenticeshipPattern = /\b(?:alternance|apprentissage)\b/;

  function toggle(show) {
    panel.hidden = !show;
    open.setAttribute("aria-expanded", String(show));
    if (show) query.focus();
    else open.focus();
  }

  function run(raw) {
    const text = normalize(raw.trim());
    if (!text) return;
    const all = /^(tout|tout afficher|reinitialiser)$/.test(text);
    const match = text.match(diplomaPattern)?.[0];
    const diploma = ["mp2i", "mpsi", "prepa"].includes(match) ? "cpge" : match;
    const city = text.match(cityPattern)?.[1];
    const apprenticeship = text.match(apprenticeshipPattern)?.[0];
    const diplomaSelect = find(filterIds.diploma);
    const apprenticeshipSelect = find(filterIds.apprenticeship);
    let terms = all ? "" : text.replace(cityPattern, " ").trim();

    find(filterIds.reset).click();
    if (all) {
      const scope = find(catalogue ? "scope" : "schoolEvidence");
      scope.value = "all";
    }

    if (diploma) {
      const option = Array.from(diplomaSelect.options).find((item) =>
        normalize(item.value)
          .split(/[^a-z]+/)
          .includes(diploma),
      );
      if (option) {
        diplomaSelect.value = option.value;
        terms = terms.replace(diplomaPattern, "").trim();
      }
    }

    if (apprenticeship && apprenticeshipSelect) {
      apprenticeshipSelect.value = "yes";
      terms = terms.replace(apprenticeshipPattern, "").trim();
    }

    search.value = [terms, city].filter(Boolean).join(" ");
    // All fields are already set, so the search input refreshes the results once.
    search.dispatchEvent(new Event("input", { bubbles: true }));
    status.textContent =
      "Filtres appliqués. Vérifie les résultats dans la liste des formations.";
    search.focus();
  }

  open.addEventListener("click", () => toggle(panel.hidden));
  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      event.preventDefault();
      toggle(false);
    }
  });
  root.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    run(query.value);
  });
  root.querySelectorAll("[data-query]").forEach((button) => {
    button.addEventListener("click", () => {
      query.value = button.dataset.query;
      run(query.value);
    });
  });
})();
