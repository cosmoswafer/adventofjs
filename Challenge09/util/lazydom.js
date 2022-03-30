export class DOM {
    static template_placeholder = 'lazydom';
    static events = ['click', 'change', 'load'];

    static CACHE = {};

    element;
    style;
    classList;

    constructor(selector = `.${DOM.template_placeholder}`, parent_node = document) {
        const template_element = this._lookup(selector, parent_node);
        this.element = template_element.cloneNode(true);

        if (parent_node != document) {
            parent_node.append(this.element);
        }

        this._styleShorthand();
        this._cleanUp(template_element);
    }

    /*
    static fromElement(element) {
        const new_dom = new DOM();
        new_dom.element = element;
        this._styleShorthand();
        return new_dom;
    }
    */

    _styleShorthand() {
        this.style = this.element.style;
        this.classList = this.element.classList;
    }

    _cleanUp(template_element) {
        //Remove the duplicated class which cloned from template
        if (this.classList.contains(DOM.template_placeholder)) this.classList.remove(DOM.template_placeholder);

        //We could hide the template by default, show our element after cloned
        if (this.style.display === 'none') this.style.display = '';

        //Remove the lazy template element from dom tree to save our time
        if (template_element?.classList.contains(DOM.template_placeholder)) template_element.remove();
    }

    _lookup(selector, parent_node) {
        if ((parent_node in DOM.CACHE) && (selector in DOM.CACHE[parent_node])) {
            return DOM.CACHE[parent_node][selector];
        } else {
            const r = parent_node.querySelector(selector);
            //Cache the template element under its perent
            if (!( parent_node in DOM.CACHE)) DOM.CACHE[parent_node] = {};
            DOM.CACHE[parent_node][selector] = r;

            return r;
        }
    }

    q(selector) {
        return this.element.querySelector(selector);
    }

    a(selector) {
        return this.element.querySelectorAll(selector);
    }

    attr(target, attributes) {
        const target_node = this.element.querySelector(target);
        for (let k in attributes) {
            const p = [k, attributes[k]];
            DOM.events.includes(k)
                ? target_node.addEventListener(...p)
                : target_node.setAttribute(...p);
        }
    }

    text(target, value) {
        const target_node = this.element.querySelector(target);
        if (target_node != null) target_node.textContent = value;
    }

    dotText(texts) {
        for (let text of texts) {
            this._setTextContent(...text.slice(0, 2));
        }
    }

    dot(dataset) {
        for (let d of dataset) {
            if (d.length >= 2 && d[1] != '') this.text(d[0], d[1]);
            if (d.length == 3) this.attr(d[0], d[2]);
        }
    }

    dom(selector) {
        alert();
    }
}
