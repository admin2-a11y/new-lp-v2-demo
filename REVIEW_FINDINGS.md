# REVIEW_FINDINGS

## 結論
- 条件付き合格
- P0は見つかりませんでした。総合P1 5件は修正済みです。P2は一部対応済み、一部は改善余地として残っています。
- 2026-07-08 LPO2確認: 入口ポップアップをファーストビュー中心にし、女性ナビゲーター案内と短い思考余白を追加。320 / 375 / 390 / 414pxで横スクロールなし、入口クリック遷移、診断モーダルの女性ナビ表示、console error 0件を確認。
- `lp-compliance-reviewer` / `$lp-compliance-review` はユーザー指示により未実施です。広告文言の適法性断定レビューはしていません。
- 旧総合Findingsのうち、`redirect.php` fallback、FV alt/注記、結果ページ職業label、`icon_clock.png`、旧連番上の中間設問が欠番である旨の明記は対応済みとして除外します。
- アンケートの指定id/name、`ul.survey-list` 順序、`.entry-modal` / `.entry-first` / `.entry-experienced` / `#survey-modal`、`.loan-check input[name="current_loans[]"]` valueは維持。PR表記・注釈・プレースホルダーも残っています。

## Post-Fix Verification
- 修正済みP1:
  - FV画像/altの「15社から厳選」を「大手3社を比較」へ変更し、画像内コピーも独自FV画像のみ上書き。
  - PC幅FVの画像高さを抑え、1280x720でCTA/注記がファーストビュー内に収まることを確認。
  - 1位カード上部に補助JSで「公式サイトで詳細を見る」CTAを追加。
  - 入口/診断モーダルの疑似ボタンへ `role="button"` / `tabindex="0"` / Enter・Space対応、dialog属性、簡易フォーカストラップ、Esc閉じを追加。
  - 主要4ページのrobotsを `index, follow` に変更。`redirect.php` / `operationinfo.php` の `noindex, nofollow` は維持。
- 追加対応済みP2:
  - 結果ページ上部「条件を変更する」は768px実測61px。
  - fallback-linkは「移動先を開く」のボタン風リンクに変更し、768/1280px実測48px。
  - `favicon.ico` を追加し、favicon 404を解消。
  - 診断モーダル初期見出し `TITLE` を「かんたん診断で絞り込む」に変更。
  - ランキングカード内バナー画像のaltを補助JSで補完。
  - 全ページにmeta descriptionを追加。
  - redirect挿入バナーに `width` / `height` を付与。
- 再確認:
  - Headless Edge + 一時Node静的サーバーで 320 / 375 / 390 / 414 / 768 / 1280px の横スクロール0、主要ページconsole errorなし。
  - 経験者/初心者のヒーローCTAから診断モーダルが開き、モーダル内tabbable要素が生成されることを確認。
  - `result.php` / `beginner_result.php` の上部CTA、1位カード上部CTA、redirect fallbackの実測高さを確認。
- 残るP2/改善余地:
  - 診断回答と各カードのおすすめ理由の接続強化。
  - 公式バナーのカード内配置最適化。
  - 追従検索ボタンの完全なbutton/a化。
  - PCフッターdetails/summaryのaffordance強化。
  - 旧CSS/JSと外部ライブラリの読み込み整理。

## Final Re-Review
- 結論: 条件付き合格。
- 修正後の `lp-reviewer` / `$lp-final-review` 再レビューでは、前回P1 5件が修正済みであることを確認しました。
- 残るP0: なし。
- 残るP1: なし。
- 残るP2:
  - 診断回答と各カードのおすすめ理由の接続強化。
  - 公式バナーのカード内配置最適化。
  - 追従検索ボタンのbutton/a化。
  - PCフッターdetails/summaryのaffordance強化。
  - 旧CSS/JSと外部ライブラリの読み込み整理。

## Findings
- [P1] index.html:218 / beginner.php:201 — FV画像とaltの「15社から厳選」が、実画面の3社比較・結果3件とまだズレている
  - 影響: ファーストビューで広い選択肢を期待させますが、診断後の結果と比較表は実質3社中心です。診断体験の納得感と、専門レビュー（Design / Banner）の整合性が残ります。
  - 推奨修正: FV画像内コピーとaltを「大手3社を条件で比較」「厳選3社を30秒診断」など実画面に合わせるか、「15社から条件に近い3社を表示」と明示してください。

- [P1] css/theme-v3.css:2233 / css/theme-v3-green.css:2228 — PC幅のFVで主CTAがファーストビュー下端に隠れる
  - 影響: Chromeヘッドレス1280px相当でCTA下端が経験者730px、初心者720px付近に出ており、720px高のPC表示で押すべき導線が見切れます。
  - 推奨修正: PC時のFV画像max-height / hero高さ / CTA位置を調整し、CTAと注記がFV内に収まり次セクションが少し見える状態にしてください。

- [P1] result.php:260 / beginner_result.php:259 / index.html:693 / beginner.php:622 — 1位カード上部に主CTAがなく、申込導線がカード下部まで遠い
  - 影響: タイトル・バナー・主要指標の直後に大きなCTAがないため、診断直後の高意欲ユーザーが「どこを押すか」を見つけるまで長くスクロールします。
  - 推奨修正: 1位カードは商品名/一言/主要3指標の直後に「公式サイトで詳細を見る」などの幅広CTAを追加し、既存下部CTAは残してください。

- [P1] index.html:203 / index.html:204 / index.html:340 / beginner.php:302 / result.php:803 / beginner_result.php:884 — 入口/診断モーダルの主要操作がp/span中心でキーボード操作できない
  - 影響: 実測で入口モーダルと診断モーダル内のtabbable要素は0件です。キーボード利用者が初回分岐や診断完了に進めません。
  - 推奨修正: 既存クラスを維持したままbutton化、または `role="button"` / `tabindex="0"` / Enter・Space対応、dialog role、初期フォーカス、フォーカストラップを追加してください。

- [P1] index.html:54 / beginner.php:54 / result.php:53 / beginner_result.php:54 — 主要LP/結果ページが `noindex, nofollow` のまま
  - 影響: 公開LPとして検索流入を期待する場合、TOPと結果ページが検索インデックス対象から外れます。redirect/operationinfoのnoindexとは分けて整理が必要です。
  - 推奨修正: 公開時は主要4ページのrobotsを外すか `index, follow` 相当に整理し、redirectはnoindex維持で問題ないかをリリース前に決めてください。

- [P2] result.php:216 / beginner_result.php:215 — PC/タブレット幅で結果ページ上部「条件を変更する」が実測44px未満
  - 影響: theme側は44px指定になりましたが、1280pxでは `body { zoom: 0.85; }` の影響で実測37.4pxでした。
  - 推奨修正: zoom後でも44px以上になるよう、対象ボタンのmin-height/paddingを増やすか、対象領域のzoom影響を打ち消してください。

- [P2] redirect.php:253 — fallback-link「こちら」が短いインラインリンクで、実測幅44px未満
  - 影響: 自動遷移が止まった時の代替導線ですが、1280pxで約35.7x37.4px、モバイル相当でも幅約42pxでした。
  - 推奨修正: 「移動先を開く」などの独立したボタン風リンクにして、実測44x44px以上を確保してください。

- [P2] index.html:32 / beginner.php:32 / result.php:31 / beginner_result.php:32 / redirect.php:32 / operationinfo.php:32 — `favicon.ico` が欠損して404
  - 影響: QAハーネスのローカル配信で `/favicon.ico` の404を確認しました。不要なエラーが残り、実エラー検知を鈍らせます。
  - 推奨修正: `favicon.ico` を追加するか、既存アイコンへ参照を一本化してください。

- [P2] index.html:338 / beginner.php:300 / result.php:801 / beginner_result.php:882 — 診断モーダル初期HTMLに `TITLE` がh2として残る
  - 影響: JS差し替え前の意味のない見出しがHTML構造に入り、支援技術やクローラーに不要な見出しを渡します。
  - 推奨修正: 初期文言を実際の診断見出しにするか、差し替え専用の空要素へ整理してください。

