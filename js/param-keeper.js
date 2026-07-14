(() => {
  "use strict";

  const collectCurrent = () => new URLSearchParams(window.location.search);

  const decorateLinks = (params) => {
    if (!params.size) return;
    document.querySelectorAll("a[href]").forEach((anchor) => {
      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("#") || /^(?:mailto|tel|javascript):/i.test(raw)) return;
      const target = new URL(raw, window.location.href);
      if (target.origin !== window.location.origin) return;
      const destinationKeys = new Set(target.searchParams.keys());
      params.forEach((value, key) => {
        if (!destinationKeys.has(key)) target.searchParams.append(key, value);
      });
      anchor.href = target.href;
    });
  };

  const decorateForms = (params) => {
    if (!params.size) return;
    document.querySelectorAll("form").forEach((form) => {
      const destinationKeys = new Set(
        Array.from(form.elements || [], (control) => control.name).filter(Boolean)
      );
      params.forEach((value, key) => {
        if (destinationKeys.has(key)) return;
        const field = document.createElement("input");
        field.type = "hidden";
        field.name = key;
        field.value = value;
        form.append(field);
      });
    });
  };

  const initialize = () => {
    const params = collectCurrent();
    decorateLinks(params);
    decorateForms(params);
  };

  window.moneyLoanCurrentParams = () => collectCurrent().toString();
  window.moneyLoanTrackingParams = window.moneyLoanCurrentParams;

  if (document.readyState === "complete") {
    initialize();
  } else {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  }
})();
