const self = require('../config');

const config = self.get();
const error = {
    add: function (file, error) {
        if(!config.files[file]){ prefix.add(file); }

        const last_error = config.files[file].errors[config.files[file].errors.length -1];
        const last_code = config.files[file].errors.length > 0
            ? +last_error.code.toString().replace(config.files[file].prefix, '')
            : -1;

        const code = +(config.files[file].prefix.toString() + (last_code + 1));

        config.files[file].errors.push({ code: code, error: error });
        self.save(config);

        return code;
    }
};
const prefix = {
    add: function (file, prefix) {
        if(!prefix){
            prefix = (config.prefix[config.prefix.length -1] || 0) + 1;
        }

        if(config.prefix.indexOf(prefix) > -1){
            throw new Error("Error - Prefix " + prefix + " already exists");
        }

        if(!isNaN(parseFloat(prefix)) && isFinite(prefix)){
            prefix = +prefix;
        }

        config.prefix.push(prefix);
        config.files[file] = {
            prefix: prefix,
            errors: []
        };
        self.save(config);

        return prefix;
    }
};

module.exports = function () {
    if(self.arguments[1] === "p"){
        const p = prefix.add(self.arguments[2], self.arguments[3]);
        console.log(`  * - Error prefix ${p} successfully stored for file ${self.arguments[2]}!`)
    }
    else if(self.arguments[1] === "e"){
        const e = error.add(self.arguments[2], self.arguments[3]);
        console.log(`  * - Error ${e} - ${self.arguments[3]} successfully stored for file ${self.arguments[2]}!`)
    }
    else if (self.arguments[1] && self.arguments[2]){
        const e = error.add(self.arguments[1], self.arguments[2]);
        console.log(`  * - Error ${e} - ${self.arguments[2]} successfully stored for file ${self.arguments[1]}!`)
    }
    else{
        const e = error.add(self.arguments[0], self.arguments[1]);
        console.log(`  * - Error ${e} - ${self.arguments[1]} successfully stored for file ${self.arguments[0]}!`)
    }
};