var config  = require('../lib/manager').getConfig();

var path    = require('path');

exports.getTaskPaths = function(taskName) {
    var taskConfig = config[taskName],
        entry = taskConfig.entry,
        extensions = taskConfig.extensions,
        files = '/**/*';

    if (extensions) files += '.@('+ extensions.join('|') +')';
    if (entry) files = entry;

    var src = path.join(config.root.src, taskConfig.src, files),
        watchSrc = taskConfig.altSrc.map(function(altPath) {
            return path.join(altPath, files);
        });

    watchSrc.push(src);

    return {
        src: src,
        dest: path.join(config.root.dest, taskConfig.dest),
        watchSrc: watchSrc
    }
};

// '/**/*.{' + config.sass.extensions + '}';
// '/**/*.' + config.js.extensions;
// '/**/*';
// '/**/*.{' + config.images.extensions + '}';