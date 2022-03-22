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

    static owm_map = {
        Drizzle : WeatherCondt.Cloudy,
        Clear : WeatherCondt.Sunny,
        Thunderstorm : WeatherCondt.Stormy,
        Snow : WeatherCondt.Snowy,
        Clouds : WeatherCondt.PartlyCloudy,
        Rain : WeatherCondt.Rainy,
    };

    constructor(name) {
        this.name = name;
    }

    static mapName(condt_code) {
        return WeatherCondt.owm_map[condt_code]?.name ?? WeatherCondt.Cloudy.name;
    }
}
