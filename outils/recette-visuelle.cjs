const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const { AxeBuilder } = require("@axe-core/playwright");

const baseURL = process.env.ORIENTATION_URL || "http://127.0.0.1:8765/";
const out = process.env.CAPTURES_DIR || "artifacts/visual-audit";
const viewports = [
  { name: "ordinateur", width: 1440, height: 900 },
  { name: "tablette", width: 820, height: 1180 },
  {
    name: "smartphone",
    width: 390,
    height: 844,
    isMobile: true,
    hasTouch: true,
  },
  {
    name: "smartphone-320",
    width: 320,
    height: 640,
    isMobile: true,
    hasTouch: true,
  },
];
const pages = [
  {
    name: "accueil",
    url: "index.html",
    reference: { width: 1104, height: 831 },
    test: catalogue,
  },
  {
    name: "atelier",
    url: "atelier-original.html",
    reference: { width: 778, height: 831 },
    test: atelier,
  },
];

async function count(page, selector, expected) {
  assert.equal(await page.locator(selector).count(), expected, selector);
}

async function checkA11y(page) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  return result.violations.map(({ id, nodes }) => ({
    id,
    elements: nodes.map((node) => node.target),
  }));
}

async function geometry(page) {
  return page.evaluate(() => {
    const heading = document.querySelector("h1");
    const text = document.createRange();
    text.selectNodeContents(heading);
    const frames = [...text.getClientRects()].filter((rect) => rect.width > 0);
    const elements = [
      heading,
      ...document.querySelectorAll(".orientation-links a"),
    ];
    return {
      headings: document.querySelectorAll("h1").length,
      title: heading.textContent,
      clipped: frames.some(
        (rect) =>
          rect.left < 0 ||
          rect.right > document.documentElement.clientWidth + 1,
      ),
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      blocked: elements.some((element) => {
        const rect = element.getBoundingClientRect();
        const y = rect.y + rect.height / 2;
        return (
          y >= 0 &&
          y <= innerHeight &&
          !element.contains(
            document.elementFromPoint(rect.x + rect.width / 2, y),
          )
        );
      }),
    };
  });
}

