export class DOM {
    dom_element = null;
    style = null;
    classList = null;

    constructor(node) {
        this.dom_element = node;
        this.style = node.style;
        this.classList = node.classList;

        //By default removing the in-line display style which was set by the template
        this.style.display = '';
    }

    q(selector) {
        return this?.dom_element.querySelector(selector);
    }

    _setTextContent(target, value) {
        const target_node = this?.dom_element.querySelector(target);
        if (target_node != null) target_node.textContent = value;
    }

    dotText(texts) {
        for (let text of texts) {
            this._setTextContent(...text.slice(0, 2));
        }
    }
}
