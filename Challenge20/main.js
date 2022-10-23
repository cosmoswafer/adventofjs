import { DOM } from './lib/lazydom/dom.js';

import episodes from './app.js';

class App {
    tocUl = new DOM('aside ul.toc');
    mainContents = new DOM('main .columns');

    constructor() {
        console.log({ episodes });
        this.#buildEpisodesToc();

        const firstEpisode = this.tocUl.q('li');
        if (firstEpisode != null) firstEpisode.click();
    }

    #buildEpisodesToc() {
        for (const e of episodes) {
            const newLi = this.tocUl.DOM();
            newLi.dot(['.episode', `Episode ${e.id}`], ['.title', e.title]);
            newLi.element.addEventListener('click', () => {
                this.selectToc(newLi.element);
                this.updateContents({
                    episode: `Episode ${e.id}`,
                    title: e.title,
                    cover: `images/${e.cover}`,
                    summary: e.description,
                    moreLink: e.link,
                });
            }
            );
        }
    }

    selectToc(e) {
        const lastSelected = this.tocUl.a('.selected');
        lastSelected.forEach((e) => e.classList.remove('selected'));
        e.classList.add('selected');
    }

    updateContents(details) {
        this.mainContents.dot(
            ['.cover', '', { src: details.cover }],
            ['.title', details.title],
            ['.summary', details.summary],
            ['a', '', { href: details.moreLink }]
        );
    };
}

const app = new App();
