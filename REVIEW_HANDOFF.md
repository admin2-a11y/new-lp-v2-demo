# REVIEW_HANDOFF

最終更新: 2026-07-07

## 完了タスク一覧

| タスク | コミット | サマリ |
|---|---:|---|
| baseline | 6cecf99 | 対象フォルダがGit未初期化だったため、初期ベースラインを作成 |
| T0 | 866edb1 | rgbaの二重カンマ、`</dvi>`、コピーライト、beginner.phpのlabel forを修正 |
| T1 | 6575339 | 全6ページのviewportを1つに統一 |
| T2 | 66db7ff | 固定画像幅を可変表示へ寄せ、320px横あふれを予防 |
| R0 | b2b2b53 | `css/theme-v3.css` / `css/theme-v3-green.css` を新設し全ページで後読み |
| R1 | b036a9d | 白背景stickyヘッダーへ刷新し、スクロール時のヘッダー色変更JSを削除 |
| R2 | be78094 | index / beginnerのヒーロー画像をHTMLヒーローへ置換 |
| R3 | 987e946 | 診断カード、モーダル、進捗、未選択表示、入口モーダルの見た目を刷新 |
| R4 | 4de2fbd | 比較表を横スクロール・1列目sticky・バッジ表示へ刷新 |
| R5 | 33f2466 | ランキングカードの装飾画像とスペック表をHTML/CSS化 |
| R6 | 01d33d0 | 結果ページのヘッダー、条件チップ、案内ブロック、再診断導線を刷新 |
| R7 | 7404d3f | redirect.phpを中央寄せの移動中画面へ刷新 |
| R8 | 69ba80a | operationinfo.phpを定義リスト型カードへ刷新 |
| R9 | 3b48bd2 | 全6ページのフッターをdetails/summary構造へ刷新 |
| R10 | 4d858b8 | 画像見出しとstep.jpgをHTML化し、残存画像にlazy/寸法属性を追加 |
| T14 | 2190da3 | iOS向けfont-size、safe-area、100dvh、tap highlightを最適化 |
| R11 | 8412262 | ブラウザQAで見つけたヘッダー位置、CTA、タップ領域を修正 |

## 新規に書いた文言

| 設置場所 | 文言 |
|---|---|
| index.html ヒーローバッジ | 最短20分で借入まで |
| index.html ヒーローH1 | あなたに合うカードローンが3問でわかる |
| beginner.php ヒーローH1 | はじめてでも安心。あなたに合うカードローンが3問でわかる |
| ヒーロー共通サブコピー | 大手3社を条件で比較・診断は無料 |
| ヒーローCTA | かんたん30秒診断をはじめる |
| ヒーローチップ | 来店不要 / スマホ完結 / 診断無料 |
| index.html エントリーモーダル補足 | 回答に合わせて最適な診断に切り替えます |
| index.html エントリーモーダル見出し | カードローンの利用経験を教えてください |
| 診断ボックス見出し | かんたん診断で絞り込む |
| 未選択プレースホルダー | タップして選択 ▼ |
| 診断モーダル進捗 | 質問 n / m |
| ランキングバッジ | No.1 / 一番選ばれています |
| アコムひとこと | アコムはスピードと使いやすさで選びやすい定番カードローンです |
| SMBCモビットひとこと | SMBCモビットはWEB完結で電話連絡や郵送物を抑えたい方に向いています |
| プロミスひとこと | プロミスはスマホからスピード重視で進めたい方に向いています |
| 結果ページH1 | あなたの条件に合うカードローン 3件 |
| 結果ページ案内 | 診断結果にもとづくおすすめ順です / 条件に近い3社を比較し、申込前に詳細を確認できます。 |
| 結果ページ再診断見出し | 条件を変えてもう一度診断 |
| redirect.php | 移動しない場合はこちらをクリックして下さい。 |
| operationinfo.php | ← トップに戻る |
| フッター一言 | カードローン選びに必要な情報を、比較しやすく整理してお届けします。 |
| R10 ステップ | 申込 / 審査 / 借入 と各1行説明 |
| R10 初心者ポイント | 必要な金額を確認 / 申込条件を確認 / 返済計画を立てる / 来店不要 / スマホ完結 / 診断無料 |
| R10 セクション見出し | 当サイトオススメのカードローン / 初めてのカードローン 絶対に知るべき4つのコツ / 厳選！4つのコツを満たしたカードローンおすすめランキング / 即日融資におすすめのカードローン / リアルな体験談 |

