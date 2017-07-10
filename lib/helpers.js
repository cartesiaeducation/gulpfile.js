var config  = require('../lib/manager').getConfig();

var path    = require('path');

exports.getTaskPaths = function(taskName) {
    var taskConfig  = config[taskName],
        extensions  = taskConfig.extensions,
        altSrc      = taskConfig.altSrc;

    // Glob declarations
    var allFiles            = '/**/*',
        filesWithExtensions = extensions ? '/**/*.@('+ extensions.join('|') +')' : null;

    // File selection ordering
    var srcFiles = filesWithExtensions || allFiles;

    // Build array of watchable files from source and alternative sources
    var watchSrc =
        altSrc.map(function(altPath) {
            return path.join(altPath, srcFiles);
        }).concat([path.join(config.root.src, taskConfig.src, srcFiles)]);

    return {
        src: path.join(config.root.src, taskConfig.src, srcFiles),
        dest: path.join(config.root.dest, taskConfig.dest),
        watchSrc: watchSrc
    }
};