const METHOD_NOT_IMPLEMENTED = "This method was not implemented."

class ApiImplementation {
    constructor() {}

    getClusterId(cb) {}

    deleteCluster(cb) {}

    getHosts(cb) {}
    
    updateHost(hostId, cb) {}
    
    deleteHost(hostId, cb) {}

    getContainers(cb) {}

    createContainers(applicationId, containerConfig, cb) {}

    deleteContainer(cb) {}

    getApplications(cb) {}

    createApplication(applicationDescription, cb) {}

    updateApplication(applicationId, newDescription, cb) {}

    deleteApplication(applicationId, cb) {}

    discoverPeers(cidr, cb) {}

    setDistributedKey(key, value, cb) {}

    getDistributedKey(key, cb) {}
}

module.exports = ApiImplementation;
