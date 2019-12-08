const express = require('express');
const ffmpeg = require('ffmpeg');
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.get('/', (request, response) => {
  response.json({
    message: 'Welcome',
    availableRoutes: {
      "/manifest": "A json readout of ffmpeg created manifest"
    }
  })
})

app.get('/video', (request, response) => {
  try {
		new ffmpeg('~/assets/tos-teaser.mp4', function (err, video) {
			if (!err) {
				console.log('The video is ready to be processed');
			} else {
				console.log('Error: ' + err);
			}
		});
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
	}
});

app.listen(5000, () => {
  console.log('Listening on port 5000!')
})