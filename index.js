const express = require('express');
const ffmpeg = require('ffmpeg');
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors())

app.get('/ffmpeg', (req, res) => {
	const process = new ffmpeg('assets/tos-teaser.mp4');
	process.then(video => {
		console.log(video);
		res.json(video);
	});
})

app.get('/', (request, response) => {
  response.json({
    message: 'Welcome',
    availableRoutes: {
			"/video-setup": "sample video setup step, visible as part of process",
			"/metadata": 'Json representation of metadata and info configuration',
    }
  })
})

app.get('/video-setup', (request, response) => {
  try {
		new ffmpeg('assets/tos-teaser.mp4', function (err, video) {
			if (!err) {
				console.log('The video is ready to be processed');
				response.json({
					message: 'The video is ready to be processed'
				})
			} else {
				console.log('Error: ' + err);
				response.json({
					error: err
				})
			}
		});
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
		response.json({
			error: e
		})
	}
});

app.get('/metadata', (request, response) => {
  try {
		const process = new ffmpeg('assets/tos-teaser.mp4');
		process.then(video => {
			console.log("METADATA=", video.metadata);
			console.log("CONFIG=", video.info_configuration);
			response.json({
				metadata: video.metadata,
				config: video.info_configuration
			})
		}, error => {
			console.log("ERROR >>> ", error);
			response.json({
				error
			})
		})
	} catch (error) {
		console.log(error.code);
		console.log(error.msg);
		response.json({
			error
		})
	}
});

app.listen(5000, () => {
  console.log('Listening on port 5000!')
})