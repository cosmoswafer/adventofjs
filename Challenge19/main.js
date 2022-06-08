import { DOM } from './lib/lazydom/dom.js';

class PwdInput {
    formField = null;

    pwdShown = false;
    passwdAttributes = {
        show: { pwdType: 'text', pwdImg: 'images/hide.svg' },
        hide: { pwdType: 'password', pwdImg: 'images/show.svg' },
    };

    #selectElements() {
        this.pwdInputs = [
            this.dom.q('input[name="passwd"]'),
            this.dom.q('input[name="passwd-repeat"]'),
        ];
        this.pwdTogglers = this.dom.a('a.toggle-pwd');
        this.pwdTogglerImgs = this.dom.a('a.toggle-pwd img');
    }

    #bindEvents() {
        this.pwdTogglers.forEach((e) =>
            e.addEventListener('click', this.togglePwd)
        );
        this.pwdInputs.forEach((e) =>
            e.addEventListener('change', this.validatePwd)
        );
    }

    constructor(parentDom) {
        this.dom = parentDom;
        this.#selectElements();
        this.#bindEvents();
    }

    #updatePwdField(attrSet) {
        this.pwdInputs.forEach((e) => e.setAttribute('type', attrSet.pwdType));
        this.pwdTogglerImgs.forEach((e) =>
            e.setAttribute('src', attrSet.pwdImg)
        );
    }

    togglePwd = () => {
        this.pwdShown
            ? this.#updatePwdField(this.passwdAttributes.hide)
            : this.#updatePwdField(this.passwdAttributes.show);
        this.pwdShown = !this.pwdShown;
        console.log(this.pwdShown);
    };

    validatePwd = () => {
        if (this.formField == null) return;

        const password1 = this.pwdInputs[0].value;
        const password2 = this.pwdInputs[1].value;
        console.log({ password1 });
        console.log({ password2 });
        password1 === password2
            ? this.formField.setSuccess()
            : this.formField.setErrors("Confirm Password doesn't match");
    };
}

class BaseValidation {
    constructor(formField) {
        this.formField = formField;
    }
}

class RequiredValidation extends BaseValidation {
    validate = () => {
        const inputValue = this.formField.input.value;
        inputValue != null && inputValue != ''
            ? this.formField.setSuccess()
            : this.formField.setErrors(
                  `Input ${this.formField.inputName} is required!`
              );
    };
}

class EmailAddressValidation extends BaseValidation {
    validate = () => {
        const inputValue = this.formField.input.value;
        inputValue != null && inputValue.includes('@')
            ? this.formField.setSuccess()
            : this.formField.setErrors('Please input a valid e-mail address.');
    };
}

class PasswordValidation extends BaseValidation {
    validate = () => {
        const inputValue = this.formField.input.value;
        inputValue.length >= 8
            ? this.formField.setSuccess()
            : this.formField.setErrors('Password less than 8 characters.');
    };
}

class FormField {
    validators = {
        name: RequiredValidation,
        email: EmailAddressValidation,
        passwd: PasswordValidation,
    };

    constructor(field) {
        this.dom = DOM.fromElement(field);
        this.#selectElements();
        if (this.inputName === 'NONAME') return;

        this.#resetField();
        this.#assignValidation();
    }

    #selectElements() {
        this.input = this.dom.q('input');
        this.inputName = this.input?.getAttribute('name') ?? 'NONAME';
        this.successIcon = this.dom.q('.success');
        this.errorsIcon = this.dom.q('.errors');
        this.errorsMsg = this.dom.q('.errors .msg');
    }

    #resetField() {
        const icons = [this.successIcon, this.errorsIcon];
        icons.forEach((e) => e.classList.add('hide'));
    }

    #assignValidation() {
        if (!(this.inputName in this.validators)) return;
        const validator = new this.validators[this.inputName](this);
        this.input.addEventListener('focusout', validator.validate);
    }

    setSuccess() {
        this.errorsIcon.classList.add('hide');
        this.successIcon.classList.remove('hide');
    }

    setErrors(msg) {
        this.errorsIcon.classList.remove('hide');
        this.successIcon.classList.add('hide');
        this.errorsMsg.textContent = msg;
    }
}

class App {
    dom = new DOM('#app');
    pwdHandler = new PwdInput(this.dom);
    //inputFields = this.dom.a('.field');
    inputFields = new Array();

    constructor() {
        for (const i of this.dom.a('.field')) {
            const newField = new FormField(i);
            this.inputFields.push(newField);
            if (newField.inputName === 'passwd-repeat')
                this.pwdHandler.formField = newField;
        }
    }
}

const app = new App();
