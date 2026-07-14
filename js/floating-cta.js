(() => {
  "use strict";

  const banner = document.getElementById("follow-banner");
  const trigger = document.getElementById("btn-follow");
  const target = document.getElementById("search_box");
  if (!banner || !trigger || !target) return;

  const exclusions = [document.getElementById("hikaku"), document.getElementById("flow")].filter(Boolean);
  let revealed = false;
  let visible = false;
  let scheduled = false;

  const overlapsViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight - 80 && rect.bottom > 80;
  };

  const apply = () => {
    scheduled = false;
    if (!revealed && window.scrollY > 400) revealed = true;
    const shouldShow = revealed && !exclusions.some(overlapsViewport);
    if (visible === shouldShow) return;
    visible = shouldShow;
    banner.hidden = !shouldShow;
    banner.style.display = shouldShow ? "block" : "none";
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(apply);
  };

  banner.hidden = true;
  banner.style.display = "none";
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  trigger.addEventListener("click", () => {
    const top = target.getBoundingClientRect().top + window.scrollY - 50;
    window.scrollTo({ top, behavior: "smooth" });
  });
  schedule();
})();
