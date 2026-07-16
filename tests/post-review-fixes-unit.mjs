import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const runParamKeeper = ({ search, existingNames = [] }) => {
  const source = fs.readFileSync(path.join(root, "js", "param-keeper.js"), "utf8");
  const listeners = new Map();
  const anchors = [];
  const fields = [];
  const form = {
    elements: existingNames.map((name) => ({ name })),
    append(field) { fields.push(field); },
  };
  const document = {
    readyState: "interactive",
    addEventListener(name, handler) { listeners.set(name, handler); },
    createElement() { return {}; },
    querySelectorAll(selector) {
      if (selector === "a[href]") return anchors;
      if (selector === "form") return [form];
      return [];
    },
  };
  const location = {
    href: `https://example.test/lp/result_v2.html${search}`,
    origin: "https://example.test",
    search,
  };
  const window = { location };

  vm.runInNewContext(source, { URL, URLSearchParams, document, window }, { filename: "param-keeper.js" });

  const internalAnchor = {
    href: "https://example.test/lp/redirect.html?item=mobit",
    getAttribute(name) { return name === "href" ? "./redirect.html?item=mobit" : null; },
  };
  const externalAnchor = {
    href: "https://outside.example/path?fixed=1",
    getAttribute(name) { return name === "href" ? "https://outside.example/path?fixed=1" : null; },
  };
  anchors.push(internalAnchor, externalAnchor);
  listeners.get("DOMContentLoaded")();

  return { internalAnchor, externalAnchor, fields, window };
};

const forbiddenAnswers = [
  "current_loans[]",
  "amount",
  "speed",
  "method",
  "income",
  "job",
  "company_size",
  "duration",
  "priority",
  "variant",
  "answer",
];
const incomingSearch = "?utm_source=new&utm_campaign=summer&gclid=g-1&fbclid=f-1&item=incoming-item&current_loans%5B%5D=a1_1&amount=30&speed=today&method=web&income=500&job=employee&company_size=large&duration=5&priority=speed&variant=experienced&answer=secret";
const currentOnly = runParamKeeper({ search: incomingSearch, existingNames: ["amount", "variant"] });
const decorated = new URL(currentOnly.internalAnchor.href);
assert.deepEqual(decorated.searchParams.getAll("item"), ["mobit"]);
assert.equal(decorated.searchParams.get("utm_source"), "new");
assert.equal(decorated.searchParams.get("utm_campaign"), "summer");
assert.equal(decorated.searchParams.get("gclid"), "g-1");
assert.equal(decorated.searchParams.get("fbclid"), "f-1");
forbiddenAnswers.forEach((key) => assert.equal(decorated.searchParams.has(key), false, `internal link leaked ${key}`));
assert.equal(currentOnly.externalAnchor.href, "https://outside.example/path?fixed=1");

const fieldNames = currentOnly.fields.map((field) => field.name);
assert.deepEqual(fieldNames.sort(), ["fbclid", "gclid", "item", "utm_campaign", "utm_source"].sort());
forbiddenAnswers.forEach((key) => assert.equal(fieldNames.includes(key), false, `form leaked ${key}`));

const currentParams = new URLSearchParams(currentOnly.window.moneyLoanCurrentParams());
assert.equal(currentParams.get("item"), "incoming-item");
assert.equal(currentParams.get("utm_source"), "new");
forbiddenAnswers.forEach((key) => assert.equal(currentParams.has(key), false, `current params leaked ${key}`));
const trackingParams = new URLSearchParams(currentOnly.window.moneyLoanTrackingParams());
assert.equal(trackingParams.has("item"), false);
assert.equal(trackingParams.get("gclid"), "g-1");
forbiddenAnswers.forEach((key) => assert.equal(trackingParams.has(key), false, `tracking params leaked ${key}`));

const emptyCurrent = runParamKeeper({ search: "" });
assert.equal(emptyCurrent.fields.length, 0);

const affiliateUrls = {
  acom: "https://whatsmyasp.com/3k701mem558983c8/cl/?bId=09c6577e",
  promise: "https://whatsmyasp.com/3k701mem558983c8/cl/?bId=r56c91bf",
  mobit: "https://whatsmyasp.com/3k701mem558983c8/cl/?bId=6dcl109c",
  aiful: "https://whatsmyasp.com/3k701mem558983c8/cl/?bId=3ef9fcfc",
};

