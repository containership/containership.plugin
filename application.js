var fs = require("fs");
var _ = require("lodash");

function ContainershipPlugin(options){
    var self = this;

    _.defaults(options, {
        initialize: function(core){},
        reload: function(){},
        type: "core",
        name: ""
    });

    _.merge(this, options);

    this.get_config = function(type){
        if(_.isUndefined(type) && _.isString(self.type))
            type = self.type;
        else if(_.isUndefined(type) && _.isArray(self.type))
            type = _.first(self.type);

        if(type == "core"){
            try{
                var config = fs.readFileSync([process.env.HOME, ".containership", [self.name, "json"].join(".")].join("/"));
                return JSON.parse(config);
            }
            catch(e){
                return {};
            }
        }
        else if(type == "cli"){
            try{
                var config = fs.readFileSync([process.env.HOME, ".containership", "cli.json"].join("/"));
                return JSON.parse(config);
            }
            catch(e){
                return {};
            }
        }
    }
}

ContainershipPlugin.prototype.initialize;
ContainershipPlugin.prototype.reload;
ContainershipPlugin.prototype.type;
ContainershipPlugin.prototype.name;

module.exports = ContainershipPlugin;
