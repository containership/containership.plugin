containership.plugin
==================

##About

###Description
A helper module to easily create ContainerShip plugins.

###Author
ContainerShip Developers - developers@containership.io

##Usage

###Install
`npm install containership.plugin --save`

###Options
* `type` - the type of plugin ("core", "cli", or ["core", "cli"])
* `initialize` - the function which will run when the plugin is initailized
* `reload` - the function which will run when ContainerShip receives a SIGHUP, and the plugins are reloaded

###Example
```javascript
var ContainershipPlugin = require("containership.plugin");

module.exports = new ContainershipPlugin({
    type: "core",

    initialize: function(core){
        console.log("plugin initialized!");
    },

    reload: function(){
        console.log("ContainerShip reloaded, plugin will exit!");
    }
});
```

##Contributing
Pull requests and issues are encouraged!
