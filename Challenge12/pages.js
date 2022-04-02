import { Router, PageBase } from './util/router.js';

export class Ready extends PageBase {
    constructor(store) {
        super('ready', store);
    }
}

export class Results extends PageBase {
    bot_action = 'rock'
    you_action = ''

    constructor(store) {
        super('results', store);
    }
}