## 自分で判断した点と理由

- Gitが未初期化だったため、`git init`後に `chore: initial baseline` を作成してからタスク単位コミットを開始した。
- `redirect.php` と `operationinfo.php` は共通ページとして青の `theme-v3.css` を読み込ませた。初心者系2ページのみ緑CSS。
- 並び替えプルダウンは未配線のため非表示にした。DOM並び替えを新規実装すると結果カードの静的スナップショット前提を超えるため。
- 上位のUI指示に従い、見出しの `letter-spacing` はマイナスにせず `0` にした。
- PHPがローカル未導入だったため、`.php` もHTMLとして返す一時Nodeサーバーで表示確認した。
- R3の未選択文言は既存JSの初期判定後に補助JSで置換し、既存のselect id/name/li順序と送信ロジックは変更しない方針にした。
- `step.jpg` と見出し画像は削除せず、HTML化後もロールバック用に残した。

## スキップ・保留

- サーバーサイドの回答別絞り込みは元々復元されていない静的結果ページのため未対応。
- PHP実行環境での確認は未実施。代替としてNode静的サーバーで確認。
- `theme-v3` linkを実ファイルから一時削除するロールバック確認は未実施。全ページでtheme linkが既存CSSより後の独立1行であることは確認済み。
- 旧デザイン用画像は削除していない。

## 動作確認結果

- `rg`確認: rgba二重カンマ、`</dvi>`、`&#995511;` は実装ファイル上で検出なし。旧ブランド痕跡はAGENTS/CODEX_PROMPT/CODEX_TASKSの指示文内のみ検出。
- 重要ID/name確認: `select_s1`〜`select_s8`、指定name、`name="cat[]"`、`.select_modal_btn1`、`.select_modal_btn2`、`#serch2_Modal` は維持。
- ローカル配信: `http://127.0.0.1:8099/` をNode一時サーバーで配信。
- ブラウザQA: 320 / 375 / 390 / 414 / 1280px、6ページ（index, result, beginner, beginner_result, redirect, operationinfo）計30ケースで `scrollWidth > clientWidth` なし。
- ブラウザQA: 375pxの6ページで44px未満の可視タップ領域なし。
- 導線確認: 経験者入口モーダル「経験がある」→ `?select_modal=2` 遷移OK。
- 導線確認: index / beginner のヒーローCTA → `#serch2_Modal.active`、進捗表示、選択肢表示OK。
- 導線確認: index / beginner の検索フォームsubmit → result.php / beginner_result.phpへGET遷移OK。
- redirect確認: `redirect.php?item=acom` で「アコムのサイトへ移動中です。」、バナー、fallbackリンク表示OK。転送先はプレースホルダーURL。
- コンソール: ブラウザQA中のerrorログなし。

## 新規追加ファイル

- `css/theme-v3.css`
- `css/theme-v3-green.css`
- `REVIEW_HANDOFF.md`

## 未使用になった画像（削除していない）

- `images/experience/headertitle.png`
- `images/beginner/header_beginner.jpg`
- `images/mordalhead.png`
- `images/rank1_catch.png`
- `images/hitokoto_point__acom.png`
- `images/hitokoto_point__mobit.png`
- `images/hitokoto_point__promise.png`
- `images/result/result_after.png`
- `images/result/title_kuchikomi.png`
- `images/step.jpg`
- `images/experience/title_osusume.png`
- `images/beginner/beginner_title_flow.png`
- `images/beginner/beginner_title_osusume_ranking.png`
- `images/beginner/recommend_catch.png`
- `images/beginner/title_sokujitu.png`
- `images/beginner/beginner_kakujitsu_3point.png`
- `images/beginner/beginner_3point.png`

## 校正対応（第2ラウンド）

### 対応コミット