- [P2] index.html:706 / beginner.php:637 / result.php:275 / beginner_result.php:274 — ランキングカードの一部バナー画像リンクにaltがない
  - 影響: 画像だけを中身にしたリンクが無名リンク化しやすく、どの会社の詳細へ進むかが伝わりにくいです。
  - 推奨修正: `alt="アコム公式サイトへ"` などリンク先が分かるalt、またはリンク側のaria-labelを付けてください。

- [P2] index.html:1020 / beginner.php:1446 / js/follow_banner.js:13 — 追従検索ボタンがクリック専用画像でキーボード操作できない
  - 影響: スクロール後の診断導線をキーボードで使えず、altも「検索box」で動作が伝わりません。
  - 推奨修正: `<button>` または `<a href="#search_box">` で包み、`aria-label="診断フォームへ移動"` を付けてください。

- [P2] operationinfo.php:236 / operationinfo.php:249 / operationinfo.php:282 / css/theme-v3.css:1413 — PC幅のフッターdetails/summaryに開閉 affordance と十分な操作領域がない
  - 影響: PCでもsummaryがフォーカス可能ですが、矢印や44px程度の操作領域がなく、操作可能性に気づきにくい一方で誤って閉じられます。
  - 推奨修正: PCでもsummaryに矢印・cursor・操作領域を付けるか、PCではsummaryを通常見出しとして扱ってください。

- [P2] index.html:26 / beginner.php:26 / result.php:25 / beginner_result.php:26 / redirect.php:26 / operationinfo.php:26 — meta description が全ページにない
  - 影響: noindexを外した後、検索結果スニペットやページ意図の伝達が弱くなります。
  - 推奨修正: TOP/初心者/結果/運営者情報にページ固有のdescriptionを追加してください。redirectはnoindex前提なら優先度低めです。

- [P2] redirect.php:208 / css/theme-v3.css:1276 — JS挿入のリダイレクトバナーにheight予約がない
  - 影響: 中継バナー枠に挿入されるimgはwidthのみで、画像読み込み時にレイアウトが動く余地があります。
  - 推奨修正: 挿入HTMLに既知のwidth/heightを付けるか、`.v3-redirect .banner` にaspect-ratio/min-heightを設定してください。

- [P2] result.php:250 / beginner_result.php:250 — 結果ページのおすすめ理由が診断回答と接続していない
  - 影響: 「診断結果にもとづくおすすめ順です」はありますが、各カードの理由は汎用的で、回答した条件との接続が弱いです。
  - 推奨修正: 結果上部または各カード冒頭に、選択条件に紐づく理由を2〜3個表示してください。

- [P2] result.php:273 / beginner_result.php:273 / index.html:706 / beginner.php:637 — 公式バナーが主要指標/CTAより先に出て比較導線を弱める
  - 影響: 広告素材は保持されていますが、バナーが小さく読みにくい幅で先に入り、判断材料とCTAが下へ押し出されています。
  - 推奨修正: バナーは保持したまま、主要指標と主CTAの後ろへ移すか、モバイルでは全幅に近い表示へ調整してください。

## 文言校正
- 適法性断定レビューは実施していません。
- 総合レビュー上の文言整合性として、FV画像/altの「15社から厳選」は実画面の3社比較/3件結果と揃える必要があります。

## 動作確認
- 実施した確認
  - `AGENTS.md`, `CODEX_PROMPT.md`, `CODEX_TASKS.md`, `REVIEW_HANDOFF.md`, `REVIEW_FINDINGS.md`, `.agents/skills/lp-final-review/SKILL.md`, `.codex/agents/lp-reviewer.toml` を確認。
  - `git status`, `git diff`, 直近コミットログを確認。作業ツリーには未コミット変更と `REVIEW_FINDINGS.md` / `.agents/` / `.codex/` 等の未追跡が残っています。
  - grepで `q-amount/s2/s4/s5/s6/s7/s8`、指定name、`.entry-modal*`、`#survey-modal`、`.loan-check input[name="current_loans[]"]` value（`a1_1`, `a1_2`, `a1_0`, `a1_3`, `a1_4`, `a1_11`）を確認。
  - `redirect.php` の `linkMap` / `getStoredQueryParams` / `setTimeout` / fallback-link を確認。無効itemでもfallbackはアコムへ正規化され、`utm_source=test` が付くことをChromeヘッドレスで確認。
  - FV画像2枚を目視確認し、左上の「15社から厳選」が画像内に残っていることを確認。
  - Chromeヘッドレス＋一時QAサーバーで主要ページを確認。横スクロール差分は実測0、主要な残エラーは `/favicon.ico` 404のみ。
  - `css/images/icon_clock.png` は存在確認済み。旧ブランド痕跡はプロダクトファイルでは検出なし。
- 未実施/制約
  - PHP実行環境での確認は未実施。`.php` は一時サーバーでHTMLとして配信。
  - 実アフィリエイトURLへの外部到達確認は未実施。URLはプレースホルダーです。
  - 今回のChromeヘッドレス直接実行では狭幅が約469pxに丸められたため、320/375/390/414pxの厳密な再実測は既存QAセクションの記録と静的確認を参照しています。

## 修正担当への指示
- 1. P1を優先: FV「15社」整合、PC FV CTA、カード上部CTA、モーダルのキーボード操作、主要ページrobots。
- 2. 次にP2: 結果CTA実測44px、fallbackボタン化、favicon、`TITLE` h2、バナーalt、追従ボタン、footer summary、description、redirect画像寸法、診断理由表示、カード内バナー配置。
- 3. アンケートid/name/value、`ul.survey-list` 順序、PR表記・注釈・プレースホルダーは引き続き保全すること。

## Design / CVR Review
- P0: 見つかりませんでした。

- [P1] index.html:218 / beginner.php:201 — FVの「15社から厳選」と実際の比較・結果件数がズレている
  - 影響: FV画像では15社比較の期待を作る一方、結果ページは「カードローン 3件」、ランキング/比較も実質3社中心です。診断後に「思ったより選択肢が少ない」と感じやすく、診断結果への納得感とサイトの信頼感を落とします。
  - 推奨修正: 実態に合わせてFV画像/altを「大手3社を条件で比較」「厳選3社を30秒診断」などに寄せるか、本当に15社から絞った3社であることをFV直下と結果ページで明示してください。

- [P1] css/theme-v3.css:2233 / css/theme-v3-green.css:2228 — PC幅のFVで主CTAがファーストビュー下端に隠れる
  - 影響: 1280x720実測で経験者FVのCTA下端が730px、初心者FVも720pxになり、注記や次セクションが画面下に隠れます。ヒーロー画像も左寄りに大きく表示され、右側に余白が残るため、PCユーザーが最初の3秒で「押すべきボタン」を見つけにくい状態です。
  - 推奨修正: PC時はヒーロー画像にmax-heightまたはアスペクト比制御を入れ、画像・CTA・注記が720px高のFV内に収まるよう再配置してください。画像は中央寄せまたは全幅設計に統一し、次セクションが少し見える高さに抑えるのが望ましいです。

- [P1] result.php:258 / beginner_result.php:258 / index.html:692 / beginner.php:622 — ランキングカードの主CTAがカード下部まで遠い
  - 影響: 375px実測で結果ページ1位カード上端は388pxですが、主CTA「詳細はこちら」は result.php で1142px、beginner_result.php で1179pxまで出ません。商品名やバナーはクリックできますがCTAとして見えず、診断後に申込意欲が高いユーザーほどスクロールを強いられます。
  - 推奨修正: 1位カードはタイトル/一言/主要3指標の直後に、幅広の主CTAを1つ追加してください。文言は「公式サイトで詳細を見る」「申込前に条件を確認する」など、外部遷移前の行動が分かるものにし、既存の下部CTAは残して構いません。

