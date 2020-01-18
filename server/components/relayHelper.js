const rpio = require('rpio');
const CH1 = 37;
const CH2 = 38;
const CH3 = 40;

rpio.open(CH1, rpio.OUTPUT, rpio.HIGH);
rpio.open(CH2, rpio.OUTPUT, rpio.HIGH);
rpio.open(CH3, rpio.OUTPUT, rpio.HIGH);

/**
 * 嗡鸣
 */
class RelayHelper {
    constructor() {
        this._isPumpRun = false;
    }

    init() {
        console.log('初始化RelayHelper模块');
    }

    /**
     * 切换水泵状态
     * @param flag true | false 打开or关闭
     */
    switchPump(flag) {
        this._isPumpRun = flag;
        if(flag) {
            console.log('开启水泵');
            rpio.write(CH1, rpio.LOW);
        }else {
            console.log('关闭水泵');
            rpio.write(CH1, rpio.HIGH);
        }
    }

    /**
     * 水泵运行状态
     */
    isPumpRun() {
        return this._isPumpRun;
    }
}

module.exports = RelayHelper;
