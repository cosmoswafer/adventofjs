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
    }
}

export class Results extends PageBase {
    win_classes = { you: '.youwin', bot: '.botwin', draw: 'NOTFOUND' };
    lose_classes = { you: '.botwin', bot: '.youwin', draw: '.botwin, .youwin' };
    bot_action = 'rock';
    you_action = '';

    constructor(store) {
        super('results');
        this.store = store;
        this.store.register(this.page_name, this.playGame);
    }

    #botAction() {
        const rand_pick = Math.floor(Math.random() * this.store.actions.length);
        return this.store.actions[rand_pick];
    }

    #renderPage(winner) {
        this.dom.dot([
            ['.youact', '', { src: `${IMGDIR}/${this.you_action}.png` }],
            ['.botact', '', { src: `${IMGDIR}/${this.bot_action}.png` }],
        ]);

        const winner_class = this.win_classes[winner];
        const loser_class = this.lose_classes[winner];
        this.dom.a(winner_class).forEach((i) => i.classList.remove('hide'));
        this.dom.a(loser_class).forEach((i) => i.classList.add('hide'));
    }

    #gameResults(bot, you) {
        if (bot === you) return 'draw';
        else if (
            (you === 'paper' && bot === 'rock') ||
            (you === 'rock' && bot === 'scissors') ||
            (you === 'scissors' && bot === 'paper')
        )
            return 'you';
        else return 'bot';
    }

    playGame = () => {
        this.you_action = this.store.playerAction;
        this.bot_action = this.#botAction();
        this.#renderPage(this.#gameResults(this.bot_action, this.you_action));
    };
}
