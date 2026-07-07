# AGENTS.md — マネーローンナビ LP（開発エージェント向け指示）

このリポジトリ（`new-lp-v2/`）はローン比較のランディングページ。元LPを別クライアント「マネーローンナビ」向けに作り直したもの。
**あなた（Codex等のエージェント）はここを継続開発する。以下のルールを必ず守ること。**

---

## 1. まず現状を理解する
- 2フロー構成:
  - 経験者: `index.html` → `result.php`（**青テーマ**）
  - 初心者: `beginner.php` → `beginner_result.php`（**緑テーマ**）
  - 共通: `redirect.php`（アフィリンク中継）, `operationinfo.php`（運営者情報）
- 全体像・経緯は親フォルダの `../_HANDOFF_開発継続ガイド.md` を読むこと。

## 2. ★絶対に壊してはいけないもの（触る前に確認）
1. **アンケート診断のJS**（`index.html`/`beginner.php` の `<script>` 内、モーダル診断ロジック）。
   - `<select>` の **id `select_s1`〜`select_s8`** と **name（`borrow_limit_dis`, `loan_speed_dis`, `how_dis`, `annual_income_dis`, `how_many_loans_dis`, `company_size_dis`, `duration_dis`, `focous_dis`）を変更・削除しない**。
   - `<ul class="select_box">` の **`<li>` の順番と `nth-of-type` による段階表示**（初期2問表示→回答で順次開く）を壊さない。
   - エントリーモーダル（`.select_modal` / `.select_modal_btn1`=はじめて / `.select_modal_btn2`=経験がある）と `#serch2_Modal` のクラス名を維持。
   - 設問の順序は確定済み（先頭2問は「いつまでに→いくら」）。勝手に戻さない。
2. **青/緑テーマの分離**:
   - 経験者ページは `style.css`+`style-main.css`+`style_add.css`（青）。
   - 初心者ページは `style-green.css`+`style-main-green.css`+`style_add-green.css`（緑）。
   - **CSSを共通化・マージしない**。両テーマを崩さないこと。青CSSを直したら緑CSSにも同等の変更を反映する。
3. **プレースホルダー**（`__BRAND_NAME__`, `__COMPANY_NAME__`, `__COMPANY_ADDRESS__`, `__COMPANY_EMAIL__`, `GTM-XXXXXXX`, `__AFFILIATE_URL_*__`）は指示が無い限り消さない（実データ待ち）。
4. **痕跡を再混入させない**: 旧ブランド「ローンプラス」「moment合同会社」「loan-plus.jp」「GTM-TQHV5GQ5」「rextjapan」等を復活させない。画像を追加する時はメタデータ（EXIF/C2PA）を除去する。

## 3. コード規約
- 既存のクラス命名・インデント・書式に合わせる。過度なリファクタや一括整形をしない（差分を最小に）。
- レスポンシブの主ブレークポイントは **`max-width: 768px`**（モバイルファースト）。新規もこれに合わせる。
- 固定 `px` 幅の新規追加は避け、`%` / `max-width` / `clamp()` / flex を優先。
- 変更は小さく分割し、1タスク＝1テーマで進める。

## 4. 確認方法（必ず実施）
- PHPで配信して確認: `php -S localhost:8099 -t .`（PHP未導入なら要インストール。動的処理は未使用なので `.php`→`.html` 静的配信でも可）
- 確認URL: `http://localhost:8099/`（経験者・青）/ `http://localhost:8099/beginner.php`（初心者・緑）
- **モバイル幅 320 / 375 / 390 / 414px で横スクロールが出ないこと**を必ず確認。
- アンケートを実際に1問目→送信まで通し、`result.php` / `beginner_result.php` に遷移することを確認（回帰チェック）。

## 5. リデザイントラック（案A クリーン・フィンテック）の特例ルール
`CODEX_TASKS.md` の R0〜R11 は見た目を一新するリデザイン作業。以下の方式で「壊さず大きく変える」:
- **新デザインはすべて上書き用CSSに書く**: `css/theme-v3.css`（青）/ `css/theme-v3-green.css`（緑）を新設し、各ページの **`</head>` 直前（既存CSSより後）** で読み込む。**既存CSSファイルは編集しない**（ロールバック＝link 1行削除で成立させるため）。
- 上書きが効かない場合のみ `!important` を許可（乱用しない。セレクタ詳細度で解決を優先）。
- **HTML構造の変更が許されるのは**: ヒーロー(`#mainvisual`)、画像見出し→HTMLテキスト化、ランキングカード内の装飾要素、フッター、operationinfo/redirect のコンテンツ部。
- **HTML変更が禁止なのは**: アンケートフォーム内部（`ul.select_box` の構造、select の id/name、`.rentcheck` の input）、`#serch2_Modal`・`.select_modal` の既存クラス、GTM/計測タグ、PR表記・注釈の文言。
- アフィリエイトバナー画像（banner_*.jpg / promise.gif）と口コミ画像（kuchikomi_*.png）は差し替え不可（広告素材）。それ以外の装飾画像（見出し画像等）はHTML/CSSへの置き換えを推奨。
- 旧デザイン専用になった画像は削除せず残す（ロールバック用）。

## 6. タスクの一覧
着手すべき改善タスクは `CODEX_TASKS.md` にある。上から順に、1タスクずつ実施・確認・コミットすること。
