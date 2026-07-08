# CODEX_AUTO_REVIEW_PROMPT

このファイルは、ローン比較LP `new-lp-v2` をCodex内で「実装 → 最終レビュー → 修正 → 再レビュー」まで回すための実行プロンプトです。

## 使い方

Codexでこのリポジトリを開き、以下をそのまま貼り付けてください。

```text
$lp-auto-build を使用してください。

AGENTS.md、CODEX_PROMPT.md、CODEX_TASKS.mdを読んで、ローン比較LPの実装タスクを進めてください。
実装完了後は REVIEW_HANDOFF.md を更新してください。

その後、サブエージェント lp-reviewer を起動し、$lp-final-review の観点で最終レビューしてください。
レビュー結果は REVIEW_FINDINGS.md に保存してください。

REVIEW_FINDINGS.md に P0 または P1 がある場合は、サブエージェント lp-fixer を起動して最小差分で修正してください。
修正後、`lp-marketing-designer`、`lp-banner-designer`、`lp-qa-engineer`、`lp-accessibility-reviewer`、`lp-performance-seo-reviewer`、`lp-reviewer` で必要範囲を再レビューしてください。最後に `lp-release-manager` を起動し、`$lp-release-check` の観点で公開前チェックしてください。

最終的に以下を報告してください。
1. 実装完了内容
2. REVIEW_HANDOFF.md の更新有無
3. REVIEW_FINDINGS.md の結論
4. 残っているP0/P1/P2
5. 人間が最後に見るべき箇所
```

## 推奨モデル/推論設定

- 実装担当: 通常または high
- レビュー担当 `lp-reviewer`: `model_reasoning_effort = "xhigh"`
- 修正担当 `lp-fixer`: `model_reasoning_effort = "high"`

レビューは実装より強めの推論にします。LP全体、診断ロジック、スマホ表示、広告導線、文言校正の見落としを拾うためです。

## 注意

Gitが `dubious ownership` で止まる場合があります。その場合は、ユーザー承認のうえで以下を実行してください。

```powershell
git config --global --add safe.directory "C:/Users/sosuk/OneDrive/会社デスクトップPC/デスクトップ-DESKTOP-O4KOVSK/Codex/new-lp-v2"
```

承認なしにグローバルGit設定を変更しないでください。


## Web制作向け 追加レビュー体制

LP制作では、総合レビューの前に以下の専門レビューを走らせてください。

```text
実装完了後、以下のサブエージェントを順番に起動してください。

1. lp-marketing-designer
   - $lp-design-review の観点で、ファーストビュー、CTA、スマホ体験、ランキング訴求、アンケート導線、CVRをレビューする。

2. lp-banner-designer
   - $lp-banner-design-review の観点で、独自バナー、FV画像、訴求画像、画像化された見出し、画像まわりのスマホ可読性をレビューする。

3. lp-qa-engineer
   - $lp-qa-check の観点で、320/375/390/414/768/1280px、横スクロール、モーダル、アンケート送信、結果遷移、redirect、console errorを確認する。

4. lp-accessibility-reviewer
   - $lp-accessibility-review の観点で、コントラスト、文字サイズ、フォーカス、label、ボタン名、モーダル操作、タップ領域、iOSズームを確認する。

5. lp-performance-seo-reviewer
   - $lp-performance-seo-review の観点で、表示速度、画像最適化、title/description、h1/h2構造、alt、CLS/Core Web Vitalsを確認する。

6. lp-reviewer
   - $lp-final-review の観点で総合レビューする。

7. lp-fixer
   - REVIEW_FINDINGS.md に P0 または P1 がある場合、最小差分で修正する。

8. lp-release-manager
   - $lp-release-check の観点で公開前チェックをする。
```

推奨モデル/推論設定:

- `lp-marketing-designer`: `model_reasoning_effort = "xhigh"`
- `lp-banner-designer`: `model_reasoning_effort = "high"`
- `lp-qa-engineer`: `model_reasoning_effort = "high"`
- `lp-accessibility-reviewer`: `model_reasoning_effort = "high"`
- `lp-performance-seo-reviewer`: `model_reasoning_effort = "high"`
- `lp-reviewer`: `model_reasoning_effort = "xhigh"`
- `lp-fixer`: `model_reasoning_effort = "high"`
- `lp-release-manager`: `model_reasoning_effort = "high"`

マーケッター/デザイナーは必要です。実装レビューが「壊れていないか」を見るのに対し、マーケッター/デザイナーは「ユーザーが迷わず診断・比較・申込へ進めるか」を見ます。

## 速度・SEO・アクセシビリティ追加レビュー

通常フローに以下も追加してください。

```text
lp-accessibility-reviewer
- $lp-accessibility-review の観点で、コントラスト、フォーカス、label、ボタン名、モーダル操作、タップ領域、iOSズーム、画像だけに依存した情報伝達を確認する。

lp-performance-seo-reviewer
- $lp-performance-seo-review の観点で、表示速度、画像最適化、title/description、h1/h2構造、alt、不要CSS/JS、CLS/Core Web Vitalsを確認する。
```

推奨順序:

```text
lp-auto-build
↓
lp-marketing-designer
↓
lp-banner-designer
↓
lp-qa-engineer
↓
lp-accessibility-reviewer
↓
lp-performance-seo-reviewer
↓
lp-reviewer
↓
必要なら lp-fixer
↓
lp-release-manager
```

広告文言チェックはユーザーが行うため、`lp-compliance-reviewer` は通常フローでは起動しないでください。
