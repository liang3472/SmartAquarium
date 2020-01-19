const axios = require('axios');

let config;
class RequestHelper {
  init(conf, manager) {
    this.manager = manager;
    console.log('初始化RequestHelper模块');
    if (conf) {
      config = {
        host: conf
      }
    } else {
      console.log('mqtt配置不存在');
    }
  }
  record(temp, level, ph) {
    axios.post(`${config.host}/record`, {
      temp,
      level,
      ph,
    }).then(response => {
      console.log(JSON.parse(response.data));
    }).catch(error => {
      console.log(error);
    });
  }
}

module.exports = RequestHelper;
