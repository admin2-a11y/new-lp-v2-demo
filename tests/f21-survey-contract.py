from __future__ import annotations

import re
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
PAGES = {
    "beginner.html": ("./beginner_result.html", ("speed", "amount", "method", "income", "job", "priority")),
    "beginner.php": ("./beginner_result.php", ("speed", "amount", "method", "income", "job", "priority")),
    "beginner_result.html": ("./beginner_result.html", ("speed", "amount", "method", "income", "job", "priority")),
    "beginner_result.php": ("./beginner_result.php", ("speed", "amount", "method", "income", "job", "priority")),
    "beginner_result_v2.html": ("./beginner_result_v2.html", ("speed", "amount", "method", "income", "job", "priority")),
    "index.html": ("./result_v2.html", ("speed", "amount", "method", "income", "job", "company_size", "duration")),
    "mobit.html": ("./mobit_result.html", ("speed", "amount", "method", "income", "job", "company_size", "duration")),
    "mobit_beginner.html": ("./beginner_result_v2.html", ("speed", "amount", "method", "income", "job", "priority")),
    "mobit_beginner_result.html": ("./mobit_beginner_result.html", ("speed", "amount", "method", "income", "job", "priority")),
    "mobit_result.html": ("./mobit_result.html", ("speed", "amount", "method", "income", "job", "company_size", "duration")),
    "result.html": ("./result.html", ("speed", "amount", "method", "income", "job", "company_size", "duration")),
    "result.php": ("./result.php", ("speed", "amount", "method", "income", "job", "company_size", "duration")),
    "result_v2.html": ("./result_v2.html", ("speed", "amount", "method", "income", "job", "company_size", "duration")),
}
FORBIDDEN = (
    "replace(/option/g",
    "v3EnhanceDiagnosis",
    "function getQueryParams()",
    "function onReady(callback)",
    "var btn1 = $('.entry-first')",
)


def fail(message: str) -> None:
    raise AssertionError(message)


for name, (action, names) in PAGES.items():
    source = (ROOT / name).read_text(encoding="utf-8")
    document = html.document_fromstring(source)
    refs = document.xpath("//script[@src]/@src")
    survey_refs = [ref for ref in refs if "js/survey.js" in ref]
    if survey_refs != ["./js/survey.js?v=f22"]:
        fail(f"{name}: unexpected survey refs {survey_refs}")
    accessibility_indexes = [index for index, ref in enumerate(refs) if "v3-accessibility-cvr" in ref]
    if len(accessibility_indexes) != 1 or refs.index(survey_refs[0]) > accessibility_indexes[0]:
        fail(f"{name}: survey.js must load once before accessibility JS")
    if "?v=f21" not in refs[accessibility_indexes[0]]:
        fail(f"{name}: accessibility cache buster was not updated")

    forms = document.xpath("//form[.//ul[contains(concat(' ', normalize-space(@class), ' '), ' survey-list ')]]")
    if len(forms) != 1:
        fail(f"{name}: expected one survey form, got {len(forms)}")
    form = forms[0]
    if form.get("action") != action or form.get("method", "").lower() != "get":
        fail(f"{name}: form action/method changed")
    select_names = tuple(form.xpath(".//ul[contains(concat(' ', normalize-space(@class), ' '), ' survey-list ')]//select/@name"))
    if select_names != names:
        fail(f"{name}: select order/names changed: {select_names}")
    for select in form.xpath(".//select"):
        if not select.xpath("./option"):
            fail(f"{name}: select {select.get('id')} lost its options")

    for marker in FORBIDDEN:
        if marker in source:
            fail(f"{name}: legacy marker remains: {marker}")

survey_source = (ROOT / "js" / "survey.js").read_text(encoding="utf-8")
for required in ("document.createElement", "document.createDocumentFragment", "replaceChildren"):
    if required not in survey_source:
        fail(f"survey.js: missing DOM API {required}")
for forbidden in ("innerHTML", "insertAdjacentHTML", "replace(/option/g"):
    if forbidden in survey_source:
        fail(f"survey.js: forbidden HTML-string operation {forbidden}")

for name in ("v3-accessibility-cvr.js", "v3-accessibility-cvr-mobit.js"):
    source = (ROOT / "js" / name).read_text(encoding="utf-8")
    for marker in ("var beginnerButton", ", #survey-modal .step-submit", "resetEntryLoadingState"):
        if marker in source:
            fail(f"{name}: competing handler remains: {marker}")

for name in ("theme-v3.css", "theme-v3-green.css"):
    source = (ROOT / "css" / name).read_text(encoding="utf-8")
    if 'p.choice-btn[aria-pressed="true"]' not in source:
        fail(f"{name}: selected choice state missing")

root_sources = "\n".join(
    path.read_text(encoding="utf-8")
    for path in sorted([*ROOT.glob("*.html"), *ROOT.glob("*.php")])
)
if re.search(r"theme-v3(?:-green)?\.css\?v=f20", root_sources):
    fail("old F20 theme cache buster remains")

print(f"F21 survey contract checks passed for {len(PAGES)} pages")
