import { DOM } from './lib/lazydom/dom.js';

class CalendarView {
    static month_names = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    today = new Date();
    calendar_date = new Date();

    calrows = 6;
    calcols = 7;
    cal_size = this.calrows * this.calcols;
    cal_cells = [];

    constructor(parent_element) {
        this.calendar = parent_element.DOM('.calendar');
        this.month_title = parent_element.DOM('.month');
        this.left_btn = this.calendar.q('img.left.btn');
        this.right_btn = this.calendar.q('img.right.btn');

        this.calendar_date.setDate(1);

        this.buildCalendar();
        this.bindEvents();
        this.drawCalendar();
    }

    bindEvents() {
        this.left_btn.addEventListener('click', (e) => this.flipCalendar(-1));
        this.right_btn.addEventListener('click', (e) => this.flipCalendar(+1));
    }

    flipCalendar(step) {
        this.calendar_date.setMonth(this.calendar_date.getMonth() + step);
        this.drawCalendar();
    }

    buildCalendar() {
        for (let i = 0; i < this.cal_size; i++) {
            const day = this.calendar.DOM();
            day.element.textContent = '99';
            this.cal_cells.push(day);
        }
    }

    drawCalendar() {
        this.changeCalTitle();
        const last_day = this.lastCalendarDay();
        const offset = this.calendar_date.getDay();

        for (let i = 0; i < this.cal_cells.length; i++) {
            const cell = this.cal_cells[i];
            const d = i + 1 - offset;
            cell.element.textContent = d >= 1 && d <= last_day ? d : ' ';
            cell.classList.remove('today');
            if (this.isCalToday(d)) cell.classList.add('today');
        }
    }

    changeCalTitle() {
        this.calendar.text(
            '.month',
            `${this.calendarMonthName()} ${this.calendar_date.getFullYear()}`
        );
    }

    isCalToday(d) {
        return this.calendar_date.getFullYear() == this.today.getFullYear() &&
               this.calendar_date.getMonth() == this.today.getMonth() &&
               d == this.today.getDate();
    }

    calendarMonthName() {
        return CalendarView.month_names[this.calendar_date.getMonth()];
    }

    lastCalendarDay() {
        return new Date(
            this.calendar_date.getFullYear(),
            this.calendar_date.getMonth() + 1,
            0
        ).getDate();
    }
    
    
}

class Main {
    app = new DOM('#app');

    constructor() {
        this.calendar = new CalendarView(this.app);
    }
}

const main = new Main();
