const self = require('../config');

const config = self.get();

module.exports = function (file) {
    if(!config.files[file]){
        console.log(`  * - ${file} has no stored errors`);
    }

    for(let item of config.files[file].errors){
        console.log(`  * Error ${item.code} - ${item.error}`);
    }
};