const config = require('./config/config.js');


const ServerApi = require("./ServerApi");

let api = new ServerApi();



api.start( () => {


});
// const oak = require('oak');

// oak.on('ready', () => {

// 	oak.load({
// 		url: 'http://www.mywebapp.com'
// 	})


// })

