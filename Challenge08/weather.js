import { api_key } from './key.js';
import { daysOfWeekMap, iconNameToSizeMap, WeatherCondt } from './conf.js';
import { GeoLocation } from './util/geolocation.js';
import { DOM } from './util/lazydom.js';

export class Weather {
    static days = 7;
    static owm_api = `https://api.openweathermap.org/data/2.5/onecall`;

    dom_element = document.querySelector('#app ol');

    forecasts = new Array();

    constructor() {
        this.dom_element.classList.add('forecasts');
    }

    async downloadData() {
        await this._fetchData();
    }

    async _getLocation() {
        const g = new GeoLocation();

        await g.getAddress();

        return g;
    }

    _owmUrl(geo_location) {
        const url = new URL(Weather.owm_api);

        url.searchParams.set('lat', geo_location.latitude);
        url.searchParams.set('lon', geo_location.longitude);
        url.searchParams.set('cnt', Weather.days);
        url.searchParams.set('appid', api_key);
        url.searchParams.set('units', 'metric');

        return url;
    }

    async _fetchData() {
        const g = await this._getLocation();
        const url = this._owmUrl(g);

        //const response = await fetch(url);
        const response = await fetch('data.json');

        if (response.ok) {
            const r = await response.json();
            this._parseWeather(r);
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    }

    _parseWeather(data) {
        const daily = data.daily;

        for (let weather of daily) {
            this.forecasts.push(new WeatherData(weather));
        }
    }

    _refreshDom() {
        this.dom_element.textContent = '';
    }

    render() {
        for (let i of this.forecasts) {
            this.dom_element.append(i.render());
        }

        return this.dom_element;
    }
}

class WeatherData {
    node = new DOM('#app ol li.template');

    date;
    weather;
    tempeature;
    precipitation;
    tempeature_feel;

    constructor(data) {
        this.date = new Date(data.dt * 1000);
        this.weather = data.weather[0].main;
        this.tempeature = data.temp.day;
        this.precipitation = data.pop * 100;
        this.tempeature_feel = data.feels_like.day;
    }

    _applyIcon(svg, wcode) {
        const size = iconNameToSizeMap[wcode] ?? false;
        if (! size) return;

        svg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);
        svg.querySelector('use').setAttribute('href', `#${wcode}-svg`);
    }

    render() {
        const wcode = WeatherCondt.mapName(this.weather);

        this.node.q('.weather').classList.add(wcode);
        this._applyIcon(this.node.q('svg.icon'), wcode);
        this.node.dotText([
            ['.week', daysOfWeekMap[this.date.getDay()]],
            ['.date', this.date.getDate()],
            ['.tempeature p', this.tempeature.toFixed(0)],
            ['.precipitation span', this.precipitation.toFixed(0) + '%'],
            ['.temp-feel span', this.tempeature_feel.toFixed(0) + '°'],
        ]);

        return this.node.element;
    }
}
