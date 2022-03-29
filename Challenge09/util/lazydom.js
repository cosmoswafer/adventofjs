export class DOM {
    static template_placeholder = 'theme';
    static events = ['click', 'change', 'load'];

    element = null;
    style = null;
    classList = null;

    constructor(selector = '', parent_node = document) {
        if (selector === '') return this;

        const template_element = parent_node.querySelector(selector);
        this.element = template_element.cloneNode(true);

        if (parent_node != document) {
            parent_node.append(this.element);
        }

        this._styleShorthand();
        this._cleanUp();
    }

    static fromElement(element) {
        const new_dom = new DOM();
        new_dom.element = element;
        this._styleShorthand();
        return new_dom;
    }

    _styleShorthand() {
        this.style = this.element.style;
        this.classList = this.element.classList;
    }

    _cleanUp() {
        //Remove the template class from template element
        this.classList.remove(DOM.template_placeholder);

        //By default removing the in-line display style which was set by the template
        this.style.display = '';
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
}
