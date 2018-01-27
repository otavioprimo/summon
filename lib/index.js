const createDir = require('./util/createDir');

//Verifica se existe diretórios para serem criados
//Se não, só cria o arquivo
var create = function (dir,template) {
    let explode = dir.split('/'); //Aqui vai o que o usuário digitar
    try {
        if (explode.length > 1)
            createDir.withDir(dir, template);
        else
            createDir.onlyFile(dir, template);
    } catch (err) {
        console.log(err);
    }
}

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.create = create;