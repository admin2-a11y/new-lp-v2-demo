# REVIEW_FINDINGS

## 結論
- 条件付き合格
- P0は見つかりませんでした。総合P1 5件は修正済みです。P2は一部対応済み、一部は改善余地として残っています。
- 2026-07-08 LPO2確認: 入口ポップアップをファーストビュー中心にし、女性ナビゲーター案内と短い思考余白を追加。320 / 375 / 390 / 414pxで横スクロールなし、入口クリック遷移、診断モーダルの女性ナビ表示、console error 0件を確認。
- `lp-compliance-reviewer` / `$lp-compliance-review` はユーザー指示により未実施です。広告文言の適法性断定レビューはしていません。
- 旧総合Findingsのうち、`redirect.php` fallback、FV alt/注記、結果ページ職業label、`icon_clock.png`、`select_s3` 欠番明記は対応済みとして除外します。
- アンケートの指定id/name、`ul.select_box` 順序、`.select_modal` / `.select_modal_btn1` / `.select_modal_btn2` / `#serch2_Modal`、`.rentcheck input[name="cat[]"]` valueは維持。PR表記・注釈・プレースホルダーも残っています。

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
  - 影響: `single-banner` に挿入されるimgはwidthのみで、画像読み込み時にレイアウトが動く余地があります。
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
  - grepで `select_s1/s2/s4/s5/s6/s7/s8`、指定name、`.select_modal*`、`#serch2_Modal`、`.rentcheck input[name="cat[]"]` value（`a1_1`, `a1_2`, `a1_0`, `a1_3`, `a1_4`, `a1_11`）を確認。
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
- 3. アンケートid/name/value、`ul.select_box` 順序、PR表記・注釈・プレースホルダーは引き続き保全すること。

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
- 確認済みページ: `index.html`（入口モーダルあり/`?select_modal=2`）, `beginner.php`, `result.php`, `beginner_result.php`, `redirect.php?item=acom`, `operationinfo.php`
- 確認済み幅: 320 / 375 / 390 / 414 / 768 / 1280px
- 結果: P0/P1は見つかりませんでした。P2が2件残っています。
- 確認OK: 320/375/390/414pxの実横スクロールなし。768/1280pxは `scrollWidth` が大きいものの `window.scrollTo(99999, 0)` 後も `scrollX=0` で実横スクロールは再現なし。主要ページで文字/ボタンの実害ある重なりなし。iOS想定の可視input/select/textareaは16px未満なし。
- 確認OK: 入口モーダルは初期表示され、「はじめて」→ `beginner.php`、「経験がある」→ `?select_modal=2` に遷移。
- 確認OK: ヒーローCTAから診断モーダルが開き、経験者7問/初心者6問をモーダル内で進めて `result.php` / `beginner_result.php` へGET遷移。
- 確認OK: `redirect.php?item=acom` と不正 `item=bad` は中継文言・fallbackリンクを表示し、fallbackはデフォルトのアコムURLに正規化。`utm_source` は引き継ぎ確認済み。
- 未確認: PHP実行環境での確認、実アフィリエイトURLへの外部到達確認。`click_id` は `query-keeper.js` のallowlist外のため引き継ぎ対象外として扱いました。

### Bugs
- [P2] result.php:216 / beginner_result.php:215 — 768px以上で結果ページ上部の「条件を変更する」が44px未満
  - 再現手順: Headless Chromeで `result.php` / `beginner_result.php` を 768px または 1280px 幅で開き、`.after_box .btn_red.btn_g` の表示サイズを計測。
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
  - 影響: 初回表示の `.select_modal` は画面を覆いますが、「経験がある」「はじめて」が `<p class="button">` のclick専用で、実測でもモーダル内のtabbable要素は0件でした。キーボード利用者やスクリーンリーダー利用者が最初の分岐を選べず、LP本体に進めない可能性があります。
  - 推奨修正: 既存クラス `.select_modal_btn1` / `.select_modal_btn2` は維持したまま、要素を `<button type="button">` にするか、最低限 `role="button"` / `tabindex="0"` / Enter・Space対応を追加してください。入口モーダル自体にも `role="dialog"` と見出しへの `aria-labelledby` を付け、初期フォーカスを選択肢へ移してください。

