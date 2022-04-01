import { Router } from './util/router.js';

class Main {
    router = new Router();

    constructor() {
        this.router.addPages(['Fuck1', 'Fuck2', 'Fuck3']);
        this.router.render('Fuck3');
    }
}

const main = new Main();
