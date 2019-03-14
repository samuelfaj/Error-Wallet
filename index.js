#!/usr/bin/env node

/**
 *     error-wallet.js add <file> <prefix>
 *     error-wallet.js list <file>
 */

const self = require('./config');

switch (self.arguments[0]) {
    case "a":
    case "add":
        return require('./functions/add')();
    case "l":
    case "ls":
    case "list":
        return require('./functions/list')(self.arguments[1]);
    case "g":
    case "get":
        return require('./functions/get')(self.arguments[1]);
}

if(self.arguments[0]){
    return require('./functions/add')();
}else{
    return require('./functions/help')();
}
