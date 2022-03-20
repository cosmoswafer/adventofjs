import { Weather } from './weather.js';

const iconNameToSizeMap = {
    cloudy: { width: 264, height: 166 },
    sunny: { width: 208, height: 213 },
    stormy: { width: 246, height: 187 },
    snowy: { width: 230, height: 196 },
    'partly-cloudy': { width: 230, height: 209 },
    rainy: { width: 160, height: 222 },
};

export class App {
    app_div = document.querySelector('#app');

    weather = new Weather();

    constructor() {
        this.mainAsync();
    }

    async mainAsync() {
        await this.weather.downloadData();

        this.app_div.append(this.weather.render());
    }

    render() {}
}
