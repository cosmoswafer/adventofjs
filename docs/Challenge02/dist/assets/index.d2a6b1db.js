var d = Object.defineProperty;
var _ = (r, t, i) =>
  t in r
    ? d(r, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
    : (r[t] = i);
var e = (r, t, i) => (_(r, typeof t != "symbol" ? t + "" : t, i), i);
const h = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) s(a);
  new MutationObserver((a) => {
    for (const n of a)
      if (n.type === "childList")
        for (const o of n.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(a) {
    const n = {};
    return (
      a.integrity && (n.integrity = a.integrity),
      a.referrerpolicy && (n.referrerPolicy = a.referrerpolicy),
      a.crossorigin === "use-credentials"
        ? (n.credentials = "include")
        : a.crossorigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function s(a) {
    if (a.ep) return;
    a.ep = !0;
    const n = i(a);
    fetch(a.href, n);
  }
};
h();
const l = {};
l.image_prefix = "images/";
class p {
  constructor(t, i, s, a, n, o, m, u) {
    e(this, "index");
    e(this, "name");
    e(this, "price");
    e(this, "image");
    e(this, "alt");
    e(this, "count");
    e(this, "menu_item_li");
    e(this, "name_p");
    e(this, "price_p");
    e(this, "image_img");
    e(this, "add_btn");
    e(this, "in_cart_btn");
    e(this, "notifyCart");
    e(this, "add2Cart", (t) => {
      this.notifyCart(this.index), this._hideAddBtn();
    });
    (this.menu_item_li = t),
      (this.index = i),
      (this.name = s),
      (this.price = a),
      (this.image = n),
      (this.alt = o),
      (this.count = m),
      (this.notifyCart = u),
      this._findElements(this.menu_item_li),
      this._bindEvents();
  }
  _findElements(t) {
    (this.name_p = t.querySelector(".content p.menu-item")),
      (this.price_p = t.querySelector(".content p.price")),
      (this.image_img = t.querySelector(".plate img.plate")),
      (this.add_btn = t.querySelector(".content button.add")),
      (this.in_cart_btn = t.querySelector(".content button.in-cart")),
      (this.name_p.textContent = this.name),
      (this.price_p.textContent = this.price),
      this.image_img.setAttribute("src", l.image_prefix + this.image),
      this.image_img.setAttribute("alt", this.alt);
  }
  _bindEvents() {
    this.add_btn.addEventListener("click", this.add2Cart),
      this.in_cart_btn.addEventListener("click", this.add2Cart);
  }
  _hideAddBtn() {
    (this.add_btn.style.display = "none"),
      (this.in_cart_btn.style.display = "");
  }
}
class y {
  constructor(t) {
    e(this, "menu_ul", document.querySelector(".panel.menu ul.menu"));
    e(this, "item_template", this.menu_ul.querySelector("li.template"));
    e(this, "cart");
    e(this, "items", new Array());
    e(this, "notify", (t) => {
      this.cart.addFromStorage(t);
    });
    this.cart = t;
  }
  _newItem() {
    let t = this.item_template.cloneNode(!0);
    return (
      t.classList.remove("template"),
      (t.style.display = ""),
      this.menu_ul.prepend(t),
      t
    );
  }
  addItem(t) {
    let i = this._newItem(),
      s = new p(
        i,
        this.items.length,
        t.name,
        t.price,
        t.image,
        t.alt,
        t.count,
        this.notify
      );
    this.items.push(s);
  }
}
const c = [
  {
    name: "French Fries with Ketchup",
    price: 223,
    image: "plate__french-fries.png",
    alt: "French Fries",
    count: 1,
  },
  {
    name: "Salmon and Vegetables",
    price: 512,
    image: "plate__salmon-vegetables.png",
    alt: "Salmon and Vegetables",
    count: 0,
  },
  {
    name: "Spaghetti Meat Sauce",
    price: 782,
    image: "plate__spaghetti-meat-sauce.png",
    alt: "Spaghetti with Meat Sauce",
    count: 0,
  },
  {
    name: "Bacon, Eggs, and Toast",
    price: 599,
    image: "plate__bacon-eggs.png",
    alt: "Bacon, Eggs, and Toast",
    count: 0,
  },
  {
    name: "Chicken Salad with Parmesan",
    price: 698,
    image: "plate__chicken-salad.png",
    alt: "Chicken Salad with Parmesan",
    count: 0,
  },
  {
    name: "Fish Sticks and Fries",
    price: 634,
    image: "plate__fish-sticks-fries.png",
    alt: "Fish Sticks and Fries",
    count: 0,
  },
];
class g {
  constructor(t, i, s, a, n, o) {
    e(this, "name");
    e(this, "price");
    e(this, "image");
    e(this, "quantity", 1);
    e(this, "order");
    e(this, "subtotal");
    e(this, "menu_item_li");
    e(this, "name_p");
    e(this, "price_p");
    e(this, "image_img");
    e(this, "quantity_divs");
    e(this, "subtotal_div");
    e(this, "decrease_btn");
    e(this, "increase_btn");
    e(this, "notifyCart");
    e(this, "addQuantity", (t) => {
      this._adjustQuantity(1), this.notifyCart();
    });
    e(this, "deductQuantity", (t) => {
      this._adjustQuantity(-1), this.notifyCart();
    });
    (this.notifyCart = o),
      (this.menu_item_li = t),
      this._findElements(this.menu_item_li),
      this._setOrder(i),
      this._setName(s),
      this._setPrice(a),
      this._setImage(n, s),
      this._adjustQuantity(0),
      this._bindEvents();
  }
  _findElements(t) {
    (this.name_p = t.querySelector("p.menu-item")),
      (this.price_p = t.querySelector("p.price")),
      (this.image_img = t.querySelector("div.plate img")),
      (this.quantity_divs = [
        t.querySelector("div.quantity__wrapper div.quantity"),
        t.querySelector("div.plate div.quantity"),
      ]),
      (this.subtotal_div = t.querySelector("div.subtotal p.price")),
      (this.decrease_btn = t.querySelector(
        "div.quantity__wrapper button.decrease"
      )),
      (this.increase_btn = t.querySelector(
        "div.quantity__wrapper button.increase"
      ));
  }
  _bindEvents() {
    this.decrease_btn.addEventListener("click", this.deductQuantity),
      this.increase_btn.addEventListener("click", this.addQuantity);
  }
  _setOrder(t) {
    (this.order = t), this.menu_item_li.setAttribute("order", t);
  }
  _setName(t) {
    (this.name = t), (this.name_p.textContent = this.name);
  }
  _setPrice(t) {
    (this.price = t), (this.price_p.textContent = this.price);
  }
  _setImage(t, i) {
    (this.image = t),
      this.image_img.setAttribute("src", this.image),
      this.image_img.setAttribute("alt", i);
  }
  _setQuantity() {
    for (let t of this.quantity_divs) t.textContent = this.quantity;
  }
  _setSubtotal() {
    this.subtotal_div.textContent = this.subtotal;
  }
  _adjustQuantity(t) {
    (this.quantity += t),
      (this.subtotal = Number(this.price * this.quantity).toFixed(2)),
      this._setQuantity(),
      this._setSubtotal();
  }
}
class f {
  constructor() {
    e(this, "tax_rate", 0.0975);
    e(this, "subtotal", 0);
    e(this, "tax", 0);
    e(this, "total", 0);
    e(
      this,
      "subtotal_div",
      document.querySelector("div.totals div.amount.subtotal p.price")
    );
    e(
      this,
      "tax_div",
      document.querySelector("div.totals div.amount.tax p.price")
    );
    e(
      this,
      "total_div",
      document.querySelector("div.totals div.amount.total p.price")
    );
    this.updateTotal(0);
  }
  _setTotal() {
    (this.subtotal_div.textContent = this.subtotal.toFixed(2)),
      (this.tax_div.textContent = this.tax.toFixed(2)),
      (this.total_div.textContent = this.total.toFixed(2));
  }
  updateTotal(t) {
    (this.subtotal = t),
      (this.tax = t * this.tax_rate),
      (this.total = this.subtotal + this.tax),
      this._setTotal();
  }
}
class v {
  constructor() {
    e(this, "cart_ul", document.querySelector("ul.cart-summary"));
    e(this, "cart_template", this.cart_ul.querySelector("li.template"));
    e(this, "cart_empty_p", document.querySelector("div.panel.cart p.empty"));
    e(
      this,
      "cart_summary_ul",
      document.querySelector("div.panel.cart ul.cart-summary")
    );
    e(
      this,
      "cart_totals_div",
      document.querySelector("div.panel.cart div.totals")
    );
    e(this, "items", new Array());
    e(this, "total_amount", new f());
    e(this, "notify", () => {
      this._updateCart(), this._updateAmount();
    });
  }
  _newItem(t, i, s) {
    let a = this.cart_template.cloneNode(!0);
    a.classList.remove("template"),
      (a.style.display = ""),
      this.cart_ul.prepend(a);
    let n = this.items.length + 1;
    return new g(a, n, t, i, s, this.notify);
  }
  _removeItem(t) {
    let i = this.cart_ul.querySelector(`li[order="${t}"]`);
    this.cart_ul.removeChild(i),
      (this.items = this.items.filter((s) => s.order != t));
  }
  _hideEmptyCart() {
    (this.cart_empty_p.style.display = "none"),
      (this.cart_summary_ul.style.display = ""),
      (this.cart_totals_div.style.display = "");
  }
  addItem(t, i, s) {
    let a = this._newItem(t, i, s);
    this.items.push(a), this.notify(), this._hideEmptyCart();
  }
  _inCart(t, i) {
    let s = !1;
    for (let a of this.items) a.name === t && a.price === i && (s = !0);
    return s;
  }
  addFromStorage(t) {
    let i = c[t];
    this._inCart(i.name, i.price) ||
      this.addItem(i.name, i.price, l.image_prefix + i.image);
  }
  _targetRemoval() {
    let t = new Array();
    for (let i = 0; i < this.items.length; i++) {
      let s = this.items[i];
      s.quantity < 0 && t.push(s.order);
    }
    return t;
  }
  _emptyCart() {
    (this.cart_empty_p.style.display = ""),
      (this.cart_summary_ul.style.display = "none"),
      (this.cart_totals_div.style.display = "none");
  }
  _updateCart() {
    let t = this._targetRemoval();
    for (let i of t) this._removeItem(i);
    this.items.length === 0 && this._emptyCart();
  }
  _updateAmount() {
    let t = 0;
    for (let i of this.items) t += i.price * i.quantity;
    this.total_amount.updateTotal(t);
  }
}
let b = new v(),
  q = new y(b);
for (let r of c) q.addItem(r);
