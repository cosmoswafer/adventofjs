import { conf } from "./settings.js";

export class Keyboard {
  key = document.querySelector(".key");
  board = document.querySelectorAll(".key");
  current_key;
  start_time = 0;

  constructor() {
    this._updateKey();
    this._bindEvents();

    requestAnimationFrame(this._jiggleRaf);
  }

  _bindEvents() {
    document.addEventListener("keydown", this.keyDown);
  }

  _isKey(k) {
    return this.key.textContent === k || this.key.classList.contains(k);
  }

  _removeEffects(key) {
    key.classList.remove("highlight");
    key.style.margin = "0";
  }

  _updateKey() {
    this._removeEffects(this.key);

    const index = Math.floor(Math.random() * this.board.length);
    console.log(`Random key: ${this.board[index].textContent}`);
    this.key = this.board[index];
    this.key.classList.add("highlight");
  }

  keyDown = (e) => {
    console.log(`Keydown: ${e.key}`);
    if (this._isKey(e.key)) {
      this._updateKey();
    }
    e.preventDefault();
  };

  _drawJiggle() {
    const offset_x =
      Math.random() * conf.jiggle_offset * 2 - conf.jiggle_offset;
    const offset_y =
      Math.random() * conf.jiggle_offset - conf.jiggle_offset / 2;
    this.key.style.marginLeft = `${offset_x}px`;
    this.key.style.marginRight = `${-1 * offset_x}px`;
    this.key.style.marginTop = `${offset_y}px`;
    this.key.style.marginBottom = `${-1 * offset_y}px`;
  }

  _jiggleRaf = (t) => {
    if (this.key != null && t - this.start_time > conf.frame_rate) {
      this.start_time = t;
      this._drawJiggle();
    }

    requestAnimationFrame(this._jiggleRaf);
  };
}
