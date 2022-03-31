class Main {
    buttons = document.querySelectorAll('ul.question li');

    constructor() {
        this.buttons.forEach((btn) => {
            btn.addEventListener('click', this.clickButton);
        });
    }

    clickButton = (e) => {
        e.currentTarget.classList.toggle('expand');
    };
}

const main = new Main();
