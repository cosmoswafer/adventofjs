import { Weather } from './weather.js';

export class App {
    app_div = document.querySelector('#app');

    weather = new Weather();

    constructor() {
        this._hideTemplates();
        this.mainAsync();
    }

    _hideTemplates() {
        const templates = document.querySelectorAll('.template');
        for (let template of templates) {
            template.style.display = 'none';
        }
    }

    async mainAsync() {
        await this.weather.downloadData();

        this.app_div.append(this.weather.render());
    }

    render() {}
}
