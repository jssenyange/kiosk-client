const config = require('./config/config.js');


const ServerApi = require("./ServerApi");
const oak = require('oak');
let api = new ServerApi();



api.start( () => {

	console.log(api.getProgram());





	oak.on('ready', () => {


		oak.load({
			url: 'http://www.mywebapp.com'
		})


	})



});
