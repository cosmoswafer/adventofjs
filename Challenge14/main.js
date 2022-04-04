import { DOM } from './util/lazydom.js';

class CalendarView {
    today = new Date();
    calendar_month = this.today.getMonth() + 1; //Convert to [1,12]
    calendar_year = this.today.getFullYear();

    calrows = 6;
    calcols = 7;
    calcels = this.calrows * this.calcols;
    day_cells = [];

    constructor(parent_element) {
        console.log(`Today is ${this.today.toISOString()}`);
        this.calendar = parent_element.DOM('.calendar');
        this.left_btn = this.calendar.q('img.left.btn');
        this.right_btn = this.calendar.q('img.right.btn');

        this.buildCalendar();
        this.bindEvents();
        this.drawCalendar();
    }

    bindEvents() {
        this.left_btn.addEventListener('click', (e) => this.flipCalendar(-1));
        this.right_btn.addEventListener('click', (e) => this.flipCalendar(+1));
    }

    flipCalendar(step) {
        this.calendar_month += step;
        if (this.calendar_month <= 0) {
            this.calendar_year -= 1;
            this.calendar_month = 12;
        } else if (this.calendar_month > 12) {
            this.calendar_year += 1;
            this.calendar_month = 1;
        }

        this.drawCalendar();
    }

    buildCalendar() {
        for (let i = 0; i < this.calcels; i++) {
            const day = this.calendar.DOM();
            day.element.textContent = '99';
            this.day_cells.push(day);
        }
    }

    drawCalendar() {
        const first_day = new Date(
            `${this.calendar_year}-${this.calendar_month
                .toString()
                .padStart(2, '0')}-01`
        );
        console.log(first_day.toISOString());
        const offset = first_day.getDay();
        console.log(`First day offset: ${offset}`);
        for (let i = 0; i < this.day_cells.length; i++) {
            const day = this.day_cells[i];
            const d = i + 1 - offset;
            day.element.textContent = d >= 1 && d <= 31 ? d : ' ';
            day.classList.remove('today');
            if (
                this.calendar_year == this.today.getFullYear() &&
                this.calendar_month == this.today.getMonth() + 1 &&
                d == this.today.getDate()
            )
                day.classList.add('today');
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
