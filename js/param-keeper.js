(() => {
  "use strict";

  const storageKeys = ["moneyLoanTrackingParams", "queryParams"];
  const fixedKeys = new Set(["ttclid", "ycid", "fbclid", "gclid", "gbraid", "wbraid"]);

  const isTrackingKey = (key) => fixedKeys.has(key) || key.startsWith("utm_");

  const readSaved = () => {
    const combined = new URLSearchParams();
    storageKeys.forEach((key) => {
      const value = localStorage.getItem(key);
      if (!value) return;
      new URLSearchParams(value).forEach((entry, name) => {
        if (isTrackingKey(name)) combined.set(name, entry);
      });
    });
    return combined;
  };

  const collect = () => {
    const combined = readSaved();
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (isTrackingKey(key)) combined.set(key, value);
    });
    return combined;
  };

  const persist = (params) => {
    const value = params.toString();
    if (!value) return;
    storageKeys.forEach((key) => localStorage.setItem(key, value));
  };

  const decorateLinks = (params) => {
    if (!params.size) return;
    document.querySelectorAll("a[href]").forEach((anchor) => {
      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("#") || /^(?:mailto|tel|javascript):/i.test(raw)) return;
      const target = new URL(raw, window.location.href);
      params.forEach((value, key) => target.searchParams.set(key, value));
      anchor.href = target.href;
    });
  };

  const decorateForms = (params) => {
    if (!params.size) return;
    document.querySelectorAll("form").forEach((form) => {
      params.forEach((value, key) => {
        let field = form.querySelector(`input[type="hidden"][name="${CSS.escape(key)}"]`);
        if (!field) {
          field = document.createElement("input");
          field.type = "hidden";
          field.name = key;
          form.append(field);
        }
        field.value = value;
      });
    });
  };

  const initialize = () => {
    const params = collect();
    persist(params);
    decorateLinks(params);
    decorateForms(params);
  };

  window.moneyLoanTrackingParams = () => collect().toString();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
