const sensor = require('ds18b20-raspi');

/**
 * 温度检测
 */
class TempHelper {
    init(id) {
        console.log('初始化TempHelper模块');
        this.sensorId = id;
    }

    getTemperature() {
        return sensor.readC(this.sensorId);
    }
}

module.exports = TempHelper;
