import { Ready, Results } from './pages.js';

class Store {
    #page_store = [];
    actions = ['rock', 'paper', 'scissors'];
    playerAction;

    register(page_name, render_func) {
        this.#page_store.push({ name: page_name, rend: render_func });
    }

    notify() {
        this.#page_store.forEach((i) => i.rend());
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
