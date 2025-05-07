const MENU_BTN = document.querySelector('.menu-btn')
const MENU = document.querySelector('.header__nav')
const CERT_GALLERY = document.querySelector('.catalog__cert-btn')

//Раскрытие меню
MENU_BTN.addEventListener('click', () => {
    MENU_BTN.classList.toggle('active')
    MENU.classList.toggle('active')
})


//Прикрепить файл
$(document).ready(function () {
    $("#formUploadMain").change(function () {
        let filename = $(this).val().replace(/.*\\/, "");
        $("#fileNameMain").html(filename);
    });
});

// Инициализация слайдеров
function sliderInit() {
    const galleryCert = new Swiper('.cert-slider', {
        centeredSlides: true,
        slideShow: 1,
        loop: false,
        speed: 500,
        spaceBetween: 20,
        navigation: {
            nextEl: '.button-prev',
            prevEl: '.button-next',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'bullet',
        },
        // breakpoints: {
        //     320: {
        //         centeredSlides: true,
        //         slidesPerView: 1,
        //     },
        //     767: {
        //         centeredSlides: false,
        //         slidesPerView: 2,
        //     },
        // }
    });

    const cases = new Swiper('.slider-wrapper', {
        speed: 400,
        spaceBetween: 20,
        loop: false,
        slidesPerView: "auto",
        autoplay: false,
        navigation: {
            nextEl: '.cases__button-next',
            prevEl: '.cases__button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: "auto",
            },
            425: {
                slidesPerView: 2,
            },
            767: {
                slidesPerView: 2,
            },
            1199: {
                slidesPerView: "auto",
            },
        },
    });

}


sliderInit()

// Инициализация галереи
Fancybox.bind("[data-fancybox]", {});
CERT_GALLERY.addEventListener('click', ()=> {
    Fancybox.fromSelector('[data-fancybox="catalog-cert"]');
})
