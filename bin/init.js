const fs = require('fs');
const err_msg = require("../lib/messages/error");
const config_template = require('../lib/templates/config');
const file_name = 'summon.json';

var init = function () {
    if (!fs.existsSync(file_name)) {
        fs.writeFileSync(file_name, config_template);
    } else {
        console.log(err_msg.configExists);
    }
}

exports.createConfigFile = init;