- [P1] index.html:340 / index.html:413 / beginner.php:302 / beginner.php:375 / result.php:803 / result.php:876 / beginner_result.php:884 / beginner_result.php:957 — 診断モーダルの選択肢・戻る・送信・閉じるがキーボード操作できず、フォーカスも背面へ抜ける
  - 影響: `#serch2_Modal` 内の選択肢は `<option>` を `p.modal-btn` に置換しており、戻る/送信も `p` 追加、閉じるも `span.modalClose` です。実測では診断モーダルを開いてもモーダル内tabbable要素は0件で、Tabは背面のhero CTA、元のselect、商品リンクへ移動しました。モーダル操作・フォーカス・読み上げの主要要件を満たせず、診断完了まで進めない利用者が出ます。
  - 推奨修正: `.modal-btn` / `.modal-back` / `.modal-submit` / `.modalClose` をbutton化するか、既存DOM生成を保つ場合は `role="button"`、`tabindex="0"`、Enter/Spaceキー対応を追加してください。`#serch2_Modal` に `role="dialog"` / `aria-modal="true"` / `aria-labelledby` を付け、開いたら先頭選択肢または閉じるボタンへフォーカス移動、Tabのフォーカストラップ、Escで閉じる処理を入れてください。

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
  - 影響: `single-banner` にonload後 `innerHTML` でバナーを差し込む際、imgは `width="300"` のみでheight属性がありません。CSSは `height:auto` のため、画像取得後に中継ページ中央のレイアウトが押し下がる可能性があります。
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

- 結論: 条件付き合格。アンケートid/name/order、`.select_modal*`、`#serch2_Modal`、`.rentcheck input[name="cat[]"]`、redirect.phpの転送ロジック、PR表記、注釈、公式バナー/口コミ画像ファイルは保全されています。
- P0: なし。
- P1: なし。
- P2: CSS重複整理、320pxでのCTA完全収め、GitHub Pages実URLでのconsole/CDN確認。

## Release Check（2026-07-08 LPO追加）

- 結論: 条件付き公開可。
- ブロッカー: コード上のP0/P1はなし。ただし本番公開前に `GTM-XXXXXXX`、`__AFFILIATE_URL_*__`、運営者情報プレースホルダーを実値化してください。
- 公開前の人間確認: GitHub Pages実URLで `/?select_modal=2`、`result.html`、`beginner_result.html`、`redirect.html?item=acom`、`operationinfo.html` を320/375/390/414pxで確認。広告文言チェックはユーザー担当。
- ロールバック方法: `theme-v3.css` / `theme-v3-green.css` と `js/v3-accessibility-cvr.js` 読み込みを外すと、今回のLPO見た目/補助CTAを戻せます。

## Compliance / Copy Review

- 今回スキップ。広告文言チェックはユーザー担当のため、`lp-compliance-reviewer` は通常フローから外しています。

## Additional Review Fixes（2026-07-08）

- 結論: 追加サブエージェント指摘のP0/P1は対応済み。現時点の残P0/P1はなし。
- Performance/SEO: 公開HTML/PHP上の `__BRAND_NAME__` 残存を解消。主要バナー/口コミ画像のalt欠落を補完。
- Accessibility: CTAの白文字コントラスト不足を解消するため、`.v3-lpo-fast-cta a` と結果ヘッダーCTAを濃色アクセント背景に統一。並び替えselectへ `name="sort"` / `aria-label="並び替え"` を追加。モーダル閉じるボタンはJSで `aria-label="閉じる"` を補完。
- Design/Banner: 結果ヘッダー内に主CTAを追加し、320/375/390/414pxすべてで初期画面内に表示されることを確認。
- Final Review: `operationinfo` の可視会社情報プレースホルダーを公開デモ向け自然文へ変更。強い広告表現を弱めた表現へ変更。`operationinfo.html` / `redirect.html` のフッター運営者情報リンクを `.html` に修正。
- QA: `result.html`, `beginner_result.html`, `operationinfo.html`, `redirect.html` を 320 / 375 / 390 / 414pxで再確認し、横スクロールなし。`redirect.html` の実アフィリエイトURL未設定は本番前QAの残リスク。

