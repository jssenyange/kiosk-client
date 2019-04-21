const { ipcRenderer } = require('electron');

module.exports = class Interactor{

	constructor(){
		this.timer = null;


	}


	add(data){
		if(this.timer == null){

			this.startTimer();


			ipcRenderer.send("interaction", data);
		}
	}


	startTimer(){
		let that = this;

		this.timer = setTimeout(() => {
			
			that.timer = null;

		}, 1000);
	}

}

