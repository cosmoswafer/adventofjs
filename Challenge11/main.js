class Main {
    buttons = document.querySelectorAll('ul.question li');

    constructor() {
        this.buttons.forEach((e) => {e.addEventListener('click', this.clickButton)});
    }

    clickButton = (e) => {
        console.dir(e);
        e.target.classList.toggle('expand');
    }
}

const main = new Main();
