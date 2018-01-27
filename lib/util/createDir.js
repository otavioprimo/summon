const fs = require('fs');
const path = require('path');
const validator = require('./validators');
const error_msg = require('../messages/error');
const validateTemplate = require('../util/validateTemplate');

exports.withDir = (dir, template) => {
    try {
        let splited = dir.split('/'); //Separa o path para criar os diretorios
        let file = splited[splited.length - 1]; //Adiciona o nome do arquivo

        if (!validator.isFile(file) || !validator.verifyExtension(file)) {
            throw error_msg.invalidExtension;
        }

        splited.pop(splited.length); //Remove o nome do arquivo do path
        let path = '';
        for (i = 0; i < splited.length; i++) {
            if (i == 0) { //Se for o primeiro path
                path += splited[i];
            }
            else { //Se não for o primeiro adiciona '/' antes
                path += '/' + splited[i];
            }

            //Cria o path se não existir
            if (!fs.existsSync(path)) {
                if (i != splited.length) {
                    fs.mkdirSync(path);
                }
            }

            //Cria o arquivo no final
            if (i + 1 == splited.length) {
                var nf = path + '/' + file; //Junta o path e o nome do arquivo
                fs.writeFileSync(nf, validateTemplate(template));

            }
        }
    } catch (err) {
        console.log(err);
    }
}

exports.onlyFile = (file, _template) => {
    if (!validator.isFile(file) || !validator.verifyExtension(file)) {
        throw error_msg.invalidExtension;
    }

    fs.writeFileSync(file, validateTemplate(_template));
}