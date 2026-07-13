# CODEX_PROMPT_FIX2 — 第3ラウンド修正指示（このファイルの内容をそのままCodexに貼り付ける）

---

あなたはこのリポジトリ（`new-lp-v2/`）の継続開発エージェントです。
第2ラウンド（F1〜F6 / P1〜P3 / 画像ヒーロー差し替え）に対するClaudeの再レビューが完了しました。**F1〜F6はすべて修正確認済み、画像ヒーロー・エントリーモーダルは大幅改善**と評価されています。残った以下のG系（4件+任意1件）を修正してください。

`AGENTS.md` の絶対ルールは引き続き厳守。CSSの追加は `css/theme-v3.css` 末尾に `/* ==== round3 fixes ==== */` セクションを作り、同内容を `css/theme-v3-green.css` にも複製すること。

## G1. アコーディオン閉状態が「空の枠」に見える（優先度高・全カード）

**症状**: 「ここがオススメ」「リアルな体験談」の閉状態で、枠線ボックスの中に見出しだけが上部に浮き、下に約45pxの空白が残る（実測: details閉=95px、ヘッダー=50px、summaryの計算高さ=0）。
**原因**: 旧CSSが `.points_header` / `.kuchikomi_header` を `position: absolute` にしている（旧デザインの「浮きリボン」用）。中身は非表示になったが、絶対配置のためsummaryが高さを持たず、detailsのpaddingだけが箱として残る。
**修正**: theme-v3 に追加し、閉状態を「高さ約50〜56pxのフラットなバー」にする:

```css
details.points .points_header,
details.kuchikomi .kuchikomi_header {
  position: static !important;
  transform: none !important;
  width: 100% !important;
  margin: 0 !important;
}
details.points:not([open]),
details.kuchikomi:not([open]) {
  padding: 0 !important;
}
```

適用後、375pxで閉=コンパクトなバー、タップで開閉、開状態のレイアウトが崩れないことを4ページ全カードで確認。位置ずれ等の副作用が出たら `.points_header` 内のpタグ配置（テキスト位置・「タップで開く」ヒント）もtheme側で整え直してよい。

## G2. 比較表ヒントが点滅している（優先度中）

**症状**: 「横にスクロールして3社を比較 →」が3秒周期で点滅する。
**原因**: 旧CSS `style-main.css` の `.lp-box > p:nth-of-type(1)`（リボン点滅用 `animation: flash 3s linear infinite`）に、`.lp-box` セクション先頭に挿入した `.v3-table-hint` がマッチしている。
**修正**: theme-v3 に追加:

```css
.v3-table-hint {
  animation: none !important;
  background: transparent !important;
}
.v3-table-hint::before,
.v3-table-hint::after {
  content: none !important;
}
```

対象3ページ（index / beginner / beginner_result）で点滅が止まり、テキストが右寄せ12pxグレーで表示されることを確認。

## G3. 新規画像の軽量化とメタデータ除去（優先度中）

対象: `images/hero-experience-firstview.jpg`(308KB) / `images/hero-beginner-firstview.jpg`(279KB) / `images/entry-modal-banner.jpg`(258KB)。
1. ヒーローはLCP（最初に見える最大要素）のため、**品質80前後で再圧縮し各150KB以下**を目標に（画質劣化が目立つ場合は85で妥協可）。表示幅は最大でも約1000pxなので、長辺1200px程度へのリサイズも可。
2. 3枚とも58バイトの**EXIF APP1セグメントが残っている**ので除去する（AGENTSの「画像メタデータ除去」ルール）。
3. ヒーロー2枚の `<img>` に `fetchpriority="high"` を付与（`loading` 属性は付けない=eagerのまま）。
4. 圧縮前の元ファイルはコミット履歴に残るため別途保存は不要。
**確認**: 画像が視覚的に劣化していない・ファイルサイズ・EXIF無し（バイナリ先頭にAPP1が無いこと）。

## G4. 結果ページH1の不自然な改行（優先度低）

**症状**: 375pxで「あなたの条件に合うカ／ードローン 3件」と「カードローン」の途中で改行される。
**修正**: 文言は変えずに折り返し位置を制御する。例: result.php / beginner_result.php の `.result-summary h1` を
`あなたの条件に合う<br class="v3-sp-br">カードローン <span>3</span>件` とし、theme-v3 で `.v3-sp-br { display: none; } @media (max-width: 768px) { .v3-sp-br { display: block; } }`。あわせて h1 の font-size を `clamp(24px, 6vw, 36px)` 程度に調整してもよい。
**確認**: 320 / 375 / 414px で単語の途中で切れないこと。

## G5.（任意）無限アニメーションの抑制

旧CSS由来の常時アニメーション（CTAの `cvbtn` 点滅、`blinkAnimation` 等）が複数動いており、描画負荷とバッテリーに不利。余力があれば theme-v3 に以下を追加:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 確認方法（共通）

- 320 / 375 / 414px で横スクロールなし。
- アンケート回帰: 経験者・初心者の両フローで診断→送信→結果ページまで通す。
- アコーディオンの開閉、比較表の横スクロール、条件チップの表示を目視確認。

## 最終成果物

- G1〜G4（+G5実施時）を1コミットずつ、または「fix: 第3ラウンド指摘対応」で一括1コミット。作業ツリーはクリーンに。
- `REVIEW_HANDOFF.md` に「## 校正対応（第3ラウンド）」を追記（対応内容・コミット・画像の圧縮前後サイズ）。
- 完了後、Claudeが再レビューする。