- [P2] result.php:250 / beginner_result.php:250 — 結果ページのおすすめ理由が汎用的で、診断回答との接続が弱い
  - 影響: 「診断結果にもとづくおすすめ順です」はありますが、各カードの理由は「スピードと使いやすさ」など汎用文に留まります。6〜7問回答した後のユーザーに対して、なぜこの順番なのかが弱く、比較・申込への納得感が伸びません。
  - 推奨修正: 結果上部または各カード冒頭に「あなたの条件に合う理由」を2〜3個表示してください。例: 「当日中希望 → 最短20分」「借り方: 振込/ATMに対応」「借入額: 最大800万円」など、既存回答値を見せるだけでもCVR上の安心材料になります。

- [P2] result.php:273 / beginner_result.php:273 / index.html:706 / beginner.php:637 — 広告バナーが判断材料とCTAの間に入り、カードの比較導線を弱めている
  - 影響: 1位カードではバナーがタイトル直後に入り、主要指標やCTAが下へ押し出されています。広告素材自体は差し替え不可でも、カードローンを比較したいユーザーにとっては「条件を見る→申し込む」の流れが一度途切れます。
  - 推奨修正: バナーは保持したまま、主要指標と主CTAの後ろへ移動するか、モバイルではCTA前に出さない配置にしてください。比較判断に必要な「融資時間・金利・限度額・主CTA」を先に見せる構造が望ましいです。

### 最初に直すべき3点
1. FVの「15社」訴求を、実際の3社比較/3件結果と矛盾しない表現へ揃える。
2. 結果ページ/ランキングカードの1位カード上部に主CTAを追加する。
3. PC FVの画像高さとCTA位置を調整し、1280x720でもCTAを完全に表示する。

## Banner / Image Review
- P0: 見つかりませんでした。

- [P1] index.html:218 / beginner.php:201 — FV画像の「15社から厳選」が実際の3社比較・結果3件と視覚的にズレている
  - 対象画像/箇所: `images/hero-experience-firstview.jpg`, `images/hero-beginner-firstview.jpg` の左上コピー。
  - 影響: スマホFVで最初に目に入る画像が「15社」を強く訴求する一方、ランキングカード・比較表・結果ページは実質3社中心です。CTA後に表示される診断/ランキングとの期待値がズレ、画像だけが古い比較LPの広い選択肢訴求に見えます。
  - 推奨修正: 独自FV画像側を「大手3社を条件で比較」「厳選3社を30秒診断」など実画面と一致する表現へ更新してください。15社母集団を残す場合は、FV直下または結果上部で「15社から条件に近い3社を表示」のように導線と接続してください。

- [P2] index.html:218 / beginner.php:201 — FV画像内の丸アイコンと画像内注記がスマホ幅で読ませにくい
  - 対象画像/箇所: FV画像下部の丸アイコン3点と最下部の画像内注記。
  - 影響: 320px実測でFV画像は約320x193px（経験者）/320x190px（初心者）まで縮み、主見出しは読めるものの、丸アイコン内の小見出しと最下部注記は読むにはかなり小さいです。直下にHTML注記があるため致命的ではありませんが、画像内に情報が詰まり、スマホではやや古いバナーLP感が残ります。
  - 推奨修正: FV画像はメインコピーと人物/ブランド感に絞り、補足訴求はHTMLのチップやCTA下テキストへ移してください。画像内に残す場合は丸アイコンを2点程度に減らし、下部注記はHTML側へ寄せると読みやすくなります。

- [P2] result.php:275 / beginner_result.php:274 / index.html:706 / beginner.php:637 — ランキングカード内の公式バナーが小さな広告サムネイル化している
  - 対象画像/箇所: ランキングカード冒頭の `banner_acom2.jpg`, `banner_mobit.jpg`, `banner_promise.jpg`。公式アフィリエイトバナーのため画像ファイル自体は編集・差し替え対象外です。
  - 影響: 320〜414px実測で結果ページ1位カードのバナー表示幅は約102〜134pxまで縮み、バナー内文字は判断材料としてほぼ読めません。商品名/一言の直後に小さな広告画像が入り、その後に主要指標とCTAが続くため、比較導線より広告素材が先に割り込む印象になります。
  - 推奨修正: バナー画像は保持したまま、主要指標と主CTAの後ろへ移すか、モバイルでは全幅に近い表示にして「公式素材」として見せ切ってください。比較判断はHTMLの一言・指標・CTAで先に完結させる構成が自然です。
## QA Check
- 実施環境: Headless Chrome 149.0.7827.200 + 一時Node静的サーバー（`.php` は `text/html` として配信）
- 確認済みページ: `index.html`（入口モーダルあり/`?entry-modal=2`）, `beginner.php`, `result.php`, `beginner_result.php`, `redirect.php?item=acom`, `operationinfo.php`
- 確認済み幅: 320 / 375 / 390 / 414 / 768 / 1280px
- 結果: P0/P1は見つかりませんでした。P2が2件残っています。
- 確認OK: 320/375/390/414pxの実横スクロールなし。768/1280pxは `scrollWidth` が大きいものの `window.scrollTo(99999, 0)` 後も `scrollX=0` で実横スクロールは再現なし。主要ページで文字/ボタンの実害ある重なりなし。iOS想定の可視input/select/textareaは16px未満なし。
- 確認OK: 入口モーダルは初期表示され、「はじめて」→ `beginner.php`、「経験がある」→ `?entry-modal=2` に遷移。
- 確認OK: ヒーローCTAから診断モーダルが開き、経験者7問/初心者6問をモーダル内で進めて `result.php` / `beginner_result.php` へGET遷移。
- 確認OK: `redirect.php?item=acom` と不正 `item=bad` は中継文言・fallbackリンクを表示し、fallbackはデフォルトのアコムURLに正規化。`utm_source` は引き継ぎ確認済み。
- 未確認: PHP実行環境での確認、実アフィリエイトURLへの外部到達確認。`click_id` は `query-keeper.js` のallowlist外のため引き継ぎ対象外として扱いました。

### Bugs
- [P2] result.php:216 / beginner_result.php:215 — 768px以上で結果ページ上部の「条件を変更する」が44px未満
  - 再現手順: Headless Chromeで `result.php` / `beginner_result.php` を 768px または 1280px 幅で開き、`.result-summary .btn_red.btn_g` の表示サイズを計測。
  - 期待結果: 主要導線のタップ/クリック領域が44px以上。
  - 実際結果: 768px/1280pxで高さ37px。`css/theme-v3.css:1163` / `css/theme-v3-green.css:1158` は `min-height: 44px` 指定だが、`css/common.css:22` の `body { zoom: 0.85; }` により実測サイズが縮んでいます。
  - 推奨修正: PC/タブレット幅でも実測44px以上になるよう、結果CTAだけ `min-height` / `padding` をzoom後基準で増やすか、theme-v3側で対象領域のzoom影響を打ち消してください。

- [P2] index.html:32 / beginner.php:32 / result.php:31 / beginner_result.php:32 / redirect.php:32 / operationinfo.php:32 — `favicon.ico` が存在せず404ログが出る
  - 再現手順: Headless Chromeでローカル配信のトップを開き、ブラウザログを確認。
  - 期待結果: console/network errorが出ない。
  - 実際結果: `./favicon.ico` が全ページで `rel="shortcut icon"` として参照されていますが、リポジトリ直下に `favicon.ico` がなく `Failed to load resource: the server responded with a status of 404 (Not Found)` が出ます。
  - 推奨修正: `favicon.ico` を追加するか、既存の `images/icon.png` / `images/icon-green.png` 参照に一本化して欠損参照を削除してください。

## Accessibility Review
- P0: 見つかりませんでした。
- 実測環境: Chrome 149 headless + 一時Node静的サーバー（`.php` は `text/html` として配信）、375px / 320px / 768px / 1280pxで確認。
- 確認OK: 主要本文・フォーム入力は16px基準で、iOSズームを誘発する16px未満の可視input/select/textareaは見つかりませんでした。主要CTA、ランキングdetails/summary、フッターsummaryのモバイルタップ領域は概ね44px以上。主要配色のコントラストにP0/P1相当の不足は見つかりませんでした。

