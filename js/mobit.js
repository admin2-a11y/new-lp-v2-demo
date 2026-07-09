(function() {
  function keepPhpRedirectsInMobitSections() {
    document.querySelectorAll(".v3-mobit-section a[href*='redirect.html']").forEach(function(link) {
      link.setAttribute("href", link.getAttribute("href").replace("redirect.html", "redirect.php"));
    });
  }

  function formatMinutes(minutes) {
    return minutes < 60 ? "最短" + minutes + "分後" : "最短" + Math.round(minutes / 60) + "時間後";
  }

  keepPhpRedirectsInMobitSections();
  document.addEventListener("DOMContentLoaded", function() {
    keepPhpRedirectsInMobitSections();
    if (window.MutationObserver && document.body) {
      new MutationObserver(keepPhpRedirectsInMobitSections).observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ["href"]
      });
    }
    window.setTimeout(keepPhpRedirectsInMobitSections, 0);
    window.setTimeout(keepPhpRedirectsInMobitSections, 500);
    var attempts = 0;
    var redirectTimer = window.setInterval(function() {
      keepPhpRedirectsInMobitSections();
      attempts += 1;
      if (attempts >= 30) window.clearInterval(redirectTimer);
    }, 100);
  });

  document.querySelectorAll("[data-mobit-estimate]").forEach(function(box) {
    var text = box.querySelector(".v3-mobit-estimate-text");
    if (!text) return;
    var minutes = Number(box.getAttribute("data-minutes") || 15);
    var now = new Date();
    var estimate = new Date(now.getTime() + minutes * 60000);
    var dayPrefix = estimate.getDate() !== now.getDate() ? "翌" : "";
    text.textContent = "今申し込みで" + formatMinutes(minutes) + "、" + dayPrefix + estimate.getHours() + "時台に借入完了も";
  });
})();
