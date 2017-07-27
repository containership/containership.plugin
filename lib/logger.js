'use strict';

module.exports = {

    info: function(...args) {
        return this._log('info', ...args);
    },

    warn: function(...args) {
        return this._log('warn', ...args);
    },

    trace: function(...args) {
        return this._log('trace', ...args);
    },

    error: function(...args) {
        return this._log('error', ...args);
    },

    _log: function(level, ...args) {
        // eslint-disable-next-line no-console
        return console[level](...args);
    }

};
