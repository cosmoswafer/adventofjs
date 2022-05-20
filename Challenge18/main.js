class PwdGenerator {
    static symbols = `!@#$%^&*()_+-=[]{};':",./<>?`; //Excluded ` and ~
    static numbers = '0123456789';
    static lowercase = 'abcdefghijklmnopqrstuvwxyz';
    static uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    static newPwd(options) {
        const poolBase =
            `${options?.symbols ? this.symbols : ''}` +
            `${options?.numbers ? this.numbers : ''}` +
            `${options?.lowercase ? this.lowercase : ''}` +
            `${options?.uppercase ? this.uppercase : ''}`;

        const pool = options?.similar
            ? poolBase.replace(/[il1Lo0O]/g, '')
            : poolBase;

        console.log('Password pool>>>', pool);

        let np = '';
        for (let i = 0; i < options.length && pool.length > 0; i++) {
            const r = Math.floor(Math.random() * pool.length);
            np += pool[r];
        }
        return np;
    }
}

class App {
    passwdBox = document.querySelector('#app .passwd');
    passwdTxt = document.querySelector('#app .passwd .text');
    copyBtn = document.querySelector('#app .passwd .btn');
    pwdOptions = [
        {
            name: 'symbols',
            element: document.querySelector('#app input[name="symbols"]'),
        },
        {
            name: 'numbers',
            element: document.querySelector('#app input[name="numbers"]'),
        },
        {
            name: 'lowercase',
            element: document.querySelector('#app input[name="lowercase"]'),
        },
        {
            name: 'uppercase',
            element: document.querySelector('#app input[name="uppercase"]'),
        },
        {
            name: 'similar',
            element: document.querySelector('#app input[name="similar"]'),
        },
    ];

    lengthRange = document.querySelector('#app .ranger input[name="length"]');
    lengthText = document.querySelector('#app .ranger p > .value');

    options = {
        length: 12,
        symbols: false,
        numbers: true,
        lowercase: false,
        uppercase: false,
        similar: false,
    };

    constructor() {
        this.bindEvents();
        this.resetPage();

        this.passwdTxt.textContent = this.generateNewPwd();
        //Generate the initial password
    }

    resetPage() {
        this.passwdBox.classList.contains('copied') &&
            this.passwdBox.classList.remove('copied');
    }

    bindEvents() {
        this.copyBtn.addEventListener('click', this.copyPwd);
        this.lengthRange.addEventListener('input', this.changeRange);
        this.pwdOptions.forEach((e) =>
            e.element.addEventListener('change', this.changeOptions)
        );
    }

    copyPwd = (e) => {
        navigator.clipboard.writeText(this.passwdTxt.textContent);
        this.showCopyTxt();
    };

    showCopyTxt() {
        this.passwdBox.classList.add('copied');
    }

    changeRange = (e) => {
        this.updateLengthText();
        this.resetPage();
        this.passwdTxt.textContent = this.generateNewPwd();
    };

    updateLengthText() {
        const pwdLength = this.lengthRange.value;
        this.lengthText.textContent = pwdLength;
        this.options.length = pwdLength;
    }

    changeOptions = (e) => {
        this.readOptions();
        this.resetPage();
        this.passwdTxt.textContent = this.generateNewPwd();
    };

    readOptions() {
        for (const i of this.pwdOptions) {
            this.options[i.name] = i.element.checked;
        }
    }

    generateNewPwd() {
        return PwdGenerator.newPwd(this.options);
    }
}

const a = new App();
