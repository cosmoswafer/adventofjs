import { api_key } from './key.js';
import { daysOfWeekMap } from './conf.js';
import { GeoLocation } from './geolocation.js';
import { DOM } from './dom.js';
import { SVG } from './svg.js';

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

        for (let i of this.forecasts) {
            console.log(i);
        }
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
            console.log({ response: r });
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
        this._refreshDom();

        for (let i of this.forecasts) {
            this.dom_element.append(i.render());
        }

        return this.dom_element;
    }
}

class WeatherData {
    dom_template = document.querySelector('#app ol li.template');
    dom_element = this.dom_template.cloneNode(true);

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

        const node = new DOM(this.dom_element);
        node.dot('weather').classList.add(this.weather);
        node.dot('week').textContent = daysOfWeekMap[this.date.getDay()];
        node.dot('date').textContent = this.date.getDate();
        node.dot('template p').textContent = this.tempeature.toFixed(0);
        node.dot('precipitation span').textContent =
            this.precipitation.toFixed(0);
        node.dot('temp-feel span').textContent =
            this.tempeature_feel.toFixed(0) + '°';

        this.dom_element.classList.remove('template');
    }

    render() {
        return this.dom_element;
    }

    render02() {
        const svg_low = new SVG('low-svg');
        const svg_preci = new SVG('preci-svg');

        this.dom_element.innerHTML = `
            <div class="week">${daysOfWeekMap[this.date.getDay()]}</div>
            <div class="date">${this.date.getDate()}</div>
            <div class="weather ${this.weather} cloudy-back">
                <div class="icon"></div>
                <div class="tempeature cloudy-temp">
                    <p>${this.tempeature.toFixed(0)}</p>
                    <div class="ellipse"></div>
                </div>
                <div class="precipitation cloudy-text">
                    ${svg_preci.sources}<span
                        >${this.precipitation.toFixed(0)}%</span
                    >
                </div>
                <div class="temp-feel cloudy-text">
                    ${svg_low.sources}<span
                        >${this.tempeature_feel.toFixed(0)}°</span
                    >
                </div>
            </div>
        `;

        return this.dom_element;
    }
}
