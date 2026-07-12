(() => {
  const mount = document.querySelector("[data-v4-result-cards]");
  if (!mount) return;

  const lenders = [
    {
      key: "mobit", name: "SMBCモビット", group: "三井住友カード株式会社", banner: "banner_mobit.jpg", width: 400, height: 333,
      catch: "10秒で簡易審査結果がわかる", cta: "10秒で簡易審査結果を確認する",
      specs: [["融資時間", "最短15分"], ["実質年率", "3.0％～18.0％"], ["利用限度額", "最大800万円"], ["事前審査", "10秒簡易審査"], ["利用方法", "振込・スマホATM"]],
      points: [["お申込みから最短15分で融資", "急な出費で急いでいるときにも検討しやすい。"], ["10秒で簡易審査結果を確認", "本申込みの前に、借入可能性の目安を確認できる。"], ["WEB完結なら電話連絡・郵送物なし", "勤務先や家族に知られたくない人にも選びやすい。"], ["振込キャッシングは最短3分", "契約後、手続きから最短3分で口座へ振り込まれる。"], ["返済でVポイントが貯まる・使える", "貯めたVポイントを返済に利用できる。"]],
      reviewMeta: "派遣社員・47歳／借入額50万～100万円未満", review: "友人から勧められ、普段利用している銀行と同じSMBCグループだったこともあり申し込みました。手続きが分かりやすく、説明も丁寧だったので、初めてでも進めやすかったです。", reviewImage: "review-mobit-image.png", reviewImageAlt: "利用者イメージ写真",
      note: "※お申込の曜日、時間帯によっては翌日以降の取扱となる場合があります。※WEB完結申込には条件があります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    },
    {
      key: "acom", name: "アコム", group: "三菱UFJフィナンシャル・グループ", banner: "banner_acom2.jpg", width: 300, height: 250,
      catch: "はじめてなら30日間金利0円", cta: "はじめての方はこちらから申し込む",
      specs: [["融資時間", "最短20分"], ["実質年率", "2.4％～17.9％"], ["利用限度額", "最大800万円"], ["無利息期間", "契約日の翌日から30日間"], ["利用方法", "振込・コンビニATM"]],
      points: [["最短20分で融資可能", "スマートフォンで申込みから契約まで進められる。"], ["はじめてなら30日間金利0円", "アコムを初めて契約する人は、契約日の翌日から30日間が対象。"], ["原則、勤務先への電話による在籍確認なし", "電話確認が必要な場合も、本人の同意なく実施しない。"], ["カードレス・郵送物なしを選択可能", "カードを持ち歩きたくない人や、郵送物を避けたい人に向いている。"], ["三菱UFJフィナンシャル・グループ", "知名度やグループ会社による安心感を伝えやすい。"]],
      reviewMeta: "会社員・45歳／借入額100万～300万円未満", review: "急な出費があり、借入までのスピードを重視して申し込みました。手続きがスムーズで、返済もインターネットからできるため、ATMへ行かずに済む点が便利でした。",
      note: "※アコムを初めて契約する方が無利息期間の対象です。※お申込時間や審査状況によりご希望に添えない場合があります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    },
    {
      key: "promise", name: "プロミス", group: "SMBCコンシューマーファイナンス株式会社", banner: "banner_promise.jpg", width: 300, height: 250,
      catch: "Webなら最短3分で融資可能", cta: "1秒パパッと診断を試す",
      specs: [["融資時間", "最短3分"], ["実質年率", "2.5％～18.0％"], ["利用限度額", "最大800万円"], ["無利息期間", "初回借入の翌日から30日間"], ["事前診断", "1秒パパッと診断"]],
      points: [["Web申込みなら最短3分で融資", "急いで借入先を探している人に訴求しやすい。"], ["初回借入の翌日から30日間無利息", "契約日ではなく、実際に初めて借りた日の翌日から開始される。"], ["原則、勤務先への電話連絡なし", "電話による確認が必要な場合も、本人の同意なく実施しない。"], ["Web完結なら郵送物なし", "アプリを利用したカードレスでの借入・返済にも対応。"], ["コンビニATMをスマートフォンで利用可能", "セブン銀行ATM・ローソン銀行ATMなどで取引できる。"]],
  reviewMeta: "会社員・33歳／他社借入経験あり", review: "利用していたカードローンの限度額だけでは足りず、追加の借入先として申し込みました。申込みから手続きまでが早く、コンビニATMから返済できる点も使いやすいと感じました。", reviewImage: "review-promise-image.png", reviewImageAlt: "利用者イメージ写真",
      note: "※無利息期間の適用にはメールアドレス登録とWeb明細利用の登録が必要です。※お申込時間や審査状況によりご希望に添えない場合があります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    },
    {
      key: "aiful", name: "アイフル", group: "アイフル株式会社", banner: "banner_aiful.jpg", width: 300, height: 250,
      catch: "最短14分融資・1秒で事前診断", cta: "1秒診断で借入可能性を確認する",
      specs: [["融資時間", "最短14分"], ["実質年率", "3.0％～18.0％"], ["利用限度額", "最大800万円"], ["無利息期間", "契約日の翌日から最大30日間"], ["事前診断", "1秒診断"]],
      points: [["申込みから融資まで最短14分", "Webから24時間365日申し込める。"], ["1秒診断で借入可能性を確認", "年齢・年収・他社借入金額などから簡易的に確認できる。"], ["はじめてなら最大30日間利息0円", "アイフルを初めて契約する人が対象。"], ["原則、勤務先への電話連絡なし", "申込みから借入・返済までWebで完結できる。"], ["毎月の返済は4,000円から", "10万円までの借入の場合。少額利用時の返済イメージを伝えやすい。"]],
      reviewMeta: "会社員・54歳／借入額100万～300万円未満", review: "急な入院費が必要になり、初めてカードローンを利用しました。短期間で返済する予定だったため、30日間の無利息サービスを利用できた点に満足しています。", reviewImage: "review-aiful-image.png", reviewImageAlt: "利用者イメージ写真",
      note: "※アイフルを初めて契約する方が無利息期間の対象です。※お申込時間や審査状況によりご希望に添えない場合があります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    }
  ];

  const specMarkup = (specs) => specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");
  const pointMarkup = (points) => points.map(([title, body]) => `<li><strong>${title}</strong><span>${body}</span></li>`).join("");

  mount.innerHTML = `
    <section class="v4-result-cards" aria-labelledby="v4-result-heading">
      <h2 id="v4-result-heading" class="v4-result-heading">診断結果に近いカードローン</h2>
      <div class="v4-lender-list">
        ${lenders.map((lender, index) => `
          <article class="v4-lender-card">
            <div class="v4-lender-titlebar">
              <h3 class="v4-lender-name"><span class="v4-crown" aria-hidden="true">♛</span> <a href="./redirect.php?item=${lender.key}" target="_blank" rel="sponsored noopener">${lender.name}</a></h3>
              <p class="v4-lender-rank">おすすめ順 No.${index + 1}</p>
            </div>
            <p class="v4-lender-catch">${lender.catch}</p>
            <div class="v4-lender-head">
              <a class="v4-lender-banner" href="./redirect.php?item=${lender.key}" target="_blank" rel="sponsored noopener">
                <img src="./images/${lender.banner}" width="${lender.width}" height="${lender.height}" alt="${lender.name}公式サイトへ" loading="lazy">
              </a>
              <div class="v4-lender-summary">
                <p class="v4-lender-group">${lender.group}</p>
                <dl class="v4-specs">${specMarkup(lender.specs)}<div class="v4-conveni"><dt>利用コンビニ</dt><dd><img src="./images/convini.webp" width="240" height="80" alt="主要コンビニATM" loading="lazy"></dd></div></dl>
              </div>
            </div>
            <section class="v4-recommend" aria-label="ここがオススメ">
              <h4 class="v4-recommend-title"><span class="v4-check-badge">CHECK</span><span>ここがオススメ</span></h4>
              <ul class="v4-points v4-points-preview">${pointMarkup(lender.points.slice(0, 2))}</ul>
              <details class="v4-points-more">
                <summary><span class="v4-more-open">もっと見る</span><span class="v4-more-close">閉じる</span></summary>
                <ul class="v4-points">${pointMarkup(lender.points.slice(2))}</ul>
              </details>
            </section>
            <section class="v4-review-box" aria-label="利用者の口コミ">
              <h4 class="v4-review-title">● 利用者の口コミは？</h4>
              <div class="v4-review-layout">
                <figure class="v4-review-avatar"><img src="./images/${lender.reviewImage || "review-male-v2.png"}" width="180" height="180" alt="${lender.reviewImageAlt || "利用者イメージ（イラスト）"}" loading="lazy"><figcaption>${lender.reviewImage ? "写真はイメージ" : "利用者イメージ"}</figcaption></figure>
                <div class="v4-review-copy">
                  <div class="v4-review-preview v4-review-bubble"><p class="v4-review-meta">${lender.reviewMeta}</p><p class="v4-review-text">${lender.review}</p></div>
                  <details class="v4-review-more">
                    <summary><span class="v4-more-open">もっと見る</span><span class="v4-more-close">閉じる</span></summary>
                    <div class="v4-review v4-review-bubble"><p class="v4-review-meta">${lender.reviewMeta}</p><p class="v4-review-text">${lender.review}</p><small>※一例であり、結果を保証するものではありません。</small></div>
                  </details>
                </div>
              </div>
            </section>
            <div class="v4-cta-wrap">
              <div class="v4-countdown" data-v4-countdown aria-live="polite"><span>本日中に借りるなら</span><b>残り <i data-v4-hours>00</i>時間<i data-v4-minutes>00</i>分<i data-v4-seconds>00</i>秒<i data-v4-centiseconds>00</i></b></div>
              <span class="v4-cta-bubble">${lender.cta}</span>
              <a class="v4-cta" href="./redirect.php?item=${lender.key}" target="_blank" rel="sponsored noopener">詳しくはこちら</a>
            </div>
            <p class="v4-lender-note">【PR】Sponsored by ${lender.group}<br>${lender.note}</p>
          </article>`).join("")}
      </div>
    </section>`;

  const pad = (value) => String(value).padStart(2, "0");
  const countdowns = Array.from(mount.querySelectorAll("[data-v4-countdown]"));
  const updateCountdowns = () => {
    const now = new Date();
    const deadline = new Date(now);
    deadline.setHours(21, 0, 0, 0);
    const remaining = deadline.getTime() - now.getTime();
    countdowns.forEach((countdown) => {
      if (remaining <= 0) {
        countdown.hidden = true;
        return;
      }
      countdown.hidden = false;
      const totalSeconds = Math.floor(remaining / 1000);
      countdown.querySelector("[data-v4-hours]").textContent = pad(Math.floor(totalSeconds / 3600));
      countdown.querySelector("[data-v4-minutes]").textContent = pad(Math.floor((totalSeconds % 3600) / 60));
      countdown.querySelector("[data-v4-seconds]").textContent = pad(totalSeconds % 60);
      countdown.querySelector("[data-v4-centiseconds]").textContent = pad(Math.floor((remaining % 1000) / 10));
    });
    if (remaining <= 0) window.clearInterval(countdownTimer);
  };
  const countdownTimer = window.setInterval(updateCountdowns, 50);
  updateCountdowns();

  mount.querySelectorAll(".v4-recommend, .v4-review-box").forEach((box) => {
    box.addEventListener("click", (event) => {
      if (event.target.closest("summary")) return;
      const details = box.querySelector("details");
      if (!details || !details.open) return;
      const selection = window.getSelection();
      if (selection && selection.toString()) return;
      details.open = false;
    });
  });
})();
