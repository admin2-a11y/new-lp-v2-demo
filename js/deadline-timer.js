(() => {
  "use strict";

  const pad = (value) => String(value).padStart(2, "0");

  const remainingToday = (now, hour = 20, minute = 59, second = 59) => {
    const end = new Date(now);
    end.setHours(hour, minute, second, 999);
    return Math.max(0, end.getTime() - now.getTime());
  };

  const parts = (milliseconds) => {
    let rest = milliseconds;
    const hours = Math.floor(rest / 3600000);
    rest -= hours * 3600000;
    const minutes = Math.floor(rest / 60000);
    rest -= minutes * 60000;
    const seconds = Math.floor(rest / 1000);
    rest -= seconds * 1000;
    return { hours, minutes, seconds, centiseconds: Math.floor(rest / 10) };
  };

  const toggleWrap = (element, active) => {
    const wrap = element.closest(".timer_in_box");
    if (!wrap) return;
    wrap.classList.toggle("is-countdown-hidden", !active);
    if (active) wrap.style.removeProperty("display");
    else wrap.style.setProperty("display", "none", "important");
  };

  const renderTop = (element, value, active) => {
    toggleWrap(element, active);
    if (!active) return;
    const { hours, minutes, seconds, centiseconds } = value;
    const label = element.parentElement?.previousElementSibling;
    const output = element.parentElement;
    const extra = output?.nextElementSibling;
    if (label) { label.style.display = "block"; label.textContent = "今日中に借りるなら"; }
    if (output) output.style.display = "flex";
    if (extra) extra.style.display = "none";
    element.innerHTML = `<div class="timerTopParts"><small>あと</small><span class="timerTopNum">${pad(hours)}</span><em>時間</em><span class="timerTopNum">${pad(minutes)}</span><em>分</em><span class="timerTopNum">${pad(seconds)}</span><em>秒</em><span class="timerTopNum timerTopCenti">${pad(centiseconds)}</span><b>以内に申し込み</b></div>`;
  };

  const renderLegacy = (element, value, active) => {
    toggleWrap(element, active);
    if (!active) { element.textContent = ""; return; }
    const { hours, minutes, seconds, centiseconds } = value;
    const label = element.parentElement?.previousElementSibling;
    const output = element.parentElement;
    const extra = output?.parentElement?.lastElementChild;
    if (label) { label.style.display = "block"; label.innerHTML = "<span>本日中</span>に借入をする場合"; }
    if (output) output.style.display = "block";
    if (extra && extra !== output) extra.style.display = "none";
    element.innerHTML = `残り<span>${pad(hours)}</span>時間 <span>${pad(minutes)}</span>分 <span>${pad(seconds)}</span>秒<span class="cs">${pad(centiseconds)}</span>`;
  };

  const renderDeadline = (box, now) => {
    const output = box.querySelector(".v3-result-deadline-timer");
    if (!output) return;
    const duration = remainingToday(now, Number(box.dataset.deadlineHour || 20), Number(box.dataset.deadlineMinute || 59), Number(box.dataset.deadlineSecond || 59));
    const active = duration > 0;
    box.hidden = !active;
    box.classList.toggle("is-ended", !active);
    if (!active) { box.style.setProperty("display", "none", "important"); output.textContent = ""; return; }
    box.style.removeProperty("display");
    const value = parts(duration);
    output.innerHTML = `残り <span class="h">${pad(value.hours)}</span><em>時間</em><span class="m">${pad(value.minutes)}</span><em>分</em><span class="s">${pad(value.seconds)}</span><em>秒</em><span class="cs">${pad(value.centiseconds)}</span>`;
  };

  const renderFlow = (value) => {
    const text = `${pad(value.hours)}時間${pad(value.minutes)}分${pad(value.seconds)}秒${pad(value.centiseconds)}`;
    document.querySelectorAll(".js-flow-countdown").forEach((element) => { element.textContent = text; });
  };

  let frame = 0;
  const draw = () => {
    const now = new Date();
    const duration = remainingToday(now);
    const active = duration > 0;
    const value = parts(duration);
    const top = document.getElementById("timerTop");
    if (top) renderTop(top, value, active);
    document.querySelectorAll(".timer").forEach((element) => renderLegacy(element, value, active));
    document.querySelectorAll("[data-v3-sameday-deadline]").forEach((box) => renderDeadline(box, now));
    renderFlow(value);
    frame = window.requestAnimationFrame(draw);
  };

  const resume = () => {
    if (document.hidden) { if (frame) window.cancelAnimationFrame(frame); frame = 0; return; }
    if (!frame) frame = window.requestAnimationFrame(draw);
  };

  document.addEventListener("visibilitychange", resume);
  resume();
})();
