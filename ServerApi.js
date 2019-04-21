const WebSocket = require('ws');


module.exports = class ServerApi{

	constructor(){

		this.auth = false;
		this.program = null;
		this.template = 'file://' + require('path').join(__dirname, 'templates/index.html');
	}




	listen(win){
		this.win = win;

		this.ws.send(JSON.stringify({
			"action": "program"
		}))


	}


	sendFrame(frame){

		let that = this;

		let data = {
			"action": "frame",
			"frame": frame,
			"identifier": that.identifier
		};

		try{
			this.ws.send(JSON.stringify(data));
		} catch(e){
			// console.log(e);
		}

	}

	sendInteraction(data){
		let that = this;

		data.action = "interaction";
		data.identifier = this.identifier;


		try{
			console.log("helo");
			this.ws.send(JSON.stringify(data));
		} catch(e){
			// console.log(e);
		}
	}

	start(eve){
		this.eve = eve;

		try{
			return this.init();
			console.log("working");
		} catch(e){
			console.log(e);
			console.log("Ti chto tupoy?");
		}

	}


	init(){
		this.identifier = global.gConfig.identifier;
		this.server_port = global.gConfig.server_port;

		this.ws = new WebSocket('ws://localhost:'+this.server_port, {});

		this.ws.on('error', (err) => {
			console.error("Error");
			console.log(err);
		});

		var _this = this;

		_this.ws.on('open', function open(){
			let data = {
				"action": "auth",
				"identifier": _this.identifier
			};

			_this.ws.send(JSON.stringify(data));

		});


		_this.ws.on('message', function incoming(res){

			if(res){
				let respond = JSON.parse(res);
				if(respond.message == "authed"){
					_this.auth = true;

					_this.eve.emit("authed");
				}else if(respond.message == "program_data" && respond.data){
					
					_this.program = respond.data;

					console.log(_this.program);
					_this.win.send("program_loaded", respond);

				}else if(respond.message == "template" && respond.data){
					_this.template = respond.data.htmlfile;

					console.log(_this.template);
					_this.win.send("template_loaded", respond);
				}
			}
		});

	}


	getProgram(){
		return this.program ? this.program : false;
	}

}




