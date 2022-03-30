import { DOM } from './util/lazydom.js';
import { contents } from './data.js';

class Main extends DOM {
    static imgdir = 'images';

    thumbnails = new DOM('#app .thumbnails');
    featured_img = document.querySelector('#app img.featured');
    featured_cap = document.querySelector('#app p.caption');

    current_idx = -1;
    idx_maximum = 65535;

    constructor(data) {
        super('#app');

        this.contents = data;
        this.idx_maximum = data.length;

        this.render();
        this.#bindEvents();
    }

    #imgUrl(img) {
        return `${Main.imgdir}/${img}`;
    }

    updateImg = (e) => {
        this.featured_img.setAttribute('src', this.#imgUrl(e.target.image));
        this.featured_cap.textContent = e.target.caption + '.';

        this.current_idx = Number(e.target.value);
    };

    #advenceImg(step) {
        this.current_idx = (this.current_idx + step) % this.idx_maximum;
        if (this.current_idx < 0) this.current_idx += this.idx_maximum;

        const thumbnail = this.thumbnails.q(
            `input[value="${this.current_idx}"]`
        );
        thumbnail.click();
        thumbnail.focus();
    }

    clickLeft = (e) => {
        this.#advenceImg(-1);
    };

    clickRight = (e) => {
        this.#advenceImg(+1);
    };

    #bindEvents(elements) {
        const left_buttons = document.querySelector('#app img.screenbtn.left');
        const right_buttons = document.querySelector(
            '#app img.screenbtn.right'
        );
        left_buttons.addEventListener('click', this.clickLeft);
        right_buttons.addEventListener('click', this.clickRight);
    }

    render() {
        for (let i in this.contents) {
            const c = this.contents[i];
            const img = this.thumbnails.dom('label.lazydom').dot([
                ['img', '', { src: this.#imgUrl(c.image), alt: c.caption }],
                ['input', '', { value: i, change: this.updateImg }],
            ]);

            img.q('input').image = c.image;
            img.q('input').caption = c.caption;
        }

        this.thumbnails.q('input:first-child')?.click();
    }
}

const main = new Main(contents);
