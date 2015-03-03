
'use strict';

var path = require('path');
var fs = require('fs');
var through = require('through2');
var glob = require('glob');

module.exports = function() {

    var process = function(filename) {
        var replaceString = '';

        if (fs.statSync(filename).isDirectory()) {
            fs.readdirSync(filename).forEach(function (file) {
                replaceString += process(filename + path.sep + file);
            });
            return replaceString;
        } else {
            return '@import "' + filename + '";\n'
        }
    }

    var transform = function(file, env, cb) {

        // find all instances matching
        var contents = file.contents.toString('utf-8');

        var reg = /@import\s+\"([^\"]*\*[^\"]*)\";/;
        var result;

        while((result = reg.exec(contents)) !== null) {

            var index = result.index;
            var sub = result[0];
            var globName = result[1];

            var files = glob.sync(file.base + globName);
            var replaceString = '';

            files.forEach(function(filename){
                replaceString += process(filename);
            });

            contents = contents.replace(sub, replaceString);

        }

        file.contents = new Buffer(contents);
        cb(null, file);
    };
    return through.obj(transform);
};