| 区分 | コミット | 対応内容 |
|---|---:|---|
| F1〜F6 | 5db3e0a | Q1ピル崩れ、条件チップ改行、アコーディオン干渉、比較表ヒント、診断モーダル見出し、コピー校正を一括修正 |
| P1 | 975f72b | ヒーロー背景・H1・バッジ・CTA・対応3社チップを強化 |
| P2 | 870cebf | ランキングカードの密度、メトリクス表示、CTA/アンバー色、アコーディオン開閉ヒントを調整 |
| P3 | 2e4d170 | セクション余白、比較表/3ステップ背景、結果ページ上部余白、セクション見出しサイズを統一 |

### F系の対応内容

- F1: #searchTOP と .rentcheck を theme-v3 側で強く上書きし、375px以下でも会社名ピルが途中改行しないよう修正。
- F2: .after_box ul li を width:auto / white-space:nowrap にして、結果条件チップの途中改行を防止。
- F3: details.points / details.kuchikomi の閉状態を完全非表示にし、旧「もっと見る」疑似要素と高さ制限を打ち消し。
- F4: index / beginner / beginner_result の比較表直前に横スクロールヒントを追加。
- F5: 4ページ共通の v3EnhanceDiagnosis に見出しの Qn. 除去と MutationObserver を追加。既存select id/name/li順序は変更なし。
- F6: H1を「30秒」訴求へ修正し、入口モーダルの重複質問を削除。ヒーロー注記と3ステップ見出しを追加。

### P系の対応内容

- P1: ヒーローを淡いアクセント背景に変更し、「30秒」を強調。バッジをアクセント塗りにし、CTAを60px高・影付き・矢印アイコン付きに変更。CTA直下に対応3社チップを追加。
- P2: モバイルのメトリクスを「融資時間は全幅、実質年率/限度額は2列」に変更。申込CTAは --v3-accent、時間訴求は --v3-amber に整理。アコーディオン見出しに「タップで開く / 閉じる」を表示。
- P3: モバイル48px / PC64pxを基準にセクション余白を統一。比較表と3ステップを --v3-bg-alt の背景帯へ寄せ、結果ページ上部の余白を圧縮。

### 新規/変更した文言

| 設置場所 | 文言 |
|---|---|
| index.html ヒーローH1 | あなたに合うカードローンが30秒でわかる |
| beginner.php ヒーローH1 | はじめてでも安心。あなたに合うカードローンが30秒でわかる |
| ヒーロー注記 | ※借入までの時間はお申込時間や審査状況などにより異なります |
| ヒーロー対応3社チップ | 対応3社: アコム / SMBCモビット / プロミス |
| 比較表ヒント | 横にスクロールして3社を比較 → |
| 3ステップ見出し | 最短で借りるための3ステップ |
| アコーディオン閉状態ヒント | タップで開く |
| アコーディオン開状態ヒント | 閉じる |

### 自己判断した点

- P2の「オレンジ残存ゼロ」は、AGENTSの「既存CSS不変」を優先し、旧CSSファイル自体は編集せず theme-v3.css / theme-v3-green.css の後勝ち上書きで可視要素をアクセント/アンバーへ統一した。
- F4の比較表ヒントは、指示対象の index.html / beginner.php / beginner_result.php に追加。result.php は指示対象外だったため未追加。
- CODEX_PROMPT_FIX.md は第2ラウンド指示の再現性を残すため、最終docsコミットに含めて作業ツリーをクリーンにする。

### スキップ・保留

- PHP実行環境での確認は未実施。前回と同じNode静的サーバーで .php をHTMLとして配信し確認。
- 旧CSS内の #f08401 などのソース上の残存は、既存CSS不変ルールにより削除していない。表示上の主要CTA/タイマー/カードUIは theme-v3 で上書き。
- 実アフィリエイト遷移先はプレースホルダーのため、外部サイト遷移の実到達確認は未実施。

### 動作確認結果

- ローカル配信: http://127.0.0.1:8099/ で確認。
- 経験者フロー: 375pxでヒーローCTA → 診断モーダル7問 → submit → result.php 遷移OK。見出し Qn. なし、進捗「質問 1 / 7」〜「質問 7 / 7」OK。
- 初心者フロー: 375pxでヒーローCTA → 診断モーダル6問 → submit → beginner_result.php 遷移OK。見出し Qn. なし、進捗「質問 1 / 6」〜「質問 6 / 6」OK。
- レスポンシブ: 320 / 375 / 414pxで index, beginner, result, beginner_result の scrollWidth - clientWidth = 0。
- F1確認: 320 / 375 / 414pxで Q1会社ピルの高さ48px、途中改行なし。
- F2確認: 結果ページ条件チップは white-space: nowrap、scrollWidth == clientWidth。
- F3/P2確認: アコーディオン閉状態に「タップで開く」、結果カード上のはみ出しなし。
- F4確認: index / beginner / beginner_result で比較表ヒント表示、比較表は内部横スクロールのみ。
- P1確認: 375pxスクリーンショットでH1とCTAがファーストビュー内に収まり、ヒーロー注記/対応3社チップ表示OK。
- コンソール: 上記ブラウザQA中のerrorログなし。

