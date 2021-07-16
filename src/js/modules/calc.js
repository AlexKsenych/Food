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

export default calc;