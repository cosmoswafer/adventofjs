export class SVG {
    dummy_div = document.createElement('div');
    sources = '';

    constructor(eid) {
        //The clone target viewBox is 32x32
        this.sources = `<svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
        >
            <use href="#${eid}" />
        </svg>`;
    }

    render() {
        this.dummy_div.innerHTML = this.sources;

        return this.dummy_div.firstElementChild;
    }
}
