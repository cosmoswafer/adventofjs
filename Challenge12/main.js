import { Ready, Results } from './pages.js';

class Main {
    ready_page = new Ready();
    results_page = new Results();

    constructor() {
        this.ready_page.show();
    }
}

const main = new Main();
