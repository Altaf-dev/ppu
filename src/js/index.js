const MENU_BTN = document.querySelector('.menu-btn')
const MENU = document.querySelector('.header__nav')
const CERT_GALLERY = document.querySelector('.catalog__cert-btn')
const ABOUT_CERT = document.querySelector('.cert-link')
const TAB_ITEM = document.querySelectorAll('.list-item')

// Функция появления кнопки прокрутки вверх
const SCROLL_BTN = document.querySelector('.top-scroll')

// Модальные окна
const closeModalBtn = document.querySelectorAll('.closeModal')
const openModal = document.querySelectorAll('.openModal')
const modalItems = document.querySelectorAll('.modal')
const MODAL_BG = document.querySelector('.modal-bg')

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


// Функция появления кнопки прокрутки вверх
const FOOTER = document.querySelector('.footer')
let pageHeight = document.documentElement.scrollHeight
let footerHeight = FOOTER.clientHeight
let windowInnerHeight = window.innerHeight
let width = window.innerWidth

window.addEventListener('resize', () => {
    pageHeight = document.documentElement.scrollHeight
    footerHeight = FOOTER.offsetHeight
    windowInnerHeight = window.innerHeight
    width = window.innerWidth
})

let prev = 0

window.addEventListener('scroll', (event) => {

    let scrollPosition = pageHeight - footerHeight - 200
    let position = scrollY + windowInnerHeight

    if (scrollPosition <= position) {
        if (width <= 767) {
            SCROLL_BTN.style.bottom = '30px'
        }
        if (width < 1366) {
            SCROLL_BTN.style.bottom = '80px'
        }

    } else {
        SCROLL_BTN.style.bottom = '30px'
        if (width <= 767) {
            SCROLL_BTN.style.bottom = '75px'
        }
    }

    if (prev > scrollY && scrollY > 300) {
        SCROLL_BTN.classList.add('active')

    } else {
        SCROLL_BTN.classList.remove('active')
    }

    prev = scrollY
})

// Открытие/закрытие модальных окон
function closeModal() {
    MODAL_BG.classList.remove('active')
    modalItems.forEach((item) => {
        item.classList.remove('active')
    })
    // htmlScroll()
}

closeModalBtn.forEach((item) => {
    item.addEventListener('click', () => {
        closeModal()
    })
})

openModal.forEach((item) => {
    item.addEventListener('click', () => {
        modalItems.forEach((modals) => {
            if (modals.classList.contains(item.getAttribute('data-modal'))) {
                MODAL_BG.classList.add('active')
                modals.classList.add('active')
                // hideScroll()
            }
        })
    })
})

const MODAL_THANKS = document.querySelector('.modal-thanks')
const MODAL_ERROR = document.querySelector('.modal-error')


function openThanksModal() {
    closeModal()
    MODAL_BG.classList.add('active')
    MODAL_THANKS.classList.add('active')
}

function openErrorsModal() {
    closeModal()
    MODAL_BG.classList.add('active')
    MODAL_ERROR.classList.add('active')
}


//Прикрепить файл
$(document).ready(function () {
    $("#formUploadMain").change(function () {
        let filename = $(this).val().replace(/.*\\/, "");
        $("#fileNameMain").html(filename);
    });
});

$(document).ready(function () {
    $("#formUploadOne").change(function () {
        let filename = $(this).val().replace(/.*\\/, "");
        $("#fileNameOne").html(filename);
    });
});

$(document).ready(function () {
    $("#formUploadTwo").change(function () {
        let filename = $(this).val().replace(/.*\\/, "");
        $("#fileNameTwo").html(filename);
    });
});

$(document).ready(function () {
    $("#uploadDiscount").change(function () {
        let filename = $(this).val().replace(/.*\\/, "");
        $("#file-name-discount").html(filename);
    });
});

