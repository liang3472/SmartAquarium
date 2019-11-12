#!/usr/bin/env node
const fs = require('fs');
const ini = require('ini');
const TempHelper = require('./components/tempHelper.js');
const HornHelper = require('./components/hornHelper.js');
const CmdHelper = require('./components/cmdHelper.js');
const LiquidLeveHelper = require('./components/liquidLeveHelper.js');
const configPath = '../config.conf';
const LOOP_TIME = 3 * 1000;
let config;

const manager = {
    tempHelper: TempHelper,
    hornHelper: HornHelper,
    cmdHelper: CmdHelper,
    liquidLeveHelper: LiquidLeveHelper
}

console.log('检测配置文件');
fs.exists(configPath, exists => {
    if (exists) {
        console.log('读取配置文件...');
        config = ini.parse(fs.readFileSync('../config.conf', 'utf-8'));
        manager.tempHelper.init(config.tempSensorId);
    } else {
        console.log('缺少配置文件');
    }
});

setInterval(() => {
    if (manager.tempHelper) {
        let temp = manager.tempHelper.getTemperature();
        let cmd = manager.cmdHelper.exec('echo hahaha');
        cmd.stdout.on('data', data => {
            lastTemperature = data;
            callback && callback(data);
        });
        console.log(`curr temp ${temp}`);
        //manager.hornHelper.horn(2, 200, 400); // 测试嗡鸣
    }
}, LOOP_TIME);
