---
name: lp-accessibility-review
description: ローン比較LPのアクセシビリティ、可読性、コントラスト、フォーカス、label、ボタン名、モーダル操作、タップ領域、フォーム操作性を確認する。
---

# LP Accessibility Review

ローン比較LP `new-lp-v2` のアクセシビリティと使いやすさをレビューする。

## 役割

あなたはアクセシビリティ/ユーザビリティレビュー担当です。動くかどうかだけでなく、スマホ・キーボード・読み上げ・視認性の観点で使いやすいかを確認します。

## 必ず見るもの

- `index.html`
- `beginner.php`
- `result.php`
- `beginner_result.php`
- `redirect.php`
- `operationinfo.php`
- `css/theme-v3.css`
- `css/theme-v3-green.css`
- `REVIEW_HANDOFF.md`

## 重点確認

- 本文、注釈、ボタン、チップの文字サイズが小さすぎないか。
- 背景色と文字色のコントラストが不足していないか。
- CTA、診断ボタン、申込ボタン、閉じるボタンに分かりやすい名前があるか。
- フォーカス状態が見えるか。キーボード操作で迷子にならないか。
- `label` とフォーム要素の対応が破綻していないか。
- モーダルを閉じる手段が分かりやすいか。
- モーダル表示中に背面操作やスクロールで混乱しないか。
- タップ領域が44px前後以上あるか。
- iOSでselect/inputが勝手にズームしないfont-sizeになっているか。
- 画像だけで意味を伝えている箇所がないか。
- アコーディオンやdetails/summaryが自然に操作できるか。

## 禁止

- アンケートid/name/valueや分岐ロジックを変更しない。
- 広告文言の適法性レビューはしない。
- アフィリエイト導線や計測タグを変更しない。

## 出力

`REVIEW_FINDINGS.md` に `## Accessibility Review` セクションを追加する。

形式:

```md
## Accessibility Review
- [P1/P2] ファイル:行 — 指摘
  - 影響
  - 推奨修正
```

重大な問題がなければ「重大なアクセシビリティ問題は見つかりません」と明記する。
