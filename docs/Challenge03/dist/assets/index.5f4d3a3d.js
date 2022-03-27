var u = Object.defineProperty;
var d = (t, e, o) =>
  e in t
    ? u(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o })
    : (t[e] = o);
var l = (t, e, o) => (d(t, typeof e != "symbol" ? e + "" : e, o), o);
const y = function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r);
  new MutationObserver((r) => {
    for (const s of r)
      if (s.type === "childList")
        for (const i of s.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(r) {
    const s = {};
    return (
      r.integrity && (s.integrity = r.integrity),
      r.referrerpolicy && (s.referrerPolicy = r.referrerpolicy),
      r.crossorigin === "use-credentials"
        ? (s.credentials = "include")
        : r.crossorigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function n(r) {
    if (r.ep) return;
    r.ep = !0;
    const s = o(r);
    fetch(r.href, s);
  }
};
y();
const a = {};
a.audio_prefix = "./audio/";
function f(t) {
  for (let e = t.length - 1; e > 0; e--) {
    const o = Math.floor(Math.random() * (e + 1));
    [t[e], t[o]] = [t[o], t[e]];
  }
}
class p {
  constructor(e) {
    l(this, "audio_mp3");
    l(this, "player_e", document.createElement("audio"));
    (this.audio_mp3 = a.audio_prefix + e),
      this.player_e.setAttribute("src", this.audio_mp3);
  }
  play() {
    console.log(`Play ${this.audio_mp3}`), this.player_e.play();
  }
}
class h {
  constructor() {
    l(this, "keys", document.querySelectorAll("svg path"));
    l(this, "a_keys", document.querySelectorAll("svg a"));
    l(this, "players", new Array());
    l(this, "play", (e) => {
      this._targetPlayer(e.target.getAttribute("key-no")).play();
    });
    this._createPlayers(), this._bindEvents();
  }
  _createPlayers() {
    for (let e = 1; e <= 23; e++) this.players.push(new p(`key-${e}.mp3`));
    f(this.players);
  }
  _bindEvents() {
    let e = 0;
    for (let o of this.keys)
      o.setAttribute("key-no", e++), o.addEventListener("click", this.play);
  }
  _targetPlayer(e) {
    return this.players.at(e);
  }
}
new h();
const c = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
c.sort((t, e) => 0.5 - Math.random());
console.log(c);
