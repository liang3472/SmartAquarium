let manager;
let lastLeve = 0;
const LiquidLeveHelper = {
    init: mng => {
        console.log('初始化LiquidLeve模块');
        if (mng) {
            manager = mng;
        }
    },
    getLeve: callback => {
        if (!manager) {
            console.log('manager不存在');
            return;
        }
        let cmd = manager.cmdComp.exec('sudo python ./drives/PCF8591.py');
        cmd.stdout.on('data', data => {
            lastLeve = data;
            callback && callback(data);
        });
    },
    getLastLeve: () => {
        return lastLeve;
    }
}

module.exports = LiquidLeveHelper;
