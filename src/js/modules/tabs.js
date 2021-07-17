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

export default tabs;