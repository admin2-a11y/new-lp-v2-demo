# CODEX_PROMPT_FIX — Claudeレビュー結果の修正指示（このファイルの内容をそのままCodexに貼り付ける）

---

あなたはこのリポジトリ（`new-lp-v2/`）の継続開発エージェントです。
R0〜R11のリデザイン実装に対して、**Claudeがブラウザ実機検証つきのレビューを実施し、表示バグと品質未達を特定しました**。本プロンプトはその修正指示です。完了後、再度Claudeが検収します。

`AGENTS.md` の絶対ルール（アンケートのid/name/ロジック不可侵、既存CSS不変、新デザインは theme-v3 に記述、PR表記・注釈・プレースホルダー保全）は引き続き厳守してください。

発注者フィードバック（重要）: 現状は**「旧デザインより劣化して見える」**との評価。原因は (1) 表示バグの残存、(2) ヒーロー・カードの視覚的な弱さ、(3) 余白の間延び、(4) 新旧デザインの混在。F系（バグ・確実に直す）→ P系（磨き込み・最重要）の順で実施すること。

## 進め方

- F1〜F6 は原因特定済み・修正コード提供済み。**まとめて1コミット（`fix: レビュー指摘のバグ修正`）でよい**。
- P1〜P3 は1タスク＝1コミット。
- CSSの追加はすべて `css/theme-v3.css` の末尾に `/* ==== review fixes ==== */` セクションを作って記述し、**同じ内容を `css/theme-v3-green.css` にも複製**する（変数参照なので同一コードでよい）。

---

## F1. Q1「現在借り入れ中の会社」ピルの崩れ（index.html・検証済み）

**症状**: 375pxで「プロミ/ス」「アイフ/ル」「SMBCモ/ビット」と途中改行。Q1ブロック全体が灰色の旧背景のまま。
**原因**: 旧CSS `style-main.css` の `#searchTOP .loan-check span`（`width:31%; font-size:24px; margin...`）が、theme-v3 の `.loan-check label span` より**セレクタ詳細度で勝っている**。`#searchTOP` 自体の `background:#f0f0f0; padding:40px 30px` も未打ち消し。チェック時の✓も旧CSS `#searchTOP .loan-check input:checked + span::before {display:none}` に潰されている。
**修正**: theme-v3 に以下を追加（このコードはブラウザ検証済み。そのまま使ってよい）:

```css
#searchTOP {
  background: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
}
#searchTOP h3 {
  margin: 0 0 12px !important;
  padding: 0 !important;
  background: transparent !important;
  color: var(--v3-text) !important;
  font-size: 15px !important;
  font-weight: 700;
  text-align: left !important;
}
#searchTOP h3 span {
  color: var(--v3-text-sub) !important;
  font-size: 12px !important;
  font-weight: 400;
}
#searchTOP .loan-check span {
  width: 100% !important;
  min-height: 48px;
  margin: 0 !important;
  padding: 10px 8px !important;
  border: 1px solid var(--v3-border) !important;
  background: #fff !important;
  color: var(--v3-text) !important;
  border-radius: var(--v3-radius-pill) !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  font-size: 14px !important;
  line-height: 1.3;
  word-break: keep-all;
}
#searchTOP .loan-check input[type="checkbox"]:checked + span {
  border-color: var(--v3-accent) !important;
  background: var(--v3-accent) !important;
  color: #fff !important;
}
#searchTOP .loan-check input[type="checkbox"]:checked + span::before {
  content: "✓";
  display: inline !important;
  margin-right: 5px;
}
```

## F2. 結果ページの条件チップ崩れ（result.php / beginner_result.php・検証済み）

**症状**: 「借りたい金/額: 10万円/以下」のようにチップ内で縦に途中改行して判読不能。
**原因**: 旧CSSがliの幅を固定しており、theme-v3 の `.result-summary ul li`（inline-flex）が幅を上書きできていない。
**修正**: theme-v3 に追加:

```css
.result-summary ul li {
  width: auto !important;
  flex: 0 0 auto !important;
  white-space: nowrap;
}
```

## F3. 「ここがオススメ」「リアルな体験談」の重なり崩れ（全カード・検証済み）