const extractRedirectScript = (source, name) => {
  const catalogIndex = source.indexOf("const destinationCatalog");
  const scriptStart = source.lastIndexOf("(() => {", catalogIndex);
  const scriptEnd = source.indexOf("})();", catalogIndex) + "})();".length;
  assert.ok(catalogIndex >= 0 && scriptStart >= 0 && scriptEnd > scriptStart, `${name}: redirect script not found`);
  return source.slice(scriptStart, scriptEnd);
};

const runRedirect = (script, search) => {
  const nodes = {
    "transfer-status": { textContent: "" },
    "transfer-banner": { hidden: true, replaceChildren() {} },
    "transfer-fallback-link": { href: "", textContent: "" },
    "transfer-fallback-copy": { hidden: true, replaceChildren(...children) { this.children = children; } },
  };
  const spinner = { hidden: false };
  let assigned = "";
  const window = {
    location: { search, assign(value) { assigned = value; } },
    setTimeout(callback) { callback(); },
  };
  const document = {
    readyState: "complete",
    getElementById(id) { return nodes[id] || null; },
    querySelector(selector) { return selector === ".v3-spinner" ? spinner : null; },
    createElement() { return { append() {} }; },
  };

  vm.runInNewContext(script, { document, Object, URLSearchParams, window }, { filename: "redirect-inline.js" });
  return { assigned, nodes, spinner };
};

for (const name of ["redirect.html", "redirect.php"]) {
  const source = fs.readFileSync(path.join(root, name), "utf8");
  assert.equal(source.includes("localStorage"), false, `${name}: localStorage dependency remains`);
  assert.equal(source.includes("defaultDestination"), false, `${name}: silent fallback remains`);
  assert.match(source, /const trackingKeys = new Set/);
  Object.entries(affiliateUrls).forEach(([item, url]) => {
    assert.ok(source.includes(`${item}: {\n            url: "${url}"`), `${name}: ${item} affiliate URL mismatch`);
  });

  const script = extractRedirectScript(source, name);
  for (const [item, expectedBase] of Object.entries(affiliateUrls)) {
    const result = runRedirect(script, `?item=${item}&utm_source=test&gclid=g-2&amount=50&income=600&job=employee&company_size=large&duration=10&current_loans%5B%5D=a1_1`);
    assert.ok(result.assigned, `${name}: ${item} did not redirect`);
    const target = new URL(result.assigned);
    const expected = new URL(expectedBase);
    assert.equal(`${target.origin}${target.pathname}`, `${expected.origin}${expected.pathname}`);
    assert.equal(target.searchParams.get("bId"), expected.searchParams.get("bId"));
    assert.equal(target.searchParams.get("utm_source"), "test");
    assert.equal(target.searchParams.get("gclid"), "g-2");
    assert.equal(target.searchParams.has("item"), false);
    forbiddenAnswers.forEach((key) => assert.equal(target.searchParams.has(key), false, `${name}: affiliate URL leaked ${key}`));
  }

  for (const search of ["", "?item=unknown&utm_source=test"]) {
    const result = runRedirect(script, search);
    assert.equal(result.assigned, "", `${name}: invalid item redirected`);
    assert.equal(result.nodes["transfer-status"].textContent, "移動先を確認できませんでした。");
    assert.equal(result.nodes["transfer-fallback-link"].href, "./index.html");
    assert.equal(result.nodes["transfer-fallback-copy"].hidden, false);
    assert.equal(result.spinner.hidden, true);
  }
}

const pages = fs.readdirSync(root).filter((name) => /\.(?:html|php)$/.test(name));
const pageSources = new Map(pages.map((name) => [name, fs.readFileSync(path.join(root, name), "utf8")]));
assert.equal([...pageSources.values()].filter((source) => source.includes("param-keeper.js?v=deliveryfix1")).length, 17);
assert.equal([...pageSources.values()].filter((source) => source.includes("survey.js?v=searchloading1")).length, 2);
assert.equal([...pageSources.values()].filter((source) => source.includes("top-question-pulse.css?v=searchloading1")).length, 2);
const countVersionedPages = (asset) => [...pageSources.values()].filter((source) => source.includes(`${asset}?v=deliverydetail1`)).length;
assert.equal([...pageSources.values()].filter((source) => source.includes("theme-v3.css?v=cardtoggle1")).length, 10);
assert.equal([...pageSources.values()].filter((source) => source.includes("theme-v3-green.css?v=cardtoggle1")).length, 7);
assert.equal([...pageSources.values()].filter((source) => source.includes("mobit-compare2.css?v=comparefix2")).length, 4);
assert.equal([...pageSources.values()].filter((source) => source.includes("result-cards-v2.css?v=cardtoggle3")).length, 4);
assert.equal(countVersionedPages("result-cards-v2.js"), 0);
assert.equal([...pageSources.values()].filter((source) => source.includes("result-cards-v2.js?v=cardtoggle4")).length, 4);
assert.equal([...pageSources.values()].filter((source) => source.includes("deadline-timer.js?v=todaylead2")).length, 13);

