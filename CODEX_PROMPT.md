# CODEX_PROMPT — 全タスク一括実行プロンプト（このファイルの内容をそのままCodexに貼り付ける）

---

あなたはこのリポジトリ（`new-lp-v2/`）を継続開発するエージェントです。
これはローン比較LP「マネーローンナビ」で、以下の2フロー構成です。

- 経験者: `index.html` → `result.php`（青テーマ）
- 初心者: `beginner.php` → `beginner_result.php`（緑テーマ）
- 共通: `redirect.php`（アフィリンク中継）/ `operationinfo.php`（運営者情報）

今回のゴールは3つ。**(1) 壊れコードの修正、(2) 「案A クリーン・フィンテック」への全面リデザイン、(3) スマホ最適化。**
作業完了後、**別のAI（Claude）が全変更を校正・レビューします**。そのため後述の「最終成果物」の形で必ず引き継ぎを残してください。

詳細仕様が必要な場合は `AGENTS.md` と `CODEX_TASKS.md` の該当タスク（T0〜T14 / R0〜R11）を参照してください。本プロンプトと矛盾したら本プロンプトを優先します。

## 絶対ルール（違反しそうなら実施せずスキップして記録）

1. **アンケート診断を壊さない**:
   - `<select>` の id `q-amount`〜`q-duration` と name（`amount`, `speed`, `method`, `income`, `job`, `company_size`, `duration`, `priority`）を変更・削除しない。
   - `ul.survey-list` の `<li>` の順序と、`nth-of-type` による段階表示（初期2問→回答で順次開く）を壊さない。
   - `.entry-modal` / `.entry-first` / `.entry-experienced` / `#survey-modal` のクラス・idを維持。診断JSのロジックは変更しない（見た目のCSSは可）。
   - `.loan-check` 内 input の `name="current_loans[]"` と value を変更しない。
2. **新デザインのCSSはすべて新規ファイルに書く**: `css/theme-v3.css`（青ページ用）/ `css/theme-v3-green.css`（緑ページ用）を新設し、各ページの `</head>` 直前（既存CSSより後）で読み込む。**既存CSSファイルは一切編集しない**（T0のバグ修正を除く）。上書きが効かない場合のみ `!important` 可。
3. **HTML構造の変更が許されるのは**: ヒーロー（`#mainvisual`）、画像見出しのHTMLテキスト化、ランキングカード内の装飾、フッター、`operationinfo.php` / `redirect.php` のコンテンツ部。**フォーム内部・GTMタグ・計測用hidden inputは不可**。
4. **文言・素材の保全**: PR表記（【PR】Sponsored by…）と注釈（※…）は一字も変えない。アフィリエイトバナー（`banner_*.jpg`, `promise.gif`）と口コミ画像（`kuchikomi_*.png`）は差し替え不可。プレースホルダー（`__BRAND_NAME__`, `__COMPANY_NAME__`, `GTM-XXXXXXX`, `__AFFILIATE_URL_*__` 等）は残す。
5. **redirect.php の転送ロジック**（linkMap / getStoredQueryParams / setTimeout / fallback-link）は変更しない。
6. 外部参照サイト固有のブランド名・法人名・ドメイン・計測IDを再混入させない。旧デザイン専用で未使用の素材は、参照と権利を確認して整理する。

## デザイン仕様（案A クリーン・フィンテック）

白基調＋余白＋大きな文字の「今どきの金融サービス」。装飾は最小限、情報の階層をタイポグラフィと余白で表現する。

```css
/* theme-v3.css（青） / theme-v3-green.css は変数値のみ差し替え */
:root {
  --v3-accent: #185FA5;        /* 緑版: #0F6E56 */
  --v3-accent-strong: #0C447C; /* 緑版: #085041 */
  --v3-accent-weak: #E6F1FB;   /* 緑版: #E1F5EE */
  --v3-amber: #EF9F27; --v3-amber-text: #633806;
  --v3-text: #1B1B18; --v3-text-sub: #75736C;
  --v3-bg: #FFFFFF; --v3-bg-alt: #F6F7F9; --v3-border: #E8EAED;
  --v3-radius: 16px; --v3-radius-sm: 10px; --v3-radius-pill: 999px;
  --v3-shadow: 0 1px 3px rgba(16,24,40,.07);
}
```

- フォント: Noto Sans JP（Google Fontsで400/500/700を追加）。既存の M PLUS Rounded 1c / Zen Maru Gothic 指定より優先させる。本文16px / line-height 1.7。
- ボタン: ピル型（radius 999px）、主CTAは `--v3-accent` 塗り白文字・高さ52px以上。副ボタンはアウトライン。
- カード: 白地・border 1px `--v3-border`・radius 16px・`--v3-shadow`。
- アンバー（`--v3-amber`）はランキングバッジと緊急訴求のみに使用。

## 作業手順（この順で実施。1タスク＝1コミット。コミットメッセージは「T0: 〜」「R2: 〜」形式）

