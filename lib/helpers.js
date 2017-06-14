var config  = require('../lib/manager').getConfig();

var path    = require('path');

exports.getTaskPaths = function(taskName) {
    var taskConfig = config[taskName],
        extensions = taskConfig.extensions,
        glob = '/**/*';

    if (extensions) {
        glob = glob + '.@('+ extensions.join('|') +')';
    }

    var src = path.join(config.root.src, taskConfig.src, glob),
        watchSrc = taskConfig.altSrc.map(function(altPath) {
            return path.join(altPath, glob);
        });

    watchSrc.push(src);

    console.log( {
        src: src,
        dest: path.join(config.root.dest, taskConfig.dest),
        watchSrc: watchSrc
    });

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