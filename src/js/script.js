import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import menuCards from './modules/menu-cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import {modalShow} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(() => modalShow('.modal',modalTimer), 500000);

    tabs('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    timer('.timer', '2021-9-20');
    modal('[data-modal]', '.modal', modalTimer);
    menuCards();
    forms('form', modalTimer);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        slide: '.offer__slide',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
});