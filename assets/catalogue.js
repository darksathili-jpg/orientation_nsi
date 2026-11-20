(() => {
  "use strict";

  const data = JSON.parse(document.getElementById("dataset").textContent);
  const $ = (id) => document.getElementById(id);
  const size = 18;
  const watteau = [50.3583, 3.53179];
  let page = 0;
  let filtered = [];
  let map, layer;

  const norm = (value) =>
    String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const labels = {
    direct: "Numérique",
    prepa: "Prépa scientifique",
    connexe: "Domaine connexe",
    hors: "Autre",
  };
  const fmt = (value) => value.toLocaleString("fr-FR");
  const hasPoint = (entry) =>
    Number.isFinite(entry.lat) && Number.isFinite(entry.lon);
  const isUrl = (url) => typeof url === "string" && /^https?:\/\//i.test(url);

  function element(tag, text, css = "") {
    const item = document.createElement(tag);
    item.textContent = text;
    item.className = css;
    return item;
  }

  function link(url, text) {
    const item = element("a", text);
    item.href = url;
    item.target = "_blank";
    item.rel = "noopener noreferrer";
    return item;
  }

  function fill(id, values) {
    for (const value of [...new Set(values.filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, "fr"),
    )) {
      $(id).add(new Option(value, value));
    }
  }
  fill(
    "dep",
    data.map((x) => x.dep),
  );
  fill(
    "degree",
    data.map((x) => x.family),
  );
  $("s3").textContent = fmt(data.filter((x) => x.scope === "direct").length);
  $("s4").textContent = fmt(data.filter((x) => x.apprenticeship).length);

  function apply() {
    const terms = norm($("q").value).trim().split(/\s+/);
    filtered = data.filter(
      (x) =>
        ($("scope").value === "all" || x.scope === $("scope").value) &&
        ($("source").value === "all" ||
          x.sources.includes($("source").value)) &&
        ($("dep").value === "all" || x.dep === $("dep").value) &&
        ($("degree").value === "all" || x.family === $("degree").value) &&
        ($("apprentice").value === "all" || x.apprenticeship === true) &&
        terms.every((term) => x.search.includes(term)),
    );
    page = 0;
    render();
    updateMap();
  }
  for (const entry of data) {
    entry.search = norm(
      [
        entry.title,
        entry.specialty,
        entry.school,
        entry.city,
        entry.family,
        entry.uai,
        entry.id,
      ].join(" "),
    );
  }

  function card(entry) {
    const article = element("article", "", "card");
    const tags = element("div", "", "cardtop");
    tags.append(
      element("span", entry.sources.join(" + "), "chip"),
      element("span", labels[entry.scope], "chip secondary"),
    );
    article.append(
      tags,
      element("h3", entry.title),
      element("div", entry.school, "school"),
      element(
        "div",
        [entry.city, entry.dep, entry.family, entry.level]
          .filter(Boolean)
          .join(" · "),
        "meta",
      ),
    );
    if (entry.specialty && !norm(entry.title).includes(norm(entry.specialty))) {
      article.append(element("div", entry.specialty, "meta"));
    }
    article.append(
      element(
        "div",
        [
          entry.apprenticeship && "Apprentissage signalé",
          "Réf. " + entry.id,
          entry.uai && "UAI " + entry.uai,
        ]
          .filter(Boolean)
          .join(" · "),
        "meta",
      ),
    );
    const foot = element("div", "", "cardfoot");
    if (isUrl(entry.url))
      foot.append(link(entry.url, "Fiche " + entry.src + " ↗"));
    if (isUrl(entry.related_url))
      foot.append(link(entry.related_url, "Fiche Onisep ↗"));
    article.append(foot);
    return article;
  }

  function render() {
    const visible = filtered.slice(page * size, (page + 1) * size);
    $("count").textContent = fmt(filtered.length) + " fiches affichables";
    $("cards").replaceChildren(
      ...(visible.length
        ? visible.map(card)
        : [
            element(
              "p",
              "Aucun résultat. Élargis la sélection ou réinitialise les filtres.",
              "empty",
            ),
          ]),
    );
    $("page").textContent = filtered.length
      ? page + 1 + " / " + Math.ceil(filtered.length / size)
      : "0 / 0";
    $("prev").disabled = page === 0;
    $("next").disabled = (page + 1) * size >= filtered.length;
  }

  const selects = ["scope", "source", "dep", "degree", "apprentice"];
  for (const id of selects) $(id).addEventListener("change", apply);
  $("q").addEventListener("input", apply);
  $("reset").onclick = () => {
    $("q").value = "";
    for (const id of selects) $(id).value = id === "scope" ? "direct" : "all";
    apply();
  };
  for (const [id, delta] of [
    ["prev", -1],
    ["next", 1],
  ]) {
    $(id).onclick = () => {
      page += delta;
      render();
      $("catalogue").scrollIntoView();
    };
  }
  $("theme").onclick = () => {
    const light = document.body.classList.toggle("light");
    $("theme").textContent = light ? "Mode sombre" : "Mode clair";
    $("theme").setAttribute("aria-pressed", String(light));
  };

  function updateMap() {
    if (!map) return;
    layer.clearLayers();
    const places = new Map();
    for (const entry of filtered.filter(hasPoint)) {
      const key = entry.lat.toFixed(4) + "," + entry.lon.toFixed(4);
      if (!places.has(key)) places.set(key, []);
      places.get(key).push(entry);
    }
    const distance = (entries) =>
      map.distance(watteau, [entries[0].lat, entries[0].lon]);
    const points = [...places.values()]
      .sort((a, b) => distance(a) - distance(b))
      .slice(0, 120);
    for (const entries of points) {
      const entry = entries[0];
      const popup = element("div", "");
      popup.append(
        element(
          "strong",
          [...new Set(entries.map((x) => x.school))].slice(0, 3).join(" · "),
        ),
        element("p", entry.city + " · " + entries.length + " fiche(s)"),
        element(
          "small",
          "Environ " +
            Math.round(distance(entries) / 1000) +
            " km à vol d’oiseau depuis Watteau",
        ),
      );
      L.circleMarker([entry.lat, entry.lon], {
        radius: 6,
        color: "#076572",
        fillColor: "#61e6d5",
        fillOpacity: 0.85,
      })
        .bindPopup(popup)
        .addTo(layer);
    }
    $("mapstatus").textContent =
      points.length +
      " emplacements affichés sur " +
      places.size +
      " géolocalisés dans les résultats.";
    if (points.length)
      map.fitBounds(L.latLngBounds(points.map(([x]) => [x.lat, x.lon])), {
        padding: [20, 20],
        maxZoom: 12,
      });
    else map.setView(watteau, 10);
  }

  function initMap() {
    if (!window.L) {
      $("map").textContent =
        "Carte indisponible. Le catalogue reste accessible.";
      $("wat").disabled = true;
      return;
    }
    $("map").querySelector(".map-fallback")?.remove();
    map = L.map("map", { scrollWheelZoom: false });
    map.setView(watteau, 10);
    const tiles = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      },
    );
    const tileNotice = $("mapNotice");
    tiles.on("tileerror", () => {
      tileNotice.hidden = false;
    });
    tiles.on("tileload", () => {
      tileNotice.hidden = true;
    });
    tiles.addTo(map);
    layer = L.layerGroup().addTo(map);
    L.circleMarker(watteau, {
      radius: 8,
      color: "#926014",
      fillColor: "#ffce74",
      fillOpacity: 1,
    })
      .bindPopup("Lycée Watteau · Valenciennes")
      .addTo(map);
    $("wat").onclick = () => map.setView(watteau, 12);
    if (window.ResizeObserver)
      new ResizeObserver(() => map.invalidateSize({ pan: false })).observe(
        $("map"),
      );
    updateMap();
  }

  apply();

  initMap();
})();
