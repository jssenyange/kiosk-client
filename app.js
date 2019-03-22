const config = require('./config/config.js');


const ServerApi = require("./ServerApi");
const oak = require('oak');

let api = new ServerApi();



api.start( () => {


});


oak.on('ready', () => {


	oak.load({
		url: 'file://' + require('path').join(__dirname, 'templates/index.html'),
		fullscreen: false,
		frame: true,
	})


})

