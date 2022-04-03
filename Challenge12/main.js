import { StoreBase } from './util/lazydom.js';
import { Ready, Results } from './pages.js';

class Store extends StoreBase {
    actions = ['rock', 'paper', 'scissors'];

    notify() {
        super.notify();
    }
}

class Main {
    store = new Store();
    ready_page = new Ready(this.store);
    results_page = new Results(this.store);

    constructor() {
        this.ready_page.show();
    }
}

const main = new Main();
