import { DOM, PageBase } from './util/lazydom.js';

const IMGDIR = 'images';

export class Ready extends PageBase {
    actions = [
        { name: 'rock', image: 'rock.png' },
        { name: 'paper', image: 'paper.png' },
        { name: 'scissors', image: 'scissors.png' },
    ];
    constructor(store) {
        super('ready');
        this.store = store;
        for (let a of this.actions) {
            const dom = this.dom.DOM();
            dom.dot([
                ['img', '', { src: [IMGDIR, a.image].join('/'), alt: a.name }],
                ['p', a.name],
            ]);
            dom.element.addEventListener('click', (e)=>{this.store.player_action = a.name});
        }
    }
}

export class Results extends PageBase {
    page_name = 'results';
    bot_action = 'rock';
    you_action = '';

    constructor(store) {
        super('results');
        this.store = store;
        this.store.addDom('results', this.dom);
    }
}
