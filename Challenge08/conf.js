export const daysOfWeekMap = {
    0: 'SUN',
    1: 'MON',
    2: 'TUE',
    3: 'WED',
    4: 'THU',
    5: 'FRI',
    6: 'SAT',
};

export const iconNameToSizeMap = {
    cloudy: { width: 264, height: 166 },
    sunny: { width: 208, height: 213 },
    stormy: { width: 246, height: 187 },
    snowy: { width: 230, height: 196 },
    'partly-cloudy': { width: 230, height: 209 },
    rainy: { width: 160, height: 222 },
};

export class WeatherCondt {
    static Cloudy = new WeatherCondt('cloudy');
    static Sunny = new WeatherCondt('sunny');
    static Stormy = new WeatherCondt('stormy');
    static Snowy = new WeatherCondt('snowy');
    static PartlyCloudy = new WeatherCondt('partly-cloudy');
    static Rainy = new WeatherCondt('rainy');

    constructor(name) {
        this.name = name;
    }

    owaMap(condt_code) {
        /*
        "main": "Drizzle",
        "main": "Clear",
        "main": "Thunderstorm",
        "main": "Snow",
        "main": "Clouds",
        "main": "Rain",
        */
        if (condt_code === 'Drizzle') return WeatherCondt.Cloudy;
        if (condt_code === 'Clear') return WeatherCondt.Sunny;
        if (condt_code === 'Thunderstorm') return WeatherCondt.Stormy;
        if (condt_code === 'Snow') return WeatherCondt.Snowy;
        if (condt_code === 'Clouds') return WeatherCondt.PartlyCloudy;
        if (condt_code === 'Rain') return WeatherCondt.Rainy;
        else return WeatherCondt.Cloudy;
    }
}
