(() => {
  const mount = document.querySelector("[data-v4-result-cards]");
  if (!mount) return;
  const redirectPage = /\.php$/.test(window.location.pathname) ? "./redirect.php" : "./redirect.html";

  const lenders = [
    {
      key: "mobit", name: "SMBCモビット", group: "三井住友カード株式会社", banner: "banner_mobit.jpg", width: 400, height: 333,
      catch: "10秒簡易審査ですぐ結果がわかる！", cta: "10秒簡易審査を試す",
      specs: [["融資時間", "最短15分"], ["実質年率", "3.0％～18.0％"], ["利用限度額", "最大800万円"], ["事前審査", "10秒簡易審査"], ["利用方法", "振込・コンビニATM"]],
      points: [["お申込みから最短15分で審査完了！", "お申し込みから最短15分で審査するから急な出費にも即対応！"], ["振込は最短3分", "ご契約後、最短3分で口座へ振り込まれる！"], ["原則電話連絡・郵送物なし", "面倒な電話連絡や郵送物はないから誰にもバレなくて安心！"], ["返済でVポイントが貯まる・使える", "返済の利息分でVポイントが貯まるからお得！"]],
      reviewProfile: "職業：派遣<br>年齢：47歳", reviewIncome: "400万円", reviewRating: 5, reviewAmount: "50万未満", reviewTime: "1時間以内", review: "事前に身分証明書を準備して申し込み。審査もスムーズに進みました！すべてスマホで完結できたので、誰にもバレずにすぐ着金。もっと早く利用すれば良かったです！", reviewImage: "review-mobit-v2.png", reviewImageWidth: 172, reviewImageHeight: 185, reviewPosition: "mobit", reviewImageAlt: "口コミ利用者",
      note: "※お申込の曜日、時間帯によっては翌日以降の取扱となる場合があります。※原則電話連絡なし。（WEB完結申込の場合）※口座への入金が完了する日時は金融機関によって異なります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    },
    {
      key: "acom", name: "アコム", group: "三菱UFJフィナンシャル・グループ", banner: "banner_acom2.jpg", width: 300, height: 250,
      catch: "はじめてなら30日間金利0円", cta: "はじめての方はこちらから申し込む",
      specs: [["融資時間", "最短20分"], ["実質年率", "2.4％～17.9％"], ["利用限度額", "最大800万円"], ["無利息期間", "契約日の翌日から30日間"], ["利用方法", "振込・コンビニATM"]],
      points: [["はじめてなら金利0円期間あり！", "アコムを初めて利用する人は30日間金利0円！"], ["審査結果が最短20分でわかる！", "21時までに申し込めば当日中に口座に振込！土日祝も24時間申込可能。"], ["周りにバレずに借りられる！", "面倒な電話連絡や郵送物はないから誰にもバレなくて安心！"], ["三菱UFJフィナンシャル・グループで安心！", "知名度やグループ会社による安心感があります。"]],
      reviewProfile: "職業：バイト<br>年齢：25歳", reviewIncome: "350万円", reviewRating: 5, reviewAmount: "100万～300万円未満", reviewTime: "1時間以内", review: "金利0円期間に魅力を感じ申し込みました。カードローンは初めてでしたが審査もスムーズでした。スマホで完結できるので電話連絡や郵送物もなく周りにバレずに借入でき本当に助かりました。", reviewImage: "review-acom-v2.png", reviewImageWidth: 213, reviewImageHeight: 196, reviewPosition: "acom", reviewImageAlt: "口コミ利用者",
      note: "※アコムを初めて契約する方が無利息期間の対象です。※お申込時間や審査状況によりご希望に添えない場合があります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    },
    {
      key: "promise", name: "プロミス", group: "SMBCコンシューマーファイナンス株式会社", banner: "banner_promise.jpg", width: 300, height: 250,
      catch: "Webなら最短3分で融資可能", cta: "1秒パパッと診断を試す",
      specs: [["融資時間", "最短3分"], ["実質年率", "2.5％～18.0％"], ["利用限度額", "最大800万円"], ["無利息期間", "初回借入の翌日から30日間"], ["事前診断", "1秒パパッと診断"]],
      points: [["即日可能！最短3分で審査完了！", "21時までの申込みで即日融資可能！"], ["30日間無利息もありお得に借りれる！", "初回借入の翌日から30日間、条件を満たす方は無利息で利用できます。"], ["1秒パパっと診断", "借り入れ可能かすぐチェックできる！"]],
      reviewProfile: "職業：会社員<br>年齢：33歳", reviewIncome: "300万円", reviewRating: 5, reviewAmount: "50万円未満", reviewTime: "1時間以内", review: "スマホで完結できるので審査から借入までがとにかく早い。誰にもバレずに借りることが出来ました。返済も月1000円からで良いのも助かってます。", reviewImage: "review-promise-v2.png", reviewImageWidth: 194, reviewImageHeight: 190, reviewPosition: "promise", reviewImageAlt: "口コミ利用者",
      note: "※無利息期間の適用にはメールアドレス登録とWeb明細利用の登録が必要です。※お申込時間や審査状況によりご希望に添えない場合があります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    },
    {
      key: "aiful", name: "アイフル", group: "アイフル株式会社", banner: "banner_aiful-9min.webp", width: 300, height: 250,
      catch: "最短9分※1融資・1秒で事前診断", cta: "1秒診断で借り入れ可能か確認する",
      specs: [["融資時間", "最短9分※1"], ["実質年率", "3.0％～18.0％"], ["利用限度額", "最大800万円"], ["無利息期間", "初めての方なら最大30日間"], ["事前診断", "1秒診断"]],
      points: [["今日借りられる！申込みから融資まで最短9分※1", "Webから24時間365日申し込み可！すぐ振り込みしてもらえる！"], ["無利息で借りられる期間あり！", "はじめてなら最大30日間利息0円。"], ["原則、勤務先への電話連絡なし", "申込みから借入・返済までWebで完結できるので家族や職場にバレない。"], ["1秒診断で借入可能性を確認", "年齢・年収・他社借入金額などから簡易的に確認できます。"]],
      reviewProfile: "職業：会社員<br>年齢：54歳", reviewIncome: "390万円", reviewRating: 5, reviewAmount: "100万～300万円未満", reviewTime: "1時間以内", review: "急な出費があり、初めてカードローンを利用しました。短期間で返済する予定だったため、30日間の無利息サービスを利用できた点に満足しています。", reviewImage: "review-aiful-v2.png", reviewImageWidth: 181, reviewImageHeight: 192, reviewPosition: "aiful", reviewImageAlt: "口コミ利用者",
      note: "※1お申込時間や審査状況によりご希望に添えない場合があります。※サービス内容は公式サイトで最新情報をご確認ください。※一例であり、結果を保証するものではありません。"
    }
  ];

  const urlVariant = new URLSearchParams(window.location.search).get("variant");
  const requestedVariant = urlVariant || mount.dataset.v4Variant || (document.body.classList.contains("beginner") ? "beginner" : "experienced");
  const resultVariant = requestedVariant === "beginner"
    ? "beginner"
    : "experienced";
  const isTopContext = mount.dataset.v4Context === "top";
  const variantOrder = resultVariant === "beginner"
    ? ["mobit", "aiful", "promise"]
    : ["mobit", "aiful", "promise"];
  const lendersByKey = new Map(lenders.map((lender) => [lender.key, lender]));
  const rankedLenders = variantOrder.map((key) => lendersByKey.get(key)).filter(Boolean);

  const ringSpecLabels = new Set(["融資時間", "実質年率", "利用限度額", "無利息期間", "事前審査", "事前診断", "利用方法"]);
  const specMarkup = (specs) => specs.map(([label, value]) => {
    const ringClass = ringSpecLabels.has(label) ? " class=\"v4-spec-ring\"" : "";
    return `<div${ringClass}><dt>${label}</dt><dd>${value}</dd></div>`;
  }).join("");
  const pointMarkup = (points) => points.map(([title, body]) => `<li><strong>${title}</strong><span>${body}</span></li>`).join("");
  const reviewProfileMarkup = (lender) => {
    const income = lender.reviewIncome ? `<span class="v4-review-income">年収：${lender.reviewIncome}</span>` : "";
    const rating = lender.reviewRating ? `<span class="v4-review-rating" aria-label="評価5点満点中${lender.reviewRating}点"><span aria-hidden="true">★★★★★</span><b>${lender.reviewRating}</b></span>` : "";
    return `${lender.reviewProfile}${income}${rating}`;
  };
  const reviewImageMarkup = (lender) => {
    const alt = lender.reviewImageAlt || "口コミ利用者";
    if (lender.reviewImage) {
      return `<img src="./images/${lender.reviewImage}" width="${lender.reviewImageWidth}" height="${lender.reviewImageHeight}" alt="${alt}" loading="lazy" decoding="async">`;
    }
    return `<img src="./images/review-male-v2-180.webp" srcset="./images/review-male-v2-180.webp 180w, ./images/review-male-v2-360.webp 360w" sizes="(max-width: 350px) 58px, (max-width: 600px) 64px, 72px" width="180" height="180" alt="${alt}" loading="lazy" decoding="async">`;
  };

  const finalPickMarkup = isTopContext ? "" : `
      <section class="v4-final-pick" aria-label="当サイトの最終おすすめ">
        <div class="v4-recommend-intro">
          <p class="v4-recommend-intro-label">＼ おすすめ ／</p>
          <h2><span>即日で借りたいなら</span><span>このカードローン</span></h2>
          <p>すぐにお金が必要だけど家族や会社にバレたくないし<br>できればおトクに借りたい…！<br>そんなあなたにこちらのカードローンがおすすめです！</p>
        </div>
        <div data-v4-final-mobit></div>
      </section>`;

  mount.innerHTML = `
    <section class="v4-result-cards" aria-label="カードローン診断結果">
      <div class="v4-lender-list">
        ${rankedLenders.map((lender, index) => `
          <article class="v4-lender-card" data-v4-lender="${lender.key}">
            <div class="v4-lender-titlebar">
              <h3 class="v4-lender-name"><span class="v4-crown" aria-hidden="true">♛</span> <a href="${redirectPage}?item=${lender.key}" target="_blank" rel="sponsored noopener">${lender.name}</a></h3>
              <p class="v4-lender-rank">おすすめ順 No.${index + 1}</p>
            </div>
            <p class="v4-lender-catch">${lender.catch}</p>
            <div class="v4-lender-head">
              <a class="v4-lender-banner" href="${redirectPage}?item=${lender.key}" target="_blank" rel="sponsored noopener">
                <img src="./images/${lender.banner}" width="${lender.width}" height="${lender.height}" alt="${lender.name}公式サイトへ" loading="lazy">
              </a>
              <div class="v4-lender-summary">
                <dl class="v4-specs">${specMarkup(lender.specs)}<div class="v4-conveni"><dt>利用コンビニ</dt><dd><span class="v4-conveni-logo-crop"><img src="./images/convenience-store-logos-360.webp" width="360" height="87" alt="利用可能な提携コンビニATM：セブン-イレブン、ファミリーマート、ローソン、ミニストップ" loading="lazy" decoding="async"></span></dd></div></dl>
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
                <figure class="v4-review-avatar is-${lender.reviewPosition || "default"}">${reviewImageMarkup(lender)}<figcaption>${reviewProfileMarkup(lender)}</figcaption></figure>
                <div class="v4-review-copy">
                  <div class="v4-review-facts"><span>借入額：${lender.reviewAmount}</span><span>借入までの時間：${lender.reviewTime}</span></div>
                  <div class="v4-review-preview v4-review-bubble"><p class="v4-review-text">${lender.review}</p></div>
                  <details class="v4-review-more">
                    <summary><span class="v4-more-open">もっと見る</span><span class="v4-more-close">閉じる</span></summary>
                    <div class="v4-review v4-review-bubble"><p class="v4-review-text">${lender.review}</p><small>※一例であり、結果を保証するものではありません。</small></div>
                  </details>
                </div>
              </div>
            </section>
            <div class="v4-cta-wrap">
              <div class="v4-countdown" data-v4-countdown aria-live="polite"><span>本日中に借りるなら</span><b>残り <i data-v4-hours>00</i>時間<i data-v4-minutes>00</i>分<i data-v4-seconds>00</i>秒<i data-v4-centiseconds>00</i></b></div>
              <span class="v4-cta-bubble">${lender.cta}</span>
              <a class="v4-cta" href="${redirectPage}?item=${lender.key}" target="_blank" rel="sponsored noopener">詳しくはこちら</a>
            </div>
            <p class="v4-lender-note">【PR】Sponsored by ${lender.group}<br>${lender.note}</p>
          </article>`).join("")}
      </div>
      ${finalPickMarkup}
    </section>`;

  const lenderList = mount.querySelector(".v4-lender-list");
  const finalMobitMount = mount.querySelector("[data-v4-final-mobit]");
  const primaryMobitCard = lenderList?.querySelector('[data-v4-lender="mobit"]');
  if (finalMobitMount && primaryMobitCard) {
    const finalMobitCard = primaryMobitCard.cloneNode(true);
    finalMobitCard.classList.add("v4-lender-card-final");
    finalMobitCard.querySelector(".v4-lender-rank").textContent = "当サイトおすすめ";
    finalMobitMount.appendChild(finalMobitCard);
  }
  if (primaryMobitCard) {
    document.querySelectorAll("[data-v4-top-final-mobit]").forEach((target) => {
      const repeatedMobitCard = primaryMobitCard.cloneNode(true);
      repeatedMobitCard.classList.add("v4-lender-card-final");
      repeatedMobitCard.querySelector(".v4-lender-rank").textContent = "当サイトおすすめ";
      target.appendChild(repeatedMobitCard);
    });
  }
  const pad = (value) => String(value).padStart(2, "0");
  const countdowns = Array.from(document.querySelectorAll("[data-v4-countdown]"));
  const activeCountdownMarkup = '<span>本日中に借りるなら</span><b>残り <i data-v4-hours>00</i>時間<i data-v4-minutes>00</i>分<i data-v4-seconds>00</i>秒<i data-v4-centiseconds>00</i></b>';
  const nextMorningMarkup = '<span>いま申込で</span><b><strong>最短10時</strong>に借入完了も！</b>';
  const setCountdownPart = (countdown, selector, value) => {
    const element = countdown.querySelector(selector);
    if (element && element.textContent !== value) element.textContent = value;
  };
  const updateCountdowns = (now, schedulerState = {}) => {
    const isDisplayTime = now.getHours() < 21;
    const deadline = new Date(now);
    deadline.setHours(21, 0, 0, 0);
    const remaining = deadline.getTime() - now.getTime();
    countdowns.forEach((countdown) => {
      if (!isDisplayTime || remaining <= 0) {
        if (countdown.hidden) countdown.hidden = false;
        if (!countdown.classList.contains("is-next-morning")) {
          countdown.classList.add("is-next-morning");
          countdown.innerHTML = nextMorningMarkup;
        }
        return;
      }
      if (countdown.hidden) countdown.hidden = false;
      if (countdown.classList.contains("is-next-morning")) {
        countdown.classList.remove("is-next-morning");
        countdown.innerHTML = activeCountdownMarkup;
      }
      const totalSeconds = Math.floor(remaining / 1000);
      setCountdownPart(countdown, "[data-v4-hours]", pad(Math.floor(totalSeconds / 3600)));
      setCountdownPart(countdown, "[data-v4-minutes]", pad(Math.floor((totalSeconds % 3600) / 60)));
      setCountdownPart(countdown, "[data-v4-seconds]", pad(totalSeconds % 60));
      setCountdownPart(countdown, "[data-v4-centiseconds]", schedulerState.reducedMotion ? "00" : pad(Math.floor((remaining % 1000) / 10)));
    });
    return isDisplayTime && remaining > 0 ? 50 : 1000;
  };
  if (countdowns.length && window.MoneyLoanCountdownScheduler) {
    window.MoneyLoanCountdownScheduler.add(updateCountdowns);
  } else if (countdowns.length) {
    updateCountdowns(new Date(), { reducedMotion: true });
  }

  document.querySelectorAll(".v4-points-more > summary, .v4-review-more > summary").forEach((summary) => {
    summary.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") return;
      event.preventDefault();
      const details = summary.parentElement;
      details.open = !details.open;
    });
  });

  document.querySelectorAll(".v4-recommend, .v4-review-box").forEach((box) => {
    box.addEventListener("click", (event) => {
      if (event.target.closest("summary")) return;
      if (event.target.closest("a, button, input, select, textarea, label")) return;
      const details = box.querySelector("details");
      if (!details) return;
      const selection = window.getSelection();
      if (selection && selection.toString()) return;
      details.open = !details.open;
    });
  });
})();
