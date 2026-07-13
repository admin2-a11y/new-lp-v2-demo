---
name: lp-auto-build
description: ローン比較LPの実装タスクをCODEX_PROMPT.mdに沿って自動実行し、最後にレビュー用ハンドオフを残す。new-lp-v2のLP改修、リデザイン、スマホ最適化、診断UI改善で使用する。
---

# LP Auto Build

ローン比較LP `new-lp-v2` の実装作業をCodex内で自動化するためのワークフロー。

## 最初に読むもの

1. `AGENTS.md`
2. `CODEX_PROMPT.md`
3. `CODEX_TASKS.md`
4. 既存の `REVIEW_HANDOFF.md` があれば読む

`AGENTS.md` と `CODEX_PROMPT.md` が矛盾する場合は、`CODEX_PROMPT.md` を優先する。ただし、アンケートid/name、アフィリエイト導線、PR表記、プレースホルダー保全に関する禁止事項は常に厳守する。

## 実装方針

- `CODEX_PROMPT.md` の順番に沿って作業する。
- 既存CSSを直接大きく変えず、原則 `css/theme-v3.css` / `css/theme-v3-green.css` に追記する。
- 診断フォーム内部、`q-amount`〜`q-duration`、指定 `name`、`.entry-modal`、`.entry-first`、`.entry-experienced`、`#survey-modal`、`.loan-check input[name="current_loans[]"]` は変更しない。
- `redirect.php` の転送ロジック、アフィリエイトURL、PR表記、注釈、GTM/計測タグは変更しない。
- 旧ブランド痕跡を再混入させない。
- 新しく書いた文言は必ず記録する。

## 実装中のチェック

可能な範囲で以下を確認する。

- `rg` で壊れコードや旧ブランド痕跡を確認する。
- 主要ページ: `index.html`, `beginner.php`, `result.php`, `beginner_result.php`, `redirect.php`, `operationinfo.php`
- スマホ幅: 320 / 375 / 390 / 414px
- 横スクロールが出ないこと。
- 診断CTAからモーダルが開くこと。
- 診断フォーム送信で結果ページへ遷移すること。
- ブラウザコンソールにerrorがないこと。

PHPが使えない場合は、`.php` をHTMLとして返す一時サーバーで代替してよい。その場合は `REVIEW_HANDOFF.md` に明記する。

## 成果物

作業完了時に必ず `REVIEW_HANDOFF.md` を更新する。

最低限、以下を書く。

- 完了タスク一覧
- 変更ファイル一覧
- 新規に書いた文言と設置場所
- 自分で判断した点と理由
- スキップ・保留
- 動作確認結果
- 触っていない重要ロジックの確認結果
- レビュー担当に特に見てほしい箇所

## 次のレビューへ渡す

実装が終わったら、次のようにユーザーへ案内する。

```text
実装が完了しました。次に $lp-final-review を使って最終レビューしてください。
```

ユーザーが「レビューまで自動で」と依頼している場合は、レビュアーサブエージェント `lp-reviewer` を明示的に起動し、`lp-final-review` の観点でレビューさせる。
