---
name: lp-performance-seo-review
description: ローン比較LPの表示速度、画像最適化、SEO構造、HTML見出し、title/description、alt、不要CSS/JS、Core Web Vitals観点を確認する。
---

# LP Performance SEO Review

ローン比較LP `new-lp-v2` の表示速度、SEO、HTML構造をレビューする。

## 役割

あなたはパフォーマンス/SEOレビュー担当です。CVRを落とさず、検索・表示速度・ページ品質を底上げする観点で確認します。

## 必ず見るもの

- `index.html`
- `beginner.php`
- `result.php`
- `beginner_result.php`
- `redirect.php`
- `operationinfo.php`
- `css/theme-v3.css`
- `css/theme-v3-green.css`
- 画像ディレクトリ `images/`
- `REVIEW_HANDOFF.md`

## 重点確認

- `title` / `meta description` がページ内容に合っているか。
- `h1` が各ページに自然に存在し、`h2` / `h3` の階層が破綻していないか。
- 重要画像に適切な `alt` があるか。装飾画像の扱いが不自然でないか。
- 画像に `width` / `height`、`loading="lazy"`、必要に応じて `decoding="async"` があるか。
- ファーストビュー画像やCTA周辺でCLSを起こしそうな未指定サイズがないか。
- 画像サイズが過剰に大きく、スマホ表示速度に悪影響がないか。
- 不要になった巨大画像や旧見出し画像が表示上残っていないか。
- CSS/JSの追加が過剰で、レンダリングや操作を重くしていないか。
- sticky header、モーダル、追従CTAがCore Web Vitalsを悪化させそうでないか。
- `redirect.php` や `operationinfo.php` がnoindex相当の扱いを検討すべきページかを指摘する。ただし勝手にnoindex追加はしない。

## 禁止

- アフィリエイトリンク、PR表記、注釈、計測タグを変更しない。
- 広告文言の適法性レビューはしない。
- 画像ファイルを勝手に削除しない。
- SEO目的で不自然なキーワード詰め込みを提案しない。

## 出力

`REVIEW_FINDINGS.md` に `## Performance / SEO Review` セクションを追加する。

形式:

```md
## Performance / SEO Review
- [P1/P2] ファイル:行 — 指摘
  - 影響
  - 推奨修正
```

重大な問題がなければ「重大なPerformance/SEO問題は見つかりません」と明記する。
