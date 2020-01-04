const rpio = require('rpio');
const hornPin = 11;
rpio.open(hornPin, rpio.output, rpio.low);

/**
 * 嗡鸣
 */
class HornHelper {
    horn(count, time=500, delay=1000) {
        for(let i=0; i<count; i++) {
            settimeout(()=>{
                rpio.write(hornPin, rpio.high);
                rpio.msleep(time);

                rpio.write(hornPin, rpio.low);
            }, i * delay);
        }
    }
}

module.exports = HornHelper;
