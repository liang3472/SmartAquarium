const process = require('child_process');
const CmdHelper = {
    exec: (cmd, befor, after) => {
        befor && befor();
        return process.exec(cmd, () => {
            after && after();
        });
    }
}

module.exports = CmdHelper;
