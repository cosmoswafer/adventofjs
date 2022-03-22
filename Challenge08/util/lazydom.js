export class DOM {
    element = null;
    style = null;
    classList = null;

    constructor(selector) {
        const template_element = document.querySelector(selector);
        this.element = template_element.cloneNode(true);

        this._styleShorthand();
        this._cleanUp();
    }

    _styleShorthand() {
        this.style = this.element.style;
        this.classList = this.element.classList;
    }

    _cleanUp() {
        //Remove the template class from template element
        this.classList.remove('template');

        //By default removing the in-line display style which was set by the template
        this.style.display = '';
    }

    q(selector) {
        return this.element.querySelector(selector);
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
