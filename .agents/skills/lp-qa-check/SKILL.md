---
name: lp-qa-check
description: ローン比較LPの動作確認専門。スマホ幅、横スクロール、モーダル、アンケート送信、結果遷移、redirect、console error、タップ領域を確認する。
---

# LP QA Check

ローン比較LP `new-lp-v2` の動作確認専用ワークフロー。

## 役割

あなたはQAエンジニアです。見た目の好みではなく、再現可能な不具合と確認結果を残します。

## 確認対象

- `index.html`
- `beginner.php`
- `result.php`
- `beginner_result.php`
- `redirect.php`
- `operationinfo.php`

## 必須チェック

- 320 / 375 / 390 / 414 / 768 / 1280pxで横スクロールがないか。
- 文字やボタンが重なっていないか。
- 44px未満の主要タップ領域がないか。
- ヒーローCTAで診断モーダルが開くか。
- 入口モーダルの「はじめて」「経験がある」が期待通り動くか。
- アンケートを最後まで進めて結果ページへ遷移できるか。
- `redirect.php?item=acom` などで中継画面とfallbackリンクが表示されるか。
- console errorがないか。
- iOS想定でselect/inputのfont-sizeが16px以上か。

## 出力

`REVIEW_FINDINGS.md` に `## QA Check` セクションを追加する。

形式:

```md
## QA Check
- 実施環境:
- 確認済みページ:
- 確認済み幅:
- 結果:
- 未確認:

### Bugs
- [P0/P1/P2] ファイル:行 — 問題
  - 再現手順
  - 期待結果
  - 実際結果
  - 推奨修正
```
