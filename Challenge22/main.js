import { DOM } from './lib/lazydom/dom.js';

class App {
    cardCover = new DOM('#app .credit-card-cover');
    cardNumberInput = document.querySelector('#card-number');
    cardHolderInput = document.querySelector('#card-holder');
    cardExpirationMonthSelect = new DOM('#expiration-month');
    cardExpirationYearSelect = new DOM('#expiration-year');
    cvvInput = document.querySelector('#card-cvv');

    constructor() {
        this.#inputEvents();
        this.#flipCardEvents();
        this.#fillDateOptions();
    }

    #inputEvents() {
        this.cardNumberInput.addEventListener('change', (e) =>
            this.changeCard(e.target.value)
        );
        this.cardHolderInput.addEventListener('change', (e) =>
            this.cardCover.dot(
                ['.front .holder .shadow', e.target.value],
                ['.front .holder .emboss', e.target.value],
                ['.back .signature', e.target.value]
            )
        );
        this.cardExpirationMonthSelect.element.addEventListener('change', () =>
            this.setCardExpiration()
        );
        this.cardExpirationYearSelect.element.addEventListener('change', () =>
            this.setCardExpiration()
        );
        this.cvvInput.addEventListener('input', (e) =>
            this.cardCover.dot(['.back .cvv', e.target.value])
        );
    }

    #flipCardEvents() {
        this.cvvInput.addEventListener('focusin', () =>
            this.cardCover.classList.add('flip')
        );
        this.cvvInput.addEventListener('focusout', () =>
            this.cardCover.classList.remove('flip')
        );
    }

    #fillDateOptions() {
        this.#fillMonthOptions();
        this.#fillYearOptions(new Date().getFullYear());
    }

    #fillMonthOptions() {
        const monthTemplate = this.cardExpirationMonthSelect.DOM();
        monthTemplate.element.value = '';
        monthTemplate.element.textContent = 'Month';
        for (let i = 1; i <= 12; i++) {
            const monthOption = this.cardExpirationMonthSelect.DOM();
            monthOption.element.value = i.toString().padStart(2, '0');
            monthOption.element.textContent = i.toString().padStart(2, '0');
        }
    }

    #fillYearOptions(currentYear) {
        const yearTemplate = this.cardExpirationYearSelect.DOM();
        yearTemplate.element.value = '';
        yearTemplate.element.textContent = 'Year';
        for (let i = currentYear; i < currentYear + 10; i++) {
            const yearOption = this.cardExpirationYearSelect.DOM();
            yearOption.element.value = i;
            yearOption.element.textContent = i;
        }
    }

    changeCard(cardNmberStr) {
        this.changeCardCover(cardNmberStr);
        this.setCardNumber(cardNmberStr);
    }

    changeCardCover(numberStr) {
        const cardType = numberStr.slice(0,1);
        this.cardCover.classList.value = 'credit-card-cover';
        if (cardType === '3') 
            this.cardCover.classList.add('american');
        else if (cardType === '4')
            this.cardCover.classList.add('visa');
        else if (cardType === '5')
            this.cardCover.classList.add('mastercard');
        else if (cardType === '6')
            this.cardCover.classList.add('discover');
    }

    setCardNumber(numberStr) {
        const nInt = Math.floor(Number(numberStr));
        const nStr = nInt.toString();
        if (nStr.length === 16) {
            const newCardNumber = `${nStr.slice(0, 4)} ${nStr.slice(
                4,
                8
            )} ${nStr.slice(8, 12)} ${nStr.slice(12, 16)}`;
            this.cardCover.dot(
                ['.front .card-number .emboss', newCardNumber],
                ['.front .card-number .shadow', newCardNumber]
            );
        }
    }

    setCardExpiration() {
        const month = this.cardExpirationMonthSelect.element.value;
        const year = this.cardExpirationYearSelect.element.value;

        if (month != '' && year != '') {
            console.log(`${month}/${year}`);
            const dateStr = `${month}/${year}`;
            this.cardCover.dot(
                ['.front .expiration-date .emboss', dateStr],
                ['.front .expiration-date .shadow', dateStr]
            );
        } else {
            console.log('Fuck not date');
        }
    }
}

const app = new App();
