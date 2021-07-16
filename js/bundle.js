/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const finalResult = document.querySelector('.calculating__result span');
    let sex,
        height,
        weight,
        age,
        active;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !active) {
            finalResult.textContent = '____';
            return;
        }

        if (sex === 'female') {
            finalResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * active);
        } else {
            finalResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * active);
        }
    }
    
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        function  findElem(lets, arr) {
            elements.forEach(item => {
                if (lets == item.getAttribute(arr)) {
                    item.classList.add(activeClass);
                }
            });
        }

        function activeItem() {
            if (JSON.parse(localStorage.getItem('sex'))) {
                sex = JSON.parse(localStorage.getItem('sex'));
                findElem(sex, 'id');
            } else {
                sex = 'female';
                localStorage.setItem('sex', JSON.stringify('female'));
                findElem(sex, 'id');
            }

            if (JSON.parse(localStorage.getItem('active'))) {
                active = JSON.parse(localStorage.getItem('active'));
                findElem(active, 'data-active');
            } else {
                active = 1.375;
                localStorage.setItem('active', JSON.stringify(1.375));
                findElem(active, 'data-active');
            }
        }
        activeItem();

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-active')) {
                    localStorage.setItem('active', JSON.stringify(+e.target.getAttribute('data-active')));
                    active = +e.target.getAttribute('data-active');
                } else {
                    localStorage.setItem('sex', JSON.stringify(e.target.getAttribute('id')));
                    sex = e.target.getAttribute('id');
                }
    
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    function getInformation(selector) {
        const input = document.querySelector(selector);
        
        input.addEventListener('input', () => {         
            if (input.value.match(/\D/ig)) {
                const errorDiv = document.createElement('div');
                document.querySelector('.calculating__choose_medium').after(errorDiv);
                errorDiv.textContent = 'Вводите только цифры';
                errorDiv.style.cssText = `
                margin: 3px auto 0px;
                color: red;
                `;
                errorDiv.classList.add('calculating__subtitle', 'calculating__subtitle-error');
                input.style.border = 'solid 2px red';
                const shit = document.querySelectorAll('.calculating__subtitle-error');
                if (shit[1]) {
                    document.querySelector('.calculating__subtitle-error').remove();
                }
            } else {
                if (document.querySelector('.calculating__subtitle-error')) {
                    document.querySelector('.calculating__subtitle-error').remove();
                }
                input.style.border = 'none';
            }

                switch(input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
            calcTotal();
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    getInformation('#height');
    getInformation('#weight');
    getInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");



function forms(formSelector, modalTimer) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Дякую! Скоро ми з вами звяжемся',
        error: 'Ойой щось пішло не так...'
    };

    forms.forEach(item => bindPostData(item));

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `display: block; margin: 0 auto;`;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThankModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThankModal(message.error);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThankModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hide)(modalDialog);
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalShow)('.modal', modalTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.show)(modalDialog);
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/menu-cards.js":
/*!**************************************!*\
  !*** ./src/js/modules/menu-cards.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function menuCards() {
    class MenuItem {
        constructor(img, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = +this.price * this.transfer;
        }

        createMenu() {
            let div = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                div.classList.add(this.classes);
            } else {
                this.classes.forEach(classes => div.classList.add(classes));
            }

            this.parent.append(div);
            div.innerHTML = `
                    <img src="${this.img}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getCardData)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuItem(img, altimg, title, descr, price, '.menu .container').createMenu();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuCards);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "show": () => (/* binding */ show),
/* harmony export */   "modalClose": () => (/* binding */ modalClose),
/* harmony export */   "modalShow": () => (/* binding */ modalShow)
/* harmony export */ });
function hide(item) {
    item.style.display = 'none';
}
function show(item) {
    item.style.display = 'block';
}
function modalClose(modalSelector) {
    const modal = document.querySelector(modalSelector);
    hide(modal);
    document.body.style.overflow = '';
}
function modalShow(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    show(modal);
    document.body.style.overflow = 'hidden';
    console.log(modalTimer);
    if (modalTimer) {
        clearTimeout(modalTimer);
    }
}

