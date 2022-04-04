import { DOM } from './util/lazydom.js';

class ModalDiv {
    #display_value = '';

    constructor(parent_element) {
        this.modal = parent_element.DOM('.modal');
        this.#display_value = this.modal.style.display;

        this.modal.q('img.close').addEventListener('click', (e) => this.toggle());
    }

    toggle() {
        const invisible_code = 'none';
        const hiddenness = this.modal.style.display === invisible_code;
        this.modal.style.display = hiddenness
            ? this.#display_value
            : invisible_code;
    }
}

class Main {
    app = new DOM('#app');
    modal = new ModalDiv(this.app);

    constructor() {
        this.modal.toggle();
        this.app.q('svg > circle').addEventListener('click', (e) => this.modal.toggle());
    }
}

const main = new Main();
