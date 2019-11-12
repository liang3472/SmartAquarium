let manager;
let lastLeve = 0;
const LiquidLeveHelper = {
    init: mng => {
        console.log('初始化LiquidLeve模块');
        if (mng) {
            manager = mng;
        }
    },
    getLeve: asyn () => {
        if (!manager) {
            console.log('manager不存在');
            return;
        }
        let cmd = manager.cmdComp.exec('sudo python ./drives/PCF8591.py');
        await cmd.stdout.on('data', data => {
            lastLeve = data;
            return data;
        });
    },
    getLastLeve: () => {
        return lastLeve;
    }
}

module.exports = LiquidLeveHelper;
