import { DOM } from './util/lazydom.js';
import { contents } from './data.js';

class Main extends DOM {
    static imgdir = 'images';

    thumbnails = document.querySelector('#app .thumbnails');
    featured_img = document.querySelector('#app img.featured');
    featured_cap = document.querySelector('#app p.caption');

    current_idx = -1;
    idx_maximum = 65535;

    constructor(data) {
        super('#app');

        this.contents = data;
        this.idx_maximum = this.contents.length;

        this.render();
        this._bindEvents();
    }

    _imgUrl(img) {
        return `${Main.imgdir}/${img}`;
    }

    updateImg = (e) => {
        this.featured_img.setAttribute('src', this._imgUrl(e.target.image));
        this.featured_cap.textContent = e.target.caption + '.';

        this.current_idx = Number(e.target.value);
    };

    _advenceImg(step) {
        this.current_idx = (this.current_idx + step) % this.idx_maximum;
        if (this.current_idx < 0) this.current_idx += this.idx_maximum;

        const thumbnail = this.thumbnails.querySelector(
            `input[value="${this.current_idx}"]`
        );
        thumbnail.click();
        thumbnail.focus();
    }

    clickLeft = (e) => {
        this._advenceImg(-1);
    };

    clickRight = (e) => {
        this._advenceImg(+1);
    };

    _bindEvents(elements) {
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
            const img = new DOM('label.lazydom', this.thumbnails);
            img.dot([
                ['img', '', { src: this._imgUrl(c.image), alt: c.caption }],
                ['input', '', { value: i, change: this.updateImg }],
            ]);

            const inp = img.q('input');
            inp.image = c.image;
            inp.caption = c.caption;
        }

        this.thumbnails.querySelector('input:first-child')?.click();
    }
}

const main = new Main(contents);
