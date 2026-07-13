(function () {
  "use strict";

  var currentControllers = [];

  function whenReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }
    callback();
  }

  function toArray(collection) {
    return Array.prototype.slice.call(collection || []);
  }

  function stripQuestionNumber(text) {
    return String(text || "").replace(/^Q\d+\.\s*/, "").trim();
  }

  function toStaticPagePath(pathname) {
    return String(pathname || "")
      .replace(/beginner_result\.php$/i, "beginner_result.html")
      .replace(/result\.php$/i, "result.html")
      .replace(/beginner\.php$/i, "beginner.html")
      .replace(/redirect\.php$/i, "redirect.html")
      .replace(/operationinfo\.php$/i, "operationinfo.html");
  }

  function isStaticDocument(locationValue) {
    var locationLike = locationValue || window.location;
    var hostname = String(locationLike.hostname || "").toLowerCase();
    var pathname = String(locationLike.pathname || "");
    return hostname.indexOf("github.io") !== -1 || !/\.php$/i.test(pathname);
  }

  function buildEntryTarget(href, choice, staticMode) {
    var target = new URL(href, window.location.href);
    if (choice === "beginner") {
      var page = staticMode ? "mobit_beginner.html" : "beginner.php";
      target.pathname = target.pathname.replace(/[^/]*$/, page);
      target.searchParams.delete("entry-modal");
    } else {
      target.searchParams.set("entry-modal", "2");
    }
    return target.href;
  }

  function hasOptionValue(select, value) {
    return toArray(select && select.options).some(function (option) {
      return option.value === value;
    });
  }

  function makeButtonLike(element, handler) {
    element.dataset.v3A11yReady = "1";
    element.setAttribute("role", "button");
    element.setAttribute("tabindex", "0");
    element.addEventListener("click", function (event) {
      event.preventDefault();
      handler(event);
    });
    element.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      element.click();
    });
  }

  function setEntryState(container) {
    if (!container) return;
    var params = new URLSearchParams(window.location.search);
    var hidden = params.get("entry-modal") === "2" || params.get("select_modal") === "2";
    var body = container.querySelector(".entry-modal_body");
    var loading = container.querySelector(".entry-modal_load");
    container.classList.toggle("active", !hidden);
    container.setAttribute("aria-hidden", hidden ? "true" : "false");
    if (body) body.classList.toggle("active", !hidden);
    if (loading) loading.classList.remove("active");
    container.dataset.entryBusy = "0";
  }

  function initEntryModal() {
    var container = document.querySelector(".entry-modal");
    if (!container || container.dataset.surveyEntryReady === "1") return;
    container.dataset.surveyEntryReady = "1";
    container.setAttribute("role", "dialog");
    container.setAttribute("aria-modal", "true");
    setEntryState(container);

    var body = container.querySelector(".entry-modal_body");
    var loading = container.querySelector(".entry-modal_load");
    var loadingMessage = container.querySelector("[data-entry-loading-message]");
    var timers = [];
    var entryMessageInterval = 650;
    var entryRedirectDelay = 2100;

    function clearTimers() {
      timers.forEach(function (timer) { window.clearTimeout(timer); });
      timers = [];
    }

    function showLoading(messages) {
      if (body) body.classList.remove("active");
      if (loading) loading.classList.add("active");
      messages.forEach(function (message, index) {
        timers.push(window.setTimeout(function () {
          if (loadingMessage) loadingMessage.textContent = message;
        }, index * entryMessageInterval));
      });
    }

    function chooseEntry(choice) {
      if (container.dataset.entryBusy === "1") return;
      container.dataset.entryBusy = "1";
      var messages = choice === "beginner"
        ? ["はじめての方向けの質問を準備しています", "見やすい順番に整理しています", "まもなく診断を開始します"]
        : ["ご経験に合わせた質問を準備しています", "比較しやすい条件を整理しています", "まもなく診断を開始します"];
      showLoading(messages);
      timers.push(window.setTimeout(function () {
        window.location.replace(buildEntryTarget(window.location.href, choice, isStaticDocument()));
      }, entryRedirectDelay));
    }

    var beginnerButton = container.querySelector(".entry-first");
    var experiencedButton = container.querySelector(".entry-experienced");
    if (beginnerButton) makeButtonLike(beginnerButton, function () { chooseEntry("beginner"); });
    if (experiencedButton) makeButtonLike(experiencedButton, function () { chooseEntry("experienced"); });

    window.addEventListener("pageshow", function () {
      clearTimers();
      setEntryState(container);
    });
    window.addEventListener("popstate", function () {
      clearTimers();
      setEntryState(container);
    });
  }

  function SurveyController(form) {
    this.form = form;
    this.list = form.querySelector("ul.survey-list");
    this.items = this.list ? toArray(this.list.children).filter(function (item) {
      return Boolean(item.querySelector("select"));
    }) : [];
    this.modal = document.getElementById("survey-modal");
    this.modalTitle = this.modal ? this.modal.querySelector(".modal-header h2") : null;
    this.modalBody = this.modal ? this.modal.querySelector(".modal-body") : null;
    this.currentIndex = -1;
    this.maximumVisibleIndex = Math.min(1, Math.max(0, this.items.length - 1));
    this.lastFocused = null;
    this.transitioning = false;
    this.submitting = false;
    this.requestingSubmit = false;
  }

  SurveyController.prototype.selectedOptionText = function (select, fallback) {
    if (!select) return fallback;
    var option = select.options[select.selectedIndex];
    var text = option ? option.textContent.trim() : "";
    return text || fallback;
  };

  SurveyController.prototype.summaryText = function (select) {
    var optionText = this.selectedOptionText(select, "");
    if (select.value || /^(q-speed|q-amount|q-method)$/.test(select.id)) {
      return optionText || "こだわらない";
    }
    return "タップして選択 ▼";
  };

  SurveyController.prototype.syncItem = function (item) {
    var select = item.querySelector("select");
    var summary = item.querySelector("p");
    if (!select || !summary) return;
    var text = this.summaryText(select);
    summary.textContent = text;
    item.classList.toggle(
      "v3-answered",
      text !== "タップして選択 ▼" && text !== "未回答" && text !== "なし"
    );
  };

  SurveyController.prototype.showThrough = function (index) {
    this.maximumVisibleIndex = Math.max(this.maximumVisibleIndex, Math.min(index, this.items.length - 1));
    this.items.forEach(function (item, itemIndex) {
      if (itemIndex < 2) {
        item.style.removeProperty("display");
      } else if (itemIndex <= this.maximumVisibleIndex) {
        item.style.display = "list-item";
      } else {
        item.style.removeProperty("display");
      }
    }, this);
  };

  SurveyController.prototype.restoreFromUrl = function () {
    var params = new URLSearchParams(window.location.search);
    var furthest = -1;

    this.items.forEach(function (item, index) {
      var select = item.querySelector("select");
      if (!select || !select.name || !params.has(select.name)) return;
      var candidate = params.get(select.name) || "";
      if (!hasOptionValue(select, candidate)) return;
      select.value = candidate;
      item.dataset.surveyVisited = "1";
      furthest = index;
    });

    var loanValues = params.getAll("current_loans[]");
    var loanInputs = this.form.querySelectorAll('.loan-check input[name="current_loans[]"]');
    if (params.has("current_loans[]")) {
      toArray(loanInputs).forEach(function (input) {
        input.checked = loanValues.indexOf(input.value) !== -1;
      });
    }

    this.showThrough(Math.max(1, furthest + 1));
    this.items.forEach(this.syncItem.bind(this));
    this.updateResultSummary();
  };

  SurveyController.prototype.updateProgress = function () {
    if (!this.modal || !this.items.length) return;
    this.items.forEach(function (item, index) {
      item.classList.toggle("v3-current-question", index === this.currentIndex && this.modal.classList.contains("active"));
      item.classList.toggle("selected", index === this.currentIndex);
    }, this);
    var progress = this.modal.querySelector(".v3-modal-progress");
    if (!progress) return;
    var current = Math.max(0, this.currentIndex) + 1;
    var label = progress.querySelector("span");
    var meter = progress.querySelector("i");
    if (label) label.textContent = "質問 " + current + " / " + this.items.length;
    if (meter) meter.style.width = Math.round(current / this.items.length * 100) + "%";
  };

  SurveyController.prototype.createControl = function (className, text, handler) {
    var control = document.createElement("p");
    control.className = className;
    control.textContent = text;
    makeButtonLike(control, handler);
    return control;
  };

  SurveyController.prototype.render = function () {
    if (!this.modalBody || this.currentIndex < 0 || this.currentIndex >= this.items.length) return;
    var item = this.items[this.currentIndex];
    var select = item.querySelector("select");
    var label = item.querySelector("label");
    var fragment = document.createDocumentFragment();

    if (this.modalTitle) this.modalTitle.textContent = stripQuestionNumber(label ? label.textContent : "条件を選択");

    toArray(select.options).forEach(function (option, optionIndex) {
      var choice = this.createControl("choice-btn", option.textContent.trim(), function () {
        this.choose(optionIndex);
      }.bind(this));
      choice.dataset.optionIndex = String(optionIndex);
      choice.dataset.value = option.value;
      choice.setAttribute("aria-pressed", optionIndex === select.selectedIndex ? "true" : "false");
      if (optionIndex === select.selectedIndex) choice.classList.add("is-selected");
      fragment.appendChild(choice);
    }, this);

    if (this.currentIndex === this.items.length - 1) {
      fragment.appendChild(this.createControl("step-submit", "この条件で探す", this.submitForm.bind(this)));
    }
    if (this.currentIndex > 0) {
      fragment.appendChild(this.createControl("step-back", "1つ前の質問に戻る", this.goBack.bind(this)));
    }

    this.modalBody.replaceChildren(fragment);
    this.updateProgress();
  };

  SurveyController.prototype.open = function (index, preserveFocus) {
    if (!this.modal || !this.modalBody || index < 0 || index >= this.items.length) return;
    if (!preserveFocus) this.lastFocused = document.activeElement;
    this.currentIndex = index;
    this.render();
    this.modal.classList.add("active");
    this.modal.setAttribute("aria-hidden", "false");
    this.updateProgress();
    var firstChoice = this.modalBody.querySelector(".choice-btn");
    if (firstChoice) window.requestAnimationFrame(function () { firstChoice.focus({ preventScroll: true }); });
  };

  SurveyController.prototype.close = function () {
    if (!this.modal) return;
    this.modal.classList.remove("active");
    this.modal.setAttribute("aria-hidden", "true");
    this.items.forEach(function (item) { item.classList.remove("v3-current-question"); });
    if (this.lastFocused && typeof this.lastFocused.focus === "function") {
      this.lastFocused.focus({ preventScroll: true });
    }
  };

  SurveyController.prototype.choose = function (optionIndex) {
    if (this.transitioning || this.currentIndex < 0) return;
    var item = this.items[this.currentIndex];
    var select = item.querySelector("select");
    if (!select || optionIndex < 0 || optionIndex >= select.options.length) return;
    this.transitioning = true;
    select.selectedIndex = optionIndex;
    item.dataset.surveyVisited = "1";
    select.dispatchEvent(new Event("input", { bubbles: true }));
    select.dispatchEvent(new Event("change", { bubbles: true }));
    this.syncItem(item);
    this.updateResultSummary();

    var nextIndex = this.currentIndex + 1;
    if (nextIndex < this.items.length) {
      this.showThrough(nextIndex);
      window.setTimeout(function () {
        this.transitioning = false;
        this.open(nextIndex, true);
      }.bind(this), 180);
      return;
    }

    this.render();
    window.setTimeout(function () {
      this.transitioning = false;
      this.submitForm();
    }.bind(this), 180);
  };

  SurveyController.prototype.goBack = function () {
    if (this.transitioning || this.currentIndex <= 0) return;
    this.open(this.currentIndex - 1, true);
  };

  SurveyController.prototype.submitForm = function () {
    if (this.submitting) return;
    this.requestingSubmit = true;
    var submitter = this.form.querySelector('button[type="submit"], input[type="submit"]');
    if (typeof this.form.requestSubmit === "function") {
      submitter ? this.form.requestSubmit(submitter) : this.form.requestSubmit();
    } else {
      this.form.submit();
    }
    this.requestingSubmit = false;
  };

  SurveyController.prototype.updateResultSummary = function () {
    var form = this.form;

    function setAll(id, value) {
      document.querySelectorAll('[id="' + id + '"]').forEach(function (node) {
        node.textContent = value;
      });
    }

    function optionText(id, fallback) {
      var select = form.querySelector("#" + id);
      if (!select) return fallback;
      var option = select.options[select.selectedIndex];
      var text = option ? option.textContent.trim() : "";
      return text || fallback;
    }

    var companies = toArray(form.querySelectorAll('.loan-check input[name="current_loans[]"]:checked')).map(function (input) {
      var label = input.closest("label");
      return label ? label.textContent.trim() : "";
    }).filter(Boolean).join(" / ") || "指定なし";

    setAll("selected-companies", companies);
    setAll("selected-amount", optionText("q-amount", "こだわらない"));
    setAll("selected-time", optionText("q-speed", "こだわらない"));
    setAll("selected-method", optionText("q-method", "こだわらない"));
    setAll("selected-income", optionText("q-income", "未回答"));
    setAll("selected-job", optionText("q-job", "なし"));
    setAll("selected-company-size", optionText("q-company-size", "未回答"));
    setAll("selected-duration", optionText("q-duration", "未回答"));
  };

  SurveyController.prototype.suggestedIndex = function () {
    for (var index = 0; index < this.items.length; index += 1) {
      if (index > this.maximumVisibleIndex) break;
      if (this.items[index].dataset.surveyVisited !== "1") return index;
    }
    return Math.min(this.maximumVisibleIndex, this.items.length - 1);
  };

  SurveyController.prototype.trapFocus = function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      this.close();
      return;
    }
    if (event.key !== "Tab" || !this.modal.classList.contains("active")) return;
    var controls = toArray(this.modal.querySelectorAll('[tabindex="0"], button, a[href], input, select'));
    if (!controls.length) return;
    var first = controls[0];
    var last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  SurveyController.prototype.bind = function () {
    var self = this;
    if (!this.list || !this.modal || !this.items.length) return;
    this.modal.setAttribute("role", "dialog");
    this.modal.setAttribute("aria-modal", "true");
    this.modal.setAttribute("aria-hidden", "true");
    if (this.modalTitle) {
      if (!this.modalTitle.id) this.modalTitle.id = "survey-modal-title";
      this.modal.setAttribute("aria-labelledby", this.modalTitle.id);
    }

    this.items.forEach(function (item, index) {
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.addEventListener("click", function (event) {
        if (event.target.closest("select, input, button, a")) return;
        self.open(index, false);
      });
      item.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        self.open(index, false);
      });
      var select = item.querySelector("select");
      if (select) {
        select.addEventListener("change", function () {
          item.dataset.surveyVisited = "1";
          self.syncItem(item);
          self.updateResultSummary();
        });
      }
    });

    var heading = document.querySelector("#search_box h2.ttl01");
    if (heading) {
      heading.setAttribute("role", "button");
      heading.setAttribute("tabindex", "0");
      heading.addEventListener("click", function () { self.open(self.suggestedIndex(), false); });
      heading.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        self.open(self.suggestedIndex(), false);
      });
    }

    var closeButton = this.modal.querySelector(".modal-close");
    if (closeButton) {
      closeButton.setAttribute("aria-label", "閉じる");
      makeButtonLike(closeButton, this.close.bind(this));
    }
    this.modal.addEventListener("click", function (event) {
      if (event.target === self.modal) self.close();
    });
    this.modal.addEventListener("keydown", this.trapFocus.bind(this));

    this.form.addEventListener("submit", function (event) {
      if (self.submitting && !self.requestingSubmit) {
        event.preventDefault();
        return;
      }
      self.submitting = true;
      window.setTimeout(function () { self.submitting = false; }, 1800);
    });
    this.form.addEventListener("change", function (event) {
      if (event.target.matches('.loan-check input[name="current_loans[]"]')) self.updateResultSummary();
    });
  };

  SurveyController.prototype.init = function () {
    if (!this.list || !this.modal || !this.items.length) return false;
    if (isStaticDocument()) {
      var action = this.form.getAttribute("action");
      if (action) this.form.setAttribute("action", toStaticPagePath(action));
    }
    this.restoreFromUrl();
    this.bind();
    return true;
  };

  function init() {
    initEntryModal();
    document.querySelectorAll("form").forEach(function (form) {
      if (!form.querySelector("ul.survey-list") || form.dataset.surveyReady === "1") return;
      form.dataset.surveyReady = "1";
      var controller = new SurveyController(form);
      if (controller.init()) currentControllers.push(controller);
    });
  }

  window.MoneyLoanSurvey = {
    init: init,
    controllers: currentControllers,
    __test: {
      stripQuestionNumber: stripQuestionNumber,
      toStaticPagePath: toStaticPagePath,
      isStaticDocument: isStaticDocument,
      buildEntryTarget: buildEntryTarget,
      hasOptionValue: hasOptionValue
    }
  };

  whenReady(init);
})();
