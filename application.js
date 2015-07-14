var fs = require("fs");
var _ = require("lodash");

function ContainershipPlugin(options){
    _.defaults(options, {
        initialize: function(core){},
        reload: function(){},
        type: "core",
        name: ""
    });

    _.merge(this, options);

    if(this.type == "core"){
        try{
            this.config = fs.readFileSync([process.env.HOME, ".containership", [this.name, "json"].join(".")].join("/"));
            this.config = JSON.parse(this.config);
        }
        catch(e){
            this.config = {};
        }
    }
    else{
        try{
            this.config = fs.readFileSync([process.env.HOME, ".containership", "cli.json"].join("/"));
            this.config = JSON.parse(this.config);
        }
        catch(e){
            this.config = {};
        }
    }
}

ContainershipPlugin.prototype.initialize;
ContainershipPlugin.prototype.reload;
ContainershipPlugin.prototype.type;
ContainershipPlugin.prototype.name;

module.exports = ContainershipPlugin;
