import { Ready, Results } from './pages.js';

class Store {
    #player_action = '';

    constructor() {
    }

    get player_action() {
        return this.#player_action;
    }

    set player_action(action) {
        this.#player_action = action;
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
