class Main {
    buttons = document.querySelectorAll('ul.question li');

    constructor() {
        this.buttons.forEach((btn) => {
            btn.addEventListener('click', this.clickButton);
        });
    }

    clickButton = (e) => {
        const t = e.currentTarget;
        const f = e.currentTarget.querySelector('.fulltext');
        t.classList.toggle('expand');
        (t.classList.contains('expand')) ? f.style.maxHeight = `${f.scrollHeight}px` : f.style.maxHeight = '0px';
    };
}

const main = new Main();