**症状**: details閉状態で中身が約95pxだけクリップ表示され、口コミ画像が枠を45pxはみ出してタイマーバー・CTAに重なる（result系ページで顕著）。
**原因**: 旧CSSの「もっと見る」プレビューパターン（`#search_page .optimal_recommend ... .points_content ul p::before/::after` のグラデーション+「もっと見る...」擬似要素+クリップ高）と、theme-v3 の新アコーディオンが干渉。
**修正**: 「閉=完全非表示 / 開=全表示」の素直なアコーディオンに統一。theme-v3 に追加:

```css
details.points:not([open]) .points_content,
details.kuchikomi:not([open]) .kuchikomi_content {
  display: none !important;
}
details.points .points_content ul p::before,
details.points .points_content ul p::after,
details.kuchikomi .kuchikomi_content ul p::before,
details.kuchikomi .kuchikomi_content ul p::after {
  content: none !important;
}
details.points .points_content ul,
details.points .points_content ul p,
details.kuchikomi .kuchikomi_content ul,
details.kuchikomi .kuchikomi_content ul p {
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
}
```

## F4. 比較表のスクロールヒント欠落（index.html / beginner.php / beginner_result.php・検証済み）

**症状**: モバイルで3社中1社しか見えないが、横スクロールできることが伝わらない（R4指示の「右端にスクロールヒント」が未実装）。
**修正**: 各ページの `<table class="c-compareTable">` を包む `<div class="c-compareTableWrapper">` の直前に以下を挿入:

```html
<p class="v3-table-hint">横にスクロールして3社を比較 →</p>
```

theme-v3 に追加:

```css
.v3-table-hint {
  margin: 0 0 8px !important;
  color: var(--v3-text-sub) !important;
  font-size: 12px !important;
  text-align: right;
}
```

## F5. 診断モーダルの「Q2.」表記と進捗「質問1/7」の不一致（4ページ・原因特定済み）

**症状**: モーダル見出しが「Q2.いつまでに借りたい？」なのに進捗は「質問 1 / 7」で番号がズレて見える。
**原因と注意**: 見出しから「Qn.」を除去する処理を `updateDiagnosisState` に足すだけでは動かない。**設問リスト `ul.survey-list li` のクリックハンドラが `return false` で伝播を止める**ため、document委譲のリスナーが発火しないケースがある（検証で確認済み）。
**修正**: `v3EnhanceDiagnosis` 内で MutationObserver を使う。
(1) `updateDiagnosisState` の進捗更新ブロックの直後に追加:

```js
var heading = modal.querySelector('.modal-header h2');
if (heading && /^Q\d+\./.test(heading.textContent)) {
    heading.textContent = heading.textContent.replace(/^Q\d+\./, '').trim();
}
```

(2) 同IIFE内、イベント登録の後に追加:

```js
var v3Heading = document.querySelector('#survey-modal .modal-header h2');
if (v3Heading && window.MutationObserver) {
    new MutationObserver(function() { setTimeout(updateDiagnosisState, 0); }).observe(v3Heading, { childList: true, characterData: true, subtree: true });
}
```

対象: index.html / beginner.php / result.php / beginner_result.php の4ファイル（同スクリプトが各ページ末尾にある）。
**確認**: リスト行タップでモーダルを開いた直後から見出しに「Qn.」が付かない・進捗が正しい。設問を進める/戻るでも追随する。無限ループが起きない（strip後は正規表現が不一致になり停止する設計）。

## F6. 文言修正（コピー校正）

1. **H1「3問でわかる」は事実と不一致**（実際は経験者7問+会社選択、初心者6問）。以下に変更:
   - index.html: 「あなたに合うカードローンが**30秒**でわかる」
   - beginner.php: 「はじめてでも安心。あなたに合うカードローンが**30秒**でわかる」
   - ※「30秒」はCTA「かんたん30秒診断をはじめる」・追従バナー「簡単30秒」と整合する既存クレーム。
2. **エントリーモーダルの質問二重**（index.html）: v3ヘッダー「カードローンの利用経験を教えてください」と旧文言「Q.カードローンの利用は」が両方表示されている。`<p> Q.カードローンの利用は </p>` の行を削除（クラス無しのpで、JS依存なし。`.entry-first/2` は触らない）。
3. **ヒーローのバッジ「最短20分で借入まで」に根拠注記が無い**。信頼チップの下に追加（index / beginner両方）:
   `<p class="v3-hero-note">※借入までの時間はお申込時間や審査状況などにより異なります</p>`
   theme-v3 に追加:
   ```css
   .v3-hero-note {
     margin: 10px 0 0 !important;
     color: var(--v3-text-sub) !important;
     font-size: 11px !important;
   }
   ```
