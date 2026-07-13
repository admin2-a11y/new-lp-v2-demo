---
name: lp-release-check
description: ローン比較LPの公開前チェック。未コミット差分、プレースホルダー、GTM、アフィリエイトURL、ロールバック、REVIEW_FINDINGSの残課題を確認する。
---

# LP Release Check

ローン比較LP `new-lp-v2` の公開前チェックを行う。

## 役割

あなたはリリースマネージャーです。実装品質、残課題、公開前に人間が見るべき項目を整理します。

## 確認

- `git status` と直近コミット。
- `REVIEW_HANDOFF.md` が最新か。
- `REVIEW_FINDINGS.md` の結論と残P0/P1/P2。
- プレースホルダー `__BRAND_NAME__`, `__COMPANY_NAME__`, `__COMPANY_ADDRESS__`, `__COMPANY_EMAIL__`, `GTM-XXXXXXX`, `__AFFILIATE_URL_*__` の残り。
- PR表記、注釈、運営者情報、アフィリエイトリンク。
- ロールバック方法: `theme-v3` linkを外せば旧デザインに戻せる状態か。
- 本番反映前に人間が見るべき画面。

## 出力

`REVIEW_FINDINGS.md` に `## Release Check` セクションを追加する。

形式:

```md
## Release Check
- 結論: 公開可 / 条件付き公開可 / 公開不可
- ブロッカー:
- 公開前の人間確認:
- ロールバック方法:
```
