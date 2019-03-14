const self = require('../config');

const config = self.get();

module.exports = function (code) {
    let found = false;

    for(let file of Object.keys(config.files)){
        for(let item of config.files[file].errors){
            if(item.code == code){
                console.log(`  * Error ${item.code} - ${item.error}`);
                found = true;
            }
        }
    }

    if(!found){
        console.log(`  - Error ${code} not found`);
    }
};