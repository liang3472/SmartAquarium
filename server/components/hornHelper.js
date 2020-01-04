const rpio = require('rpio');
const hornPin = 11;

/**
 * 嗡鸣
 */
class HornHelper {
    horn(count, time=500, delay=1000) {
        rpio.open(hornPin, rpio.OUTPUT, rpio.LOW);
        for(let i=0; i<count; i++) {
            settimeout(()=>{
                rpio.write(hornPin, rpio.HIGH);
                rpio.msleep(time);

                rpio.write(hornPin, rpio.LOW);
            }, i * delay);
        }
    }
}

module.exports = HornHelper;
