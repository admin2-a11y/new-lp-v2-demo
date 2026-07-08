(function () {
  function makeButtonLike(el) {
    if (!el || el.dataset.v3A11yReady === '1') return;
    el.dataset.v3A11yReady = '1';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        el.click();
      }
    });
  }

  function enhancePseudoButtons(root) {
    (root || document).querySelectorAll(
      '.select_modal_btn1, .select_modal_btn2, #serch2_Modal .modal-btn, #serch2_Modal .modal-back, #serch2_Modal .modal-submit, #serch2_Modal .modalClose'
    ).forEach(makeButtonLike);
  }

  function enhanceDialogs() {
    var entry = document.querySelector('.select_modal');
    if (entry) {
      entry.setAttribute('role', 'dialog');
      entry.setAttribute('aria-modal', 'true');
    }
    var diagnosis = document.getElementById('serch2_Modal');
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

  function focusFirstModalControl() {
    var activeModal = document.querySelector('#serch2_Modal.active, .select_modal.active');
    if (!activeModal) return;
    var target = activeModal.querySelector('[tabindex="0"], button, a, select, input');
    if (target && document.activeElement !== target && !activeModal.contains(document.activeElement)) {
      target.focus({ preventScroll: true });
    }
  }

  function getFocusableInActiveModal() {
    var activeModal = document.querySelector('#serch2_Modal.active, .select_modal.active');
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
    document.querySelectorAll('.topbox.case').forEach(function (card, index) {
      if (index > 0 || card.querySelector('.v3-card-top-cta')) return;
      var link = card.querySelector('.rank-title a[href*="redirect.php"], h3 a[href*="redirect.php"], .osusume_btn_area a[href*="redirect.php"]');
      var metrics = card.querySelector('.v3-metrics');
      if (!link || !metrics) return;
      var cta = document.createElement('a');
      cta.className = 'v3-card-top-cta';
      cta.href = link.href;
      cta.target = link.target || '_blank';
      cta.rel = 'noopener';
      cta.textContent = '公式サイトで詳細を見る';
      var basic = metrics.closest('.basic');
      (basic || metrics).insertAdjacentElement('afterend', cta);
    });
  }

  function enhanceBannerAlts() {
    var labels = [
      ['banner_acom', 'アコム公式サイトへ'],
      ['banner_mobit', 'SMBCモビット公式サイトへ'],
      ['banner_promise', 'プロミス公式サイトへ']
    ];
    document.querySelectorAll('.topbox.case a[href*="redirect.php"] img').forEach(function (img) {
      if (img.getAttribute('alt')) return;
      var src = img.getAttribute('src') || '';
      var match = labels.find(function (item) { return src.indexOf(item[0]) !== -1; });
      if (match) img.setAttribute('alt', match[1]);
    });
  }

  function isGitHubPagesDemo() {
    return window.location.hostname.indexOf('github.io') !== -1;
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

  function enableGitHubPagesDemoRouting() {
    if (!isGitHubPagesDemo()) return;

    document.querySelectorAll('form[action]').forEach(function (form) {
      form.setAttribute('action', toDemoHtmlUrl(form.getAttribute('action')));
    });
    document.querySelectorAll('a[href]').forEach(function (link) {
      link.setAttribute('href', toDemoHtmlUrl(link.getAttribute('href')));
    });

    document.addEventListener('click', function (event) {
      var beginnerButton = event.target.closest && event.target.closest('.select_modal_btn1');
      if (!beginnerButton) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      var container = document.querySelector('.select_modal');
      var body = document.querySelector('.select_modal_body');
      var loading = document.querySelector('.select_modal_load');
      if (body) body.classList.remove('active');
      if (loading) loading.classList.add('active');

      setTimeout(function () {
        window.location.replace('beginner.html' + window.location.search);
      }, 1200);
    }, true);
  }

  function runEnhancements() {
    enableGitHubPagesDemoRouting();
    enhancePseudoButtons(document);
    enhanceDialogs();
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
        var close = state.modal.querySelector('.modalClose');
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
