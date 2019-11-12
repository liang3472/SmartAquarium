let manager;
let lastLeve = 0;
const LiquidLeveHelper = {
    init: mng => {
        console.log('初始化LiquidLeve模块');
        if (mng) {
            manager = mng;
        }
    },
    getLeve: async () => {
        if (!manager) {
            console.log('manager不存在');
            return;
        }
        new Promise((resolve, reject) => {
            try {
                let cmd = manager.cmdHelper.exec('sudo python3 ./drives/PCF8591.py');
                cmd.stdout.on('data', data => {
                    lastLeve = data;
                    resolve(data);
                });
            } catch(e) {
                reject(e);
            }
        }).then(data=>{
            return data;
        }).catch((e)=>{
            return null;
        })
    },
    getLastLeve: () => {
        return lastLeve;
    }
}

module.exports = LiquidLeveHelper;
