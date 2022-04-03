import { Ready, Results } from './pages.js';

class Store {
    #player_action = '';
    #dom_store = {};

    addDom(store_name, store_element) {
        this.#dom_store[store_name] = store_element;
    }

    get player_action() {
        const result_dom = this.#dom_store.results;
        return result_dom?.q('.player-action').textContent;
    }

    set player_action(action) {
        const result_dom = this.#dom_store.results;
        console.log(`Set player action to ${action}`);
        result_dom?.text('.player-action', action);
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