### STEP 1 — T0: 壊れコードの修正
1. 全7ファイル（index.html / result.php / beginner.php / beginner_result.php / redirect.php / operationinfo.php）のJS内 `rgba(252,128,3,,0.8)` `rgba(252,128,3,,1)` のカンマ二重を修正。
2. index.html と result.php の `rgba(241,228,215,, 0.19)` も修正。
3. `css/common-green.css`（6箇所）と `css/style_add-green.css`（1箇所）のカンマ二重を修正。青側 `common.css` / `style_add.css` にも同パターンが無いか確認して同様に修正。
4. index.html 1001行目付近の `</dvi>` を修正（前後のdiv対応を確認してから）。
5. 全ページのフッター `&#995511;` → `&copy;`。
6. beginner.php のQ5ラベル `for="q-income"`（重複）→ `for="q-job"`。

### STEP 2 — T1: viewport統一
全ページの viewport メタを `<meta name="viewport" content="width=device-width, initial-scale=1">` の**1つだけ**に（現在3つ重複。`user-scalable=no` / `maximum-scale` は削除）。

### STEP 3 — T2: 320px幅の横あふれ潰し
320px幅で全4ページ（index / result / beginner / beginner_result）を確認し、`scrollWidth > clientWidth` の原因となる固定 `width:○○px` を `max-width:100%` / `%` / `clamp()` に置換。アンケート構造は触らない。

### STEP 4 — R0: theme-v3 の新設
上記デザイン仕様のトークンとベース（body背景白・旧CMS壁紙指定の無効化・フォント切替・リンク/ボタン基本形）を `theme-v3.css` / `theme-v3-green.css` に定義し、全6ページに読み込みを追加（青ページ→theme-v3.css、beginner系→theme-v3-green.css）。

### STEP 5 — R1: ヘッダー刷新
白背景・下ボーダー1px・ロゴ左・PR表記右端・高さ約56px・`position: sticky`。あわせて各ページの「スクロールでヘッダー背景色を変えるJSブロック（`rgba(252,128,3,...)` を設定している `$(window).scroll`）」を削除。

### STEP 6 — R2: ヒーローのHTML化（最重要）
`index.html` の `headertitle.png`、`beginner.php` の `header_beginner.jpg` によるヒーローを、画像をやめてHTMLに置換:
1. ピルバッジ「最短20分で借入まで」（`--v3-accent-weak` 地＋`--v3-accent-strong` 文字）
2. H1: 経験者「あなたに合うカードローンが3問でわかる」/ 初心者「はじめてでも安心。あなたに合うカードローンが3問でわかる」
3. サブコピー「大手3社を条件で比較・診断は無料」
4. 主CTA「かんたん30秒診断をはじめる」（タップで `ul.survey-list` の最初の li の click をトリガーし既存モーダルを開く）
5. 信頼チップ3つ「来店不要」「スマホ完結」「診断無料」
`#mainvisual` の id は維持。375px幅でH1とCTAがファーストビューに収まること。

### STEP 7 — R3: 診断ボックス&モーダルのスキン刷新
- `#search_box` を白カード化。見出しを「かんたん診断で絞り込む」に短縮。
- `ul.survey-list` 各行: 高さ56px以上・回答済み行に左4pxアクセントボーダー＋✓・初期表示の「未回答」「なし」は「タップして選択 ▼」に（※JSが p のテキストと option:selected を比較して開閉判定している箇所があるため、先に影響を確認し必要ならJS側比較も整合させる）。
- `#survey-modal` に進捗表示（「質問 3 / 8」＋細いプログレスバー。li の index から算出、表示の追加のみ）。選択肢は高さ52pxのピルボタン縦積み・選択中は `--v3-accent-weak` 地＋`--v3-accent` ボーダー。
- `.loan-check`（index.htmlのQ1）は2列グリッドの大きなピル型（高さ44px以上、選択時テーマ色反転＋✓）。CSSのみで実現。
- `.deadline-box` は「今日中に借りるなら ○○:○○ までに申込」の1行スリム通知バー（アンバー系）に。
- index.html のエントリーモーダル: 擬似ローディング `setTimeout(..., 3000)` を **1200ms** に短縮（2箇所）。「経験がある」を主ボタン・「はじめて」を副ボタンの視覚階層に。質問文の下に「回答に合わせて最適な診断に切り替えます」を小さく追加。

### STEP 8 — R4: 比較表の刷新
`.c-compareTable`: 外枠なし・ヘアライン区切りのみ・1列目th を `position: sticky; left: 0; background: #fff`・横スクロール＋scroll-snap・右端にスクロールヒント。◎○装飾はアクセント色の小バッジ＋太字数値に（td内テキストは不変）。「詳細」ボタンはピル型。