async function assistant(page, search, diploma) {
  await page.locator("#darksathi-open").click();
  assert.equal(
    await page
      .locator("#darksathi-query")
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#darksathi-panel").isHidden(), true);
  assert.equal(
    await page
      .locator("#darksathi-open")
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.locator("#darksathi-open").click();
  await page.locator("#darksathi-query").fill("BUT informatique à Lille");
  await page.locator("#darksathi-form button").click();
  assert.match(await page.locator(diploma).inputValue(), /but/i);
  assert.equal(await page.locator(search).inputValue(), "informatique lille");
  assert.match(
    await page.locator("#darksathi-status").innerText(),
    /Filtres appliqués/,
  );
  await page.locator('#darksathi-panel [data-query="tout"]').click();
  assert.equal(await page.locator(search).inputValue(), "");
  await page.locator("#darksathi-open").click();
}

async function catalogue(page) {
  const expectedData = await page.locator("#dataset").evaluate((node) => {
    const data = JSON.parse(node.textContent);
    const direct = data.filter((item) => item.scope === "direct");
    return { total: data.length, direct: direct.length };
  });
  assert.ok(expectedData.total > expectedData.direct);
  await count(page, "#cards .card", 18);
  const first = await page.locator("#cards .card h3").first().innerText();
  await page.locator("#next").click();
  assert.notEqual(
    await page.locator("#cards .card h3").first().innerText(),
    first,
    "Pagination suivante",
  );
  await page.locator("#prev").click();
  assert.equal(
    await page.locator("#cards .card h3").first().innerText(),
    first,
    "Pagination précédente",
  );
  assert.ok(
    (await page.locator('#cards a[href*="onisep"]').count()) > 0,
    "Fiches Onisep",
  );
  assert.ok(
    (await page.locator('#cards a[href*="parcoursup"]').count()) > 0,
    "Fiches Parcoursup",
  );

  const initial = await page.locator("#count").innerText();
  await page.locator("#source").selectOption("Parcoursup 2026");
  assert.notEqual(await page.locator("#count").innerText(), initial);
  await page.locator("#apprentice").selectOption("yes");
  assert.ok(
    (await page.locator("#cards .card .meta").allTextContents()).some((label) =>
      label.includes("Apprentissage signalé"),
    ),
  );
  await page.locator("#reset").click();
  await page.locator("#dep").selectOption({ label: "Nord" });
  assert.ok((await page.locator("#cards .card").count()) > 0);
  await page.locator("#q").fill("formation inexistante zmxt");
  await count(page, "#cards .card", 0);
  assert.equal(await page.locator("#next").isDisabled(), true);
  await page.locator("#reset").click();
  assert.equal(await page.locator("#count").innerText(), initial);
  await page.locator("#scope").selectOption("all");
  assert.notEqual(await page.locator("#count").innerText(), initial);
  await page.locator("#reset").click();

  await page.locator("#mapNotice").waitFor({ state: "visible" });
  assert.ok((await page.locator("#map .leaflet-interactive").count()) > 1);
  await page.locator("#wat").click();
  await page
    .locator("#map .leaflet-interactive")
    .first()
    .dispatchEvent("click");
  assert.match(
    await page.locator("#map .leaflet-popup-content").innerText(),
    /Lycée Watteau/,
  );
  await page.locator("#map .leaflet-popup-close-button").click();
  await assistant(page, "#q", "#degree");
  assert.equal(await page.locator("#scope").inputValue(), "all");

  const color = await page
    .locator("body")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  await page.locator("#theme").click();
  assert.notEqual(
    await page
      .locator("body")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
    color,
  );
  assert.equal(
    await page.locator("#theme").getAttribute("aria-pressed"),
    "true",
  );
  const light = await checkA11y(page);
  assert.deepEqual(light, [], "Axe en thème clair");
  await page.locator("#theme").click();
  return expectedData;
}

async function atelier(page) {
  await count(page, ".mission-card", 3);
  await count(page, ".mission-compare tbody tr", 3);

  for (const mission of ["cyber", "dev", "data"]) {
    await page.locator(`.mission-card[data-mission="${mission}"]`).click();
    assert.equal(
      await page
        .locator(`.mission-tab[data-mission="${mission}"]`)
        .getAttribute("aria-pressed"),
      "true",
    );
    await count(page, ".mission-links a[href^='https://']", 3);
    await page.locator(".mission-choice").first().click();
    assert.match(
      await page.locator(".mission-feedback").innerText(),
      /À réexaminer/,
    );
    assert.equal(
      await page
        .locator(".mission-retry")
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page
        .locator(".mission-choice")
        .first()
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.locator(".mission-choice").nth(1).click();
    assert.match(
      await page.locator(".mission-feedback").innerText(),
      /Démarche pertinente/,
    );
  }
  await page.locator('.mission-tab[data-mission="cyber"]').focus();
  await page.keyboard.press("Enter");
  assert.match(
    await page.locator(".mission-feedback").innerText(),
    /Démarche pertinente/,
  );

  const careers = await page.locator("#careerCards .card").count();
  assert.ok(careers >= 3);
  await page.locator('[data-filter="creation"]').click();
  assert.ok((await page.locator("#careerCards .card").count()) < careers);
  await page.locator("#careerCards .card button").first().click();
  assert.equal(
    await page
      .locator("#careerCards .card button")
      .first()
      .getAttribute("aria-expanded"),
    "true",
  );
  await page.locator("#profileForm #q2").check();
  await page.locator("#profileForm button").click();
  assert.match(
    await page.locator("#result").innerText(),
    /Développeur logiciel/,
  );

  await page.locator("#schoolMapNotice").waitFor({ state: "visible" });
  assert.ok(
    (await page.locator("#schoolMap .leaflet-interactive").count()) > 1,
  );
  const documented = await page.locator("#schoolList button").count();
  await page.locator("#schoolEvidence").selectOption("all");
  const all = await page.locator("#schoolList button").count();
  assert.ok(all > documented);
  await page.locator("#publicLicences").click();
  assert.equal(await page.locator("#schoolPath").inputValue(), "licence");
  const college = page.locator("#schoolList button").last();
  const title = await college.locator("strong").innerText();
  await college.click();
  assert.equal(await page.locator("#schoolDetail h3").innerText(), title);
  assert.ok(
    (await page.locator("#schoolDetail a[href^='https://']").count()) > 0,
  );
  await page.locator("#schoolReset").click();
  assert.equal(
    await page.locator('[data-filter="creation"]').getAttribute("aria-pressed"),
    "true",
  );
  await assistant(page, "#schoolSearch", "#schoolPath");
  assert.equal(await page.locator("#schoolEvidence").inputValue(), "all");
  assert.ok((await page.locator('#sources a[href*="onisep.fr"]').count()) > 0);
  return { careers, documented, all };
}

async function visit(browser, page, device, test = true) {
  const { name, ...viewport } = device;
  const { isMobile, hasTouch, ...dimensions } = viewport;
  const context = await browser.newContext({
    viewport: dimensions,
    isMobile,
    hasTouch,
    reducedMotion: "reduce",
  });
  const tab = await context.newPage();
  tab.setDefaultTimeout(7000);

  // Run the catalogue with a reproducible tile outage. Leaflet and the data stay live.
  await tab.route("https://tile.openstreetmap.org/**", (route) =>
    route.fulfill({ status: 503 }),
  );
  const failures = [];
  const errors = [];
  const consoleErrors = [];
  const brokenAssets = [];
  tab.on("pageerror", (error) => errors.push(error.message));
  tab.on("console", (message) => {
    if (
      message.type() === "error" &&
      !message.text().startsWith("Failed to load resource")
    ) {
      consoleErrors.push(message.text());
    }
  });
  tab.on("response", (response) => {
    if (
      response.status() >= 400 &&
      new URL(response.url()).origin === new URL(baseURL).origin
    ) {
      brokenAssets.push(response.url() + " HTTP " + response.status());
    }
  });

  const run = {
    page: page.name,
    device: name,
    ...dimensions,
    failures,
    errors,
    consoleErrors,
    brokenAssets,
  };
  for (const [step, action] of [
    [
      "navigation et captures",
      async () => {
        const response = await tab.goto(new URL(page.url, baseURL).href, {
          waitUntil: "load",
        });
        assert.ok(response.ok(), "Réponse HTTP de la page");
        await tab.screenshot({
          path: path.join(out, `${page.name}-${name}.png`),
        });
        if (name === "ordinateur") {
          await tab.screenshot({
            path: path.join(out, `${page.name}-page-entiere.png`),
            fullPage: true,
          });
        }
        const cdp = await context.newCDPSession(tab);
        await cdp.send("DOM.enable");
        await cdp.send("CSS.enable");
        const { root } = await cdp.send("DOM.getDocument");
        const { nodeId } = await cdp.send("DOM.querySelector", {
          nodeId: root.nodeId,
          selector: "h1",
        });
        run.titleFonts = (
          await cdp.send("CSS.getPlatformFontsForNode", { nodeId })
        ).fonts.map((font) => font.familyName);
      },
    ],
    [
      "mise en page et clavier",
      async () => {
        run.geometry = await geometry(tab);
        assert.equal(run.geometry.headings, 1, "Titre unique");
        assert.equal(run.geometry.clipped, false, "Texte du titre visible");
        assert.equal(
          run.geometry.blocked,
          false,
          "Éléments visibles sans superposition",
        );
        assert.ok(
          run.geometry.overflow <= 1,
          `Débordement horizontal de ${run.geometry.overflow}px`,
        );
        await tab.keyboard.press("Tab");
        assert.equal(
          await tab
            .locator(".skip-link")
            .evaluate((el) => el === document.activeElement),
          true,
        );
        await tab.keyboard.press("Enter");
        assert.equal(
          await tab
            .locator("main")
            .evaluate((el) => el === document.activeElement),
          true,
        );
        await count(tab, ".darksathi-sprite", 2);
        const sprite = tab.locator(".darksathi-sprite").first();
        assert.equal(
          await sprite.evaluate((el) => getComputedStyle(el).animationName),
          "none",
        );
        if (page.name === "accueil") {
          await tab.emulateMedia({ reducedMotion: "no-preference" });
          const poses = await sprite.evaluate((el) => {
            const animation = el.getAnimations()[0];
            animation.pause();
            return [0, 300, 600, 900].map((time) => {
              animation.currentTime = time;
              return getComputedStyle(el).backgroundPosition;
            });
          });
          assert.deepEqual(poses, ["50% 0px", "0% 0px", "50% 0px", "100% 0px"]);
          await tab.emulateMedia({ reducedMotion: "reduce" });
        }
      },
    ],
    ...(test
      ? [
          [
            "accessibilité du thème par défaut",
            async () => {
              run.accessibility = await checkA11y(tab);
              assert.deepEqual(run.accessibility, []);
            },
          ],
          [
            "parcours pédagogiques",
            async () => {
              run.data = await page.test(tab);
            },
          ],
        ]
      : []),
  ]) {
    try {
      await action();
    } catch (error) {
      failures.push(`${step} — ${error.message}`);
    }
  }
  if (errors.length || consoleErrors.length)
    failures.push("Erreurs JavaScript");
  if (brokenAssets.length) failures.push("Ressources du site indisponibles");
  await context.close();
  return run;
}

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const report = [];
  try {
    for (const page of pages) {
      for (const device of viewports) {
        if (device.width === 320) {
          report.push(await visit(browser, page, device, false));
        } else {
          report.push(await visit(browser, page, device));
        }
      }
      report.push(
        await visit(
          browser,
          page,
          { name: "dimensions-maquette", ...page.reference },
          false,
        ),
      );
    }
  } finally {
    await browser.close();
    fs.writeFileSync(
      path.join(out, "rapport.json"),
      JSON.stringify({ baseURL, report }, null, 2) + "\n",
    );
  }
  for (const run of report) {
    console.log(
      run.page,
      run.device,
      run.failures.length ? run.failures : "réussi",
    );
  }
  if (report.some((run) => run.failures.length)) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
