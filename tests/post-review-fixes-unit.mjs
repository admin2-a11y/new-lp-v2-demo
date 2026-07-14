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
    append(field) {
      fields.push(field);
    }
  };
  const document = {
    readyState: "interactive",
    addEventListener(name, handler) {
      listeners.set(name, handler);
    },
    createElement() {
      return {};
    },
    querySelectorAll(selector) {
      if (selector === "a[href]") return anchors;
      if (selector === "form") return [form];
      return [];
    }
  };
  const location = {
    href: `https://example.test/lp/result_v2.html${search}`,
    origin: "https://example.test",
    search
  };
  const localStorage = {
    getItem() { throw new Error("localStorage must not be read"); },
    setItem() { throw new Error("localStorage must not be written"); },
    removeItem() { throw new Error("localStorage must not be changed"); }
  };
  const window = { location };
  const sandbox = {
    URL,
    URLSearchParams,
    document,
    localStorage,
    window
  };

  vm.runInNewContext(source, sandbox, { filename: "param-keeper.js" });

  const internalAnchor = {
    href: "https://example.test/lp/redirect.html?item=mobit",
    getAttribute(name) {
      return name === "href" ? "./redirect.html?item=mobit" : null;
    }
  };
  const externalAnchor = {
    href: "https://outside.example/path?fixed=1",
    getAttribute(name) {
      return name === "href" ? "https://outside.example/path?fixed=1" : null;
    }
  };
  anchors.push(internalAnchor, externalAnchor);
  listeners.get("DOMContentLoaded")();

  return { internalAnchor, externalAnchor, fields, window };
};

const incomingSearch = "?utm_source=new&fbclid=fresh&answer=kept&dup=first&dup=&dup=%E4%B8%89%E3%81%A4%E7%9B%AE&empty=&jp=%E6%97%A5%E6%9C%AC%E8%AA%9E+%E5%80%A4&symbol=%26%3D%2B%25%2F%3F%23&amount=source-amount&variant=experienced&item=incoming-item";
const currentOnly = runParamKeeper({
  search: incomingSearch,
  existingNames: ["amount", "variant"]
});
const decorated = new URL(currentOnly.internalAnchor.href);
assert.deepEqual(decorated.searchParams.getAll("item"), ["mobit"]);
assert.equal(decorated.searchParams.get("utm_source"), "new");
assert.equal(decorated.searchParams.get("fbclid"), "fresh");
assert.equal(decorated.searchParams.get("answer"), "kept");
assert.deepEqual(decorated.searchParams.getAll("dup"), ["first", "", "三つ目"]);
assert.equal(decorated.searchParams.has("empty"), true);
assert.equal(decorated.searchParams.get("empty"), "");
assert.equal(decorated.searchParams.get("jp"), "日本語 値");
assert.equal(decorated.searchParams.get("symbol"), "&=+%/?#");
assert.equal(currentOnly.externalAnchor.href, "https://outside.example/path?fixed=1");

const fieldValues = (name) => currentOnly.fields.filter((field) => field.name === name).map((field) => field.value);
assert.deepEqual(fieldValues("utm_source"), ["new"]);
assert.deepEqual(fieldValues("dup"), ["first", "", "三つ目"]);
assert.deepEqual(fieldValues("empty"), [""]);
assert.deepEqual(fieldValues("item"), ["incoming-item"]);
assert.deepEqual(fieldValues("amount"), []);
assert.deepEqual(fieldValues("variant"), []);
assert.equal(fs.readFileSync(path.join(root, "js", "param-keeper.js"), "utf8").includes("localStorage"), false);
assert.deepEqual(
  [...new URLSearchParams(currentOnly.window.moneyLoanCurrentParams()).entries()],
  [...new URLSearchParams(incomingSearch).entries()]
);
assert.equal(currentOnly.window.moneyLoanTrackingParams(), currentOnly.window.moneyLoanCurrentParams());

const emptyCurrent = runParamKeeper({ search: "" });
assert.equal(new URL(emptyCurrent.internalAnchor.href).searchParams.has("gclid"), false);
assert.equal(emptyCurrent.fields.length, 0);