- [P1] index.html:203 / index.html:204 — 初回の入口モーダル選択肢が `p` 要素で、キーボード操作・読み上げ上のボタンになっていない
  - 影響: 初回表示の `.entry-modal` は画面を覆いますが、「経験がある」「はじめて」が `<p class="button">` のclick専用で、実測でもモーダル内のtabbable要素は0件でした。キーボード利用者やスクリーンリーダー利用者が最初の分岐を選べず、LP本体に進めない可能性があります。
  - 推奨修正: 既存クラス `.entry-first` / `.entry-experienced` は維持したまま、要素を `<button type="button">` にするか、最低限 `role="button"` / `tabindex="0"` / Enter・Space対応を追加してください。入口モーダル自体にも `role="dialog"` と見出しへの `aria-labelledby` を付け、初期フォーカスを選択肢へ移してください。

- [P1] index.html:340 / index.html:413 / beginner.php:302 / beginner.php:375 / result.php:803 / result.php:876 / beginner_result.php:884 / beginner_result.php:957 — 診断モーダルの選択肢・戻る・送信・閉じるがキーボード操作できず、フォーカスも背面へ抜ける
  - 影響: `#survey-modal` 内の選択肢は `<option>` を `p.choice-btn` に置換しており、戻る/送信も `p` 追加、閉じるも `span.modal-close` です。実測では診断モーダルを開いてもモーダル内tabbable要素は0件で、Tabは背面のhero CTA、元のselect、商品リンクへ移動しました。モーダル操作・フォーカス・読み上げの主要要件を満たせず、診断完了まで進めない利用者が出ます。
  - 推奨修正: `.choice-btn` / `.step-back` / `.step-submit` / `.modal-close` をbutton化するか、既存DOM生成を保つ場合は `role="button"`、`tabindex="0"`、Enter/Spaceキー対応を追加してください。`#survey-modal` に `role="dialog"` / `aria-modal="true"` / `aria-labelledby` を付け、開いたら先頭選択肢または閉じるボタンへフォーカス移動、Tabのフォーカストラップ、Escで閉じる処理を入れてください。

- [P2] index.html:706 / index.html:781 / index.html:848 / beginner.php:637 / beginner.php:735 / beginner.php:817 / result.php:275 / result.php:372 / result.php:454 / beginner_result.php:274 / beginner_result.php:372 / beginner_result.php:454 — ランキングカード内の画像リンクにaltがなく、リンク名が不安定
  - 影響: 商品バナー画像だけを中身にしたリンクで `alt` が未指定の箇所があります。スクリーンリーダーではファイル名読み上げや無名リンクになりやすく、「どの会社の詳細へ進むリンクか」が周辺文脈なしでは伝わりません。商品名リンクやCTAが別にあるため致命的ではありませんが、同一カード内に分かりにくいリンクが残ります。
  - 推奨修正: 各バナー画像に `alt="アコム公式サイトへ"` などリンク先が分かる代替テキストを付けるか、重複リンクとして扱うならリンク側に `aria-label` を付与してください。装飾扱いにする場合はリンクを外すか `alt=""` にして、別CTAへ導線を集約してください。

- [P2] index.html:1020 / beginner.php:1446 / js/follow_banner.js:12 — 追従検索ボタンがクリック専用の画像で、キーボード操作できない
  - 影響: `#btn-follow` は画像にclickハンドラを付けてスクロールさせていますが、画像自体はフォーカス対象ではなく、altも「検索box」に留まります。スクロール後に表示される導線をキーボードで使えず、ボタン名としても動作が伝わりにくいです。
  - 推奨修正: 画像を `<button type="button">` または `<a href="#search_box">` で包み、`aria-label="診断フォームへ移動"` など動作が分かる名前を付けてください。既存の画像は装飾として `alt=""` にするか、ボタン内画像として扱ってください。

- [P2] redirect.php:253 — fallback-link「こちら」のタップ領域が幅44px未満
  - 影響: 375px実測で `#fallback-link` は約42x44px、768px以上ではbody zoomの影響で約35.7x37.4pxでした。自動遷移が止まった時の重要な代替導線ですが、短いインラインリンクのためタップしづらい状態です。
  - 推奨修正: 文中リンクではなく「移動先を開く」などの独立したボタン風リンクにし、実測44x44px以上を確保してください。文言も「こちら」だけでなくリンク先の動作が分かる名前にしてください。

- [P2] operationinfo.php:236 / operationinfo.php:249 / operationinfo.php:282 / css/theme-v3.css:1413 / css/theme-v3-green.css:1408 — PC幅のフッターdetails/summaryに開閉 affordance と十分な操作領域がない
  - 影響: フッターの `details open` はPC幅でもsummaryがフォーカス可能で開閉できますが、markerを消しており、矢印表示と `min-height` はモバイルmedia内だけです。1280px実測ではsummary高さが約21.7pxで、ユーザーが操作可能と気づきにくい一方、誤ってEnter/Spaceを押すと内容が閉じます。
  - 推奨修正: PCでもsummaryに矢印・cursor・44px前後の操作領域を付けるか、PCではdetails開閉を使わない構造にしてsummaryを通常見出しへ変更してください。

## Performance / SEO Review
- P0: 見つかりませんでした。
- 結論: 重大なPerformance/SEO問題はP1が1件、P2が5件です。redirect.php / operationinfo.php の noindex, nofollow は用途上は妥当ですが、主要LPにも同じ noindex が入っている点は公開前に必ず整理が必要です。

- [P1] index.html:54 / beginner.php:54 / result.php:53 / beginner_result.php:54 — 主要LP・結果ページまで `noindex, nofollow` になっている
  - 影響: 経験者TOP、初心者TOP、結果ページが検索インデックス対象から外れ、内部リンクも `nofollow` 扱いになります。SEO流入を期待する公開LPとしては致命的に近く、title/h1/descriptionを整えても検索結果に出ません。一方で `redirect.php:54` と `operationinfo.php:54` の noindex は、アフィリエイト中継・運営者情報ページとしては妥当です。
  - 推奨修正: 公開時に `index.html` / `beginner.php` / `result.php` / `beginner_result.php` は `noindex, nofollow` を外すか、必要なら `index, follow` 相当へ整理してください。`redirect.php` は noindex, nofollow 維持、`operationinfo.php` は検索に出す必要がなければ noindex 維持でよいです。

- [P2] index.html:26 / beginner.php:26 / result.php:25 / beginner_result.php:26 / redirect.php:26 / operationinfo.php:26 — `meta description` が全ページにない
  - 影響: noindexを外した後も、検索結果スニペットが本文から自動生成されやすく、診断LP・初心者向け・結果ページ・運営者情報それぞれの意図が伝わりにくくなります。
  - 推奨修正: 各ページのtitle直後に、ページ固有の120文字前後のdescriptionを追加してください。TOPは「大手3社を条件で比較」「30秒診断」など実態に合わせ、結果ページは「診断条件に合うカードローンを比較」、redirectはnoindex前提なら必須ではありません。

- [P2] index.html:30-52 / beginner.php:30-52 / result.php:29-51 / operationinfo.php:30-52 — 旧CSS/JSと外部ライブラリを全ページで読み込みすぎている
  - 影響: Google Fonts 2本、jQuery、Swiper、Font Awesome、animate.css、colorbox、旧CSS一式、theme-v3を全ページ共通で読み込んでいます。`redirect.php` / `operationinfo.php` のような軽量ページでも同じ依存が走るため、FCP/LCP前のCSS評価・外部接続・未使用CSSが増えます。
  - 推奨修正: まず `redirect.php` / `operationinfo.php` から、未使用のSwiper / colorbox / wow / animate / 旧ランキング系CSSを外せるか分離してください。主要LPもtheme-v3で置き換え済みの旧見出し・旧ランキングCSSを棚卸しし、ページ別bundleまたは後段読み込みへ寄せるのがよいです。

