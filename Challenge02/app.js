import {menuItems} from "./storage.js";
import {Cart} from "./cart.js";


export class App {
    cart = new Cart();

    constructor() {
        this.cart.addItem('Fuck n Fine XXX_', 189.77, 'images/plate__fish-sticks-fries.png');
    }
}
