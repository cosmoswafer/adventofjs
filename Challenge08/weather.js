import { api_key } from './key.js';
import { GeoLocation } from './geolocation.js';

export class Weather {
    static city = 'Macau,MO';
    static days = 7;
    //static owm_api = `api.openweathermap.org/data/2.5/forecast/daily?lat=${}&lon=${}&cnt=${Weather.days}&appid=${api_key}`;
    static owm_api = `https://api.openweathermap.org/data/2.5/forecast/daily`;
    static smg_api = 'https://xml.smg.gov.mo/c_7daysforecast.xml';

    constructor() {
        console.log(`Hello Weather!
            The smg api: ${Weather.smg_api}`);

        this._getLocation();
        this._tryFetch();
    }

    async _getLocation() {
        const g = new GeoLocation();
        await g.getAddress();
        console.log({ latitude: g.latitude, longitude: g.longitude });
    }

    async _tryFetch() {
        const response = await fetch(Weather.owm_api);

        if (response.ok) {
            console.dir(response);
            const r = await response.text();
            console.log({ response: r });
        } else {
            console.log('HTTP-Error: ' + response.status);
        }
    }
}
