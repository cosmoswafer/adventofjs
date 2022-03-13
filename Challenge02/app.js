import { Menu } from "./menu.js";
import { Cart } from "./cart.js";

import { menuItems } from "./storage.js";

let cart = new Cart();
let menu = new Menu(cart);

for (let i of menuItems) {
  menu.addItem(i);
}
