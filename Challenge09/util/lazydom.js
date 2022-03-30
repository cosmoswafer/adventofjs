export class DOM {
    static template_placeholder = 'lazydom';
    static events = ['click', 'change', 'load'];

    static CACHE = {};

    element;
    style;
    classList;

    constructor(selector = `.${DOM.template_placeholder}`, parent_node = document) {
        const template_element = this.#lookup(selector, parent_node);
        (parent_node != document) 
            ? this.#cloneElement(template_element, parent_node)
            : this.element = template_element;
        this.#styleShorthand();
    }

    static fromElement(element) {
        const n = new DOM();
        //Updating the element and its shorthand
        n.element = element;
        n.#styleShorthand();
        return n;
    }

    #styleShorthand() {
        this.style = this.element?.style;
        this.classList = this.element?.classList;
    }

    #cloneElement(template_element, parent_node) {
        this.element = template_element.cloneNode(true);
        parent_node.append(this.element);
        this.#cleanUp(template_element);
    }

    #cleanUp(template_element) {
        //Remove the duplicated class which cloned from template
        if (this.element.classList.contains(DOM.template_placeholder)) this.element.classList.remove(DOM.template_placeholder);
        //We could hide the template by default, show our element after cloned
        if (this.element.style.display === 'none') this.element.style.display = '';
        //Remove the lazy template element from dom tree to save our time
        if (template_element?.classList.contains(DOM.template_placeholder)) template_element.remove();
    }

    #lookup(selector, parent_node) {
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

    dot(dataset) {
        for (let d of dataset) {
            //If the second elemenmt is not empty text, set the textContent
            if (d.length >= 2 && d[1] != '') this.text(d[0], d[1]);
            //If there is attributes object, assign it
            if (d.length == 3) this.attr(d[0], d[2]);
        }
    }

    dom(selector = `.${DOM.template_placeholder}`) {
        return new DOM(selector, this.element);
    }
}
