// module variables
const config = require('./config.json');
const prodConfig = config.production;


// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = prodConfig;