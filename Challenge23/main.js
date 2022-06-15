class App {
    toaster = document.querySelector('#toaster');
    closeBtn = document.querySelector('#toaster .close-btn a');

    cdTime = 1.5 * 1000; //ms
    #sittingTs = new Date();

    get isHidden() {
        return this.toaster.style.display === 'none';
    }

    set isHidden(value) {
        value === true
            ? (this.toaster.style.display = 'none')
            : (this.toaster.style.display = '');
    }

    get isSitting() {
        return new Date() - this.#sittingTs >= this.cdTime;
    }

    set isSitting(value) {
        this.#sittingTs = new Date();
    }

    constructor() {
        this.closeBtn.addEventListener('click', () => this.hideToaster());
        this.#detectBrowsing(() => (this.isSitting = false));
        document.addEventListener(
            'mouseleave',
            () => (this.isHidden = false)
            //(e) => console.log({ts:new Date(),event:e}) && e.stopPropagation()
        );
        requestAnimationFrame(this.toasterRAF);
        this.isHidden = true;
    }

    hideToaster() {
        this.isHidden = true;
        this.isSitting = false;
    }

    #detectBrowsing(f) {
        ['mousemove', 'scroll', 'keydown'].forEach((i) =>
            window.addEventListener(i, () => f()));
    }

    toasterRAF = (ts) => {
        if (this.isSitting === true && this.isHidden === true)
            this.isHidden = false;

        requestAnimationFrame(this.toasterRAF);
    };
}

const app = new App();
