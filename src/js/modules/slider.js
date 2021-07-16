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

export default slider;