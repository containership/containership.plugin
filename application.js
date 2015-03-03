var fs = require("fs");
var _ = require("lodash");

function ContainershipPlugin(options){
    _.defaults(options, {
        initialize: function(core){},
        reload: function(){},
        type: "core"
    });

    _.merge(this, options);

    this.config = fs.readFileSync([process.env.HOME, ".containership", "cli.json"].join("/"));
    this.config = JSON.parse(this.config);
}

ContainershipPlugin.prototype.initialize;
ContainershipPlugin.prototype.reload;
ContainershipPlugin.prototype.type;

module.exports = ContainershipPlugin;