## 校正対応（第3ラウンド）

コミット: `fix: 第3ラウンド指摘対応`

### 対応内容

- G1: `details.points` / `details.kuchikomi` の閉状態をフラットなバーに戻し、旧CSSの絶対配置と余白を theme-v3 / theme-v3-green の `/* ==== round3 fixes ==== */` で上書き。
- G2: `.v3-table-hint` の旧リボン点滅アニメーションと疑似要素を停止。
- G3: FV画像2枚とエントリーモーダルバナーを長辺1200px・品質82で再圧縮し、APP1メタデータなしに更新。FV画像2枚には `fetchpriority="high"` を追加。
- G4: `result.php` / `beginner_result.php` の結果H1にモバイル専用改行 `br.v3-sp-br` を追加し、「カードローン」の途中改行を防止。
- G5: `prefers-reduced-motion: reduce` 時に常時アニメーションとトランジションを抑制。

### 画像圧縮結果

| ファイル | 圧縮前 | 圧縮後 | 寸法 | APP1 |
|---|---:|---:|---|---|
| `images/hero-experience-firstview.jpg` | 315,586 bytes | 138,331 bytes | 1200x724 | なし |
| `images/hero-beginner-firstview.jpg` | 286,302 bytes | 120,510 bytes | 1200x712 | なし |
| `images/entry-modal-banner.jpg` | 264,385 bytes | 115,467 bytes | 1200x720 | なし |

## 校正対応（第4ラウンド）

コミット: `fix: 第4ラウンドFV最適化`

### 対応内容

- M1: 結果ページのヘッダー下余白、`.after_box`、条件チップ、案内ブロック、カード前余白をモバイルで圧縮。375pxで1位カード冒頭がFV内に入るよう調整。
- M2: TOP / beginner のヒーロー下部、CTA、注記、診断ボックス、Q1ピル、設問行、送信ボタン余白をモバイルで圧縮。アンケートの id/name/li 順序/JS は変更なし。
- M3: `.timer_in_box > .timerbox::after` の直下指定へ変更し、カード内タイマーの「までに申込」混入を theme-v3 / theme-v3-green で抑止。
- docs: `CODEX_PROMPT_FIX2.md` / `CODEX_PROMPT_FIX3.md` を今回コミット対象に含める。

### 実測結果（375x812）

| 項目 | 修正前 | 修正後 | 目標 |
|---|---:|---:|---:|
| index.html 送信ボタン下端 | 1049px | 854px | ≤860px |
| beginner.php 送信ボタン下端 | 827px | 722px | ≤860px |
| result.php 1位カード上端 | 720px | 433px | ≤480px |
| beginner_result.php 1位カード上端 | 636px | 337px | ≤480px |
| result.php 条件チップ高さ | 136px相当 | 64px | ≤76px |
| 結果案内ブロック高さ | 123px | 40px | ≤44px |

### 動作確認結果

- ローカル配信: `http://127.0.0.1:8099/` で確認。
- レスポンシブ: 320 / 375 / 390 / 414pxで index, beginner, result, beginner_result の `scrollWidth - clientWidth = 0`。
- 達成基準: 375pxで `result.php` の `.topbox.case` 上端433px、`beginner_result.php` 上端337px。index の送信ボタン下端854px。
- アンケート回帰: 経験者フロー `/` → `result.php`、初心者フロー `/beginner.php` → `beginner_result.php` への送信遷移OK。
- タイマー確認: 診断ボックス上部の「までに申込」は維持。ランキングカード内の `.timerbox::after` は `none`。
- 既存404: 旧CSS由来の `css/images/icon_clock.png` が404。今回の第4ラウンド差分由来ではないため、既存CSS不変ルールを優先して未変更。

