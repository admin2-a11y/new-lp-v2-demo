(function () {
    function updateSelectLabels() {
        document.querySelectorAll('ul.select_box select').forEach(function (select) {
            var text = select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : '';
            var label = select.closest('li') ? select.closest('li').querySelector('p') : null;
            if (label) {
                label.textContent = text;
            }
            select.addEventListener('change', function () {
                var nextText = select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : '';
                if (label) {
                    label.textContent = nextText;
                }
            });
        });
    }

    function updateEstimateTimes() {
        var now = new Date();
        document.querySelectorAll('[data-estimate-minutes]').forEach(function (node) {
            var minutes = Number(node.getAttribute('data-estimate-minutes') || '60');
            var cutoffHour = Number(node.getAttribute('data-cutoff-hour') || '21');
            var estimated = new Date(now.getTime() + minutes * 60 * 1000);
            var cutoff = new Date(now.getTime());
            cutoff.setHours(cutoffHour, 0, 0, 0);

            if (now >= cutoff || estimated >= cutoff) {
                node.textContent = '受付時間により翌日以降';
                node.setAttribute('data-after-cutoff', 'true');
                return;
            }

            node.removeAttribute('data-after-cutoff');
            node.textContent = '最短' +
                String(estimated.getHours()).padStart(2, '0') + '時' +
                String(estimated.getMinutes()).padStart(2, '0') + '分ごろに借入完了も';
        });
    }

    function enableStaticDemoRouting() {
        var isStaticDemo = window.location.hostname.indexOf('github.io') !== -1 ||
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname === 'localhost' ||
            window.location.protocol === 'file:';

        if (!isStaticDemo) {
            return;
        }

        document.querySelectorAll('a[href*="redirect.php"]').forEach(function (link) {
            link.setAttribute('href', (link.getAttribute('href') || '').replace('redirect.php', 'redirect.html'));
        });
    }

    function renderResultChips() {
        var container = document.querySelector('.mobit-result-chips');
        if (!container) {
            return;
        }
        var params = new URLSearchParams(window.location.search);
        var labels = {
            loan_speed_dis: '借入希望',
            borrow_limit_dis: '希望額',
            how_dis: '借入方法',
            annual_income_dis: '年収',
            how_many_loans_dis: '職業',
            company_size_dis: '会社規模',
            duration_dis: '勤続年数'
        };
        var valueLabels = {};
        document.querySelectorAll('select').forEach(function (select) {
            Array.prototype.forEach.call(select.options, function (option) {
                valueLabels[select.name + ':' + option.value] = option.textContent;
            });
        });
        var chips = [];
        Object.keys(labels).forEach(function (name) {
            var value = params.get(name);
            if (!value) {
                return;
            }
            chips.push(labels[name] + ': ' + (valueLabels[name + ':' + value] || value));
        });
        if (!chips.length) {
            chips.push('条件指定なし');
        }
        container.innerHTML = chips.map(function (chip) {
            return '<span>' + chip.replace(/[&<>"']/g, function (char) {
                return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char];
            }) + '</span>';
        }).join('');
    }

    function protectLegacyModalShell() {
        document.querySelectorAll('.select_modal_btn1, .select_modal_btn2, .modalClose').forEach(function (button) {
            button.addEventListener('click', function () {
                var modal = button.closest('.select_modal') || document.getElementById('serch2_Modal');
                if (modal) {
                    modal.setAttribute('hidden', '');
                    modal.setAttribute('aria-hidden', 'true');
                }
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        updateSelectLabels();
        updateEstimateTimes();
        window.setInterval(updateEstimateTimes, 30000);
        renderResultChips();
        protectLegacyModalShell();
        enableStaticDemoRouting();
    });
})();
