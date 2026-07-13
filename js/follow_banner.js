$(document).ready(function () {

    $('#follow-banner').hide();

    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop();
        var windowHeight = $(this).height();
        var compare = $('#hikaku');
        var flow = $('#flow');
        var coveredSectionVisible = false;

        if (compare.length) {
            var compareTop = compare.offset().top;
            var compareBottom = compareTop + compare.outerHeight();
            coveredSectionVisible = coveredSectionVisible || (scrollTop + windowHeight > compareTop + 80 && scrollTop < compareBottom - 80);
        }

        if (flow.length) {
            var flowTop = flow.offset().top;
            var flowBottom = flowTop + flow.outerHeight();
            coveredSectionVisible = coveredSectionVisible || (scrollTop + windowHeight > flowTop + 80 && scrollTop < flowBottom - 80);
        }

        if (scrollTop > 400 && !coveredSectionVisible) {
            $('#follow-banner').fadeIn();  // 100pxを超えたら表示
        } else {
            $('#follow-banner').fadeOut(); // 100px未満なら非表示
        }
    });

    $('#btn-follow').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#search_box').offset().top - 50
        }, 500);
    });
});
