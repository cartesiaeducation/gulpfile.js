const manager      = require('../lib/manager');
const config       = manager.getConfig();
const projectRoot  = manager.getProjectRoot();

const path    = require('path');

exports.getTaskPaths = function(taskName) {
    const taskConfig  = config[taskName],
        devEntry    = taskConfig.devEntry && "{" + taskConfig.devEntry.join(',') + "}",
        extensions  = taskConfig.extensions,
        altSrc      = taskConfig.altSrc;

    // Glob declarations
    const allFiles            = '/**/*',
        filesWithExtensions = extensions ? '/**/*.@('+ extensions.join('|') +')' : null;

    // File selection ordering
    const srcFiles = filesWithExtensions || allFiles;

    // Build array of watchable files from source and alternative sources
    const watchSrc =
        altSrc.map(function(altPath) {
            return path.join(projectRoot, altPath, srcFiles);
        }).concat([path.join(projectRoot, config.root.src, taskConfig.src, srcFiles)]);

    return {
        devSrc: devEntry && path.join(projectRoot, config.root.src, taskConfig.src, devEntry),
        src: path.join(projectRoot, config.root.src, taskConfig.src, srcFiles),
        dest: path.join(projectRoot, config.root.dest, taskConfig.dest),
        watchSrc: watchSrc
    }
};