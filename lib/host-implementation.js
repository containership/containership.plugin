class HostImplementation {

    constructor(mode, leaderIP, apiPort) {
        this.mode = mode;
        this.leaderIP = leaderIP;
        this.apiPort = apiPort;

        this.isControllingLeader = false;
    }

    setLeaderIPAndPort(leaderIP, apiPort) {
        this.leaderIP = leaderIP;
        this.apiPort = apiPort;
    }

    setOperatingMode(mode) {
        this.mode = mode;
    }

    getOperatingMode() {
        return this.mode;
    }

    setIsControllingLeader(v) {
        if(this.isLeader()) {
            this.isControllingLeader = v;
        } else {
            if(v) throw new Error("Cannot set controlling leader on non-leader node.");
        }
    }

    isControllingLeader() {
        return this.isControllingLeader;
    }

    isLeader() {
        return this.mode === HostImplementation.MODES.LEADER;
    }

    getApiIP() {
        return this.leaderIP;
    }

    getApiPort() {
        return this.apiPort;
    }

    getApiBaseUrl() {
        return `http://${this.leaderIP}:${this.apiPort}`;
    }

    // Override as needed.
    getApiVersion() {
        return "v1";
    }

    /* To be implemented in subclasses.
     * ----
     */
    
    getApi() {}

    registerListener(eventName, cb) {}
    unregisterListener(eventName) {}

    getAttributes() {}
    setAttributes(attrs) {}

    getClusterPeers() {}
    getClusterId() {}

    /* ----
     */
    
}

HostImplementation.MODES = {
    LEADER: 'leader', 
    FOLLOWER: 'follower'
}

module.exports = HostImplementation;
