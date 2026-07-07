$(document).ready(function () {

    $('#follow-banner').hide();

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 400) {
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
