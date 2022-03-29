export class DOM {
    static template_placeholder = 'theme';

    element = null;
    style = null;
    classList = null;

    constructor(selector, parent_node = document) {
        const template_element = parent_node.querySelector(selector);
        this.element = template_element.cloneNode(true);

        if (parent_node != document) {
            parent_node.append(this.element);
        }

        this._styleShorthand();
        this._cleanUp();
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

    fa(selector) {
        return this.element.querySelectorAll(selector);
    }

    _setTextContent(target, value) {
        const target_node = this.element.querySelector(target);
        if (target_node != null) target_node.textContent = value;
    }

    dotText(texts) {
        for (let text of texts) {
            this._setTextContent(...text.slice(0, 2));
        }
    }
}
