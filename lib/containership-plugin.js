'use strict';

const logger = require('./logger');

const fs = require('fs');
const _ = require('lodash');

const { CSHost } = require('@containership/containership.cs.bridge');

// Check path for different cli versions.
const CONFIG_DIR = `${process.env.HOME || '/root'}/.containership/plugins`;

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

        logger.info('Loading config at: ' + CONFIG_DIR + '/' + name + '.json');

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
            const startPlugin = () => {
                logger.info('Starting plugin.');

                const host = new CSHost(core);
                this.start(host);

                const routes = this.getApiRoutes(host);
                logger.info('Have routes: ' + routes);

                _.forEach(routes, (route) => {
                    logger.info('Installing route: ' + route.method + ': ' + route.path);

                    if(route.method === 'GET') {
                        const fullRoute = `/v1/${this.name}${route.path}`;

                        logger.info('Instaling route: ' + fullRoute);

                        core.api.server.server.get(fullRoute, route.handler);
                    }
                });
            };

            core.cluster.legiond.on('myriad.bootstrapped', () => {
                startPlugin();
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

    startLeader(host) {
        if(!host) {
            throw new Error('Start leader must be called with a host!');
        }
    }

    startFollower(host) {
        if(!host) {
            throw new Error('Start follower must be called with a host!');
        }
    }

    stop(host) {
        if(host.getOperatingMode() === 'leader') {
            this.stopLeader(host);
        } else {
            this.stopFollower(host);
        }
    }

    stopLeader(host) {
        if(!host) {
            throw new Error('Stop leader must be called with a host!');
        }
    }

    stopFollower(host) {
        if(!host) {
            throw new Error('Stop follower must be called with a host!');
        }
    }

    restart(host) {
        if(host.getOperatingMode() === 'leader') {
            this.restartLeader(host);
        } else {
            this.restartFollower(host);
        }
    }

    restartLeader(host) {
        if(!host) {
            throw new Error('Restart leader must be called with a host!');
        }
    }

    restartFollower(host) {
        if(!host) {
            throw new Error('Restart follower must be called with a host!');
        }
    }
}

ContainershipPlugin.PluginTypes = {
    CLI: 'cli',
    CORE: 'core'
};


module.exports = ContainershipPlugin;
