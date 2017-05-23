const fs = require('fs');
const _ = require('lodash');

const { CSHost } = require('@jeremykross/containership.host-types');

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';

const CONFIG_DIR = `${process.env.HOME || '/root'}/.containership`;

class ContainershipPlugin {
    constructor(opts) {
        const { name, description, version, types } = opts;
        this.name = name;
        this.description = description;
        this.version = version || 'v2';
        this.types = types || [ ContainershipPlugin.PluginTypes.CORE ];
        this.config = {cli: {}, core: {}};

        this.type = types;

        this.commands = [];

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

        console.log("Loading config at: " + CONFIG_DIR + "/" + name + ".json");

        const coreConfig = this.safeParse(this.safeRead(`${CONFIG_DIR}/${name}.json`));
        const cliConfig = this.safeParse(this.safeRead(`${CONFIG_DIR}/cli.json`)); 

        this.config = {
            core: coreConfig,
            cli: cliConfig
        };
    }

    //Shim for backward compatibility.
    initialize(core) {
        if(core) {
            core.cluster.legiond.on('myriad.bootstrapped', () => {
                const host = new CSHost(core);
                this.start(host);
            });
        }
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
