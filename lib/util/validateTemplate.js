const error_msg = require('../messages/error');
const style = require('../templates/styles');
var sintax = ['', 'basic', 'bs-starter'];

var check = (file, template) => {
    if (!checkSintax(template)) {
        throw error_msg.invalidTemplate;
        return;
    }

    if (template == '')
        return '';

    if (template == 'basic')
        return style.basic;
    else if (template == 'bs-starter')
        return style.bs_starter
    else
        return '';
}

function checkSintax(template) {
    var filter = sintax.filter((element) => {
        return element == template;
    }).length >= 1;

    return filter;
}

module.exports = check;