function modal(triggerSelector, modalSelector, modalTimer) {
    const modalOpenBtn = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    function modalWindow(modal, open) {
        open.forEach(item => {
            item.addEventListener('click', () => modalShow(modalSelector, modalTimer));
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.getAttribute('data-close') == '') {
                hide(modal);
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                modalClose(modalSelector);
            }
        });

        function modalShowByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                modalShow(modalSelector, modalTimer);
                window.removeEventListener('scroll', modalShowByScroll);
            }
        }
        window.addEventListener('scroll', modalShowByScroll);
    }
    modalWindow(modal, modalOpenBtn);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
          currentNum = document.querySelector(currentCounter),
          totalNum = document.querySelector(totalCounter),
          btnPrev = document.querySelector(prevArrow),
          btnNext = document.querySelector(nextArrow),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          slider = document.querySelector(container),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndx = 1,
        offset = 0;

    function noNumReplace(str) {
        return +str.replace(/\D/g, '');
    }

    function curNum(num, index) {
        if (slides.length < 10) {
            num.textContent = `0${index}`;
        } else {
            num.textContent = index;
        }
    }

    function arrIndicator(ind) {
        ind.forEach(item => item.style.opacity = '.5');
        ind[slideIndx - 1].style.opacity = '1';
    }

    function transformToOffset(sldFields) {
        sldFields.style.transform = `translateX(-${offset}px)`;
    }

    if (slides.length < 10) {
        totalNum.textContent = `0${slides.length}`;
        currentNum.textContent = `0${slideIndx}`;
    } else {
        totalNum.textContent = slides.length;
        currentNum.textContent = slideIndx;
    }

    slider.style.position = 'relative';
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.7s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width;
    });

    const dots = document.createElement('ol'),
          indicators = [];
    dots.classList.add('carousel-indicators');
    dots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = '1';
        }
        dots.append(dot);
        indicators.push(dot);
    }

    btnNext.addEventListener('click', () => {
        if (offset == noNumReplace(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += noNumReplace(width);
        }
        transformToOffset(slidesField);

        if(slideIndx == slides.length) {
            slideIndx = 1;
        } else {
            slideIndx++;
        }

        curNum(currentNum, slideIndx);

        arrIndicator(indicators);
    });

    btnPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = noNumReplace(width) * (slides.length - 1);
        } else {
            offset -= noNumReplace(width);
        }
        transformToOffset(slidesField);

        if(slideIndx == 1) {
            slideIndx = slides.length;
        } else {
            slideIndx--;
        }

        curNum(currentNum, slideIndx);

        arrIndicator(indicators);
    });

    indicators.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndx = slideTo;
            offset = noNumReplace(width) * (slideTo - 1);
            transformToOffset(slidesField);

            curNum(currentNum, slideIndx);

            arrIndicator(indicators);
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabContentSelector, tabParentSelector, tabsSelector, activeClass) {
    const tabContent = document.querySelectorAll(tabContentSelector),
          tabParent = document.querySelector(tabParentSelector),
          tabs = document.querySelectorAll(tabsSelector);

    tabs.forEach(item => {
        item.style.transition = '0.5s all';
    });

    function hideTabContent() {
        tabContent.forEach(item => {
            item.style.display = 'none';
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    function showTabContent(i = 0) {
        tabContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    function timeRemaining() {
        const t = Date.parse(deadline) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 *60 *24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTime(selector, endTime) {
        const timer = document.querySelector(selector);
        let days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTime, 1000);

        updateTime();

        function updateTime() {
            const t = timeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.t <= 0) {
                clearTimeout(timeInterval);
            }
        }

    }

    setTime(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getCardData": () => (/* binding */ getCardData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json; charset=utf-8'
        },
        body: data
    });
    return await res.json();
};

const getCardData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`could not fetch ${url}, error: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_menu_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menu-cards */ "./src/js/modules/menu-cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.modalShow)('.modal',modalTimer), 500000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)('.timer', '2021-9-20');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('[data-modal]', '.modal', modalTimer);
    (0,_modules_menu_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalTimer);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map