import { api_key } from './key.js';
import { GeoLocation } from './geolocation.js';

export class Weather {
    static days = 7;
    //static owm_api = `api.openweathermap.org/data/2.5/forecast/daily?lat=${}&lon=${}&cnt=${Weather.days}&appid=${api_key}`;
    static owm_api = `https://api.openweathermap.org/data/2.5/onecall`;

    forecasts = new Array();

    async downloadData() {
        await this._tryFetch();

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

    async _tryFetch() {
        const g = await this._getLocation();
        const url = this._owmUrl(g);

        const response = await fetch(url);

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
}

class WeatherData {
    date;
    weather;
    tempeature;
    precipitation;
    tempeature_feel;

    constructor(data) {
        this.date = data.dt;
        this.weather = data.weather[0].main;
        this.tempeature = data.temp.day;
        this.precipitation = data.pop;
        this.tempeature_feel = data.feels_like.day;
    }
}
