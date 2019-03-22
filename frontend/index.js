import * as cocoSsd from '@tensorflow-models/coco-ssd';




function initTensor(){
		navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {

		var video = document.getElementById('camera');
		video.srcObject = stream;


		var renderPredictions = predictions => {
			  const canvas = document.getElementById("canvas");
			  
			  const ctx = canvas.getContext("2d");
			  canvas.width  = 300;
			  canvas.height = 300;
			  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			  // Fonts
			  const font = "16px sans-serif";
			  ctx.font = font;
			  ctx.textBaseline = "top";
			  ctx.drawImage(video,0, 0,300,300);
			predictions.forEach(prediction => {
			  const x = prediction.bbox[0];
			  const y = prediction.bbox[1];
			  const width = prediction.bbox[2];
			  const height = prediction.bbox[3];
			  // Bounding box
			  ctx.strokeStyle = "#00FFFF";
			  ctx.lineWidth = 2;
			  ctx.strokeRect(x, y, width, height);
			  // Label background
			  ctx.fillStyle = "#00FFFF";
			  const textWidth = ctx.measureText(prediction.class).width;
			  const textHeight = parseInt(font, 10); // base 10
			  ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
			});
			predictions.forEach(prediction => {
			  
			  const x = prediction.bbox[0];
			  const y = prediction.bbox[1];
			  ctx.fillStyle = "#000000";
			  ctx.fillText(prediction.class, x, y);});
		};

		var detectFrame = (video, model) => {
			model.detect(video).then(predictions => {
				console.log(predictions);
			renderPredictions(predictions);
			requestAnimationFrame(() => {
				detectFrame(video, model);});
			}).catch( (e) => {
				console.log(e);
			});
		}

		async function predictWithCocoModel()
		{
		
			const model = await cocoSsd.load('lite_mobilenet_v2');
			console.log(model);
			detectFrame(video,model);

		}


		predictWithCocoModel();

	}).catch(function(e) {
		alert('could not connect stream');
	});

}



