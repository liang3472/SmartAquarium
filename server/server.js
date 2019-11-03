#!/usr/bin/env node
const fs = require('fs');
const ini = require('ini');
const TempHelper = require('./components/tempHelper.js');
const HornHelper = require('./components/hornHelper.js');
const configPath = '../config.conf';
const LOOP_TIME = 3 * 1000;
let config;

const manager = {
    tempHelper: TempHelper,
    hornHelper: HornHelper
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
        console.log(`curr temp ${temp}`);
        //manager.hornHelper.horn(2, 200, 400); // 测试嗡鸣
    }
}, LOOP_TIME);
