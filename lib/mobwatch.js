#! /usr/bin/env node

/*
 * Mobwatch
 * https://github.com/kevinlig/mobwatch
 *
 * Copyright (c) 2014 Kevin Li
 * Licensed under the MIT license.
 */

'use strict';

var colors = require('colors');
var fs = require('fs');

var helpModule = require('./mobwatch-help');
var initModule = require('./init');
var watcherModule = require('./watch');

// validate that at least one argument was passed in
if (process.argv.length < 3) {
	// invalid!
	console.log("ERROR: You have not provided any arguments.".red);
	console.log("Use `mobwatch help` to view available options");
	return;
}

// determine the web app root path
var commandType = process.argv[2];

if (commandType == "help") {
	// display help
	helpModule.help();
	return;
}

if (commandType == "start") {
	// start watching current directory
	watcherModule.watch(process.cwd());
	return;
}

if (commandType != "init") {
	// invalid command
	console.log("ERROR: Unknown argument.".red);
	console.log("Use `mobwatch help` to view available options");
	return;
}

var port = 3000;

if (process.argv.length == 4) {
	// we need to change the port
	port = process.argv[4];
}

// okay now let's generate the file in the current directory
initModule.initMobwatch(process.cwd(), port);