for (const [name, source] of pageSources) {
  const blankLinks = source.match(/<a\b[^>]*target="_blank"[^>]*>/gi) || [];
  blankLinks.forEach((link) => assert.match(link, /rel="sponsored noopener"/, `${name}: target=_blank missing rel`));
}

const indexSource = pageSources.get("index.html");
const beginnerTopSource = pageSources.get("mobit_beginner.html");
assert.equal(indexSource.includes('class="v3-lender-card-list"'), false);
assert.equal(beginnerTopSource.includes('class="v3-lender-card-list"'), false);
assert.equal(indexSource.includes("今日中に借りるなら"), false);
assert.equal(beginnerTopSource.includes("今日中に借りるなら"), false);
assert.equal(indexSource.includes('class="deadline-box top-deadline-box"'), true);
assert.equal(beginnerTopSource.includes('class="deadline-box top-deadline-box"'), true);
assert.equal(indexSource.includes("場合があります。<br>※2"), false);
assert.equal(beginnerTopSource.includes("場合があります。<br>※2"), false);
assert.equal((pageSources.get("result_v2.html").match(/<h1\b/g) || []).length, 1);
assert.equal((pageSources.get("beginner_result_v2.html").match(/<h1\b/g) || []).length, 1);

const surveySource = fs.readFileSync(path.join(root, "js", "survey.js"), "utf8");
assert.match(surveySource, /document\.createElement\("button"\)/);
assert.match(surveySource, /select\.setAttribute\("tabindex", "-1"\)/);
assert.match(surveySource, /select\.setAttribute\("aria-hidden", "true"\)/);
assert.match(surveySource, /あなたに合ったカードローンを検索中…/);
assert.match(surveySource, /self\.loadingComplete = true/);
assert.match(surveySource, /}, 1100\)/);

const deliveryTextSources = [...pageSources.values()].join("\n")
  + fs.readFileSync(path.join(root, "js", "result-cards-v2.js"), "utf8")
  + fs.readFileSync(path.join(root, "js", "mobit.js"), "utf8");
const retiredAifulBanner = ["banner_aiful", ".jpg"].join("");
const retiredAifulSpeed = ["最短", "14分"].join("");
assert.equal(deliveryTextSources.includes(retiredAifulBanner), false);
assert.equal(deliveryTextSources.includes(retiredAifulSpeed), false);
assert.match(deliveryTextSources, /banner_aiful-9min\.webp/);
assert.match(deliveryTextSources, /最短9分/);
assert.equal(fs.existsSync(path.join(root, "images", retiredAifulBanner)), false);
assert.equal(fs.statSync(path.join(root, "images", "banner_aiful-9min.webp")).size, 15070);

