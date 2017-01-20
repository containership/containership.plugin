const fs = require('fs');
const _ = require('lodash');

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';

const CONFIG_DIR = `${process.env.HOME || '/root'}/.containership`;

class ApiBuilder {

    constructor() {
        this.routes = [];
    }

    httpVerb(method, path, handler) {
        this.routes = 
            _.concat(this.routes, 
                {method, path, handler});

        return this;
    }

    get(path, handler) {
        return httpVerb(GET, path, handler);
    }

    post(path, handler) {
        return httpVerb(POST, path, handler);
    }

    getRoutes() {
        return this.routes;
    }
}

class ContainershipPlugin {
    constructor(opts) {
        const { name, description, version, types } = opts;
        this.name = name;
        this.description = description;
        this.version = version || 'v2';
        this.types = types || [ ContainershipPlugin.PluginTypes.CORE ];
        this.apiBuilder = new ApiBuilder();
        this.config = {cli: {}, core: {}};

        this.loadConfigSync();
    }

    api() {
        return this.apiBuilder;
    }

    safeParse(v) {
        try {
            return JSON.parse(v);
        } catch(err) {
            return {};
        }
    }

    loadConfigSync() {
        const name = _.startsWith(this.name, 'containership.plugin.') ? 
            _.replace(this.name, 'containership.plugin.', '') :
            this.name;

        const coreConfig = this.safeParse(fs.readFileSync(`${CONFIG_DIR}/${name}.json`));
        const cliConfig = this.safeParse(fs.readFileSync(`${CONFIG_DIR}/cli.json`)); 

        this.config = {
            core: coreConfig;
            cli: cliConfig;
        };
    }


    start(host) {
        if(host.getOperatingMode() === 'leader') {
            this.startLeader(host);
        } else {
            this.startFollower(host);
        }
    }
    startLeader(host) {}
    startFollower(host) {}

    stop(host) {
        if(host.getOperatingMode() === 'leader') {
            this.stopLeader(host);
        } else {
            this.stopFollower(host);
        }
    }
    stopLeader(host) {}
    stopFollower(host) {}

    restart(host) {
        if(host.getOperatingMode() === 'leader') {
            this.restartLeader(host);
        } else {
            this.restartFollower(host);
        }
    }
    restartLeader(host) {}
    restartFollower(host) {}
}

ContainershipPlugin.PluginTypes = {
    CLI: 'cli',
    CORE: 'core'
}


module.exports = ContainershipPlugin;