4. **3ステップに見出しが無い**（index.html）: `#flow` 内の `.v3-steps` の直前に `<h2 class="v3-section-title">最短で借りるための3ステップ</h2>` を追加。

---

# P系: 磨き込み（発注者の優先指摘: ヒーロー > ランキングカード > 余白）

## P1. ヒーローの視覚強化（最優先）

現状「白背景+黒テキスト+青ボタン」だけで**ワイヤーフレームのように素っ気ない**。旧デザインの画像ヒーロー並みの説得力に引き上げる:
1. ヒーロー背景を白から `--v3-accent-weak` ベースの淡いティントに（フラット基調は維持。グラデーションを使う場合もごく淡く）。下端で白に切り替えて診断カードへ視線誘導。
2. H1 を `clamp(26px, 7vw, 38px)` に大型化し、「30秒」を `--v3-accent` の色付きspanで強調。行間1.35。
3. バッジは `--v3-accent` 塗り白文字の小ピルに格上げし、⏱系アイコン（Font Awesome既存読込を利用可）を先頭に。
4. CTAは高さ60px・矢印アイコン付き・`box-shadow` で浮かせ、:active で沈む。幅は最大420px。
5. CTA直下に「対応3社: アコム / SMBCモビット / プロミス」のテキストチップ帯を追加して情報密度を足す（アフィバナー画像は使わない）。
6. 375pxでH1とCTAがファーストビュー内に収まることを維持。
青→緑両テーマ反映。

## P2. ランキングカードの密度と新旧混在の解消

1. スペックのメトリクスタイルがモバイルで1列縦積みになっており間延び。**モバイルでも「融資時間=全幅1枚+実質年率/限度額の2列」等のグリッド**に組み直し、タイルは「ラベル11px / 数値17px太字」で凝縮（タイル高さ64px程度）。
2. **色の統一ルール**: 申込CTA（「詳細はこちら」）はすべて `--v3-accent`。旧デザインのオレンジが残っている箇所（タイマーの吹き出し `.over`、旧ボタン装飾）は v3 のアンバー（`--v3-amber` 系）に置き換え、**アンバーは「時間・緊急訴求」専用**とする。オレンジ(#f08401系)の残存をゼロに。
3. No.1バッジ・会社名(h3)・ひとことコピーの階層を強化（バッジはアンバー塗り、会社名20px、ひとことは `--v3-accent-weak` 地の吹き出し風で視認性UP）。
4. 「ここがオススメ」「リアルな体験談」はF3適用後、閉状態のヘッダー行に「タップで開く」ことが伝わる下矢印を右端に明示。
青→緑両テーマ・全4ページのカードに反映。

## P3. 余白リズムの統一（間延び解消）

1. セクション間の縦余白をモバイル48px / PC 64pxに統一（現状は場所により過大で「スカスカ」に見える）。
2. セクション背景を「白 → `--v3-bg-alt` → 白」の交互にして、白い空白の連続を解消（比較表セクションと3ステップセクションを `--v3-bg-alt` に）。
3. 結果ページ上部（ヘッダー〜結果カードの間）の不要な空白を詰める。
4. `.v3-section-title` の font-size / margin を全ページで統一（例: 22px / 上0 下24px）。
青→緑両テーマ反映。

---

## 確認方法（各タスク後に必ず）

- ローカル配信（PHPが無ければ .php を text/html で返す簡易サーバーで可）し、**320 / 375 / 414px で横スクロールが無いこと**。
- **アンケート回帰**: エントリーモーダル→ヒーローCTA→Q1ピル選択→モーダルで最後まで回答→送信→結果ページ表示、を経験者/初心者の両フローで通す。
- 結果ページの条件チップ・アコーディオン開閉・比較表スクロールを目視確認。
- コンソールにエラーが無いこと。

## 最終成果物

1. F一括1コミット + P各1コミット。作業ツリーはクリーンに。
2. `REVIEW_HANDOFF.md` に「## 校正対応（第2ラウンド）」セクションを追記: 各F/Pの対応内容・コミットハッシュ・**新規/変更した文言の一覧**・自己判断した点・スキップした点。
3. 完了後、Claudeが再レビューする。迷ったら保守的に判断し記録して先へ進む。
