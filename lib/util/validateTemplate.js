const basic_template = require('../templates/basic');
const error_msg = require('../messages/error');

var sintax = ['', 'basic-html'];

var check = (file, template) => {
    if (!checkSintax(template)) {
        throw error_msg.invalidTemplate;
        return;
    }

    if (template == '')
        return '';

    if (template == 'basic-html')
        return basic_template;

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