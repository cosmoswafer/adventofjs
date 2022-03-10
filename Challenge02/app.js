import {menuItems} from "./storage.js";

class MenuItem {
    name;
    price;
    image;
    quantity;

    order;
    subtotal;

    menu_item_li;
    name_p;
    price_p;
    image_img;
    quantity_div;
    order_div;
    subtotal_div;
    decrease_btn;
    increase_btn;
    

    constructor(dom_item, order, name, price, image) {
        //dom_item should be a complete item cloned from template.
        this.menu_item_li = dom_item;

        this._findElements(this.menu_item_li);
        this._setOrder(order);
        this._setName(name);
        this._setPrice(price);
        this._setImage(image, name);
        this.quantity = 1;
        this._adjustQuantity(0);

        this._bindEvents();
    }

    _findElements(li) {
        this.name_p = li.querySelector('div.content p.menu-item');
        this.price_p = li.querySelector('div.content p.price');
        this.image_img = li.querySelector('div.plate img');
        this.quantity_div = li.querySelector('div.quantity__wrapper div.quantity');
        this.order_div = li.querySelector('div.plate div.quantity');
        this.subtotal_div = li.querySelector('div.subtotal');
        this.decrease_btn = li.querySelector('div.quantity__wrapper button.decrease');
        this.increase_btn = li.querySelector('div.quantity__wrapper button.increase');
    }

    _bindEvents() {
        this.decrease_btn.addEventListener('click', this.deductQuantity);
        this.increase_btn.addEventListener('click', this.addQuantity);
    }

    _setOrder(order) {
        this.order = order;
        this.order_div.textContent = this.order;
    }

    _setName(name) {
        this.name = name;
        this.name_p.textContent = this.name;
    }

    _setPrice(price) {
        this.price = price;
        this.price_p.textContent = this.price;
    }

    _setImage(img, alt) {
        this.image = img;
        this.image_img.setAttribute('src', this.image);
        this.image_img.setAttribute('alt', alt);
    }

    _setQuantity() {
        this.quantity_div.textContent = this.quantity;
    }

    _setSubtotal() {
        this.subtotal_div.textContent = this.subtotal;
    }

    _adjustQuantity(n) {
        //n should be either 1 or -1.
        this.quantity += n;
        this.subtotal = Number(this.price * this.quantity).toFixed(2);
        this._setQuantity();
        this._setSubtotal();
    }

    addQuantity = e => {
        this._adjustQuantity(1);
    }

    deductQuantity = e => {
        this._adjustQuantity(-1);
    }
}

class Cart {
    cart_ul = document.querySelector('ul.cart-summary');
    cart_template = this.cart_ul.querySelector('li.template.hide');
    items = new Array();

    constructor() {
        console.log(this.cart_template);
    }

    _newItem(name, price, image) {
        let item_clone = this.cart_template.cloneNode(true);
        item_clone.classList.remove('hide', 'template');
        this.cart_ul.appendChild(item_clone);
        let new_index = this.items.length + 1;
        let new_item = new MenuItem(item_clone, new_index, name, price, image);
        return new_item;
    }
    
    addItem(name, price, image) {
        let n = this._newItem(name, price, image);
        this.items.push(n);
    }
}

export class App {
    cart = new Cart();

    constructor() {
        this.cart.addItem('Fuck n Fine XXX_', 189.77, 'images/plate__fish-sticks-fries.png');
    }
}