## 校正対応（第5ラウンド）

コミット: `fix: 第5ラウンド指摘対応`

### 対応内容

- H1: 第4ラウンドで入れた結果条件チップの2列固定を解除し、内容に応じた自然幅と `max-width: 100%` / `overflow: hidden` / `text-overflow: ellipsis` に変更。長い回答値でも横スクロールしないよう調整。
- H2: 旧CSS由来の `#contents` 上部オフセットを `margin-top: 12px !important` で上書き。結果ページのヘッダー下余白を圧縮。
- docs: `CODEX_PROMPT_FIX4.md` を今回コミット対象に含める。

### 実測結果

| 項目 | 修正前 | 修正後 | 確認幅 |
|---|---:|---:|---|
| 長い条件URLの横スクロール | 12px | 0px | 390px |
| `result.php` `.after_box` 上端 | 153px | 69px | 375px |
| `result.php` 1位カード上端 | 433px | 384px | 375px |
| `beginner_result.php` `.after_box` 上端 | 57px | 69px | 375px |
| `beginner_result.php` 1位カード上端 | 337px | 384px | 375px |

### 動作確認結果

- ローカル配信: `http://127.0.0.1:8099/` で確認。
- 長い条件URL: `loan_speed_dis=a3_1` / `loan_speed_dis=a3_4` と `borrow_limit_dis=a2_3` の組み合わせで 375 / 390 / 414px の横スクロール0。
- レスポンシブ: 320 / 375 / 390 / 414pxで index, beginner, result, beginner_result, operationinfo, redirect の横スクロール0。
- アンケート回帰: 経験者フロー `/` → `result.php`、初心者フロー `/beginner.php` → `beginner_result.php` への送信遷移OK。
- operationinfo / redirect: `#contents` 変更後も横スクロールなし。operationinfo の本文開始はヘッダー下約69pxで不自然な詰まりなし。
- 既存404: 旧CSS由来の `css/images/icon_clock.png` が404。今回の第5ラウンド差分由来ではないため、既存CSS不変ルールを優先して未変更。

## lp-fixer対応（2026-07-08 REVIEW_FINDINGS P1/P2）

### 対応内容

- P1: `redirect.php` の `fallback-link` を `window.onload` 内で設定し、自動遷移と同じ正規化済み `item` / `redirectUrlWithParams` を使うよう修正。無効な `item` でもデフォルト先のfallbackが表示されます。
- P1: `index.html` / `beginner.php` のFV画像altとFV注記を条件付き表現へ変更。FV画像内の「誰にもバレない」「バレない」は、既存画像の左下アイコン部分だけを「周囲に知られにくい」へ上書きしました。
- P2: `result.php` / `beginner_result.php` の再診断フォームで、職業ラベルの `for` を `select_s6` に修正。
- P2: 結果ページ上部CTAの `.after_box .btn_red, .after_box .btn_g` を、青/緑themeとも `min-height: 44px` に修正。
- P2: 旧CSS参照の欠損 `css/images/icon_clock.png` を追加し、404を解消。
- P2: `select_s3` はプロダクトHTMLを復元せず、`AGENTS.md` / `CODEX_TASKS.md` に欠番仕様として明記。
- P2: `beginner.php` の初心者向け見出し/アコーディオン文言を、断定・強調を抑えた表現へ変更。

### 新規/変更した文言

| 設置場所 | 文言 |
|---|---|
| index.html FV alt | WEB完結やコンビニATMなど、来店せず進めやすい方法もあります。 |
| beginner.php FV alt | WEB完結や初回無利息サービスなど、条件に合う選択肢を比較できます。 |
| FV画像内アイコン | 周囲に知られにくい |
| FV注記 | ※借入までの時間はお申込時間や審査状況などにより異なります。ご利用方法や状況によっては、ご家族や勤務先に確認が必要な場合があります |
| beginner.php セクション見出し | 初めてのカードローン 申し込み前に知っておきたい4つのコツ |
| beginner.php アコーディオン見出し | 1. 周囲に知られにくい方法で進めやすい場合があります |
| AGENTS.md / CODEX_TASKS.md | `select_s3` は欠番。既存JS参照のみを理由にプロダクトHTMLへ無理に復元しない。 |

