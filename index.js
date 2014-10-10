'use strict';

var gutil = require('gulp-util');
var map = require('map-stream');
var path = require('path');
var spawn = require('child_process').spawn;

var plugin = {
  name: 'gulp-gulp'
};

module.exports = function() {
  process.env.PATH += ':' + path.join(__dirname, 'node_modules', '.bin');

  return map(function(file, cb) {
      var gulpGulp = spawn('gulp', [
        '--gulpfile=' + file.path
      ], {
        env: process.env,
        stdio: 'inherit'
      });

      gulpGulp.on('close', function(code) {
        var error;

        if (code && 65 !== code) {
          error = new gutil.PluginError(plugin.name, plugin.name + ': returned ' + code);
        }

        cb(error, file);
      });
   });
};