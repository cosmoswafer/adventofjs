import { conf } from "./settings.js";

class MenuItem {
  index;
  name;
  price;
  image;
  alt;
  count;

  menu_item_li;
  name_p;
  price_p;
  image_img;
  add_btn;
  in_cart_btn;

  notifyCart;

  constructor(dom_item, index, name, price, image, alt, count, notify_func) {
    this.menu_item_li = dom_item;
    this.index = index;
    this.name = name;
    this.price = price;
    this.image = image;
    this.alt = alt;
    this.count = count;
    this.notifyCart = notify_func;

    this._findElements(this.menu_item_li);
    this._bindEvents();
  }

  _findElements(li) {
    this.name_p = li.querySelector(".content p.menu-item");
    this.price_p = li.querySelector(".content p.price");
    this.image_img = li.querySelector(".plate img.plate");
    this.add_btn = li.querySelector(".content button.add");
    this.in_cart_btn = li.querySelector(".content button.in-cart");

    this.name_p.textContent = this.name;
    this.price_p.textContent = this.price;
    this.image_img.setAttribute("src", conf.image_prefix + this.image);
    this.image_img.setAttribute("alt", this.alt);
  }

  _bindEvents() {
    this.add_btn.addEventListener("click", this.add2Cart);
    this.in_cart_btn.addEventListener("click", this.add2Cart);
  }

  _hideAddBtn() {
    this.add_btn.style.display = "none";
    this.in_cart_btn.style.display = "";
  }

  add2Cart = (e) => {
    //let item = {"name": this.name, "price": this.price, "image": image_prefix+this.image};
    this.notifyCart(this.index);
    this._hideAddBtn();
  };
}

export class Menu {
  menu_ul = document.querySelector(".panel.menu ul.menu");
  item_template = this.menu_ul.querySelector("li.template");

  cart;
  items = new Array();

  constructor(cart) {
    this.cart = cart;
  }

  _newItem() {
    let item_clone = this.item_template.cloneNode(true);
    item_clone.classList.remove("template");
    item_clone.style.display = "";
    this.menu_ul.prepend(item_clone);
    return item_clone;
  }

  addItem(item) {
    let new_item = this._newItem();
    let n = new MenuItem(
      new_item,
      this.items.length,
      item.name,
      item.price,
      item.image,
      item.alt,
      item.count,
      this.notify
    );
    this.items.push(n);
  }

  notify = (index) => {
    this.cart.addFromStorage(index);
  };
}
