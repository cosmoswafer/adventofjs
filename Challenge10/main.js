class Main {
    static fnkeys = ['Shift', 'Enter', 'Control', 'Alt', 'Tab'];

    digiboxes = document.querySelectorAll('ul.authcode li');
    curpos = 0;
    curbox = this.digiboxes[this.curpos];

    constructor() {
        this.#bindEvents();
        this.curbox.focus();
    }

    #bindEvents() {
        document.body.addEventListener('keydown', this.preventKey);
        document.body.addEventListener('keyup', this.enterKey);
        for (let i = 0; i < this.digiboxes.length; i++) {
            const box = this.digiboxes[i];
            box.addEventListener('paste', this.pasteKeys);
            box.addEventListener('click', (e) => {
                this.#advenceBox(i);
            });
        }
    }

    #updateCode(digit) {
        this.curbox.textContent = digit;
        this.#advenceBox();
    }

    preventKey = (e) => {
        if (!Main.fnkeys.includes(e.key)) this.curbox.textContent = '';
        if (e.key === 'Enter') e.preventDefault(); //Or submit the code in real application
    };

    enterKey = (e) => {
        const odigit =
            this.curbox.textContent.length > 0
                ? this.curbox.textContent[0]
                : '';
        const digit = Number(e.key);
        digit >= 0 && digit <= 9
            ? this.#updateCode(digit)
            : (this.curbox.textContent = odigit);
    };

    #advenceBox(position = -1) {
        this.curpos =
            position === -1
                ? (this.curpos + 1) % this.digiboxes.length
                : (this.curpos = position);
        this.curbox = this.digiboxes[this.curpos];
        this.curbox.focus();
    }

    pasteKeys = (e) => {
        const digits = e.clipboardData.getData('text').match(/^\d+/);
        if (digits)
            digits[0].split('').forEach((i) => {
                this.#updateCode(i);
            });
        e.preventDefault();
        e.stopPropagation();
    };
}

const main = new Main();
