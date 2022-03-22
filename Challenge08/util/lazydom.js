export class DOM {
    dom_element = null;

    constructor(node) {
        this.dom_element = node;
    }

    _firstByClass(name) {
        return this?.dom_element.querySelector(`.${name}`);
    }

    _allByClass(name) {
        return this?.dom_element.querySelectorAll(`.${name}`);
    }

    q(selector) {
        return this?.dom_element.querySelector(selector);
    }

    dot(key) {
        return this._firstByClass(key);
    }

    getText(key) {
        return this._firstByClass(key)?.textContent;
    }

    setText(key, txt) {
        const target = this._firstByClass(key);
        if (target != null) {
            target.textContent = txt;
        }

        return target;
    }

    setAll(key, txt) {
        const targets = this._allByClass(key);

        for (let e of targets) {
            e.textContent = txt;
        }

        return targets;
    }
}
