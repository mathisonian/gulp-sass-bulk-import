
'use strict';

var through = require('through2');
var glob = require('glob');
var _ = require('lodash');

module.exports = function() {

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

            _.each(files, function(filename) {
                replaceString += '@import "' + filename + '";\n';
            });

            contents = contents.replace(sub, replaceString);

        }

        file.contents = new Buffer(contents);
        cb(null, file);
    };

    return through.obj(transform);
};
