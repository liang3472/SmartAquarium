const sensor = require('ds18b20-raspi');
const TempHelper = {
    sensorId: '',
    init: id => {
        this.sensorId = id;
        console.log(id)
    },

    getTemperature: () => {
        return sensor.readC(this.sensorId);
    }
}

module.exports = TempHelper;
