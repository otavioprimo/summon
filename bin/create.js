#!/usr/bin/env node
const myLibrary = require('../lib/index.js');
const err_msg = require("../lib/messages/error");
const init = require('./init');
//Deleta os argumentos 0 e 1 (node e script.js)
var args = process.argv.splice(process.execArgv.length + 2);

//Recupera os argumentos passados pelo usuário
var param1 = args[0];
var template = args[1];
if (template == undefined)
    template = '';

//Verifica se o usuario digitou o path
if (!param1) {
    console.log(err_msg.invalidPath);
    return;
}

if (param1 === 'init') {
    init.createConfigFile();
} else {
    myLibrary.create(param1, template);
}
