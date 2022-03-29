import { DOM } from './util/lazydom.js';
import { content } from './data.js';

const imgdir = "images";

const thumbnails = document.querySelector('#app .thumbnails');

const render = () => {
    for (let i of content) {
        const img = new DOM('label.theme', thumbnails);
        img.q('img').setAttribute('src', `${imgdir}/${i.image}`);
        img.q('img').setAttribute('alt', i.caption);

        console.log(i.image);
        console.log(i.caption);
    }
};

render();
