#!/usr/bin/env node
var myLibrary = require('../lib/index.js');

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);

// Retrieve the first argument
var dir = args[0];
var template = args[1];
if (template == undefined)
    template = '';

if (!dir)
    console.log('Need a path!\nExample: summon pages/dashboard/index.html basic');
else
    myLibrary.create(dir, template);