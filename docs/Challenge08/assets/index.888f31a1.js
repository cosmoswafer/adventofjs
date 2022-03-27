var p = Object.defineProperty;
var m = (r, e, t) =>
  e in r
    ? p(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
    : (r[e] = t);
var s = (r, e, t) => (m(r, typeof e != "symbol" ? e + "" : e, t), t);
const y = function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) o(i);
  new MutationObserver((i) => {
    for (const n of i)
      if (n.type === "childList")
        for (const h of n.addedNodes)
          h.tagName === "LINK" && h.rel === "modulepreload" && o(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const n = {};
    return (
      i.integrity && (n.integrity = i.integrity),
      i.referrerpolicy && (n.referrerPolicy = i.referrerpolicy),
      i.crossorigin === "use-credentials"
        ? (n.credentials = "include")
        : i.crossorigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function o(i) {
    if (i.ep) return;
    i.ep = !0;
    const n = t(i);
    fetch(i.href, n);
  }
};
y();
const w = new URL(document.location).searchParams,
  u = w.get("key"),
  f = { 0: "SUN", 1: "MON", 2: "TUE", 3: "WED", 4: "THU", 5: "FRI", 6: "SAT" },
  g = {
    cloudy: { width: 264, height: 166 },
    sunny: { width: 208, height: 213 },
    stormy: { width: 246, height: 187 },
    snowy: { width: 230, height: 196 },
    "partly-cloudy": { width: 230, height: 209 },
    rainy: { width: 160, height: 222 },
  },
  a = class {
    constructor(e) {
      this.name = e;
    }
    static mapName(e) {
      var t, o;
      return (o = (t = a.owm_map[e]) == null ? void 0 : t.name) != null
        ? o
        : a.Cloudy.name;
    }
  };
let l = a;
s(l, "Cloudy", new a("cloudy")),
  s(l, "Sunny", new a("sunny")),
  s(l, "Stormy", new a("stormy")),
  s(l, "Snowy", new a("snowy")),
  s(l, "PartlyCloudy", new a("partly-cloudy")),
  s(l, "Rainy", new a("rainy")),
  s(l, "owm_map", {
    Drizzle: a.Cloudy,
    Clear: a.Sunny,
    Thunderstorm: a.Stormy,
    Snow: a.Snowy,
    Clouds: a.PartlyCloudy,
    Rain: a.Rainy,
  });
class _ {
  constructor() {
    s(this, "latitude");
    s(this, "longitude");
  }
  getCoordinates() {
    return new Promise(function (e, t) {
      navigator.geolocation.getCurrentPosition(e, t);
    });
  }
  async getAddress() {
    const e = await this.getCoordinates();
    return (
      (this.latitude = e.coords.latitude),
      (this.longitude = e.coords.longitude),
      this
    );
  }
}
class S {
  constructor(e) {
    s(this, "element", null);
    s(this, "style", null);
    s(this, "classList", null);
    const t = document.querySelector(e);
    (this.element = t.cloneNode(!0)), this._styleShorthand(), this._cleanUp();
  }
  _styleShorthand() {
    (this.style = this.element.style),
      (this.classList = this.element.classList);
  }
  _cleanUp() {
    this.classList.remove("template"), (this.style.display = "");
  }
  q(e) {
    return this.element.querySelector(e);
  }
  _setTextContent(e, t) {
    const o = this.element.querySelector(e);
    o != null && (o.textContent = t);
  }
  dotText(e) {
    for (let t of e) this._setTextContent(...t.slice(0, 2));
  }
}
const d = class {
  constructor() {
    s(this, "dom_element", document.querySelector("#app ol"));
    s(this, "forecasts", new Array());
    this.dom_element.classList.add("forecasts");
  }
  async downloadData() {
    await this._fetchData();
  }
  async _getLocation() {
    const e = new _();
    return await e.getAddress(), e;
  }
  _owmUrl(e) {
    const t = new URL(d.owm_api);
    return (
      t.searchParams.set("lat", e.latitude),
      t.searchParams.set("lon", e.longitude),
      t.searchParams.set("cnt", d.days),
      t.searchParams.set("appid", u),
      t.searchParams.set("units", "metric"),
      t
    );
  }
  async _fetchData() {
    const e = await this._getLocation(),
      t = u ? this._owmUrl(e) : d.data_json,
      o = await fetch(t);
    if (o.ok) {
      const i = await o.json();
      this._parseWeather(i);
    } else console.log("HTTP-Error: " + o.status);
  }
  _parseWeather(e) {
    const t = e.daily;
    for (let o of t) this.forecasts.push(new L(o));
  }
  _refreshDom() {
    this.dom_element.textContent = "";
  }
  render() {
    for (let e of this.forecasts) this.dom_element.append(e.render());
    return this.dom_element;
  }
};
let c = d;
s(c, "days", 7),
  s(c, "owm_api", "https://api.openweathermap.org/data/2.5/onecall"),
  s(c, "data_json", "onecall.json");
class L {
  constructor(e) {
    s(this, "node", new S("#app ol li.template"));
    s(this, "date");
    s(this, "weather");
    s(this, "tempeature");
    s(this, "precipitation");
    s(this, "tempeature_feel");
    (this.date = new Date(e.dt * 1e3)),
      (this.weather = e.weather[0].main),
      (this.tempeature = e.temp.day),
      (this.precipitation = e.pop * 100),
      (this.tempeature_feel = e.feels_like.day);
  }
  _applyIcon(e, t) {
    var i;
    const o = (i = g[t]) != null ? i : !1;
    !o ||
      (e.setAttribute("viewBox", `0 0 ${o.width} ${o.height}`),
      e.setAttribute("width", o.width),
      e.setAttribute("height", o.height),
      e.querySelector("use").setAttribute("href", `#${t}-svg`));
  }
  render() {
    const e = l.mapName(this.weather);
    return (
      this.node.q(".weather").classList.add(e),
      this._applyIcon(this.node.q("svg.icon"), e),
      this.node.dotText([
        [".week", f[this.date.getDay()]],
        [".date", this.date.getDate()],
        [".tempeature p", this.tempeature.toFixed(0)],
        [".precipitation span", this.precipitation.toFixed(0) + "%"],
        [".temp-feel span", this.tempeature_feel.toFixed(0) + "\xB0"],
      ]),
      this.node.element
    );
  }
}
class P {
  constructor() {
    s(this, "app_div", document.querySelector("#app"));
    s(this, "weather", new c());
    this._hideTemplates(), this.render();
  }
  _hideTemplates() {
    const e = document.querySelectorAll(".template");
    for (let t of e) t.style.display = "none";
  }
  async render() {
    await this.weather.downloadData(),
      this.app_div.append(this.weather.render());
  }
}
new P();
