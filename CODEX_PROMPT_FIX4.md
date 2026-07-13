# CODEX_PROMPT_FIX4 — 第5ラウンド修正指示（このファイルの内容をそのままCodexに貼り付ける）

---

あなたはこのリポジトリ（`new-lp-v2/`）の継続開発エージェントです。
第4ラウンド（FV最適化）のClaude再レビュー結果: **達成基準はすべてクリア**（送信ボタン下端854px≤860、1位カード上端433px≤480、「までに申込」混入解消）。ただし残課題が2件見つかりました。どちらも小規模です。

`AGENTS.md` の絶対ルール厳守。theme-v3.css / theme-v3-green.css は自分たちのファイルなので、round4 fixes セクションを直接編集してよい。

## H1. 結果ページの条件チップが右にはみ出す（優先度高・回帰バグ）

**症状**: 375〜414px幅で、回答値が長い場合（例: `/result.php?loan_speed_dis=a3_1&borrow_limit_dis=a2_3&how_dis=a4_1` の「1時間以内に借りたい」）にチップ内のテキストがコンテナ右端を越え、**scrollWidth=395 > 375 で横スクロールが発生**。320pxでは1列になるため発生しない。
**原因**: round4で入れた `flex: 1 1 calc(50% - 3px)`（2列固定）と、既存の `white-space: nowrap` の競合。セル幅(約145px)より長いnowrapテキストがliからあふれる。
**修正**: `.after_box ul li` の flex 指定を「内容に応じた自然な幅+折返し」に変更（round4のルールを直接書き換え）:

```css
.after_box ul li {
  flex: 0 1 auto !important;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

（長いチップは1行を専有し、最悪ケースは省略記号で切れる。ul の flex-wrap: wrap は維持）
**確認**: 上記URLと `loan_speed_dis=a3_4`（1週間以内）でも 375 / 390 / 414px で `scrollWidth == clientWidth`。チップ2〜3行でカード上端が480pxを超えないこと。

## H2. ヘッダー下の96px空白が未対応（M1-1の残り）

**症状**: result / beginner_result でヘッダー(57px)と結果カード(153px)の間に96pxの空白が残っている。
**原因**: 旧CSSが `#contents` に `margin-top: 96px` を設定（旧・固定ヘッダー時代のオフセット。現在のヘッダーはsticky=フロー内なので不要）。
**修正**: theme-v3 / theme-v3-green に追加:

```css
#contents {
  margin-top: 12px !important;
}
```

**確認**: result / beginner_result で `.after_box` 上端が約70px、1位カード上端が**約350px**まで上がること。`#contents` を使う operationinfo.php も表示が詰まりすぎないこと（不自然なら operationinfo 側だけ余白をtheme上書きで足す）。redirect.php への影響も目視確認。

## 確認方法（共通）

- 320 / 375 / 390 / 414px で横スクロールなし。
- 両フローでアンケート→送信→結果ページの回帰。
- `REVIEW_HANDOFF.md` に「## 校正対応（第5ラウンド）」を追記（修正前後の実測値つき）し、1コミットでクリーンに終える。
- 完了後、Claudeが再レビューする。
