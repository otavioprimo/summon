const createDir = require('./util/createDir');
const fs = require('fs');

//Verifica se existe diretórios para serem criados
//Se não, só cria o arquivo
var create = function (dir, template) {
    let explode = dir.split('/');
    try {
        if (explode.length > 1 || fs.existsSync('summon.json')) {
            createDir.withDir(dir, template);
        } else {
            createDir.onlyFile(dir, template);
        }
    } catch (err) {
        throw err;
    }
}

exports.create = create;