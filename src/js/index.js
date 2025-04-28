const MENU_BTN = document.querySelector('.menu-btn')
const MENU = document.querySelector('.header__nav')

//Раскрытие меню
MENU_BTN.addEventListener('click', () => {
    MENU_BTN.classList.toggle('active')
    MENU.classList.toggle('active')
})

