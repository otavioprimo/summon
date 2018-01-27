const basic_template = require('../templates/basic');
const error_msg = require('../messages/error');

var sintax = ['','basic'];

var check = (template) => {
    if (!checkSintax(template)) {
        throw error_msg.invalidaTemplate;
        return;
    }

    if (template == '')
        return '';

    if (template == 'basic')
        return basic_template;
}

function checkSintax(template) {
    var filter = sintax.filter((element) => {
        return element == template;
    }).length >= 1;

    return filter;
}

module.exports = check;