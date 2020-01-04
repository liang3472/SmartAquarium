const mqtt = require('mqtt');

const CMD_ADD_WATER = 'CMD_ADD_WATER';

let config;
class MqttHelper {
    init(conf, manager) {
        this.manager = manager;
        console.log('初始化MqttHelper模块');
        if (conf) {
            config = {
                server: conf,
                options: {
                    clientId: 'smart_aquarium_001'
                },
                topic: 'SmartAquarium'
            };
            this.connect(manager);
        } else {
            console.log('mqtt配置不存在');
        }
    }

    connect(manager) {
        if (!manager) {
            console.log('manager不存在');
            return;
        }
        let mqttClient = mqtt.connect(config.server);
        console.log('Connecting to broker: ' + config.server);

        mqttClient.on('error', error => {
            console.error(error);
        });

        mqttClient.on('message', (topic, data) => {
            let {commend, action} = JSON.parse(data.toString());
            console.log(`remote cmd: ${commend}`);
            switch (commend) {
                case CMD_ADD_WATER:
                    console.log('请求加水操作');
                    this.checkLiquidLevel();
                    break;
                default:
                    console.log('unknow commend');
                    break;
            }
        });

        mqttClient.on('connect', () => {
            console.log('Connected. Client id is: ' + config.options.clientId);
            mqttClient.subscribe(config.topic);
            console.log('Subscribed to topic: ' + config.topic)
        });
    }

    /**
     * 检测水位是否低于200，低于则进行加水操作
     */
    checkLiquidLevel() {
        this.manager.liquidLevelHelper.getLevel().then(level=>{
            if(+level >= 200) {
                console.log('水位正常无需添加');
            } else {
                this.checkPumpState();
            }
        }).catch(e=>{
            console.log(e);
            console.log('水位传感器异常');
        });
    }

    checkPumpState() {
        if(this.manager.relayHelper.isPumpRun()) {
            console.log('水泵运行中...');
        } else {
            console.log('开始监控水位变化');
            let watch = this.startWatchLevel();
            this.manager.relayHelper.switchPump(true);
            // 防止加水溢出风险
            setTimeout(()=>{
                console.log('加水超时');
                this.manager.relayHelper.switchPump(false);
                this.stopWatchLevel();
            }, 5000);
        }
    }

    /**
     * 开始监控水位变化
     */
    startWatchLevel() {
        this.watch = setInterval(() => {
            this.manager.liquidLevelHelper.getLevel().then(level=>{
                console.log(`当前水位:${level}`);
                if(+level >= 300) {
                    console.log('水位超标');
                    this.manager.relayHelper.switchPump(false);
                    this.stopWatchLevel();
                }
            }).catch(e=>{
                console.log('水位传感器异常');
                this.manager.relayHelper.switchPump(false);
                this.stopWatchLevel();
            });
        }, 200);
    }

    /**
     * 停止监控水位变化
     */
    stopWatchLevel() {
        clearInterval(this.watch);
        console.log('停止监控水位变化');
        this.watch = null;
    }
}

module.exports = MqttHelper;
