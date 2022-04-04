import { DOM } from './util/lazydom.js';

class CalendarView {
    today = new Date();

    constructor(parent_element) {
        this.calendar = parent_element.DOM('.calendar');
        console.dir(this.today);
        console.log(this.today.toISOString());

        this.#buildCalendar();
    }

    #buildCalendar() {
        const offset = 2;
        for (let i = 0; i < 7 * 5; i++) {
            const day = this.calendar.DOM();
            const d = i - offset;
            day.element.textContent =
                d > 0 && d <= 31 ? d : '_';
            if (d == this.today.getDate()) day.classList.add('today');
        }
    }
}

class Main {
    app = new DOM('#app');

    constructor() {
        this.calendar = new CalendarView(this.app);
    }
}

const main = new Main();
