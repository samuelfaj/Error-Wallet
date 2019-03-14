process.argv.splice(0,2);

const fs = require("fs");
const arguments = process.argv;

const config = {
    name: "error-wallet.json",
    original: { "prefix": [], "files": {} }
};

exports.config = config;
exports.arguments = arguments;
exports.save = function (content) {
    return fs.writeFileSync(
        process.cwd() + '/' + config.name,
        (typeof content !== "string") ? JSON.stringify(content, null, 2) : content
    );
};

if (!fs.existsSync(process.cwd() + '/' + config.name)) {
    exports.save(JSON.stringify(config.original));
    console.log("  * - ERROR-WALLET - Configuration file wrote.");
}

exports.get = function(){
    return JSON.parse(fs.readFileSync(process.cwd() + '/' + config.name));
};

