var extensions = ['html', 'php'];

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