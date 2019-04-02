const config = require('./config/config.js');

const { app, BrowserWindow } = require('electron')

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');




const events = require("events");


const ServerApi = require("./ServerApi");

var eventEmitter = new events.EventEmitter();
let api = new ServerApi();





api.start(eventEmitter);

app.on('ready', () => {

	eventEmitter.on("authed", () => {


		let win = new BrowserWindow({ width: 800, height: 600 })

		// win.setFullScreen(true);

		win.on('closed', () => {
			win = null
		})

		// Загрузка удалённого URL'а
		win.loadURL('https://github.com')

		// Или загрузка локального HTML файла
		win.loadURL('file://' + require('path').join(__dirname, 'templates/index.html'));



		win.webContents.on('did-finish-load', () => {
			api.listen(win.webContents);
		})
	})
})












