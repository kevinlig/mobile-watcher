// help file

/*
 * Mobwatch
 * https://github.com/kevinlig/mobwatch
 *
 * Copyright (c) 2014 Kevin Li
 * Licensed under the MIT license.
 *
 * Display help text.
 */

var colors = require('colors');

exports.help = function() {
	var description = "\nMobwatch".cyan.bold + " is a command line NodeJS tool for testing web apps on mobile devices connected";
	description += " to your computer via an ad-hoc network. Your mobile devices will automatically refresh when changes";
	description += " are made to files on your computer. \n\nTo initiate Mobile Watcher, navigate to your web app's root directory"
	description += " and enter the following command:\n\n";
	description += "\tsudo mobwatch init [PORT NUMBER]\n\n".yellow;
	description += "[PORT NUMBER] is an optional argument (without brackets). It defaults to 3000.\n";

	description += "You only need to run this once per web application.\n\nTo launch your web app, navigate to your web app's";
	description += " root directory and enter:\n\n";
	description += "\tmobwatch start\n".yellow;

	console.log(description);
};