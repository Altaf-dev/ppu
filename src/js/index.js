const MENU_BTN = document.querySelector('.menu-btn')
const MENU = document.querySelector('.header__nav')
const CERT_GALLERY = document.querySelector('.catalog__cert-btn')
const ABOUT_CERT = document.querySelector('.cert-link')
const TAB_ITEM = document.querySelectorAll('.list-item')

//Раскрытие меню
MENU_BTN.addEventListener('click', () => {
    MENU_BTN.classList.toggle('active')
    MENU.classList.toggle('active')
})

TAB_ITEM.forEach((item) => {
    item.addEventListener('click', () => {
        if (item.classList.contains('active')) {
            item.classList.remove('active')
        } else {
            item.classList.add('active')
        }
    })
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
            el: '.cert-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'bullet',
        },
    });

    const galleryAbout = new Swiper('.about-slider', {
        centeredSlides: true,
        loop: false,
        speed: 500,
        spaceBetween: 20,
        navigation: {
            nextEl: '.button-prev',
            prevEl: '.button-next',
        },
        pagination: {
            el: '.about-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'bullet',
        },
        scrollbar: {
            el: ".about-scrollbar",
            hide: false,
            draggable: true,
            enabled: true
        },
    });

    const galleryAboutDesc = new Swiper('.about-slider-desc', {
        centeredSlides: true,
        speed: 500,
        effect: "fade",
    });

    galleryAbout.controller.control = galleryAboutDesc;
    galleryAboutDesc.controller.control = galleryAbout;

    const galleryAboutCert = new Swiper('.about__cert-slider', {
        centeredSlides: false,
        slidesPerView: 2,
        loop: false,
        speed: 500,
        spaceBetween: 20,
        navigation: {
            nextEl: '.button-prev',
            prevEl: '.button-next',
        },
        pagination: {
            el: '.about-cert-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'bullet',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            1199: {
                slidesPerView: 2,
            },
        },
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
    });
}


sliderInit()

// Инициализация галереи Fancybox
Fancybox.bind("[data-fancybox]", {});
CERT_GALLERY.addEventListener('click', ()=> {
    Fancybox.fromSelector('[data-fancybox="catalog-cert"]');
})

Fancybox.bind("[data-fancybox]", {});
ABOUT_CERT.addEventListener('click', ()=> {
    Fancybox.fromSelector('[data-fancybox="about-cert"]');
})