for (const name of ["redirect.html", "redirect.php"]) {
  const source = fs.readFileSync(path.join(root, name), "utf8");
  assert.equal(source.includes("trackingKeys"), false, `${name}: tracking allowlist remains`);
  assert.equal(source.includes("localStorage"), false, `${name}: localStorage dependency remains`);
  assert.match(source, /window\.location\.search\.replace\(\/\^\\\?\//);
  assert.match(source, /appendCurrentParams\(destination\.url, readCurrentParams\(\)\)/);

  const runnable = source.replace("__AFFILIATE_URL_MOBIT__", "https://aff.example/path?fixed=base#frag");
  const catalogIndex = runnable.indexOf("const destinationCatalog");
  const scriptStart = runnable.lastIndexOf("(() => {", catalogIndex);
  const scriptEnd = runnable.indexOf("})();", catalogIndex) + "})();".length;
  assert.ok(catalogIndex >= 0 && scriptStart >= 0 && scriptEnd > scriptStart, `${name}: redirect script not found`);

  const nodes = {
    "transfer-status": { textContent: "" },
    "transfer-banner": { hidden: true, replaceChildren() {} },
    "transfer-fallback-link": { href: "" },
    "transfer-fallback-copy": { hidden: true }
  };
  let assigned = "";
  const redirectWindow = {
    location: {
      search: "?item=mobit&foo=first&foo=&foo=%E4%B8%89%E3%81%A4%E7%9B%AE&empty=&jp=%E6%97%A5%E6%9C%AC%E8%AA%9E+%E5%80%A4&symbol=%26%3D%2B%25%2F%3F%23",
      assign(value) { assigned = value; }
    },
    setTimeout(callback) { callback(); }
  };
  const redirectDocument = {
    readyState: "complete",
    getElementById(id) { return nodes[id] || null; },
    createElement() { return { append() {} }; }
  };
  vm.runInNewContext(runnable.slice(scriptStart, scriptEnd), {
    document: redirectDocument,
    URLSearchParams,
    window: redirectWindow
  }, { filename: name });

  const target = new URL(nodes["transfer-fallback-link"].href);
  assert.equal(target.searchParams.get("fixed"), "base");
  assert.deepEqual(target.searchParams.getAll("item"), ["mobit"]);
  assert.deepEqual(target.searchParams.getAll("foo"), ["first", "", "三つ目"]);
  assert.equal(target.searchParams.has("empty"), true);
  assert.equal(target.searchParams.get("jp"), "日本語 値");
  assert.equal(target.searchParams.get("symbol"), "&=+%/?#");
  assert.equal(target.hash, "#frag");
  assert.equal(assigned, nodes["transfer-fallback-link"].href);
}

const pages = fs.readdirSync(root).filter((name) => /\.(?:html|php)$/.test(name));
const pageSources = pages.map((name) => fs.readFileSync(path.join(root, name), "utf8"));
assert.equal(pageSources.filter((source) => source.includes("param-keeper.js?v=all-query1")).length, 17);
assert.equal(pageSources.some((source) => source.includes("param-keeper.js?v=url-only1")), false);
assert.equal(pageSources.some((source) => source.includes("param-keeper.js?v=1")), false);
assert.equal(pageSources.filter((source) => source.includes("floating-cta.js?v=exclusion-hide1")).length, 5);
assert.equal(pageSources.filter((source) => source.includes("result-cards-v2.css?v=keyboard-close1")).length, 4);
assert.equal(pageSources.filter((source) => source.includes("result-cards-v2.js?v=keyboard-close1")).length, 4);

const floatingSource = fs.readFileSync(path.join(root, "js", "floating-cta.js"), "utf8");
assert.match(floatingSource, /let revealed = false/);
assert.equal(floatingSource.includes("if (visible) return"), false);

const cardCss = fs.readFileSync(path.join(root, "css", "result-cards-v2.css"), "utf8");
assert.equal(/\[open\] summary\s*\{\s*display:\s*none/.test(cardCss), false);
assert.match(cardCss, /\.v4-points-more\[open\] summary \{ order: 2; margin-top: 4px; \}/);
assert.match(cardCss, /\.v4-review-more\[open\] summary \{ order: 2; margin-top: 4px; \}/);

const cardScript = fs.readFileSync(path.join(root, "js", "result-cards-v2.js"), "utf8");
assert.match(cardScript, /event\.key !== "Enter"/);
assert.match(cardScript, /event\.key !== " "/);
assert.match(cardScript, /details\.open = !details\.open/);

console.log("Post-review fix unit checks passed");
