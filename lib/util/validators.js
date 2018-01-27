const fs = require('fs');
const err_msg = require('../messages/error');
var extensions = ['html', 'php','js','css'];

exports.isFile = (file) => {
    let file_splitted = file.split('.');
    if (file_splitted.length != 2)
        return false;
    else
        return true;
}

exports.verifyExtension = (file) => {
    let file_splitted = file.split('.');

    var filter = extensions.filter((element) => {
        return element == file_splitted[1];
    }).length >= 1;

    return filter;
}

exports.checkConfig = (dir) => {
    let extension = dir.split('.');
    var data = fs.readFileSync('summon.json', 'utf-8');
    var json = JSON.parse(data);

    if (!json.paths.html || !json.paths.php || !json.paths.css || !json.paths.js || !json.paths)
        throw err_msg.invalidConfigJson;

    if (extension[1] == 'html')
        return json.paths.html + '/' + dir;
    if (extension[1] == 'php')
        return json.paths.php + '/' + dir;
    if (extension[1] == 'css')
        return json.paths.css + '/' + dir;
    if (extension[1] == 'js')
        return json.paths.js + '/' + dir;
}