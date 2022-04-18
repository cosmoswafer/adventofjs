class Main {
    tocs = document.querySelectorAll('aside ul li')
    headers = document.querySelectorAll('h3');

    constructor() {
        window.addEventListener('scroll', this.updateSiderbar);
    }

    currentHeader(upperMargin, lowerMargin) {
        for (let i = 0; i < this.headers.length; i++) {
            const header = this.headers[i];
            const headerTop = header.getBoundingClientRect().top;
            if (headerTop >= upperMargin && headerTop <= lowerMargin) {
                return i;
            }
        }
        return -1;
    }

    highlightHeader(idx) {
        for (let i=0; i<this.tocs.length; i++) {
            const title = this.tocs[i];
            (i === idx) ? title.classList.add('selected') : title.classList.remove('selected');
        }
    }

    updateSiderbar = () => {
        const headerIdx = this.currentHeader(0, window.innerHeight);
        if (headerIdx != -1) {
            const header = this.headers[headerIdx];
            this.highlightHeader(headerIdx);
            console.dir(header.textContent);
        }
    };
}

const main = new Main();
