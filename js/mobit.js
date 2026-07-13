(function() {
    'use strict';

    var order = ['mobit', 'aiful', 'acom'];

    function productOf(element) {
        var link = element && element.querySelector('a[href*="redirect.php?item="]');
        if (!link) return '';
        var match = link.getAttribute('href').match(/[?&]item=([^&#]+)/);
        return match ? match[1] : '';
    }

    function setProductLinks(root, product) {
        Array.prototype.forEach.call(root.querySelectorAll('a[href*="redirect.php?item="]'), function(link) {
            link.setAttribute('href', link.getAttribute('href').replace(/([?&]item=)[^&#]+/, '$1' + product));
        });
    }

    function walkText(root, replacements) {
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        var nodes = [];
        var node;
        while ((node = walker.nextNode())) nodes.push(node);
        nodes.forEach(function(textNode) {
            var value = textNode.nodeValue;
            replacements.forEach(function(pair) {
                value = value.split(pair[0]).join(pair[1]);
            });
            textNode.nodeValue = value;
        });
    }

    function makeAifulCard(source) {
        var card = source.cloneNode(true);
        setProductLinks(card, 'aiful');
        Array.prototype.forEach.call(card.querySelectorAll('img'), function(image) {
            var src = image.getAttribute('src') || '';
            if (src.indexOf('banner_promise') !== -1) {
                image.setAttribute('src', './images/banner_aiful.jpg');
                image.setAttribute('alt', 'アイフル公式サイトへ');
                image.setAttribute('width', '300');
                image.setAttribute('height', '250');
            }
            if (src.indexOf('kuchikomi_promise') !== -1) {
                var item = image.closest('li');
                if (item) item.innerHTML = '<p>申込前に条件を確認でき、スマホで進めやすかったという利用者の声があります。</p>';
            }
        });
        walkText(card, [
            ['プロミス', 'アイフル'],
            ['SMBCコンシューマーファイナンス株式会社', 'アイフル株式会社'],
            ['2.5％~18.0％', '3.0％～18.0％'],
            ['2.5%～18.0%', '3.0%～18.0%'],
            ['最大500万円', '最大800万円'],
            ['最短3分', 'WEBで最短14分※'],
            ['郵送物なし＆カードレスで進めたい人におすすめ！', 'WEB完結でスピードを重視したい人におすすめ！'],
            ['郵送物無し&カードレス', 'WEB完結で来店不要'],
            ['郵送物なし、カードレスで進めたい方も確認できます', 'Web申込、来店不要、カードレスで進めたい方も確認できます'],
            ['30日間無利息の条件も申込前に確認できます', 'はじめての契約なら無利息期間も確認できます'],
            ['スマホで比較しながら、返済額や無利息期間を確認できたという声があります。', '申込前に診断で目安を確認でき、条件を比較しやすかったという声があります。'],
            ['※無利息期間30日を適用する場合は、メールアドレス登録とWeb明細利用の登録が必要です。', '※はじめての方は最大30日間利息0円。適用条件は公式サイトでご確認ください。']
        ]);
        return card;
    }

    function normalizeRank(card, rank, type) {
        card.classList.toggle('is-first', rank === 1 && type === 'result');

        var number = card.querySelector('.v3-lender-rank');
        if (number) number.textContent = String(rank);

        var resultNumber = card.querySelector('.v3-result-lender-rank');
        if (resultNumber) resultNumber.textContent = 'おすすめ順 No.' + rank;

        var title = card.querySelector('.rank-title');
        if (title) {
            var position = title.querySelector(':scope > span');
            if (position && /位/.test(position.textContent)) position.textContent = rank + '位';
            var crown = title.querySelector('h3');
            if (crown) crown.className = rank === 1 ? 'crown' : 'crown' + rank;
        }

        Array.prototype.forEach.call(card.querySelectorAll('.v3-rank-badge'), function(badge) {
            badge.remove();
        });
        if (rank === 1 && card.classList.contains('topboxNew')) {
            var badge = document.createElement('div');
            badge.className = 'v3-rank-badge';
            badge.innerHTML = '<span>No.1</span><b>一番選ばれています</b>';
            card.insertBefore(badge, card.firstChild);
        }
    }

    function reorderContainer(container, selector, type) {
        var cards = Array.prototype.filter.call(container.children, function(child) {
            return child.matches(selector) && productOf(child);
        });
        if (!cards.length) return;

        var byProduct = {};
        cards.forEach(function(card) {
            byProduct[productOf(card)] = card;
        });
        if (!byProduct.mobit || !byProduct.aiful || !byProduct.acom) return;

        cards.forEach(function(card) { card.remove(); });
        order.forEach(function(product, index) {
            var card = byProduct[product];
            normalizeRank(card, index + 1, type);
            container.appendChild(card);
        });
    }

    function reorderCards() {
        Array.prototype.forEach.call(document.querySelectorAll('.v3-result-lender-list'), function(container) {
            reorderContainer(container, 'article.v3-result-lender-card', 'result');
        });
        Array.prototype.forEach.call(document.querySelectorAll('.v3-lender-card-list'), function(container) {
            reorderContainer(container, 'section.v3-lender-card', 'lender');
        });
    }

    function reorderTableRows() {
        Array.prototype.forEach.call(document.querySelectorAll('tbody'), function(body) {
            var rows = Array.prototype.filter.call(body.children, function(child) {
                return child.tagName === 'TR' && productOf(child);
            });
            if (!rows.length) return;
            var byProduct = {};
            rows.forEach(function(row) { byProduct[productOf(row)] = row; });
            if (!byProduct.mobit || !byProduct.aiful || !byProduct.acom) return;
            rows.forEach(function(row) { row.remove(); });
            order.forEach(function(product) { body.appendChild(byProduct[product]); });
        });
    }

    function reorderMiniRankings() {
        Array.prototype.forEach.call(document.querySelectorAll('.ranking2_container'), function(container) {
            var entries = Array.prototype.filter.call(container.children, function(child) {
                return child.tagName === 'SPAN' && productOf(child);
            });
            if (!entries.length) return;
            var byProduct = {};
            entries.forEach(function(entry) { byProduct[productOf(entry)] = entry; });
            if (!byProduct.aiful && byProduct.promise) {
                byProduct.aiful = byProduct.promise.cloneNode(true);
                setProductLinks(byProduct.aiful, 'aiful');
                walkText(byProduct.aiful, [['プロミス', 'アイフル']]);
            }
            if (!byProduct.mobit || !byProduct.aiful || !byProduct.acom) return;
            entries.forEach(function(entry) { entry.remove(); });
            order.forEach(function(product, index) {
                var entry = byProduct[product];
                var crown = entry.querySelector('[class^="crown"]');
                if (crown) crown.className = index === 0 ? 'crown' : 'crown' + (index + 1);
                container.appendChild(entry);
            });
        });
    }

    function replaceDetailedRankings() {
        var cards = Array.prototype.slice.call(document.querySelectorAll('.topbox.topboxNew.case'));
        var acom = cards.find(function(card) { return productOf(card) === 'acom'; });
        var mobit = cards.find(function(card) { return productOf(card) === 'mobit'; });
        var promise = cards.find(function(card) { return productOf(card) === 'promise'; });
        if (!acom || !mobit || !promise) return;

        cards.forEach(function(card) {
            var rank = 0;
            var heading = card.querySelector('.rank-title h3');
            if (heading) {
                if (heading.classList.contains('crown3')) rank = 3;
                else if (heading.classList.contains('crown2')) rank = 2;
                else if (heading.classList.contains('crown')) rank = 1;
            }
            if (!rank && card.querySelector('.v3-rank-badge')) rank = 1;
            if (!rank) return;

            var replacement = rank === 1 ? mobit.cloneNode(true) : rank === 2 ? makeAifulCard(promise) : acom.cloneNode(true);
            normalizeRank(replacement, rank, 'detail');
            card.replaceWith(replacement);
        });
    }

    function updatePrimarySignals() {
        Array.prototype.forEach.call(document.querySelectorAll('.v3-result-primary-cta'), function(link) {
            link.setAttribute('href', './redirect.php?item=mobit');
        });
        Array.prototype.forEach.call(document.querySelectorAll('.v3-result-filter-title span'), function(count) {
            count.textContent = '3';
        });
        Array.prototype.forEach.call(document.querySelectorAll('.v3-result-trust span'), function(item) {
            if (item.textContent.indexOf('比較対象:') !== -1) {
                item.textContent = '比較対象: SMBCモビット / アイフル / アコム';
            }
        });
    }

    function applyMobitOrder() {
        replaceDetailedRankings();
        reorderCards();
        reorderTableRows();
        reorderMiniRankings();
        updatePrimarySignals();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyMobitOrder, { once: true });
    } else {
        applyMobitOrder();
    }
})();
