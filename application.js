var _ = require("lodash");

function ContainershipPlugin(options){
    _.defaults(options, {
        initialize: function(core){},
        reload: function(){},
        type: "core"
    });

    _.merge(this, options);
}

ContainershipPlugin.prototype.initialize;
ContainershipPlugin.prototype.reload;
ContainershipPlugin.prototype.type;

module.exports = ContainershipPlugin;
