import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const source = fs.readFileSync(path.join(root, "js", "survey.js"), "utf8");

const location = {
  href: "https://example.test/lp/index.html?utm_source=qa",
  hostname: "example.test",
  pathname: "/lp/index.html",
  search: "?utm_source=qa"
};
const document = {
  readyState: "loading",
  addEventListener() {},
  querySelector() { return null; },
  querySelectorAll() { return []; }
};
const window = {
  location,
  addEventListener() {},
  clearTimeout,
  setTimeout
};
const sandbox = {
  URL,
  URLSearchParams,
  Event,
  console,
  document,
  window
};

vm.runInNewContext(source, sandbox, { filename: "survey.js" });
const helpers = window.MoneyLoanSurvey.__test;

assert.equal(helpers.stripQuestionNumber("Q7. 返済期間は？"), "返済期間は？");
assert.equal(helpers.stripQuestionNumber("条件を選択"), "条件を選択");

assert.equal(helpers.toStaticPagePath("./result.php"), "./result.html");
assert.equal(helpers.toStaticPagePath("./mobit_result.php"), "./mobit_result.html");
assert.equal(helpers.toStaticPagePath("./beginner_result.php"), "./beginner_result.html");
assert.equal(helpers.toStaticPagePath("./result.html"), "./result.html");

assert.equal(helpers.isStaticDocument({ hostname: "admin2-a11y.github.io", pathname: "/demo/" }), true);
assert.equal(helpers.isStaticDocument({ hostname: "example.test", pathname: "/lp/index.html" }), true);
assert.equal(helpers.isStaticDocument({ hostname: "example.test", pathname: "/lp/result.php" }), false);

const beginner = new URL(helpers.buildEntryTarget(location.href, "beginner", true));
assert.equal(beginner.pathname, "/lp/mobit_beginner.html");
assert.equal(beginner.searchParams.get("utm_source"), "qa");
assert.equal(beginner.searchParams.has("entry-modal"), false);

const experienced = new URL(helpers.buildEntryTarget(location.href, "experienced", true));
assert.equal(experienced.pathname, "/lp/index.html");
assert.equal(experienced.searchParams.get("entry-modal"), "2");
assert.equal(experienced.searchParams.get("utm_source"), "qa");

const phpBeginner = new URL(helpers.buildEntryTarget("https://example.test/lp/index.php?utm_medium=cpc", "beginner", false));
assert.equal(phpBeginner.pathname, "/lp/beginner.php");
assert.equal(phpBeginner.searchParams.get("utm_medium"), "cpc");

assert.equal(helpers.hasOptionValue({ options: [{ value: "" }, { value: "a3_2" }] }, "a3_2"), true);
assert.equal(helpers.hasOptionValue({ options: [{ value: "" }, { value: "a3_2" }] }, "invalid"), false);

console.log("F21 survey unit checks passed");
