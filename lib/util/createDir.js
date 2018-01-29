const fs = require('fs');
const validator = require('./validators');
const error_msg = require('../messages/error');
const validateTemplate = require('./validateTemplate');

/**
 * Cria os diretório e o arquivo
 * @name CreateDirFile
 * @param {File} _file
 * @param {string} template 
 */
exports.withDir = (_file, template) => {
    try {
        let dir = _file.getDir;
        let file = _file.getFile;
        let dir_length = dir.length;
        let path = '';
        //**Erro se passar o path inteiro para criar, exemplo: pages/dashboard/home
        //**Tem que criar primeiro pages, depois pages/dashboard depois pages/dashboard/home
        //Faz um loop nos diretórios
        dir.forEach((element, index) => {
            if (index == 0) { //Se for o primeiro path só adiciona na variavel auxiliar path
                path += element;
            }
            else { //Se não for o primeiro adiciona '/' antes
                path += '/' + element;
            }

            //Cria o diretório se não existir
            if (!fs.existsSync(path)) {
                if (index < dir_length) {
                    fs.mkdirSync(path);
                }
            }

            //Cria o arquivo no final
            if (index == dir_length - 1) {
                var nf = path + '/' + file; //Junta o path e o nome do arquivo
                if (!fs.existsSync(nf)) {
                    fs.writeFileSync(nf, validateTemplate(file, template));
                } else {
                    throw error_msg.fileExists;
                }
            }
        });
    } catch (err) {
        throw err;
    }
}

/**
 * Cria o arquivo na raiz da pasta
 * @name CreateFile
 * @param {File} _file
 * @param {string} _template 
 */
exports.onlyFile = (_file, _template) => {
    try {
        let file = _file.getFile;
        //Valida se existe um arquivo e se a extensão dele é válida
        if (!validator.isFile(file) || !validator.verifyExtension(file)) {
            throw error_msg.invalidExtension;
        }

        //Cria o arquivo na raiz se ele não existir
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, validateTemplate(file, _template));
        } else {
            throw error_msg.fileExists;
        }
    } catch (err) {
        throw err;
    }
}