- [P2] index.html:338 / beginner.php:300 / result.php:801 / beginner_result.php:882 — 診断モーダル内にプレースホルダー見出し `TITLE` がh2として残っている
  - 影響: JSで差し替える前提でも、初期HTML上は意味のないh2が見出し構造に入ります。noindex解除後にHTML構造を読むクローラーや支援技術へ、ページ内容と無関係な見出しを渡す可能性があります。
  - 推奨修正: 初期値を実際の診断見出しにするか、JS差し替え専用ならh2ではなく空要素＋aria-live等に整理してください。既存モーダルJSのselect id/name/li順序は触らず、見出しテキストだけを最小変更にしてください。

- [P2] index.html:706 / beginner.php:637 / result.php:275 / beginner_result.php:274 — ランキングカードのバナー画像リンクにaltがない箇所が残っている
  - 影響: 商品名リンクやCTAは別にありますが、画像リンク単体では検索・画像理解・支援技術上のリンク名が弱くなります。SEOの画像alt観点でも、主要商品画像としての文脈が不足します。
  - 推奨修正: 各バナー画像に `alt="アコム公式サイトへ"` などリンク先が分かるaltを追加するか、重複リンクとして扱うならリンク側に `aria-label` を付けて画像altは空にしてください。広告バナー画像自体の差し替えは不要です。

- [P2] redirect.php:209 / css/theme-v3.css:1276 — JS挿入のリダイレクトバナーにheight予約がなく、CLS余地がある
  - 影響: 中継バナー枠へonload後 `innerHTML` でバナーを差し込む際、imgは `width="300"` のみでheight属性がありません。CSSは `height:auto` のため、画像取得後に中継ページ中央のレイアウトが押し下がる可能性があります。
  - 推奨修正: `linkMap` に画像寸法を持たせるか、挿入HTMLに既知の `width` / `height` を付けてください。あわせて `.v3-redirect .banner` に `aspect-ratio` または `min-height` を置くと、Core Web Vitals上のCLSを抑えやすくなります。

## Release Check
- 結論: 条件付き公開可。
- ブロッカー:
  - コードレビュー上の残P0/P1はなし。修正後の総合再レビューでは、前回P1 5件は修正済みとして扱います。
  - ただし本番公開前の運用ゲートとして、`__BRAND_NAME__`, `__COMPANY_NAME__`, `__COMPANY_ADDRESS__`, `__COMPANY_EMAIL__`, `GTM-XXXXXXX`, `__AFFILIATE_URL_ACOM__`, `__AFFILIATE_URL_PROMISE__`, `__AFFILIATE_URL_MOBIT__` が実値化されることを人間が確認してください。これらが本番にそのまま出る場合は公開不可です。
  - 未コミット/未追跡差分が残っています。公開対象に含めるファイル、除外する作業ファイル、コミットまたはデプロイ反映単位を公開前に確定してください。
- 残P0/P1/P2:
  - P0: なし。
  - P1: なし。
  - P2: 診断回答とおすすめ理由の接続強化、公式バナー配置最適化、追従検索ボタンの完全なbutton/a化、PCフッターdetails/summary affordance、旧CSS/JSと外部ライブラリ整理。
- プレースホルダー/GTM/アフィリエイトURL:
  - 主要ページと中継ページに `GTM-XXXXXXX` が残っています。公開用GTM IDへ置換または配信時注入されることを確認してください。
  - `redirect.php` の `linkMap` は3社とも `__AFFILIATE_URL_*__` のままです。実URL投入後、`/redirect.php?item=acom`, `promise`, `mobit`, 不正 `item` のデフォルト遷移、fallbackリンク、`utm_*` / `gclid` 等の引き継ぎを実ブラウザで確認してください。
  - `query-keeper.js` の引き継ぎ対象は `ttclid`, `ycid`, `fbclid`, `gclid`, `gbraid`, `wbraid`, `utm_*` です。必要な成果計測パラメータが他にある場合は公開前に確認してください。
- PR表記・注釈・素材:
  - PR表記、アフィリエイト収益表記、商品別注釈は残っています。広告文言の適法性断定レビューは今回対象外のため、ユーザー側で最終確認してください。
  - 公式アフィリエイトバナー `banner_*.jpg` / `promise.gif`、口コミ画像 `kuchikomi_*.png` は存在確認のみで、今回変更していません。
- ロールバック方法:
  - デザイン差し戻しは各ページの `theme-v3.css` / `theme-v3-green.css` のlinkを外すのが基本線です。対象は `index.html`, `result.php`, `redirect.php`, `operationinfo.php`, `beginner.php`, `beginner_result.php`。
  - 1位カード上部CTAやモーダル補助挙動も完全に戻す場合は、`index.html`, `beginner.php`, `result.php`, `beginner_result.php` の `js/v3-accessibility-cvr.js` 読み込みもあわせて外してください。
  - 旧デザイン用画像は削除されていないため、CSS/JS読み込みの切り戻しで復旧しやすい状態です。
- 公開前の人間確認:
  - 実ドメインまたはステージングで `/`, `/beginner.php`, `/result.php`, `/beginner_result.php`, `/redirect.php?item=acom`, `/redirect.php?item=promise`, `/redirect.php?item=mobit`, `/operationinfo.php` を確認。
  - 320 / 375 / 390 / 414px と 1280x720 で、FV、診断モーダル、結果1位カード、CTA、フッター、横スクロール有無を確認。
  - 経験者/初心者の診断回答から結果ページ遷移、結果ページCTAからredirect、外部公式URL到達、fallbackリンクを通しで確認。
  - ブランド名、運営者情報、メールアドレス、GTM発火、アフィリエイト成果計測、PR表記・注釈・広告文言を最終目視してください。

## LPO Review（2026-07-08 追加改善）

### 結論

- 条件付き合格。390px想定の診断後ファーストビューは、H1、条件チップ、黄色帯、No.1商品名、赤線付き理由、主要スペック、上部CTAまで表示できる状態に改善済み。
- P0/P1は現時点で見つかりません。P2はCSS整理、320pxでの上部CTA位置、実公開URLでのCDN/console確認が残ります。

### Findings

- [P2] css/theme-v3.css / css/theme-v3-green.css — LPO用モバイル上書きCSSに重複が残っている
  - 影響: 表示上のP0/P1ではありませんが、Performance/SEO観点ではCSS肥大化と保守性低下につながります。
  - 推奨修正: 次回整理時に `LPO mobile result final overrides` と `LPO mobile result first-view hardening` を1ブロックへ統合してください。

- [P2] result.html / beginner_result.html 320px — 上部CTAは初期画面直下寄り
  - 影響: 390/414pxではCTAが初期画面内に入りますが、320pxでは `fastCtaTop` が約877pxで、1スクロール弱必要です。
  - 推奨修正: 320pxまで完全に収める場合は、信頼情報の折りたたみ、条件変更ボタンの小型化、サブキャッチ短縮を追加検討してください。

## Design / CVR Review（2026-07-08 LPO追加）

- 結論: P0/P1なし。診断後結果ページは、重要箇所の黄色帯、赤線理由、スペック直下CTAにより「誰向けの結果か」「なぜ1位か」「どこを押すか」が改善されています。
- P2: 320pxではCTAが初期画面直下寄りのため、極小端末まで厳密に収めるなら追加圧縮余地があります。

## Banner / Image Review（2026-07-08 LPO追加）

- 結論: P0/P1なし。公式アフィリエイトバナー画像自体は編集・差し替えなし。
- P2: 結果ページ上部ではCV導線優先で1位カード冒頭の公式バナーをCSS非表示にしています。公式バナーを必ず上部で見せる運用方針がある場合は、人間確認が必要です。

## QA Check（2026-07-08 LPO追加）

