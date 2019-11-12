let manager;
let lastLeve = 0;
const LiquidLeveHelper = {
    init: mng => {
        console.log('初始化LiquidLeve模块');
        if (mng) {
            manager = mng;
        }
    },
    getLeve: () => {
        if (!manager) {
            console.log('manager不存在');
            return;
        }
        return new Promise((resolve, reject) => {
            try {
                let cmd = manager.cmdHelper.exec('python ./drives/PCF8591.py');
                cmd.stdout.on('data', data => {
                    lastLeve = data;
                    resolve(data);
                });
            } catch(e) {
                reject(e);
            }
        });
    },
    getLastLeve: () => {
        return lastLeve;
    }
}

module.exports = LiquidLeveHelper;
