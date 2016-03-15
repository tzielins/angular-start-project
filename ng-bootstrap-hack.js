// .ng2-bootstrap-hack.js

//base on so question and answer
//http://stackoverflow.com/questions/35648347/importing-ng2-bootstrap-changes-my-tsc-output-directory-structure
//------------

var fs = require('fs-extra')
var glob = require("glob");

var options = { ignore: '**/*.d.ts'};

glob("node_modules/ng2-bootstrap/**/*.ts", options, function (er, files) {
    for(i in files){
        removeFile(files[i]);
    }
});

removeFile = function(file){
    fs.remove(file, function (err) {
        if (err) return console.error(err)
    })
}
