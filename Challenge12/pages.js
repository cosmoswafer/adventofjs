import { DOM, PageBase } from './util/lazydom.js';

const IMGDIR = 'images';

export class Ready extends PageBase {
    actions = [
        { name: 'rock', image: 'rock.png' },
        { name: 'paper', image: 'paper.png' },
        { name: 'scissors', image: 'scissors.png' },
    ];
    page_actions = {};

    constructor(store) {
        super('ready');
        this.store = store;
        for (let a of this.actions) {
            const dom = this.dom.DOM();
            dom.dot([
                ['img', '', { src: [IMGDIR, a.image].join('/'), alt: a.name }],
                ['p', a.name],
            ]);
            dom.element.addEventListener('click', (e) => {
                this.store.playerAction = a.name;
                this.store.notify();
            });
        }
        //this.store.register(this.page_name, this.dom, this.playGame, {playerPicked: 'p.title + a p'});
    }

    //playGame = () => console.log(`Fuck game! ${this.store.playerPicked}`)
}

export class Results extends PageBase {
    bot_action = 'rock';
    you_action = '';

    constructor(store) {
        super('results');
        this.store = store;
        this.store.register(this.page_name, this.dom, this.playGame, {
            playerAction: '.player-action',
            botAction: '.bot-action',
        });
    }

    #botAction() {
        const rand_pick = Math.floor(Math.random() * this.store.actions.length);
        return this.store.actions[rand_pick];
    }

    #gameResults(bot, you) {
        return bot === you ? 'draw' : 'Fuck';
    }

    playGame = () => {
        this.you_action = this.store.playerAction;
        this.bot_action = this.#botAction();
        this.store.botAction = this.bot_action;
        console.log(`Play game! ${this.you_action} vs ${this.bot_action}`);
        console.log(this.#gameResults(this.bot_action, this.you_action));
    };
}
