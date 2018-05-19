var path = require("path"),
    
    CSSPlugin = require("modular-css-webpack/plugin");
 
module.exports = {
    entry   : "./src/routes.js",
    output  : {
        "path"     : "./bin",
        "filename" : "app.js"
    },
    module : {
        rules : [{
            test : /\.css$/,
            use  : "modular-css-webpack/loader"
        }]
    },
    plugins : [
        new CSSPlugin({
            css  : "./style.css",
            json : "./classes.json"
        })
    ]
};