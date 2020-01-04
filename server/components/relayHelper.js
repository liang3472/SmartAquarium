const rpio = require('rpio');
const CH1 = 37;
const CH2 = 38;
const CH3 = 40;

rpio.open(CH1, rpio.OUTPUT, rpio.LOW);
rpio.open(CH2, rpio.OUTPUT, rpio.LOW);
rpio.open(CH3, rpio.OUTPUT, rpio.LOW);

/**
 * 嗡鸣
 */
class RelayHelper {
    init() {
        console.log('初始化RelayHelper模块');
    }

    /**
     * 切换水泵状态
     * @param flag true | false 打开or关闭
     */
    switchPump(flag) {
        if(flag) {
            rpio.write(CH1, rpio.HIGH);
        }else {
            rpio.write(CH1, rpio.LOW);
        }
    }
}

module.exports = RelayHelper;
