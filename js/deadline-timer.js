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

  const setText = (element, text) => {
    if (element && element.textContent !== text) element.textContent = text;
  };

  const setHtml = (element, html) => {
    if (element && element.innerHTML !== html) element.innerHTML = html;
  };

  const setDisplay = (element, display) => {
    if (element && element.style.display !== display) element.style.display = display;
  };

  const toggleWrap = (element, active) => {
    const wrap = element.closest(".deadline-box");
    if (!wrap) return;
    if (wrap.classList.contains("is-countdown-hidden")) wrap.classList.remove("is-countdown-hidden");
    if (wrap.classList.contains("is-next-morning") === active) wrap.classList.toggle("is-next-morning", !active);
    if (wrap.style.display) wrap.style.removeProperty("display");
  };

  const renderTop = (element, value, active) => {
    toggleWrap(element, active);
    const label = element.parentElement?.previousElementSibling;
    const output = element.parentElement;
    const extra = output?.nextElementSibling;
    setDisplay(output, "flex");
    setDisplay(extra, "none");
    if (!active) {
      setDisplay(label, "none");
      setHtml(element, '<div class="timerTopNext"><span class="nextMorningLead">いま申込で</span><strong>最短10時</strong><span class="nextMorningSuffix">に借入完了も！</span></div>');
      return;
    }
    const { hours, minutes, seconds, centiseconds } = value;
    setDisplay(label, "block");
    setText(label, "本日中に借りるなら");
    setHtml(element, `<div class="timerTopParts"><strong class="timerTopLead">本日中に借りるなら</strong><small>あと</small><span class="timerTopNum">${pad(hours)}</span><em>時間</em><span class="timerTopNum">${pad(minutes)}</span><em>分</em><span class="timerTopNum">${pad(seconds)}</span><em>秒</em><span class="timerTopNum timerTopCenti">${pad(centiseconds)}</span><b>以内に申し込み</b></div>`);
  };

  const renderLegacy = (element, value, active) => {
    toggleWrap(element, active);
    const label = element.parentElement?.previousElementSibling;
    const output = element.parentElement;
    const extra = output?.parentElement?.lastElementChild;
    setDisplay(output, "block");
    if (extra && extra !== output) setDisplay(extra, "none");
    if (!active) {
      setDisplay(label, "none");
      setHtml(element, '<span class="nextMorningMessage"><span class="nextMorningLead">いま申込で</span><span class="nextMorningTime">最短10時</span><span class="nextMorningSuffix">に借入完了も！</span></span>');
      return;
    }
    const { hours, minutes, seconds, centiseconds } = value;
    setDisplay(label, "block");
    setHtml(label, "<span>本日中</span>に借入をする場合");
    setHtml(element, `残り<span>${pad(hours)}</span>時間 <span>${pad(minutes)}</span>分 <span>${pad(seconds)}</span>秒<span class="cs">${pad(centiseconds)}</span>`);
  };

  const renderDeadline = (box, now) => {
    const output = box.querySelector(".v3-result-deadline-timer");
    if (!output) return;
    const duration = remainingToday(now, Number(box.dataset.deadlineHour || 20), Number(box.dataset.deadlineMinute || 59), Number(box.dataset.deadlineSecond || 59));
    const active = duration > 0;
    box.hidden = false;
    if (box.classList.contains("is-ended") === active) box.classList.toggle("is-ended", !active);
    if (box.style.display) box.style.removeProperty("display");
    if (!active) {
      const label = box.querySelector(".v3-result-deadline-label");
      setDisplay(label, "none");
      setHtml(output, '<span class="nextMorningMessage"><span class="nextMorningLead">いま申込で</span><span class="nextMorningTime">最短10時</span><span class="nextMorningSuffix">に借入完了も！</span></span>');
      return;
    }
    const label = box.querySelector(".v3-result-deadline-label");
    setHtml(label, "<span>本日中</span>に借入をする場合");
    const value = parts(duration);
    setHtml(output, `残り <span class="h">${pad(value.hours)}</span><em>時間</em><span class="m">${pad(value.minutes)}</span><em>分</em><span class="s">${pad(value.seconds)}</span><em>秒</em><span class="cs">${pad(value.centiseconds)}</span>`);
  };

  const renderFlow = (elements, value) => {
    const text = `${pad(value.hours)}時間${pad(value.minutes)}分${pad(value.seconds)}秒${pad(value.centiseconds)}`;
    elements.forEach((element) => setText(element, text));
  };

  const top = document.getElementById("timerTop");
  const legacyTimers = Array.from(document.querySelectorAll(".timer"));
  const deadlineBoxes = Array.from(document.querySelectorAll("[data-v3-sameday-deadline]"));
  const flowTimers = Array.from(document.querySelectorAll(".js-flow-countdown"));
  if (!top && !legacyTimers.length && !deadlineBoxes.length && !flowTimers.length) return;

  const draw = (now) => {
    const duration = remainingToday(now);
    const active = duration > 0;
    const value = parts(duration);
    if (top) renderTop(top, value, active);
    legacyTimers.forEach((element) => renderLegacy(element, value, active));
    deadlineBoxes.forEach((box) => renderDeadline(box, now));
    renderFlow(flowTimers, value);
    return active ? 50 : 1000;
  };

  if (window.MoneyLoanCountdownScheduler) {
    window.MoneyLoanCountdownScheduler.add(draw);
  } else {
    draw(new Date());
  }
})();
