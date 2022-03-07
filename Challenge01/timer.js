export class Timer {
    name = "Funny";
    o_timer_sec = 0;
    minutes = 0;
    seconds = 0;
    caf_stop = false;

    constructor() {
        this._findElements();
        this._configVariables();
        this._bindEvents();
    }

    _findElements() {
        this.start_btn = document.querySelector('.timer button.start.start');
        this.pause_btn = document.querySelector('.timer button.start.pause');
        this.settings_btn = document.querySelector('.timer button.settings');

        this.minutes_elm = document.querySelector('.timer .time .minutes input');
        this.seconds_elm = document.querySelector('.timer .time .seconds input');
    }

    _configVariables() {
        this.minutes = Number(this.minutes_elm?.value ?? 0);
        this.seconds = Number(this.seconds_elm?.value ?? 0);
    }

    _bindEvents() {
        this.start_btn.addEventListener('click', this.clickStart);
        this.pause_btn.addEventListener('click', this.clickPause);
    }

    _setTimer(seconds) {
        this.minutes = Math.floor(seconds / 60);
        this.seconds = seconds % 60;
    }

    _updateTimer() {
        this.minutes_elm.value = this.minutes;
        this.seconds_elm.value = this.seconds;
    }

    setTimer(seconds) {
        this._setTimer(seconds);
        this._updateTimer();
    }

    hi() {
        console.log(`Hi there, ${this.name}!`);
        console.log(`Timer value is ${this.minutes}:${this.seconds}.`);
    }

    _toggleButtons() {
        this.start_btn.classList.toggle("hide");
        this.pause_btn.classList.toggle("hide");
    }

    clickStart = e => {
        this._startTimer();
        this._toggleButtons();
    }

    clickPause = e => {
        this._stopTimer();
        this._toggleButtons();
    }

    _startTimer() {
        this.o_timer_sec = this.minutes * 60 + this.seconds;
        this._start_time = performance.now();
        this.caf_stop = false;
        requestAnimationFrame(this._cafTimer);
    }

    _cafTimer = t => {
        let elapsed = Math.floor(Math.abs(t - this._start_time) / 1000);

        this.setTimer(this.o_timer_sec - elapsed);

        if (! this.caf_stop && elapsed <= this.o_timer_sec) {
            requestAnimationFrame(this._cafTimer);
        } else {
        }
    }
    
    _stopTimer() {
        this.caf_stop = true;
    }
}
