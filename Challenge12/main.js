import { Router } from './util/router.js';

class Main {
    router = new Router(['ready', 'results']);

    constructor() {
        this.router.render('ready');
    }
}

const main = new Main();
