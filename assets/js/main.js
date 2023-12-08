/**
 * lenis를 사용하여 스크롤 느리게 만들기
 */
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)

/**
 * header 타이어 찾기 swiper 함수
 */
headerSwiper = new Swiper('.header .select-result .swiper', {
    slidesPerView: 3,
});

/**
 * 메인베너 swiper 함수
 */
visualSwiper = new Swiper('.sc-visual .swiper', {
    loop: true,
    pagination: {
        el: '.sc-visual .swiper-pagination',
        clickable: true
    }
});

/**
 * 브랜드 상단 부분 swiper 함수
 */
brandSwiper = new Swiper('.sc-brands > .swiper', {
    pagination: {
        el: ".sc-brands > .swiper .swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".sc-brands > .swiper .btn-next",
        prevEl: ".sc-brands > .swiper .btn-prev",
    },
    on: {
        "init": function () {
            brandNumber = this.activeIndex;
        },
        "slideChange": function () {
            brandNumber = this.activeIndex;
            $('.sc-brands > .inner .swiper').eq(brandNumber).addClass('active').siblings().removeClass('active');
        }
    }
});

/**
 * 브랜드 하단 부분 swiper 함수
 */
brand2Swiper = new Swiper('.sc-brands > .inner > .swiper', {
    slidesPerView: 2,
    spaceBetween: 16,
    breakpoints: {
        1024: {
            slidesPerView: 3,
        },
    }
});

/**
 * 미디어 부분 swiper 함수
 */
mediaSwiper = new Swiper('.sc-media .swiper', {
    spaceBetween: 15,
    slidesPerView: 1.5,
    navigation: {
        nextEl: ".sc-media .btn-next",
        prevEl: ".sc-media .btn-prev",
    },
    breakpoints: {
        767: {
            slidesPerView: 3,
        },
    },
});

/**
 * 페이지 width가 변하면 작동되는 함수
 */
var ww = $(window).width();
var bottomSwiper = undefined;

function initSwiper() {
    if (ww < 768 && bottomSwiper != undefined) {
        bottomSwiper.destroy();
        bottomSwiper = undefined;
    } else if (ww >= 768 && bottomSwiper == undefined) {
        bottomSwiper = new Swiper(".sc-bottomBanner .swiper", {
            slidesPerView: 'auto',
        });
    }
}

initSwiper();

$(window).on('resize', function () {
    ww = $(window).width();
    initSwiper();
});

/**
 * search 부분 swiper 함수
 */
searchSwiper = new Swiper('.sc-search .swiper', {
    slidesPerView: 3,
});

/**
 * 헤더 중앙 호버시 메뉴가 나오도록
 */
$('.header-bottom .content').hover(function () {
    if (!$('.header-bottom').hasClass('on')) {
        if ($(this).find('.sub').length) {
            $(this).find('.sub').addClass('on');
            $('.header-bottom .bg-panel').addClass('on');
        }
    }
}, function () {
    if (!$('.header-bottom').hasClass('on')) {
        $('.header-bottom .content').find('.sub').removeClass('on');
        $('.header-bottom .bg-panel').removeClass('on');
    }
})

/**
 * 타이어 찾기 메뉴 나오게하기
 */
$('.header .utils .tire').click(function (e) {
    e.preventDefault();
    lenis.stop();
    $('.container .sc-search').addClass('on')
    $('.search-dim').addClass('on')
    $('body').addClass('noscroll')
})
$('.header .utils .search').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('on');
    $('.header-bottom, .header .group-search, .header-bottom .bg-panel').toggleClass('on')
})

/**
 * header 모바일 버튼 클릭시 나오게 하기
 */
$('.header .utils .menu').click(function (e) {
    e.preventDefault();
    lenis.destroy();
    $('body').addClass('noscroll');
    $('.sidenav').addClass('show');
})
$('.sidenav .btn-close').click(function () {
    lenis.start();
    $('body').removeClass('noscroll');
    $('.sidenav').removeClass('show');
})

/**
 * 모바일 세부 메뉴 클릭시 내용 나오도록
 */
$('.sidenav .d1-link').click(function (e) {
    e.preventDefault();
    $(this).next('.d2-wrap').slideToggle();
    $(this).parent().siblings().find('.d2-wrap').slideUp();
})

/**
 * header opener 버튼 클릭시 active 클래스 추가
 */
$('.header .header-top .opener').click(function () {
    $(this).toggleClass('active');
    $('.header .header-top .assistant').toggleClass('active');
})

$('.assistant-closer').click(function () {
    $('.header .header-top .assistant').removeClass('active');
})

