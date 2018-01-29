const validateTemplate = require('../util/validateTemplate');
const validator = require('../util/validators');
const error_msg = require('../messages/error');
const fs = require('fs');

class File {
    constructor(path) {
        this.path = path;
        this._checkDir();
        this._splitPath();
        this._checkFile();
    }

    /**
     * Separa os diretórios e o arquivo do path
     */
    _splitPath() {
        let splitted_path = this.path.split('/'); //Separa o path para criar os diretorios
        this.file = splitted_path[splitted_path.length - 1]; //Separa o nome do arquivo
        splitted_path.pop(splitted_path.length); //Remove o nome do arquivo do path
        this.dir = splitted_path;
    }

    /**
     * Verifica se o arquivo existe e sua extensão são válidos
     */
    _checkFile() {
        //Verifica o arquivo é valido e sua extensão  
        if (!validator.isFile(this.file) || !validator.verifyExtension(this.file)) {
            throw error_msg.invalidExtension;
        }

        //Verifica se o arquivo já existe
        if (fs.existsSync(this.path)) {
            throw error_msg.fileExists;
        }
    }

    /**
    * Verifica a extensão do arquivo e retorna o diretório padrao dele
    * @param {string} dir 
    * @returns string
    */
    _checkDir() {
        let explode = this.path.split('/');
        if (explode.length > 1)
            this.path = this.path;
        else if (fs.existsSync('summon.json')) {
            this.path = validator.checkConfig(this.path);
        }
    }

    /**
     * Retorna o nome do arquivo
     * @returns string
     */
    get getFile() {
        return this.file;
    }

    /**
     * Retorna os diretórios
     * @returns string
     */
    get getDir() {
        return this.dir;
    }

    /**
      * Retorna a extensão do arquivo
      * @returns string
      */
    get getFileExtension() {
        return this.file.split('.')[1];
    }

    /**
     * Retorna se existe diretórios ou é somente um arquivo
     * @returns string
     */
    get hasDirectory() {
        var explode = this.path.split('/');
        if (explode.length > 1)
            return true;
        else
            return false;
    }
}

module.exports = File;