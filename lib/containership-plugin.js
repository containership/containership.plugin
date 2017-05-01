const fs = require('fs');
const _ = require('lodash');

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';

const CONFIG_DIR = `${process.env.HOME || '/root'}/.containership/plugins`;

class ContainershipPlugin {
    constructor(opts) {
        const { name, description, version, types } = opts;
        this.name = name;
        this.description = description;
        this.version = version || 'v2';
        this.types = types || [ ContainershipPlugin.PluginTypes.CORE ];
        this.config = {cli: {}, core: {}};

        this.loadConfigSync();
    }

    safeParse(v) {
        try {
            return JSON.parse(v);
        } catch(err) {
            return {};
        }
    }

    safeRead(f) {
        try {
            return fs.readFileSync(f);
        } catch(err) {
            return null;
        }
    }

    getApiRoutes() {
        return [];
    }

    loadConfigSync() {
        const name = _.startsWith(this.name, 'containership.plugin.') ? 
            _.replace(this.name, 'containership.plugin.', '') :
            this.name;

        const coreConfig = this.safeParse(this.safeRead(`${CONFIG_DIR}/${name}.json`));
        const cliConfig = this.safeParse(this.safeRead(`${CONFIG_DIR}/cli.json`)); 

        this.config = {
            core: coreConfig,
            cli: cliConfig
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
