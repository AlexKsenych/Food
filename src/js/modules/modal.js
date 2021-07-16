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

export default modal;
export {hide,show,modalClose,modalShow};