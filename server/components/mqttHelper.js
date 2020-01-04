const RandomString = require('randomstring');
const mqtt = require('mqtt');

const CMD_ADD_WATER = 'CMD_ADD_WATER';

let config;
class MqttHelper {
    init(conf, manager) {
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
            switch (commend) {
                case CMD_ADD_WATER:
                    console.log('加水ing...');
                    manager.liquidLeveHelper.getLeve().then(leve=>{
                        if(+leve >= 200) {
                            console.log('水位正常无需添加');
                        } else {
                            manager.relayHelper.switchPump(action);
                        }
                    }).catch(e=>{
                        console.log('水位传感器异常');
                    });
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
}

module.exports = MqttHelper;
