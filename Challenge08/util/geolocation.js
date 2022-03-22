export class GeoLocation {
    latitude;
    longitude;

    getCoordinates() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    async getAddress() {
        const position = await this.getCoordinates();
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        return this;
    }
}