const cardsSource = fs.readFileSync(path.join(root, "js", "result-cards-v2.js"), "utf8");
const cardsCss = fs.readFileSync(path.join(root, "css", "result-cards-v2.css"), "utf8");
const compareTableCss = fs.readFileSync(path.join(root, "css", "mobit-compare2.css"), "utf8");
const deadlineTimerSource = fs.readFileSync(path.join(root, "js", "deadline-timer.js"), "utf8");
assert.match(cardsSource, /pointMarkup\(lender\.points\)/);
assert.match(cardsSource, /summary\.addEventListener\("click", \(event\) => \{/);
assert.match(cardsSource, /window\.setTimeout\(\(\) => \{/);
assert.match(cardsSource, /details\.open = nextOpen/);
assert.equal(cardsSource.includes('document.querySelectorAll(".v4-recommend, .v4-review-box")'), false);
assert.match(cardsCss, /\.v4-recommend:has\(\.v4-points-more\[open\]\) \.v4-points-preview \{ display: none; \}/);
assert.match(compareTableCss, /\.v3-compare2-table thead \.is-featured \{[\s\S]*border-bottom: 1px solid #d4d7db !important;/);
assert.match(deadlineTimerSource, /class="timerTopLead">本日中に借りるなら/);
assert.match(deadlineTimerSource, /class="timerTopNext"><span class="nextMorningLead">いま申込で/);

const schedulerSource = fs.readFileSync(path.join(root, "js", "countdown-scheduler.js"), "utf8");
assert.equal(schedulerSource.includes("requestAnimationFrame"), false);
assert.match(schedulerSource, /document\.hidden/);
assert.match(schedulerSource, /prefers-reduced-motion/);

const schedulerListeners = new Map();
const scheduledTimers = new Map();
let timerId = 0;
let clearedTimerCount = 0;
let schedulerDrawCount = 0;
const schedulerDocument = {
  hidden: false,
  addEventListener(name, handler) { schedulerListeners.set(name, handler); },
};
const schedulerWindow = {
  matchMedia() { return { matches: false, addEventListener() {} }; },
  setTimeout(callback, delay) {
    const id = ++timerId;
    scheduledTimers.set(id, { callback, delay });
    return id;
  },
  clearTimeout(id) {
    if (scheduledTimers.delete(id)) clearedTimerCount += 1;
  },
};
vm.runInNewContext(schedulerSource, {
  document: schedulerDocument,
  Math,
  Number,
  Object,
  window: schedulerWindow,
}, { filename: "countdown-scheduler.js" });
const stopSchedulerTask = schedulerWindow.MoneyLoanCountdownScheduler.add(() => {
  schedulerDrawCount += 1;
  return 50;
});
assert.equal(schedulerDrawCount, 1, "scheduler did not draw immediately");
assert.equal(scheduledTimers.size, 1, "scheduler did not arm one shared timer");
schedulerDocument.hidden = true;
schedulerListeners.get("visibilitychange")();
assert.equal(scheduledTimers.size, 0, "hidden tab kept a timer alive");
assert.equal(clearedTimerCount, 1, "hidden tab did not clear the active timer");
schedulerDocument.hidden = false;
schedulerListeners.get("visibilitychange")();
assert.equal(schedulerDrawCount, 2, "visible tab did not refresh immediately");
assert.equal(scheduledTimers.size, 1, "visible tab did not re-arm the timer");
stopSchedulerTask();
assert.equal(scheduledTimers.size, 0, "removing the final task left a timer alive");

const deadlineSource = fs.readFileSync(path.join(root, "js", "deadline-timer.js"), "utf8");
assert.equal(deadlineSource.includes("requestAnimationFrame"), false);
assert.match(deadlineSource, /MoneyLoanCountdownScheduler\.add\(draw\)/);
assert.match(deadlineSource, /return active \? 50 : 1000/);
assert.match(deadlineSource, /いま申込で/);
assert.match(deadlineSource, /最短10時/);
assert.match(deadlineSource, /に借入完了も！/);
assert.equal(deadlineSource.includes("本日のお申し込みで"), false);
assert.equal(deadlineSource.includes("に借入れ可能性"), false);

const cardScript = fs.readFileSync(path.join(root, "js", "result-cards-v2.js"), "utf8");
assert.equal(cardScript.includes("data-v4-sort-status"), false);
assert.equal(cardScript.includes("normalizeSort"), false);
assert.equal(cardScript.includes("speedMinutes"), false);
assert.equal(cardScript.includes("requestAnimationFrame"), false);
assert.match(cardScript, /MoneyLoanCountdownScheduler\.add\(updateCountdowns\)/);
assert.match(cardScript, /review-male-v2-180\.webp/);
assert.match(cardScript, /review-male-v2-360\.webp/);
assert.match(cardScript, /すぐにお金が必要だけど家族や会社にバレたくないし/);
assert.match(cardScript, /そんなあなたにこちらのカードローンがおすすめです！/);
assert.match(cardScript, /いま申込で/);
assert.match(cardScript, /最短10時/);
assert.match(cardScript, /に借入完了も！/);
assert.equal(cardScript.includes("すぐにお金が必要だけど周りにバレたくないし"), false);
assert.equal(cardScript.includes("そんな方にはこちらのカードローンがおすすめです！"), false);

const compareCss = fs.readFileSync(path.join(root, "css", "mobit-compare2.css"), "utf8");
assert.match(compareCss, /body\.experience \.v3-compare2-title-image img[\s\S]*?transform: none;/);
assert.equal(compareCss.includes("translateY(-18.2%)"), false);

const cardCss = fs.readFileSync(path.join(root, "css", "result-cards-v2.css"), "utf8");
assert.match(cardCss, /\.v4-points-more\[open\] summary[\s\S]*?align-self: center;/);
assert.match(cardCss, /\.v4-points-more\[open\] summary[\s\S]*?min-width: 132px;/);
assert.match(cardCss, /\.v4-final-pick \.v4-recommend-intro h2[\s\S]*?color: #102a43 !important;/);

console.log("Post-review fix unit checks passed");
