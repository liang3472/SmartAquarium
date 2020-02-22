#!/usr/bin/env node
const fs = require('fs');
const ini = require('ini');
const MqttHelper = require('./components/mqttHelper.js');
const TempHelper = require('./components/tempHelper.js');
const RelayHelper = require('./components/relayHelper.js');
const HornHelper = require('./components/hornHelper.js');
const CmdHelper = require('./components/cmdHelper.js');
const LiquidLevelHelper = require('./components/liquidLevelHelper.js');
const RequestHelper = require('./components/requestHelper.js');
const configPath = '../config.conf';
const LOOP_TIME = 60 * 1000;
let config;

const manager = {
    mqttHelper: new MqttHelper(),
    tempHelper: new TempHelper(),
    relayHelper: new RelayHelper(),
    hornHelper: new HornHelper(),
    cmdHelper: new CmdHelper(),
    requestHelper: new RequestHelper(),
    liquidLevelHelper: new LiquidLevelHelper()
}

console.log('检测配置文件');
fs.exists(configPath, exists => {
    if (exists) {
        console.log('读取配置文件...');
        config = ini.parse(fs.readFileSync('../config.conf', 'utf-8'));
        manager.mqttHelper.init(config.mqttServer, manager);
        manager.tempHelper.init(config.tempSensorId);
        manager.requestHelper.init(config.host);
        manager.liquidLevelHelper.init(manager);
    } else {
        console.log('缺少配置文件');
    }
});

setInterval(() => {
    if (manager.tempHelper) {
        let temp = manager.tempHelper.getTemperature();
        console.log(`curr temp ${temp}`);
        manager.liquidLevelHelper.getLevel().then(level=>{
            console.log(`curr level ${level}`);
            manager.requestHelper.record(temp, level, 7);
        });
        //manager.hornHelper.horn(2, 200, 400); // 测试嗡鸣
    }
}, LOOP_TIME);
