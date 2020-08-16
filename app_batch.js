'use strict';

try {
    //var app = require("./run_exec");
    var app = require("./run_batch");
    app.start();

} catch (err) {
    console.log(err);
    console.log(err.name + ': ' + err.message);
    process.exit(-1);
}

process.on("exit", function () {
    process.exit(1);
});
