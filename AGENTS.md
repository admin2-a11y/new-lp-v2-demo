# AGENTS.md - マネーローンナビ LP 開発ガイド

このリポジトリは、経験者向けと初めて利用する方向けの2導線を持つカードローン比較LPです。変更前に既存契約を確認し、HTML/PHPミラー、診断、結果復元、redirect、広告素材を一体として保守してください。

## 1. 現在のページ構成

- 共通入口: `index.html`
- 経験者診断: `index.html?entry-modal=2`
- 初めて利用する方向け診断: `mobit_beginner.html`
- 経験者V2結果: `result_v2.html?variant=experienced`
- 初心者V2結果: `beginner_result_v2.html?variant=beginner`
- V1結果とPHPミラー: `result.html` / `result.php`、`beginner_result.html` / `beginner_result.php`
- 中継ページ: `redirect.html` / `redirect.php`
- 運営者情報: `operationinfo.html` / `operationinfo.php`
- 旧版確認用の各 `mobit*` ページも、参照切れを起こさない状態で維持する。

## 2. 診断フォームの保全契約

診断ロジックは `js/survey.js` に集約されています。ページ内へ同等処理を再コピーしないでください。

| 用途 | 現行識別子 |
| --- | --- |
| 診断モーダル | `#survey-modal` |
| 設問リスト | `ul.survey-list` |
| 借入額 / 希望時期 / 借入方法 | `#q-amount` / `#q-speed` / `#q-method` |
| 年収 / 職業 / 会社規模 / 勤続年数 | `#q-income` / `#q-job` / `#q-company-size` / `#q-duration` |
| 送信パラメータ | `amount`, `speed`, `method`, `income`, `job`, `company_size`, `duration`, `priority` |
| 現在の借入先 | `current_loans[]` / `.loan-check` |
| 並び順 | `sort_order` |
| 入口モーダル | `.entry-modal`, `.entry-first`, `.entry-experienced` |
| 選択 / 戻る / 送信 / 閉じる | `.choice-btn`, `.step-back`, `.step-submit`, `.modal-close` |
| 商品枠 | `.lp-box`, `.lp-box-new` |
| 締切 / 上部導線 / 結果要約 | `.deadline-box`, `.to-top`, `.result-summary` |

- 設問IDは見た目の設問順に対応する。存在しない中間IDを新設しない。
- 初心者6問、経験者7問、選択肢の値と順序、複数選択6社のvalueを変更しない。
- 選択UIと元の`select`値、URL復元、結果チップ、戻る操作、再検索を同期させる。
- 入口指定には `entry-modal=2`、結果テーマ指定には `variant=beginner` / `variant=experienced` を使う。
- 二重初期化、二重送信、連打による設問飛ばしを再発させない。
- 廃止済みの配信制御hidden入力や移行前の識別子を再導入しない。

## 3. CSSとテーマ

- 共通基盤: `css/base.css`
- 初心者テーマ差分: `css/base-green.css`
- 現行デザイン上書き: `css/theme-v3.css` / `css/theme-v3-green.css`
- カード等の機能別CSSは既存の責務を維持し、同じルールを別ファイルへ重複させない。
- 経験者ページは共通基盤と青テーマ、初心者ページは共通基盤・緑差分・緑テーマを読み込む。
- CSS/JSを変更した場合、その資産を読む全HTML/PHPで同じキャッシュバスターへ更新する。
- 320 / 375 / 390 / 414 / 768 / 1280pxで横スクロール、重なり、文字切れを確認する。

## 4. redirectの維持必須挙動

- 許可された4社の`item`だけを転送対象とし、不正値は安全な既定先とfallback表示へ戻す。
- 静的ページは `redirect.html`、PHPページは `redirect.php` を使用する。
- 中継表示、公式バナー、遅延転送、fallbackリンク、`utm_*`等のクエリ引き継ぎを維持する。
- 転送先に既存クエリがある場合とない場合の両方で、区切り文字を正しく付与する。
- `__AFFILIATE_URL_*__` は実値差し込み前の契約なので、明示指示なく変更しない。

## 5. 変更禁止対象

- 公式ASP素材: `banner_acom2.jpg`, `banner_aiful.jpg`, `banner_mobit.jpg`, `banner_promise.jpg`, `promise.gif`
- PR表記、Sponsored表記、注釈、広告文言
- `GTM-XXXXXXX` と `__AFFILIATE_URL_*__`
- 各社の金利、融資時間、限度額、無利息期間等のスペック値と商品コピー
- フォームのname/value/順序、結果カード順位、初心者/経験者のテーマ区分

画像を追加する場合は、権利を確認し、不要なEXIF/C2PA等のメタデータを除去してください。外部参照サイト固有のブランド名、ドメイン、識別子、CMS残骸を持ち込まないでください。

## 6. HTML/PHPミラー同期

- 対応するHTML/PHPは、配信方式に必要な差分以外を同時更新する。
- フォームaction、結果variant、CSS/JS参照、キャッシュバスター、PR/注釈を片側だけ変更しない。
- 静的ページでは `.html` 導線、PHPミラーでは `.php` 導線を維持する。
- PHP実行環境がない場合は、ソース差分と参照を検証し、実行確認を成功扱いにしない。

## 7. 実装と検証

- 既存の責務と命名に合わせ、無関係な一括整形やリファクタを避ける。
- 1タスク1コミットを基本とし、変更前後で `git diff --check` を通す。
- 診断は入口から最終送信、結果復元、再検索まで実操作する。
- 4社の通常カードと最終再掲カードから中継ページを確認する。
- コンソールエラー、404、横スクロール、キーボード操作、`prefers-reduced-motion` を確認する。
- 検証できない項目は理由と代替確認を記録し、成功扱いにしない。

## 8. レビュー運用

- 最終総合レビュー: `$lp-final-review`
- 見た目/CVR: `$lp-design-review`
- 画像・バナー: `$lp-banner-design-review`
- 動作QA: `$lp-qa-check`
- アクセシビリティ: `$lp-accessibility-review`
- 表示速度/SEO: `$lp-performance-seo-review`
- 公開前確認: `$lp-release-check`

推奨順序は、実装、デザイン、画像、QA、アクセシビリティ、性能/SEO、総合レビュー、必要な修正、公開前確認です。レビュー担当はまず `REVIEW_FINDINGS.md` に根拠付きで記録し、修正担当はP0/P1/P2順に最小差分で対応してください。