### STEP 9 — R5: ランキングカードの刷新
`.lp-box.case` を白カード化し、画像装飾をHTML化:
1. `rank1_catch.png` → 「No.1」アンバーバッジ＋テキスト
2. `hitokoto_point__*.png` → アクセント色の吹き出し風テキスト（画像内文言と同等の内容）
3. `.reco_table` → 3メトリクスタイル（融資時間/実質年率/限度額。ラベル12px・数値18px太字・`--v3-bg-alt` 地）
4. `.features` リスト → チップ（`li.off` はグレーアウト維持）
5. details（ここがオススメ/リアルな体験談）→ chevron付きフラットアコーディオン。口コミ画像はそのまま
6. 「詳細はこちら」→ 全幅ピルCTA＋既存マイクロコピー
対象: index → beginner → result → beginner_result の全カード。

### STEP 10 — R6: 結果ページの情報設計刷新（result.php / beginner_result.php）
1. `.result-summary`: 「あなたの条件に合うカードローン **3件**」を大きく、選択条件（`#selected-amount` 等）を条件チップ風に横並び。「条件を変更する」はアウトラインピル。
2. `result_after.png` をHTMLの案内ブロック（1〜2行）に置換。
3. 並び替えプルダウンは**未配線**（selectにnameが無くJSは `name='sort'` を探している）。非表示にするか配線するか選び、選択と理由を `REVIEW_HANDOFF.md` に記録。
4. ページ下部の `#search_box` に「条件を変えてもう一度診断」の見出しを付けR3スキンを適用。

### STEP 11 — R7: redirect.php の刷新
ロゴ→スピナー→「○○のサイトへ移動中です」→バナー→fallbackリンクの縦1カラム中央寄せに。`.deadline-box` は削除。**転送ロジックは不変**。

### STEP 12 — R8: operationinfo.php の刷新
白カード内の定義リスト型レイアウト（モバイル縦積み）＋「← トップに戻る」リンク。プレースホルダーは残す。

### STEP 13 — R9: フッターの刷新
上段=ロゴ、中段=「本サイトの目的」「各ローン会社の概要」「注意事項」を details/summary でモバイルはアコーディオン（PCは3カラム展開）、下段=運営社情報リンク＋コピーライト。**文言は一字も削らない**。

### STEP 14 — R10: 残り画像見出しのHTML化・3ステップ再構築・画像最適化
1. `title_osusume.png` / `beginner_title_osusume_ranking.png` / `beginner_title_flow.png` / `title_sokujitu.png` / `title_kuchikomi.png` / `recommend_catch.png` / `mordalhead.png` 等を同等文言のHTML見出しに置換。
2. `step.jpg`（358KB）→ 番号付きHTML3ステップ（①申込→②審査→③借入＋各1行説明）に再構築。
3. 残る `<img>` に `loading="lazy"`（ファーストビュー除く）と `width`/`height` を付与。新規画像を追加する場合はEXIF等メタデータを除去。

### STEP 15 — T14: iOS細部最適化
1. フォーム部品のモバイル時 font-size を16px以上に（フォーカス時自動ズーム防止）。
2. `#follow-banner` と PAGE TOP に `env(safe-area-inset-bottom)` を考慮。
3. モーダルの `100vh` → `100dvh`（フォールバックで `100vh` 併記）。
4. 不自然なタップハイライトに `-webkit-tap-highlight-color: transparent`＋`:active` スタイル。

### STEP 16 — R11: 総合回帰チェック
1. 全6ページ×両テーマを 320/375/390/414px＋PC幅で確認（横スクロール・文字潰れ・44px未満タップ領域が無いこと）。
2. 2フロー（経験者/初心者）で「エントリーモーダル→診断→送信→結果ページ→詳細→redirect」をフル通し。
3. theme-v3 の link を一時的に外して旧デザインに戻ること（ロールバック）を確認→戻す。

## 各タスク共通の確認方法

- `php -S localhost:8099 -t .` で配信して確認（PHP未導入なら静的配信でも可）。
- モバイル幅 320 / 375 / 390 / 414px で横スクロールが出ないこと。
- **毎タスク後に、アンケートを1問目→送信→結果ページ遷移まで通す**（回帰チェック）。壊れていたらそのタスク内で直してからコミット。

## 最終成果物（Claudeによる校正・レビューのための必須要件）

1. 全タスクをコミット済み・作業ツリーはクリーンな状態で終える（1タスク＝1コミット、メッセージは「R2: ヒーローのHTML化」形式）。
2. リポジトリ直下に **`REVIEW_HANDOFF.md`** を新規作成し、以下を記載:
   - 完了タスク一覧（タスクID・コミットハッシュ・1行サマリ）
   - **新規に書いた文言の一覧**（ヒーローH1、バッジ、チップ、見出し、マイクロコピー等。設置場所とセットで列挙。Claudeが文言を校正するため必須）
   - 自分で判断した点とその理由（例: 並び替えプルダウンの扱い、コピーの調整、色の微調整）
   - スキップ・保留したものと理由（絶対ルールに抵触しそうでやめた場合も含む）
   - 動作確認結果（上記チェックの実施記録。NGが残る場合はその内容）
   - 新規追加ファイルと、未使用になった画像の一覧（画像は削除しないこと）
3. 迷ったら保守的な選択をし、`REVIEW_HANDOFF.md` に記録して先へ進む。質問のために作業を止めない。
