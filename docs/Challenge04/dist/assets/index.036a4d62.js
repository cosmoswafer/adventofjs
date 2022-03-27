var f = Object.defineProperty;
var c = (o, e, s) =>
  e in o
    ? f(o, e, { enumerable: !0, configurable: !0, writable: !0, value: s })
    : (o[e] = s);
var r = (o, e, s) => (c(o, typeof e != "symbol" ? e + "" : e, s), s);
const d = function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) a(t);
  new MutationObserver((t) => {
    for (const i of t)
      if (i.type === "childList")
        for (const l of i.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && a(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(t) {
    const i = {};
    return (
      t.integrity && (i.integrity = t.integrity),
      t.referrerpolicy && (i.referrerPolicy = t.referrerpolicy),
      t.crossorigin === "use-credentials"
        ? (i.credentials = "include")
        : t.crossorigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function a(t) {
    if (t.ep) return;
    t.ep = !0;
    const i = s(t);
    fetch(t.href, i);
  }
};
d();
const n = {};
n.jiggle_offset = 6;
n.frame_rate = 1e3 / 15;
class y {
  constructor() {
    r(this, "key", document.querySelector(".key"));
    r(this, "board", document.querySelectorAll(".key"));
    r(this, "current_key");
    r(this, "start_time", 0);
    r(this, "keyDown", (e) => {
      console.log(`Keydown: ${e.key}`),
        this._isKey(e.key) && this._updateKey(),
        e.preventDefault();
    });
    r(this, "_jiggleRaf", (e) => {
      this.key != null &&
        e - this.start_time > n.frame_rate &&
        ((this.start_time = e), this._drawJiggle()),
        requestAnimationFrame(this._jiggleRaf);
    });
    this._updateKey(),
      this._bindEvents(),
      requestAnimationFrame(this._jiggleRaf);
  }
  _bindEvents() {
    document.addEventListener("keydown", this.keyDown);
  }
  _isKey(e) {
    return this.key.textContent === e || this.key.classList.contains(e);
  }
  _removeEffects(e) {
    e.classList.remove("highlight"), (e.style.margin = "0");
  }
  _updateKey() {
    this._removeEffects(this.key);
    const e = Math.floor(Math.random() * this.board.length);
    console.log(`Random key: ${this.board[e].textContent}`),
      (this.key = this.board[e]),
      this.key.classList.add("highlight");
  }
  _drawJiggle() {
    const e = Math.random() * n.jiggle_offset * 2 - n.jiggle_offset,
      s = Math.random() * n.jiggle_offset - n.jiggle_offset / 2;
    (this.key.style.marginLeft = `${e}px`),
      (this.key.style.marginRight = `${-1 * e}px`),
      (this.key.style.marginTop = `${s}px`),
      (this.key.style.marginBottom = `${-1 * s}px`);
  }
}
new y();