$(document).ready(function () {
    $("#modalUpload").change(function () {
        let filename = $(this).val().replace(/.*\\/, "");
        $("#file-name-modal").html(filename);
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
            nextEl: '.catalog-btn-prev',
            prevEl: '.catalog-btn-next',
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
            nextEl: '.about-btn-prev',
            prevEl: '.about-btn-next',
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
            nextEl: '.cert-btn-prev',
            prevEl: '.cert-btn-next',
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
        loop: true,
        slidesPerView: "auto",
        autoplay: false,
        navigation: {
            nextEl: '.cases__button-prev',
            prevEl: '.cases__button-next',
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


//Отправка статистики
const googleStat = document.getElementById('googleStat')
const yandexStat = document.getElementById('yandexStat')
function sendStats() {
    if (googleStat) {
        googleStat.click()
    }

    if (yandexStat) {
        yandexStat.click()
    }
}

//Формирование формы аналитики
$(document).ready(function () {
    let url_string = location.href;
    let url = new URL(url_string);
    let utm_source = url.searchParams.get('utm_source');
    let utm_medium = url.searchParams.get('utm_meduim');
    let utm_compaign = url.searchParams.get('utm_compaign');
    let utm_content = url.searchParams.get('utm_content');
    let utm_term = url.searchParams.get('utm_term');
    let yclid = url.searchParams.get('yclid');
    let gclid = url.searchParams.get('gclid');
    let pm_position = url.searchParams.get('pm_position');
    let keyword = url.searchParams.get('keyword');
    let clientid;
    let googlecid;

    $('.analytics input[name="utm_source"]').val(utm_source);
    $('.analytics input[name="utm_medium"]').val(utm_medium);
    $('.analytics input[name="utm_compaign"]').val(utm_compaign);
    $('.analytics input[name="utm_content"]').val(utm_content);
    $('.analytics input[name="utm_term"]').val(utm_term);
    $('.analytics input[name="yclid"]').val(yclid);
    $('.analytics input[name="gclid"]').val(gclid);
    $('.analytics input[name="pm_position"]').val(pm_position);
    $('.analytics input[name="keyword"]').val(keyword);

    setDataClient()

});

function setDataClient() {
    if (document.cookie.search('(?:^|;)\\s*_ga=([^;]*)') !== -1) {
        googlecid = document.cookie.match('(?:^|;)\\s*_ga=([^;]*)');
        $('.analytics input[name="googlecid"]').val(googlecid[0].slice(10));
    } else {
        googlecid = 'GA - отсуствует'
        $('.analytics input[name="googlecid"]').val(googlecid);
    }

    if (document.cookie.search('(?:^|;)\\s*_ym_uid=([^;]*)') !== -1) {
        clientid = document.cookie.match('(?:^|;)\\s*_ym_uid=([^;]*)');
        $('.analytics input[name="clientid"]').val(clientid[1]);
    } else {
        clientid = 'YM - отсуствует'
        $('.analytics input[name="clientid"]').val(clientid);
    }
}

//Передача лида и формирование формы аналитики
$(function () {
    $('form').submit(function (e) {
        e.preventDefault();
        setDataClient()
        let $form = $(this),
            formID,
            formData = new FormData(this);
        $("form#analytics").serializeArray().forEach(function (field) {
            formData.append(field.name, field.value)
        });
        formID = "#" + $form.attr('id') + " button";  // Формируем переменную с номер формы и добавляем селектор button
        $(formID).prop('disabled', true);
        $(formID).css({'opacity': 0.3});
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function () {
            let fileName = 'Прикрепить файл';
            $('form').trigger('reset');
            $("#file-name-modal").html(fileName);
            $("#file-name-discount").html(fileName);
            $("#fileNameTwo").html(fileName);
            $("#fileNameOne").html(fileName);
            $("#fileNameMain").html(fileName);
            $(formID).prop('disabled', false);
            $(formID).css({'opacity': 1});
            sendStats()
            openThanksModal()
        }).fail(function () {
            openErrorsModal()
            $(formID).prop('disabled', false);
            $(formID).css({'opacity': 1});
        })
    });
});


