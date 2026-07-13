from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LEGACY = (
    "common.css",
    "common-green.css",
    "style.css",
    "style-green.css",
    "style-main.css",
    "style-main-green.css",
    "style_add.css",
    "style_add-green.css",
)
GREEN_PAGES = {
    "beginner.html",
    "beginner.php",
    "beginner_result.html",
    "beginner_result.php",
    "beginner_result_v2.html",
    "mobit_beginner.html",
    "mobit_beginner_result.html",
}
URL_RE = re.compile(r"url\(\s*([\"']?)(.*?)\1\s*\)", re.I | re.S)


def assert_balanced(path: Path) -> None:
    text = path.read_text(encoding="utf-8-sig")
    depth = 0
    quote = ""
    comment = False
    escaped = False
    index = 0
    while index < len(text):
        char = text[index]
        next_char = text[index + 1] if index + 1 < len(text) else ""
        if comment:
            if char == "*" and next_char == "/":
                comment = False
                index += 2
                continue
        elif quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = ""
        elif char == "/" and next_char == "*":
            comment = True
            index += 2
            continue
        elif char in "\"'":
            quote = char
        elif char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            assert depth >= 0, f"unexpected closing brace in {path.name}"
        index += 1
    assert depth == 0 and not quote and not comment, f"invalid CSS structure: {path.name}"


def assert_local_urls(path: Path) -> None:
    text = path.read_text(encoding="utf-8-sig")
    for _, raw in URL_RE.findall(text):
        raw = raw.strip()
        if not raw or raw.startswith(("data:", "http://", "https://", "//", "#")):
            continue
        clean = raw.split("?", 1)[0].split("#", 1)[0]
        resolved = ROOT / clean.lstrip("/") if clean.startswith("/") else path.parent / clean
        assert resolved.resolve().exists(), f"missing CSS asset: {path.name} -> {raw}"


def main() -> None:
    for name in LEGACY:
        assert not (ROOT / "css" / name).exists(), f"legacy stylesheet remains: {name}"

    for name in ("base.css", "base-green.css"):
        path = ROOT / "css" / name
        assert path.exists() and path.stat().st_size > 100, f"missing stylesheet: {name}"
        assert_balanced(path)
        assert_local_urls(path)

    pages = sorted(ROOT.glob("*.html")) + sorted(ROOT.glob("*.php"))
    styled_pages = 0
    for page in pages:
        text = page.read_text(encoding="utf-8-sig")
        has_base = './css/base.css?v=f22' in text
        if page.name == "demo-list.html":
            assert not has_base, "standalone demo index unexpectedly received application CSS"
            continue
        styled_pages += 1
        assert text.count('./css/base.css?v=f22') == 1, f"base link mismatch: {page.name}"
        expected_green = 1 if page.name in GREEN_PAGES else 0
        assert text.count('./css/base-green.css?v=f22') == expected_green, (
            f"green theme link mismatch: {page.name}"
        )
        for legacy in LEGACY:
            assert f"./css/{legacy}" not in text, f"legacy CSS link in {page.name}: {legacy}"

    assert styled_pages == 17, f"expected 17 styled pages, got {styled_pages}"
    print("PASS: F22 stylesheet structure, assets, page links, and theme allocation")
    print(f"PASS: {styled_pages} application pages checked")


if __name__ == "__main__":
    main()