### 確認結果

- `git diff` で差分確認。アンケートのselect id/name、`.select_modal*`、`#serch2_Modal`、`.rentcheck input[name="cat[]"]` は変更していません。
- `rg` でP1対象の旧FV alt文言（`誰にもバレない`, `バレない、WEB完結`）と初心者向け強表現（`絶対に知るべき`, `家族や友達にバレず`）が解消していることを確認。
- `rg` で結果ページ職業ラベルの `for="select_s5"` 残存が対象箇所には無いことを確認（年収ラベルの `select_s5` は正しいため維持）。
- `rg` で `css/style-main.css` / `css/style-main-green.css` の `icon_clock.png` 参照を確認し、`css/images/icon_clock.png` を追加。
- FV画像2枚はAPP1/APP13メタデータなしを確認（`metadataMarkers=none`）。
- PHPはローカルPATH上に無く、`php -S` 確認は未実施。
- 代替のNode静的サーバー起動は権限付き実行が利用上限で拒否されたため未実施。
- in-app Browserでの `file://` 表示確認もブラウザURLポリシーでブロックされたため未実施。今回は静的確認と画像目視確認まで。

### レビュー担当に見てほしい箇所

- FV画像左下アイコンの上書き品質と、FV注記がスマホ幅で長すぎないか。
- `redirect.php` のfallbackが保存クエリ付きURLになること（ブラウザ実測は未実施）。

## 追加専門レビュー後のP1対応（2026-07-08）

### 対応内容

- Design/Banner P1: FV画像とaltの「15社」訴求を、実画面に合わせて「大手3社を比較」へ変更。対象は独自FV画像2枚のみで、公式アフィリエイトバナー/口コミ画像は未編集。
- Design P1: PC幅FVの画像高さを抑え、CTAと注記が1280x720内に収まるようtheme-v3/theme-v3-greenの最終上書きを追加。
- Design P1: `js/v3-accessibility-cvr.js` を追加し、1位カード上部に「公式サイトで詳細を見る」CTAを挿入。
- Accessibility P1: 入口/診断モーダルの疑似ボタンへ `role="button"` / `tabindex="0"` / Enter・Space操作、dialog属性、簡易フォーカストラップ、Esc閉じを追加。
- Performance/SEO P1: 主要4ページのrobotsを `index, follow` へ変更。`redirect.php` / `operationinfo.php` の `noindex, nofollow` は維持。
- P2対応: 結果ページ上部CTA高さ、fallbackボタン化、favicon追加、診断モーダル初期見出し、バナーalt補完、meta description、redirectバナー寸法を修正。

### 新規/変更した文言

| 設置場所 | 文言 |
|---|---|
| FV画像内コピー | 大手3社を比較 |
| index.html FV alt | 大手3社を条件で比較。延滞経験ありでも相談しやすいカードローン。WEB完結やコンビニATMなど、来店せず進めやすい方法もあります。 |
| beginner.php FV alt | 大手3社を条件で比較。初めて借りる人にオススメのカードローンがわかる。WEB完結や初回無利息サービスなど、条件に合う選択肢を比較できます。 |
| 1位カード上部CTA | 公式サイトで詳細を見る |
| redirect fallback | 移動先を開く |
| 診断モーダル初期見出し | かんたん診断で絞り込む |
| meta description | 各ページにページ内容に合わせた説明文を追加 |

### 動作確認結果

- Headless Edge + 一時Node静的サーバーで 320 / 375 / 390 / 414 / 768 / 1280px の主要ページ横スクロール0、主要console errorなし。
- 1280x720で index / beginner のFV CTA下端569px、注記下端600px。
- result / beginner_result の「条件を変更する」は768px実測61px。
- redirect fallbackは768/1280px実測48px、文言「移動先を開く」。
- 診断モーダル内にtabbable要素6件、`.modal-btn` / `.modalClose` に `role="button"` と `tabindex="0"` が付与されることを確認。
- robots: index / beginner / result / beginner_result は `index, follow`、redirect / operationinfo は `noindex, nofollow`。
- `rg`確認: プロダクトファイル内に `15社から厳選`、`<h2>TITLE</h2>` は検出なし。旧強表現はREVIEW_HANDOFF/REVIEW_FINDINGSの履歴記録内のみ。
