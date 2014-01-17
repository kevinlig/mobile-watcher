#! /usr/bin/env node

/*
 * Mobwatch
 * https://github.com/kevinlig/mobwatch
 *
 * Copyright (c) 2014 Kevin Li
 * Licensed under the MIT license.
 *
 * Watch for file changes and restart the ExpressJS server.
 */

var cordell = require('cordell');
 var simpler = require('simpler');
 var exec = require('child_process').exec;

 exports.watch = function(projectPath) {
 	var watcher = cordell.watch(projectPath);

 	var server = simpler('_mobwatch.js',[],function() {
		console.log("Server starting...");
	});

 	watcher.on("change:dir",function() {
 		console.log("Changes detected. Restarting server...".yellow);
 		server.stop();
 		server.start();
 	});
 };