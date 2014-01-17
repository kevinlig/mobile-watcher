#! /usr/bin/env node

/*
 * Mobwatch
 * https://github.com/kevinlig/mobwatch
 *
 * Copyright (c) 2014 Kevin Li
 * Licensed under the MIT license.
 *
 * Generate the ExpressJS app based on the app template
 */

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

exports.initMobwatch = function(projectPath, port) {
	// determine where our supporting files live
	var templateDir = path.join(path.dirname(fs.realpathSync(__filename)),"./template");

	// open up the ExpressJS app template
	fs.readFile(templateDir + "/_mobwatch.js", "utf8", function(error, data) {
		if (error) {
			console.log("An error occurred while creating the Mobile Watcher.".yellow);
			console.log(error);
			return;
		}

		var appContents = data.replace(/MYPORT/g, port);

		fs.writeFile(projectPath + "/_mobwatch.js", appContents, "utf8", function(error) {
			if (error) {
				console.log("An error occurred while creating the Mobile Watcher.".yellow);
				console.log(error);
				return;
			}


			// also copy over the package.json
			var writePackage = fs.createReadStream(templateDir + "/package.json").pipe(fs.createWriteStream(projectPath + "/package.json"));
			// callback for package completion
			writePackage.on("close", function() {
				console.log("Initial files generated.");

				console.log("\nInstalling project dependencies...");

				// now that everything is in place, install the app dependencies
				// hacky but meh
				var install = exec("npm --prefix " + projectPath + " install", function(error, stdout, stderror) {
					// display output
					if (error) {
						console.log("Mobwatch could not install the dependencies automatically. Run npm install in your web app folder manually.".yellow);
						return;
					}

					// show command output
					console.log(stdout);	
					console.log(stderror);

					// and we're done!
					console.log("Done!".green);
				});
			});


		});
	});
}