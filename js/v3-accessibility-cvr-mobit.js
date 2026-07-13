(function () {
  var staticResultSubmitReady = false;

  function makeButtonLike(el) {
    if (!el || el.dataset.v3A11yReady === '1') return;
    el.dataset.v3A11yReady = '1';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    if (el.classList && el.classList.contains('modal-close') && !el.getAttribute('aria-label')) {
      el.setAttribute('aria-label', '閉じる');
    }
    el.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        el.click();
      }
    });
  }

  function enhancePseudoButtons(root) {
    (root || document).querySelectorAll(
      '.entry-first, .entry-experienced, #survey-modal .choice-btn, #survey-modal .step-back, #survey-modal .step-submit, #survey-modal .modal-close'
    ).forEach(makeButtonLike);
  }

  function enhanceDialogs() {
    var entry = document.querySelector('.entry-modal');
    if (entry) {
      entry.setAttribute('role', 'dialog');
      entry.setAttribute('aria-modal', 'true');
    }
    var diagnosis = document.getElementById('survey-modal');
    if (diagnosis) {
      diagnosis.setAttribute('role', 'dialog');
      diagnosis.setAttribute('aria-modal', 'true');
      var heading = diagnosis.querySelector('.modal-header h2');
      if (heading) {
        if (!heading.id) heading.id = 'v3-diagnosis-modal-title';
        diagnosis.setAttribute('aria-labelledby', heading.id);
      }
    }
  }

  var diagnosisGuideState = {
    title: '',
    timer: null
  };

  function ensureDiagnosisGuide() {
    var modal = document.getElementById('survey-modal');
    if (!modal) return;
    modal.querySelectorAll('.v3-chat-guide').forEach(function (guide) {
      guide.remove();
    });
    if (modal.classList.contains('v3-chat-thinking')) {
      modal.classList.remove('v3-chat-thinking');
    }
    window.clearTimeout(diagnosisGuideState.timer);
  }

  function focusFirstModalControl() {
    var activeModal = document.querySelector('#survey-modal.active, .entry-modal.active');
    if (!activeModal) return;
    var target = activeModal.querySelector('[tabindex="0"], button, a, select, input');
    if (target && document.activeElement !== target && !activeModal.contains(document.activeElement)) {
      target.focus({ preventScroll: true });
    }
  }

  function getFocusableInActiveModal() {
    var activeModal = document.querySelector('#survey-modal.active, .entry-modal.active');
    if (!activeModal) return null;
    var focusables = Array.prototype.slice.call(activeModal.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(function (el) {
      var style = window.getComputedStyle(el);
      var rect = el.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    });
    return { modal: activeModal, focusables: focusables };
  }

  function addTopCardCtas() {
    document.querySelectorAll('.lp-box.case').forEach(function (card, index) {
      if (index > 0 || card.querySelector('.v3-card-top-cta, .v3-lpo-fast-cta')) return;
      var link = card.querySelector('.rank-title a[href*="redirect.php"], h3 a[href*="redirect.php"], .osusume_btn_area a[href*="redirect.php"]');
      var metrics = card.querySelector('.v3-metrics');
      if (!link || !metrics) return;
      var cta = document.createElement('a');
      cta.className = 'v3-card-top-cta';
      cta.href = link.href;
      cta.target = link.target || '_blank';
      cta.rel = 'noopener';
      cta.textContent = '公式サイトで申込条件を確認する';
      var basic = metrics.closest('.basic');
      (basic || metrics).insertAdjacentElement('afterend', cta);
    });
  }

  function enhanceBannerAlts() {
    var labels = [
      ['banner_acom', 'アコム公式サイトへ'],
      ['banner_mobit', 'SMBCモビット公式サイトへ'],
      ['banner_promise', 'プロミス公式サイトへ'],
      ['banner_aiful', 'アイフル公式サイトへ']
    ];
    document.querySelectorAll('.lp-box.case a[href*="redirect.php"] img').forEach(function (img) {
      if (img.getAttribute('alt')) return;
      var src = img.getAttribute('src') || '';
      var match = labels.find(function (item) { return src.indexOf(item[0]) !== -1; });
      if (match) img.setAttribute('alt', match[1]);
    });
  }

  function isGitHubPagesDemo() {
    return window.location.hostname.indexOf('github.io') !== -1;
  }

  function isStaticDemoHost() {
    return isGitHubPagesDemo() ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === 'localhost' ||
      /\.html$/.test(window.location.pathname);
  }

  function toDemoHtmlUrl(value) {
    if (!value) return value;
    return value
      .replace(/beginner\.php/g, 'beginner.html')
      .replace(/beginner_result\.php/g, 'beginner_result.html')
      .replace(/result\.php/g, 'result.html')
      .replace(/redirect\.php/g, 'redirect.html')
      .replace(/operationinfo\.php/g, 'operationinfo.html');
  }

  var entryNavigationTimer = null;

  function resetEntryLoadingState() {
    if (entryNavigationTimer !== null) {
      window.clearTimeout(entryNavigationTimer);
      entryNavigationTimer = null;
    }

    var container = document.querySelector('.entry-modal');
    var body = document.querySelector('.entry-modal_body');
    var loading = document.querySelector('.entry-modal_load');
    if (loading) loading.classList.remove('active');

    if (container && body) {
      var shouldHideEntryModal = /(?:^|[?&])entry-modal=2(?:&|$)/.test(window.location.search);
      container.classList.toggle('active', !shouldHideEntryModal);
      body.classList.toggle('active', !shouldHideEntryModal);
    }
  }

  window.addEventListener('pageshow', resetEntryLoadingState);
  window.addEventListener('popstate', resetEntryLoadingState);

  function enableGitHubPagesDemoRouting() {
    if (!isStaticDemoHost()) return;

    document.querySelectorAll('form[action]').forEach(function (form) {
      form.setAttribute('action', toDemoHtmlUrl(form.getAttribute('action')));
    });
    document.querySelectorAll('a[href]').forEach(function (link) {
      link.setAttribute('href', toDemoHtmlUrl(link.getAttribute('href')));
    });

    document.addEventListener('click', function (event) {
      var beginnerButton = event.target.closest && event.target.closest('.entry-first');
      if (!beginnerButton) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      var container = document.querySelector('.entry-modal');
      var body = document.querySelector('.entry-modal_body');
      var loading = document.querySelector('.entry-modal_load');
      if (body) body.classList.remove('active');
      if (loading) loading.classList.add('active');
      var loadingText = document.querySelector('[data-entry-loading-message]');
      var messages = [
        'はじめての方向けの質問を準備しています',
        '見やすい順番に整理しています',
        'まもなく診断を開始します'
      ];
      messages.forEach(function (message, index) {
        window.setTimeout(function () {
          if (loadingText) loadingText.textContent = message;
        }, index * 520);
      });

      entryNavigationTimer = window.setTimeout(function () {
        entryNavigationTimer = null;
        window.location.replace('mobit_beginner.html' + window.location.search);
      }, 1850);
    }, true);
  }

  function serializeFormToUrl(form) {
    var action = toDemoHtmlUrl(form.getAttribute('action') || window.location.pathname);
    var url = new URL(action, window.location.href);
    new FormData(form).forEach(function (value, key) {
      url.searchParams.append(key, value);
    });
    return url;
  }

  function showDiagnosisLoading() {
    var container = document.querySelector('.entry-modal');
    var body = document.querySelector('.entry-modal_body');
    var loading = document.querySelector('.entry-modal_load');
    if (!container || !loading) return;
    container.classList.add('active');
    if (body) body.classList.remove('active');
    loading.classList.add('active');
  }

  function enableStaticResultSubmit() {
    if (!isStaticDemoHost()) return;
    if (staticResultSubmitReady) return;
    staticResultSubmitReady = true;

    document.addEventListener('submit', function (event) {
      var form = event.target;
      if (!form || !form.matches('form[action*="result.php"], form[action*="result.html"], form[action*="beginner_result.php"], form[action*="beginner_result.html"]')) return;
      event.preventDefault();
      var url = serializeFormToUrl(form);
      showDiagnosisLoading();
      setTimeout(function () {
        window.location.href = url.toString();
      }, 450);
    }, true);

    document.addEventListener('click', function (event) {
      var button = event.target.closest && event.target.closest('form[action*="result.php"] button[type="submit"], form[action*="result.html"] button[type="submit"], form[action*="beginner_result.php"] button[type="submit"], form[action*="beginner_result.html"] button[type="submit"], #survey-modal .step-submit');
      if (!button) return;
      var form = button.closest('form') || document.querySelector('#search_box form');
      if (!form) return;
      event.preventDefault();
      event.stopPropagation();
      var url = serializeFormToUrl(form);
      showDiagnosisLoading();
      setTimeout(function () {
        window.location.href = url.toString();
      }, 450);
    }, true);
  }

  function runEnhancements() {
    enableGitHubPagesDemoRouting();
    enableStaticResultSubmit();
    enhancePseudoButtons(document);
    enhanceDialogs();
    ensureDiagnosisGuide();
    addTopCardCtas();
    enhanceBannerAlts();
    focusFirstModalControl();
  }

  document.addEventListener('DOMContentLoaded', function () {
    runEnhancements();
    var observer = new MutationObserver(runEnhancements);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    document.addEventListener('keydown', function (event) {
      var state = getFocusableInActiveModal();
      if (!state || !state.focusables.length) return;
      if (event.key === 'Escape') {
        var close = state.modal.querySelector('.modal-close');
        if (close) close.click();
        return;
      }
      if (event.key !== 'Tab') return;
      var first = state.focusables[0];
      var last = state.focusables[state.focusables.length - 1];
      if (!state.modal.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  });
})();