- 実施環境: Python静的サーバー `http://127.0.0.1:8121/` + Headless Chrome（ローカルネットワーク制限あり）。
- 確認済みページ: `result.html`, `beginner_result.html`
- 確認済み幅: 320 / 375 / 390 / 414 / 768 / 1280px
- 結果: 横スクロールなし。390/414pxで上部CTAは初期画面内。
- 未確認: 外部CDN到達が必要な状態でのconsole error。ローカル環境では `ERR_NETWORK_ACCESS_DENIED` によりjQuery未読込エラーが出たため、GitHub Pages実URLで再確認してください。

## Accessibility Review（2026-07-08 LPO追加）

- 結論: P0/P1なし。追加CTAはテキストリンクで、44px前後のタップ領域を確保しています。
- P2: 黄色帯・赤線理由・CTAは色だけに依存せずテキストもあります。次回、CSS重複整理とあわせてフォーカスリングの最終目視を推奨します。

## Performance / SEO Review（2026-07-08 LPO追加）

- 結論: P0/P1なし。結果ページtitle/alt/footerの公開デモ上の `__BRAND_NAME__` 表示を自然化し、初心者比較表にcaption/th scope/更新日注記を追加済み。
- P2: CSS重複と外部ライブラリ依存は残ります。GTM/アフィリエイトURL等のプレースホルダーは本番前に実値化が必要です。

## Final Review（2026-07-08 LPO追加）

- 結論: 条件付き合格。アンケートid/name/order、`.entry-modal*`、`#survey-modal`、`.loan-check input[name="current_loans[]"]`、redirect.phpの転送ロジック、PR表記、注釈、公式バナー/口コミ画像ファイルは保全されています。
- P0: なし。
- P1: なし。
- P2: CSS重複整理、320pxでのCTA完全収め、GitHub Pages実URLでのconsole/CDN確認。

## Release Check（2026-07-08 LPO追加）

- 結論: 条件付き公開可。
- ブロッカー: コード上のP0/P1はなし。ただし本番公開前に `GTM-XXXXXXX`、`__AFFILIATE_URL_*__`、運営者情報プレースホルダーを実値化してください。
- 公開前の人間確認: GitHub Pages実URLで `/?entry-modal=2`、`result.html`、`beginner_result.html`、`redirect.html?item=acom`、`operationinfo.html` を320/375/390/414pxで確認。広告文言チェックはユーザー担当。
- ロールバック方法: `theme-v3.css` / `theme-v3-green.css` と `js/v3-accessibility-cvr.js` 読み込みを外すと、今回のLPO見た目/補助CTAを戻せます。

## Compliance / Copy Review

- 今回スキップ。広告文言チェックはユーザー担当のため、`lp-compliance-reviewer` は通常フローから外しています。

## Final Integration Audit（2026-07-12）

- 結論: P0/P1なし。実際のカード先頭順に合わせてデモ一覧を整理し、アコム先頭版・モビット先頭版・共通TOP・V2を区別できるようにした。
- `result_v2.html` / `beginner_result_v2.html` はモビット先頭の詳細口コミカードとして、`result-cards-v2.css?v=38` / `result-cards-v2.js?v=31` を読み込むことを確認。
- 320 / 375 / 390 / 414 / 768 / 1280pxで主要9ページを確認し、横スクロールなし・console errorなし。
- 診断固定項目は経験者7個（旧連番上の中間設問は仕様上欠番）、初心者6個。入口モーダルと `#survey-modal` の存在も確認。
- 未追跡 `images/review-people-lineup.png` は未参照のため公開対象外。既存の公式アフィリエイトバナー・口コミ画像は編集していない。

### 残課題

- [P2] PHP実行環境でのアンケート送信から`result.php`/`beginner_result.php`への本番同等通し確認。
- [P2] `__AFFILIATE_URL_*__`、GTM、運営者情報プレースホルダーの実値化と成果計測確認。
- [P2] 広告文言・金融表現の適法性レビューは今回スキップ（ユーザー担当）。

## Additional Review Fixes（2026-07-08）

- 結論: 追加サブエージェント指摘のP0/P1は対応済み。現時点の残P0/P1はなし。
- Performance/SEO: 公開HTML/PHP上の `__BRAND_NAME__` 残存を解消。主要バナー/口コミ画像のalt欠落を補完。
- Accessibility: CTAの白文字コントラスト不足を解消するため、`.v3-lpo-fast-cta a` と結果ヘッダーCTAを濃色アクセント背景に統一。並び替えselectへ `name="sort"` / `aria-label="並び替え"` を追加。モーダル閉じるボタンはJSで `aria-label="閉じる"` を補完。
- Design/Banner: 結果ヘッダー内に主CTAを追加し、320/375/390/414pxすべてで初期画面内に表示されることを確認。
- Final Review: `operationinfo` の可視会社情報プレースホルダーを公開デモ向け自然文へ変更。強い広告表現を弱めた表現へ変更。`operationinfo.html` / `redirect.html` のフッター運営者情報リンクを `.html` に修正。
- QA: `result.html`, `beginner_result.html`, `operationinfo.html`, `redirect.html` を 320 / 375 / 390 / 414pxで再確認し、横スクロールなし。`redirect.html` の実アフィリエイトURL未設定は本番前QAの残リスク。

# F12〜F23 トレース排除3フェーズ改修レビュー（2026-07-13）

- レビュー対象: `new-lp-v2-fixes-20260713` の F12 `ec66709` 〜 F23 `ad48791`
- 判定対象: F23完了コミット `ad487916577c6c16b550432b05018645fccfe809`。F23後のコミットおよび既存の未コミット変更は対象外。
- 実施方法: 対象コミットを分離したdetached copyで、コミット監査、`.git`を除く全ファイルスキャン、参照整合、実ブラウザ操作、F22前後比較を実施。プロダクトファイルは変更していない。
- 注記: トレース件数は本レビュー追記前の `ad48791` を基準とする。本追記は検出語を証跡として記載するため、追記後の文書自体には検出語が増える。

## 結論（差し戻し）

差し戻し。P0が2件ある。

1. 正規の経験者直行URL `index.html?select_modal=2` が機能せず、主要導線2を破壊している。
2. F19の「未使用ライブラリ削除」に保全対象の可視口コミ・広告文言変更が混入している。

指定24ケースのレスポンシブ、V1表示、リンク・CSS参照、キャッシュバスター、F22前後の主要見た目には異常を認めなかった。一方、コミット単体の完了宣言、全ファイル痕跡ゼロ、HTML/PHPミラー同期にもP1が残る。

## P0（導線破壊・保全対象の変更・痕跡の重大な残存）

- [P0] `js/survey.js:38-46,71-78` — `select_modal=2` を受理せず経験者診断へ直行できない / `index.html?select_modal=2&utm_source=qa&utm_medium=review&gclid=GCLID123` を直開きすると入口モーダルが表示されたままになる。実装は `entry-modal=2` のみ生成・判定する / 主要導線2が仕様どおり開始できず、広告・計測側の既存リンクから経験者7問導線へ入れない / `select_modal=2` を正規キーとして生成・受理し、必要なら `entry-modal=2` を後方互換の別名として併存させる。正規URLのブラウザ回帰テストを追加する。

- [P0] `mobit_result.html:431-440` — F19 `1ce5a3b` にタスク外の口コミ・広告文言変更が混入 / `1ce5a3b^..1ce5a3b` を確認すると、未使用ライブラリ削除とは無関係にアイフル口コミを旧画像参照から新しいHTMLプロフィール・星・借入額・借入時間・本文へ置換している。本文は既存V2コピーとも読点が一致しない / 保全対象の広告文言を承認なしで変更しており、表示内容・審査証跡を保証できない / 承認済みの正本へ完全一致で戻すか、人間の広告文言承認を得た別スコープのコミットとして切り出す。

## P1（機能劣化・痕跡の部分残存）

- [P1] F12 `ec66709` / 当時の `mobit_result.html:473` — 「口コミ画像排除」宣言に反して、削除済みの `images/kuchikomi_aiful1.png` 参照が残り、F12コミット単体では404だった / F19で遅れて解消済み / タスク単位の完了判定と回帰証跡が不正確 / 各フェーズコミットで削除資産の参照ゼロを検査する。

