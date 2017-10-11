const path          = require('path');
const defaultConfig = require('../config.json');
const projectRoot   = process.env.PROJECT_ROOT ? process.env.PROJECT_ROOT : process.mainModule.paths[0].split('node_modules')[0].slice(0, -1);
const customConfig  = require(path.join(projectRoot, 'gulpconfig.json'));
console.log(projectRoot);
var deepExtend      = require('deep-extend');

/* TODO: Expose high level api of config
 e.g. config.activeTasks or config.computedSrc…
 */

// TODO: Cache ActiveTasks by env
var config = config || deepExtend(defaultConfig, customConfig);

exports.getConfig = function() {
    return config;
};

exports.getProjectRoot = function() {
    return projectRoot;
};

exports.getActiveTasks = function(env) {
    return !env ?
        config.activeTasks :
        config.activeTasks.map(function(taskName) {
            return taskName + ':' + env;
        });
};