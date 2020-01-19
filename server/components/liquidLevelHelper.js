let manager;
let lastLevel = 0;
class LiquidLevelHelper {
    init(mng) {
        console.log('初始化LiquidLevel模块');
        if (mng) {
            manager = mng;
        }
    }
    getLevel() {
        if (!manager) {
            console.log('manager不存在');
            return;
        }
        return new Promise((resolve, reject) => {
            try {
                let cmd = manager.cmdHelper.exec('python ./drives/PCF8591.py');
                cmd.stdout.on('data', data => {
                    if(+data < 0) {
                        reject(new Error('sensor error!'));
                    }
                    lastLevel = this.mappingLevel(+data);
                    resolve(lastLevel);
                });
            } catch(e) {
                console.log(e);
                reject(e);
            }
        });
    }
    mappingLevel(data) {
        if(data === 0) {
            return 0;
        } else if(data > 0 && data <= 80) {
            return 50;
        } else if(data > 80 && data <= 96) {
            return 100;
        } else if(data > 96 && data <= 120) {
            return 150;
        } else if(data > 120 && data <= 135) {
            return 200;
        } else if(data > 135 && data <= 138) {
            return 250;
        } else if(data > 138 && data <= 143) {
            return 300;
        } else if(data > 143 && data <= 147) {
            return 350;
        } else if(data > 147 && data <= 150) {
            return 400;
        } else if(data > 150 && data <= 151) {
            return 450;
        } else {
            return 480;
        }
    }
    getLastLevel() {
        return lastLevel;
    }
}

module.exports = LiquidLevelHelper;
