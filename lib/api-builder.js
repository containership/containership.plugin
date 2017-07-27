'use strict';

const _ = require('lodash');

class ApiBuilder {

    constructor() {
        this.routes = [];
    }

    addRoute(method, path, handler) {
        this.routes =
            _.concat(this.routes,
                {method, path, handler});

        return this;
    }

    get(path, handler) {
        return this.addRoute('GET', path, handler);
    }

    post(path, handler) {
        return this.addRoute('POST', path, handler);
    }

    value() {
        return this.routes;
    }
}

module.exports = ApiBuilder;
