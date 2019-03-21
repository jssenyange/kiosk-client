const WebSocket = require('ws');


module.exports = class ServerApi{

	constructor(){

		this.auth = false;
		this.program = null;
	}


	start(callback){

		this.init(callback);
		
		console.log("working");

	}


	init(onAuth){
		this.identifier = global.gConfig.identifier;
		this.server_port = global.gConfig.server_port;

		this.ws = new WebSocket('ws://localhost:'+this.server_port, {});


		let _this = this;

		_this.ws.on('open', function open(){
			let data = {
				"action": "auth",
				"identifier": _this.identifier
			};

			_this.ws.send(JSON.stringify(data), () => {
				_this.initListeners(onAuth);
			});
		});
	}

	initListeners(onAuth){
		const _this = this;

		//Just to see results
		_this.ws.on('message', function incoming(res){
			if(res){

				let respond = JSON.parse(res);

		
				if(respond.message == "program_data" && respond.data){

					_this.program = respond.data;

					if(!_this.auth){
						_this.auth = true;
						onAuth();
					}
				}
			}
		});

	}





	getProgram(){
		return this.program ? this.program : "hello_wordl";
	}

}