/**
 * 모바일 위젯메뉴 show more 누르면 보이게 하기
 */
$('.sc-widgetboard .func').click(function () {
    $('.grid-area .item').removeClass('hidden');
    $('.container .sc-widgetboard .func').addClass('hidden');
})

/**
 * select-vehicle 버튼 클릭시 높이 변경
 */
$('.select-vehicle .select-box .btn').click(function () {
    let childLength = $(this).next('.drop-box').find('button').length;

    allHeight = $('.sc-search').css('--all-height');
    Height = $('.sc-search').css('--box-height');

    if ($(this).hasClass('active')) {
        $(this).removeClass('active').next('.drop-box').css('height', 0);
    } else {
        $('.select-vehicle .select-box .btn').removeClass('active').next('.drop-box').css('height', 0);
        if (childLength > 1) {
            $(this).addClass('active').next('.drop-box').css('height', allHeight);
        } else {
            $(this).addClass('active').next('.drop-box').css('height', Height);
        }
    }
})

/**
 * 타이어 찾기 메뉴 닫기 버튼 클릭하면 접히기
 */
$('.sc-search .btn-close').click(function () {
    $('.search-dim').removeClass('on')
    $('.sc-search').removeClass('on')
    $('body').removeClass('noscroll')
    lenis.start();
})

/**
 * 타이어 찾기 맨 상단 '승용차 & SUV', '트럭 & 버스' 탭메뉴 JS
 */
$('.sc-search .search-tab .btn').click(function () {
    if ($(this).data('id') == 1) {
        $(this).addClass('active').siblings().removeClass('active')
        $('#carSub').addClass('active');
        $('#truckBus').removeClass('active');
        $('#carSwiper').addClass('active');
        $('#truckSwiper').removeClass('active');
    } else {
        $(this).addClass('active').siblings().removeClass('active')
        $('#carSub').removeClass('active');
        $('#truckBus').addClass('active');
        $('#carSwiper').removeClass('active');
        $('#truckSwiper').addClass('active');
    }
})

/**
 * 타이어 찾기 승용차 & SUV 탭메뉴 JS
 */
$('#carSub .select-tire .con #kind').click(function () {
    if ($(this).hasClass('active') != true) {
        $(this).addClass('active');
        $('#carSub .select-tire .con #size').removeClass('active');
        $('#carSub .select-vehicle .con #kind').addClass('on').siblings().removeClass('on');
    } else {
        return
    }
})
$('#carSub .select-tire .con #size').click(function () {
    if ($(this).hasClass('active') != true) {
        $(this).addClass('active');
        $('#carSub .select-tire .con #kind').removeClass('active');
        $('#carSub .select-vehicle .con #size').addClass('on').siblings().removeClass('on');
    } else {
        return
    }
})

/**
 * 타이어 찾기 '트럭 & 버스'의 '도로환경 선택', '포지션 선택' 클릭시 글자색, 배경색 변환
 */
$('#truckBus .con .btn').click(function () {
    if ($(this).hasClass('active') == true) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
    }
})

/**
 * 메인배너 하단 탭메뉴 작동시키기
 */
$('.sc-visual .switch-wrap .switch').click(function () {
    if ($(this).data('type') == 'pc') {
        $(this).addClass('on').siblings().removeClass('on');
        $('.sc-visual .cond-wrap[data-type="pc"]').addClass('on').siblings().removeClass('on');
    } else {
        $(this).addClass('on').siblings().removeClass('on');
        $('.sc-visual .cond-wrap[data-type="truck"]').addClass('on').siblings().removeClass('on');
    }
})

/**
 * 모바일 메인배너 하단 버튼 클릭시 모바일 메뉴 나오도록
 */
$('.cond-mobile').click(function () {
    if ($(this).data().popup == 'select-search-type') {
        $('.popup-local #select-search-type').addClass('active')
    } else {
        $('.popup-local #select-search-type-truck').addClass('active')
    }
})
$('.popup-local .popup-base button').click(function () {
    $('.popup-local .popup-base').removeClass('active');
})

/**
 * 한국 타이어 테크놀로지 부분 클릭시 active 클래스 추가로 width 변화시키기
 */
$('.sc-technology .link-wrap').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('active') != true) {
        $(this).addClass('active').siblings().removeClass('active');
    } else {
        return
    }
})

/**
 * 모바일 푸터 클릭하면 나오게끔
 */
$('.footer-top .list .item .title').click(function (e) {
    e.preventDefault()
    $(this).parent().siblings().find('.sub').slideUp();
    $(this).next('.sub').slideToggle();
})