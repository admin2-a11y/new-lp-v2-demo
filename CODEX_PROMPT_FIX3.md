# CODEX_PROMPT_FIX3 — モバイルFV最適化（このファイルの内容をそのままCodexに貼り付ける）

---

あなたはこのリポジトリ（`new-lp-v2/`）の継続開発エージェントです。
発注者から「**スマホでTOPのアンケートが1画面に収まらない／結果ページのファーストビューに結果が見えない＝離脱に直結**」というフィードバックがあり、Claudeが375×812pxで実測して裏付けました。余白と要素サイズを詰めて、ファーストビュー(FV)の情報量を上げてください。

`AGENTS.md` の絶対ルール厳守。CSSは `css/theme-v3.css` 末尾に `/* ==== round4 fixes ==== */` セクションを作り、同内容を `css/theme-v3-green.css` にも複製。**アンケートのid/name/li順序/JSロジックは変更禁止**（見た目のみ）。

## 実測値（375×812px・修正前）

**結果ページ result.php:**
| 要素 | 位置 |
|---|---|
| ヘッダー | 0〜57px |
| （空白） | **57〜153px ＝ 96pxの無駄** |
| 結果カード `.after_box` | 153〜518px（h1が2行で94px、条件チップ縦積みで136px） |
| 案内 `診断結果にもとづく…` | 538〜661px（123px） |
| **1位カード先頭** | **720px ＝ FV圏外** |

**TOP index.html:**
| 要素 | 位置 |
|---|---|
| ヒーロー（画像+CTA+注記） | 57〜416px |
| 診断ボックス見出し+タイマー | 434〜542px |
| Q1ピル（2列×3行） | 592〜760px（168px） |
| Q2/Q3行 | 778〜944px |
| **「この条件で探す」下端** | **1028px ＝ 画面1.3枚分** |

## M1. 結果ページ: FVに「1位カードの冒頭」を入れる（最優先）

**達成基準（数値で自己検証すること）**: 375px幅で `.topbox.case`（1位カード）の上端が **y≤480px**。No.1バッジと社名がFV内に見える。

やること（result.php / beginner_result.php 両方）:
1. **ヘッダー下の96px空白を削除**（`#contents` / `#search_page` / section 上部の margin/padding をtheme上書きで16px程度に）。
2. `.after_box` を圧縮:
   - h1 を1行に: 「あなたの条件に合う<br class="v3-sp-br">カードローン 3件」の `<br>` をやめてもよいので、モバイルは font-size 18〜20px・1行表示（「3件」のアクセントは維持）。既存の `.v3-sp-br` は display:none に。
   - 条件チップを**横並び折返し**（`ul` を flex-wrap のまま、li を「金額: 10万円以下」のような短縮表示にはせず文言そのまま・padding 6px 10px・font-size 12px）。3行縦積み136px → 2行以内（≤76px）。
   - 「条件を変更する」ボタンを高さ40px・font-size 13px のコンパクトなアウトラインに変更（塗りボタンは1位カードのCTAと競合するため）。
   - `.after_box` 自体の padding を 16px、margin を 12px 程度に。
3. 案内ブロック「診断結果にもとづくおすすめ順です…」を**1行のスリムバー**（アイコン+13px1文、h≤44px）に変更。2文目「条件に近い3社を比較し…」は削除してよい（同義の情報が直下のカードにあるため）。
4. 上記で 1位カード上端が480pxを超える場合は、さらにカード間マージン・見出しマージンを詰めて調整。

## M2. TOP: 診断ボックスを約1画面に収める

**達成基準**: 375px幅で index.html の「この条件で探す」ボタン下端が **y≤860px**（現状1028px、約170px削減）。beginner.php も同等の圧縮を適用。

やること（青緑両方）:
1. ヒーローの上下padding・CTA周りの余白を計20px程度削減（画像はそのまま。CTAは高さ52px、注記のmarginを4pxに）。
2. 診断ボックスの見出し「かんたん診断で絞り込む」とタイマーの上下marginを圧縮（見出しfont-size 18px、ボックス内上部padding 12px）。
3. **Q1ピルを圧縮**（index.htmlのみ）: 高さ48→40px、font-size 14→13px、gap 10→8px、`.rentcheck` 上下margin縮小。可能なら375px以上で**3列**（「SMBCモビット」が1行で入るfont-sizeに調整できる場合のみ。入らないなら2列のまま高さだけ詰める）。
4. `ul.select_box` の行を高さ56px・行間8px→6pxに圧縮。行内のfont-sizeは16px以上を維持（iOSズーム防止）。
5. 「この条件で探す」ボタンの上下marginを12pxに。
6. タップ領域は40px以上を維持すること（T3の趣旨を壊さない）。

## M3. 前回残タスク（1行修正+整理）

1. `css/theme-v3.css` と `css/theme-v3-green.css` の `.timer_in_box .timerbox::after { content: "までに申込"; }` のセレクタを **`.timer_in_box > .timerbox::after`**（直下指定）に変更。カード内アンバーボックスの「いま申込で最短◯時**までに申込**に借入完了も！」という文言混入が消えることを確認（診断ボックス上部タイマーの「までに申込」は維持）。
2. 未コミットの `CODEX_PROMPT_FIX2.md` と本ファイル `CODEX_PROMPT_FIX3.md` を docs コミットに含め、作業ツリーをクリーンに。

## 自己検証用スニペット（ブラウザコンソールで実行）

結果ページ:
```js
(function(){var c=document.querySelector('.topbox.case').getBoundingClientRect();console.log('1位カード上端:',Math.round(c.top+scrollY),'目標<=480');})();
```
TOP:
```js
(function(){var b=document.querySelector('#searchTOP .rentbtn button').getBoundingClientRect();console.log('送信ボタン下端:',Math.round(b.bottom+scrollY),'目標<=860');})();
```

## 確認方法（共通）

- 320 / 375 / 414px で横スクロールなし・文字潰れなし。
- アンケート回帰: 両フローで診断→送信→結果ページまで通す。
- 達成基準の数値を `REVIEW_HANDOFF.md` の「## 校正対応（第4ラウンド）」に**修正前→修正後**で記録。
- 完了後、Claudeが再レビューする。