- [P1] F13 `25865ba` / 当時の `css/colorbox.css:111` — `images/loading.gif` を削除したのに `url(./loading.gif)` が残った / F19でCSSごと削除されHEADでは解消済み / F13コミット単体で欠損リソース参照 / 削除コミット内でCSS `url()` まで検査する。

- [P1] F15 `eab0568` — 「F12〜F14で削除した資産への参照0件」という回帰記録が上記2件を見逃した / F15の完了記録を信頼すると欠損参照を見落とす / 当時の結果を訂正し、履歴コミットをcheckoutした再現可能な検査を残す。

- [P1] `REVIEW_HANDOFF.md:450` — F20 `ed4e7d0` がF15当時の成功記録 `index.html?select_modal=2` を `index.html?entry-modal=2` へ事後書換えした / 実際には正規URLが壊れているため、過去QAが新URLで実施済みだったように読める / 監査証跡が不正確 / 過去記録は改変せず、仕様変更・再検証結果を新節として追記する。

- [P1] `CODEX_PROMPT.md`、`CODEX_PROMPT_FIX.md`、`CODEX_PROMPT_FIX2.md`、`CODEX_TASKS.md`、`REVIEW_FINDINGS.md`、`REVIEW_HANDOFF.md`、`tests/f22-css-contract.py` — F23の全ファイル痕跡0件宣言に反し、指定旧画像名が16行、指定旧JS/CSS名が18行残る / `rg -a --hidden --no-ignore -g '!**/.git/**'` で再現 / 実ファイル・実行参照ではないが、ユーザー指定の「全ファイルでヒットしたら未完」基準に不合格 / 履歴文書・契約テストも対象に削除・抽象化するか、スキャン対象の合意済み除外規則を明文化する。

- [P1] `images/beginner-fast-borrowing-points.png`、`images/mobit-compare-title.png`、`images/illust-compare-guide.svg`、`images/illust-recommend-guide.svg`、`images/illust-survey-guide.svg` — HTML/PHP/CSS/JSから参照0件の画像が5件残る / F14/F23の「ほか未使用旧画像」排除が未完 / 同一コードベース由来の未使用素材と約2.7MBの不要配信物が残る / 用途を確認し、不要なら削除、必要なら利用根拠を記録する。

- [P1] `result.html:194-311,362-653` と `result.php:194-311,362-677`、`beginner_result.html:143,188-784` と `beginner_result.php:187-882` — 4ミラー中2組が同期していない / 期待されるform action差を除いても、`result` は52追加・28削除相当、`beginner_result` は52追加・39削除相当。4社訴求、口コミ、詳細カード構造・コピーが異なり、初心者側はHTMLだけに `beginner-result-survey.css?v=f20`、PHPだけに再検索前カウントダウンがある。PHP側には `ul` 直下の `p` と余剰閉じタグもある / 配信方式により表示・広告コピー・DOMが変わる / 保全対象コピーの正本を人間が決めたうえで同期する。`redirect` と `operationinfo` の2組は自己リンク拡張子差を正規化すると一致。

## P2（軽微）

- [P2] `css/theme-mobit.css` — HTML/PHPからの参照が0件 / 表示不具合はないが、F20で更新した未使用CSSが残り保守対象を増やす / 利用予定がなければ別タスクで削除する。

## コミット監査

| タスク | コミット | 判定 | 宣言と実差分 |
|---|---|---|---|
| F12 | `ec66709` | 実施済み・当時未完 | 口コミ排除の大半は実施したが、削除済みアイフル画像参照が残存。F19で解消。 |
| F13 | `25865ba` | 実施済み・当時未完 | 指定画像削除は実施したが、削除済みloading画像へのCSS参照が残存。F19で解消。 |
| F14 | `d033860` | 実施済み・未完 | 宣言した30画像は削除。広義の未使用旧画像は5件残存。 |
| F15 | `eab0568` | 実施済み・結果不正確 | 回帰記録がF12/F13の欠損参照2件を見逃した。 |
| F16 | `9b8ec60` | 完了 | 3スクリプト置換と参照更新は宣言どおり。 |
| F17 | `1ebe8b0` | 完了 | redirect再実装は宣言どおり。 |
| F18 | `852bdbb` | 完了 | WordPress/CMS残骸削除は宣言どおり。 |
| F19 | `1ce5a3b` | 実施済み・P0混入 | ライブラリ削除は完了したが、タスク外の口コミ・広告文言変更を含む。 |
| F20 | `ed4e7d0` | 実施済み・P0発生 | 識別子移行は実施したが、正規の経験者直行URLを破壊し過去QA記録も書換えた。 |
| F21 | `1f9129a` | 実施済み・P0継承 | 共通survey JS化は実施。F20の誤ったURL契約を継承し、テストも `entry-modal=2` のみ固定。 |
| F22 | `7e6fa85` | 完了 | CSS再構成、静的契約、旧版との実ブラウザ見た目比較に合格。 |
| F23 | `ad48791` | 実施済み・未完 | 宣言した旧ファイル実体は削除したが、全ファイル文字列痕跡、未使用画像、ブラウザ回帰に残課題。 |

- 未実施タスク: なし。F12〜F23はすべて対応コミットが存在する。ただし上表の「当時未完」「未完」「P0発生/継承」は完了条件を満たしていない。
- タスク外変更: F19のアイフル口コミ・広告文言変更。F20の過去QA記録書換え。

## トレーススキャン結果（項目ごとに0件/残存を明記）

スキャン条件: 110ファイルを `rg -a --hidden --no-ignore -g '!**/.git/**'` で走査。隠しファイル・バイナリも含む。

- 識別子: すべて0件。`serch2_Modal` / `arroe_top` / `is-justfy-center` / `focous_dis` / `topboxNew` / `timer_in_box` / `dispad_url_on` / `rentcheck` / `select_s1`〜`select_s8` / `borrow_limit_dis` / `loan_speed_dis` / `how_dis` / `annual_income_dis` / `how_many_loans_dis` / `company_size_dis` / `duration_dis` / `order_by_recommended_dis_2`。
- WordPress残骸: すべて0件。`EditURI` / `Prsd_xmlrpc` / `custom-background` / `wall_default` / `contain-intrinsic-size`。
- redirect旧実装: すべて0件。`getRedirectItem` / `redirectUrlWithParams` / `single-banner` / 「デフォルトで最初の要素を選択」 / 「1秒後に転送」。
- 旧ブランド: すべて0件。`loan-plus` / `mycardloan` / `morimori` / `ローンプラス` / `rextjapan` / `GTM-TQHV5GQ5`。
- 指定旧画像のファイル実体: 0件。`kuchikomi_*.png` / `rank1.png` / `rank2.png` / `rank3.png` / `btn_follow_*.png` / `mordalhead.png` / `step.jpg` / `hitokoto_point__*.png` / `btm_arrow02_b.png` / `icon_check_ms*.png` / `loading.gif` / `convini.webp` / `review-people-lineup.png` / `images/experience/headertitle.png` は存在しない。
- 指定旧画像名の文字列: 残存。16行・4ファイル（`CODEX_PROMPT.md:121-122`、`CODEX_TASKS.md:74,89,255-256`、`REVIEW_HANDOFF.md:23,68,98,100,102-104,107,403`、`REVIEW_FINDINGS.md:359`）。
- 指定旧JS/CSSのファイル実体: 0件。`query-keeper.js` / `timer.js` / `follow_banner.js` / `colorbox.css` / `common.css` / `common-green.css` / `style_add.css` / `style_add-green.css` / `style-main.css` / `style-main-green.css` は存在しない。`deadline-timer.js` は `timer.js` の部分一致から除外して判定。
- 指定旧JS/CSS名の文字列: 残存。18行・7ファイル（`CODEX_PROMPT_FIX.md:23`、`CODEX_PROMPT_FIX2.md:35`、`CODEX_TASKS.md:28,75`、`CODEX_PROMPT.md:58`、`tests/f22-css-contract.py:9-10,13-16`、`REVIEW_HANDOFF.md:289,561`、`REVIEW_FINDINGS.md:90,191,197,223,276`）。
- 「ほか未使用旧画像」: 残存。上記P1の5画像は実装参照0件。

