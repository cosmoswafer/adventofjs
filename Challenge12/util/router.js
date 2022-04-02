export class Router {
    static #router = null;

    current_page = '';
    pages = new Array();

    constructor() {
        if (Router.#router != null) return Router.#router;

        Router.#router = this;
        window.addEventListener('hashchange', this.#pageChange);
    }

    addPages(...ids) {
        ids.forEach((p) => {
            this.pages.push(p);
        });
    }

    #pageChange = (e) => {
        const page_id = location.hash.replace('#', '');
        this.render(page_id);
    };

    render(page_id) {
        if (!this.pages.includes(page_id)) return;

        for (let p of this.pages) {
            const p_div = document.querySelector(`#${p}`);

            if (p_div) p_div.style.display = p === page_id ? '' : 'none';
        }
    }

    goTo(page_id) {
        location.hash = page_id;
    }
}

export class PageBase {
    router = new Router();
    pid = '';
    store = null;

    constructor(page_name, store = null) {
        this.pid = page_name;
        this.router.addPages(this.pid);
        if (store != null) this.store = store;
    }

    show() {
        location.hash === `#${this.pid}`
            ? this.router.render(this.pid)
            : this.router.goTo(this.pid);
    }
}
