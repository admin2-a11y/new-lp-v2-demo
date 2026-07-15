(() => {
  "use strict";

  const trackingKeys = Object.freeze([
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "utm_id",
    "utm_source_platform",
    "utm_creative_format",
    "utm_marketing_tactic",
    "gclid",
    "dclid",
    "wbraid",
    "gbraid",
    "fbclid",
    "msclkid",
    "yclid",
    "ttclid",
    "srsltid"
  ]);
  const trackingKeySet = new Set(trackingKeys);

  const collectAllowed = (includeItem) => {
    const current = new URLSearchParams(window.location.search);
    const allowed = new URLSearchParams();
    current.forEach((value, key) => {
      if (trackingKeySet.has(key) || (includeItem && key === "item")) {
        allowed.append(key, value);
      }
    });
    return allowed;
  };

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
    const params = collectAllowed(true);
    decorateLinks(params);
    decorateForms(params);
  };

  window.moneyLoanCurrentParams = () => collectAllowed(true).toString();
  window.moneyLoanTrackingParams = () => collectAllowed(false).toString();
  window.moneyLoanTrackingKeys = trackingKeys.slice();

  if (document.readyState === "complete") {
    initialize();
  } else {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  }
})();