## 参照整合チェック

- HTML/PHP: 13 HTML + 5 PHPの計18ファイル、リンク・スクリプト・フォーム等1,037属性（ローカル参照814件）を検査。欠損0件、大小文字不一致0件。
- CSS `url()`: 実参照6件を検査。欠損0件、大小文字不一致0件。削除画像への実行参照0件。
- 4ミラー: `redirect.html/php` と `operationinfo.html/php` は同期。`result.html/php` と `beginner_result.html/php` はP1のとおり非同期。
- キャッシュバスター: ローカルCSS/JSの付与漏れ0件、同一資産の不整合0件。F13 `result-cards-v2.js?v=48`、F20対象 `?v=f20`、F21対象 `?v=f21`、F22 `base*.css?v=f22`、F23 `theme-v3*.css?v=f23` が変更フェーズに追随。
- 保全画像（当時）: `banner_acom2.jpg` / 旧アイフル14分訴求素材 / `banner_mobit.jpg` / `banner_promise.jpg` / `promise.gif` は基点 `d252f1e` と `ad48791` でblob ID一致。旧アイフル素材は2026-07-16に新9分素材へ差し替え、現行ソースと公開物から除外済み。
- 保全プレースホルダー: `GTM-XXXXXXX` は34件で不変。各 `__AFFILIATE_URL_*__` は各2件で不変。
- PR/注釈/スペック: F12後からF23まで残存PR/Sponsored 80行と主要スペック値の出現数は不変。F12ではCSS非表示の重複V2ブロック削除に伴いPR文字列16行もソース上削除されているため、文字どおりの保全条件への適合は人間確認対象。
- 自動検査: `tests/f21-survey-unit.mjs`、`tests/f21-survey-contract.py`、`tests/f22-css-contract.py`、`git diff --check` は合格。ただし既存テストは `select_modal=2` を検証していない。

## 導線確認結果（1〜7の各項目）

1. 合格 — `index.html` の入口「はじめて」から `mobit_beginner.html` へ進み、6問を実回答して `beginner_result_v2.html?variant=beginner` へ遷移。緑テーマ、順位はモビット→アイフル→アコム。`utm_*` / `gclid` も維持。
2. 不合格（P0）— `index.html?select_modal=2` では入口モーダルが残り、経験者診断へ直行しない。モーダルで「経験がある」を選び直して `entry-modal=2` を追加した後は、7問を実回答して `result_v2.html?variant=experienced` へ遷移し、青テーマ、順位はモビット→アイフル→プロミス。
3. 合格 — 両V2とも3社カード→「＼ おすすめ ／ 即日で借りたいなら このカードローン」→モビット複製カード（rank「当サイトおすすめ」）→再検索フォームのDOM/表示順。
4. 合格 — 両結果ページの「この条件で探す」を実クリック。初心者は同じ `beginner_result_v2.html?variant=beginner`、経験者は同じ `result_v2.html?variant=experienced` に回答値・計測パラメータ付きで復帰。
5. 合格 — 4社の商品名・バナー・CTAは `redirect.html?item=...`。4社すべてで会社名、正しいバナー、表示中fallback、約1秒後の `__AFFILIATE_URL_*__` 転送を実測。fallbackクリックも確認。プレースホルダー未置換のローカル最終先Not Foundは期待値であり、製品リソース404には含めない。
6. 合格 — redirect URLをitemだけで開いても、事前に保存した `utm_source` / `utm_medium` / `gclid` がfallbackと1秒後転送URLへ復元された。
7. 一部実測・要最終確認 — 実時刻21時前の表示・更新を確認。実装JSを時間固定したハーネスで20:00表示、21:00非表示を確認。自動ブラウザでは別タブを前面化しても対象タブの `document.hidden` が変化せず、非表示タブ停止を実イベントで再現できなかった。`js/deadline-timer.js:90-94` と `js/result-cards-v2.js:215,225-231` のcancel/resume経路は静的確認済み。

## カードUI確認結果

- 通常モビットカードと最終複製カードの両方で、閉じた状態の画像、借入額、借入までの時間、冒頭文、「もっと見る」を確認。
- 口コミ開閉: カード幅288px、画像約56.4×58pxは不変。高さ899.05→1057.75pxで下方向へ展開し、閉じると元へ復帰。
- 「ここがオススメ」開閉: 同じく幅・画像サイズ不変。高さ899.05→1163.25pxで下方向へ展開し、閉じると元へ復帰。
- 初心者結果3位のアコム: 「職業：バイト 年齢：25歳 年収：350万円 ★★★★★ 5」を確認。
- アイフル吹き出し: 「1秒診断で借り入れ可能か確認する」を確認。

## レスポンシブ確認結果（幅ごと）

対象: `index.html` / `mobit_beginner.html` / `result_v2.html?variant=experienced` / `beginner_result_v2.html?variant=beginner`。

| viewport幅 | 確認ページ数 | `scrollWidth-clientWidth` | 画面外要素 | 意図しない文字切れ | 画像欠損 |
|---:|---:|---:|---:|---:|---:|
| 320px | 4 | 全て0 | 0 | 0 | 0 |
| 375px | 4 | 全て0 | 0 | 0 | 0 |
| 390px | 4 | 全て0 | 0 | 0 | 0 |
| 414px | 4 | 全て0 | 0 | 0 | 0 |
| 768px | 4 | 全て0 | 0 | 0 | 0 |
| 1280px | 4 | 全て0 | 0 | 0 | 0 |

- 検出された1×1pxのclipは `.v3-sr-only` / `.v3-compare2-title-sr` 等のスクリーンリーダー専用要素のみで、可視文字切れではない。
- V1系6ページ `result.html` / `beginner_result.html` / `mobit.html` / `mobit_result.html` / `mobit_beginner_result.html` / `beginner.html` をモバイルと1280pxで確認。横スクロール、画面外要素、画像欠損、console errorはいずれも0。内部リンク先も実在。
- 13 HTML + 5 PHPを全巡回し、製品ページのconsole error 0件、製品リソース404 0件。PHPは静的HTMLとして配信して表示を確認し、PHPランタイムでの実行は対象外。

## F22 CSS書き直しの見た目検証

- 比較: F22直前 `1f9129a` とF23 `ad48791` を別サーバーで並行配信。
- 条件: 375px / 1280px、主要4ページ、ヘッダー、ヒーロー/結果要約、診断ボックス、結果カード、CTA、フッターの計48要素ペア。
- 比較値: `getBoundingClientRect`、color、font-size、background-color/image、display、position、ページscroll寸法。
- 結果: 2px超の寸法・位置差0件、色・文字サイズ・背景差0件。

## 人間が最終確認すべき箇所

- P0修正後、正規URL `index.html?select_modal=2` から7問診断を再実測し、広告・計測側の既存リンクでも互換性を確認する。
- F19で新設されたアイフル口コミのプロフィール、星、借入額、借入時間、本文が承認済み正本かを広告・法務担当が判断する。
- 文書・テスト内の旧ファイル名も「痕跡」に含めて削除するか、監査証跡として明示的に除外するかを決める。
- `result` / `beginner_result` のHTML/PHPどちらを正本にするか決め、保全対象コピーを人間確認してから同期する。
- 実ブラウザをバックグラウンド化し、カウントダウンが停止・復帰することをDevToolsまたは実端末で確認する。
- F12で非表示重複ブロックとともに削除されたPR表記16行を、「表示中の表記保全」として許容するか、「ソース文字列も不変」として差し戻すか判断する。
- 本レビューは `ad48791` 固定。レビュー中にもライブHEADと未コミット変更は進行していたため、P0修正を取り込んだ最終リリースHEADで差分・導線・痕跡スキャンを再実施する。
