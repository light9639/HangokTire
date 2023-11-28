headerSwiper = new Swiper('.header .select-result .swiper', {
    slidesPerView: 3,
});

visualSwiper = new Swiper('.sc-visual .swiper', {
    loop: true,
    pagination: {
        el: '.sc-visual .swiper-pagination',
        clickable: true
    }
});

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

brand2Swiper = new Swiper('.sc-brands > .inner > .swiper', {
    slidesPerView: 3,
    spaceBetween: 16,
});

mediaSwiper = new Swiper('.sc-media .swiper', {
    spaceBetween: 15,
    slidesPerView: 3,
    navigation: {
        nextEl: ".sc-media .btn-next",
        prevEl: ".sc-media .btn-prev",
    },
});

bottomSwiper = new Swiper('.sc-bottomBanner .swiper', {
    slidesPerView: 4.5,
});

searchSwiper = new Swiper('.sc-search .swiper', {
    slidesPerView: 3,
});

/**
 * 헤더 중앙 호버시 메뉴가 나오도록
 */
$('.header-bottom .content').hover(function () {
    if ($(this).find('.sub').length == 1) {
        $(this).find('.sub').addClass('on');
        $('.header-bottom .bg-panel').addClass('on');
    } else {
        $('.header-bottom .content').find('.sub').removeClass('on');
        $('.header-bottom .bg-panel').removeClass('on');
    }
})

/**
 * 타이어 찾기 메뉴 나오게하기
 */
$('.header .utils .tire').click(function (e) {
    e.preventDefault();
    $('.container .sc-search').toggleClass('on')
})
$('.header .utils .search').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('on')
    $('.header .group-search').toggleClass('on')
    $('.header-bottom .bg-panel').toggleClass('on');
})

/**
 * 
 */
$('.select-vehicle .select-box .btn').click(function () {
    let heightNum = $(this).next('.drop-box').data('height');

    console.log($(this).next('.drop-box').find('button').length);

    if ($(this).next('.drop-box').css('height') == '0px') {
        $(this).next('.drop-box').css('height', heightNum);
        $(this).addClass('active');
    }
    else {
        $(this).next('.drop-box').css('height', '0px');
        $(this).removeClass('active');
    }
})

/**
 * 타이어 찾기 메뉴 닫기 버튼 클릭하면 접히기
 */
$('.sc-search .btn-close').click(function () {
    $('.sc-search').removeClass('on')
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
 * lenis를 사용하여 스크롤 느리게 만들기
 */
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)