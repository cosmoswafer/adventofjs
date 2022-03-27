var u = Object.defineProperty;
var l = (r, t, i) =>
  t in r
    ? u(r, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
    : (r[t] = i);
var n = (r, t, i) => (l(r, typeof t != "symbol" ? t + "" : t, i), i);
const a = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) o(e);
  new MutationObserver((e) => {
    for (const s of e)
      if (s.type === "childList")
        for (const c of s.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && o(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(e) {
    const s = {};
    return (
      e.integrity && (s.integrity = e.integrity),
      e.referrerpolicy && (s.referrerPolicy = e.referrerpolicy),
      e.crossorigin === "use-credentials"
        ? (s.credentials = "include")
        : e.crossorigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function o(e) {
    if (e.ep) return;
    e.ep = !0;
    const s = i(e);
    fetch(e.href, s);
  }
};
a();
class h {
  constructor() {
    n(this, "name", "Funny");
    n(this, "o_timer_sec", 0);
    n(this, "minutes", 0);
    n(this, "seconds", 0);
    n(this, "caf_stop", !1);
    n(this, "clickStart", (t) => {
      this._startTimer(), this._toggleButtons(), this._greenRing();
    });
    n(this, "clickPause", (t) => {
      this._stopTimer(), this._toggleButtons();
    });
    n(this, "_cafTimer", (t) => {
      const i = Math.floor((this._end_time - t) / 1e3);
      this.setTimer(i),
        !this.caf_stop && i > 0
          ? requestAnimationFrame(this._cafTimer)
          : this.caf_stop || this._endTimer();
    });
    n(this, "editTimer", (t) => {
      this._configVariables(),
        this.minutes_inp.toggleAttribute("disabled"),
        this.seconds_inp.toggleAttribute("disabled"),
        this.start_btn.toggleAttribute("disabled"),
        this.settings_gear.classList.toggle("hide"),
        this.settings_check.classList.toggle("hide");
    });
    this._findElements(),
      this._configVariables(),
      this._bindEvents(),
      this._requestPermission();
  }
  async _requestPermission() {
    await Notification.requestPermission();
  }
  _findElements() {
    (this.start_btn = document.querySelector(".timer button.start")),
      (this.pause_btn = document.querySelector(".timer button.pause")),
      (this.settings_btn = document.querySelector(".timer button.settings")),
      (this.settings_gear = document.querySelector(
        ".timer button.settings .gear"
      )),
      (this.settings_check = document.querySelector(
        ".timer button.settings .check"
      )),
      (this.minutes_inp = document.querySelector(
        ".timer .time .minutes input"
      )),
      (this.seconds_inp = document.querySelector(
        ".timer .time .seconds input"
      )),
      (this.ring_circle = document.querySelector(".ring"));
  }
  _configVariables() {
    var t, i, o, e;
    (this.minutes = Number(
      (i = (t = this.minutes_inp) == null ? void 0 : t.value) != null ? i : 0
    )),
      (this.seconds = Number(
        (e = (o = this.seconds_inp) == null ? void 0 : o.value) != null ? e : 0
      ));
  }
  _bindEvents() {
    this.start_btn.addEventListener("click", this.clickStart),
      this.pause_btn.addEventListener("click", this.clickPause),
      this.settings_btn.addEventListener("click", this.editTimer);
  }
  _setTimer(t) {
    (this.minutes = Math.floor(Number(t) / 60)),
      (this.seconds = Number(t) % 60);
  }
  _updateTimer() {
    (this.minutes_inp.value = this.minutes),
      (this.seconds_inp.value = this.seconds),
      this.minutes < 10 && (this.minutes_inp.value = "0" + this.minutes),
      this.seconds < 10 && (this.seconds_inp.value = "0" + this.seconds);
  }
  setTimer(t) {
    this._setTimer(t), this._updateTimer();
  }
  _toggleButtons() {
    this.start_btn.classList.toggle("hide"),
      this.pause_btn.classList.toggle("hide"),
      this.settings_btn.toggleAttribute("disabled");
  }
  _startTimer() {
    (this._end_time =
      performance.now() + (this.minutes * 60 + this.seconds) * 1e3),
      (this.caf_stop = !1),
      requestAnimationFrame(this._cafTimer);
  }
  _stopTimer() {
    this.caf_stop = !0;
  }
  _endTimer() {
    new Notification("Time's up!"),
      this._endRing(),
      this.setTimer(0),
      this._toggleButtons();
  }
  _endRing() {
    this.ring_circle.classList.add("ending");
  }
  _greenRing() {
    this.ring_circle.classList.remove("ending");
  }
}
new h();
