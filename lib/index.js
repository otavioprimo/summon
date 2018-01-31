const createDir = require('./util/createDir');
const fs = require('fs');
const File = require('./models/File');
const err_msg = require("../lib/messages/error");
const config_template = require('../lib/templates/config');
const file_name = 'summon.json';

//Verifica se existe diretórios para serem criados
//Se não, só cria o arquivo
var create = function (dir, template) {
    let file = new File(dir);
    try {
        if (file.hasDirectory || fs.existsSync('summon.json')) {
            createDir.withDir(file, template);
        } else {
            createDir.onlyFile(file, template);
        }
    } catch (err) {
        throw err;
    }
}

var createConfigJson = function () {
    if (!fs.existsSync(file_name)) {
        fs.writeFileSync(file_name, config_template);
    } else {
        console.log(err_msg.configExists);
    }
}

exports.create = create;
exports.createConfigJson = createConfigJson;