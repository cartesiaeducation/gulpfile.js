const defaultConfig = require('../config.json');
const customConfig  = require('../../gulpconfig.json');

var deepExtend      = require('deep-extend');

/* TODO: Expose high level api of config
   e.g. config.activeTasks or config.computedSrc…
*/

// TODO: Cache ActiveTasks by env
var config;

if (!config) {
    config = deepExtend(defaultConfig, customConfig);
}

exports.getConfig = function() {
    return config;
};

exports.getActiveTasks = function(env) {
    return !env ?
        config.activeTasks :
        config.activeTasks.map(function(taskName) {
            return taskName + ':' + env;
        });
};