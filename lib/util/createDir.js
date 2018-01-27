const fs = require('fs');
const validator = require('./validators');
const error_msg = require('../messages/error');
const validateTemplate = require('../util/validateTemplate');

exports.withDir = (dir, template) => {
    try {
        dir = checkDir(dir);

        let splitted = dir.split('/'); //Separa o path para criar os diretorios
        let file = splitted[splitted.length - 1]; //Separa o nome do arquivo
        splitted.pop(splitted.length); //Remove o nome do arquivo do path
        let path_length = splitted.length;

        if (!validator.isFile(file) || !validator.verifyExtension(file)) {
            throw error_msg.invalidExtension;
        }

        if (fs.existsSync(dir)) {
            throw error_msg.fileExists;
        }

        let path = '';
        splitted.forEach((element, index) => {
            if (index == 0) { //Se for o primeiro path
                path += element;
            }
            else { //Se não for o primeiro adiciona '/' antes
                path += '/' + element;
            }

            //Cria o path se não existir
            if (!fs.existsSync(path)) {
                if (index != path_length) {
                    fs.mkdirSync(path);
                }
            }

            //Cria o arquivo no final
            if (index + 1 == path_length) {
                var nf = path + '/' + file; //Junta o path e o nome do arquivo
                if (!fs.existsSync(nf)) {
                    fs.writeFileSync(nf, validateTemplate(template));
                } else {
                    throw error_msg.fileExists;
                }
            }
        });
    } catch (err) {
        throw err;
    }
}

exports.onlyFile = (file, _template) => {
    try {
        if (!validator.isFile(file) || !validator.verifyExtension(file)) {
            throw error_msg.invalidExtension;
        }

        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, validateTemplate(_template));
        } else {
            throw error_msg.fileExists;
        }
    } catch (err) {
        throw err;
    }
}

function checkDir(dir) {
    let explode = dir.split('/');
    if (fs.existsSync('summon.json'))
        return validator.checkConfig(dir);
    else if (explode.length > 1)
        return dir;
    else
        return dir;
}