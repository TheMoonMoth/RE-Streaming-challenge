const express = require('express');
const ffmpeg = require('ffmpeg');
const FfmpegCommand = require('fluent-ffmpeg');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.json({
    message: 'Welcome',
    availableRoutes: {
			'/metadata': 'Json representation of metadata and info configuration',
			'/convert': 'Processes video into multiple bitrate ts segments',
    }
  });
});


app.get('/metadata', (request, response) => {
  try {
		const process = new ffmpeg('assets/tos-teaser.mp4');
		process.then(video => {
			console.log('METADATA=', video.metadata);
			console.log('CONFIG=', video.info_configuration);
			response.json({
				metadata: video.metadata,
				config: video.info_configuration
			})
		}, error => {
			console.log('ERROR >>> ', error);
			response.json({
				error
			});
		});
	} catch (error) {
		console.log(error.code);
		console.log(error.msg);
		response.json({
			error
		});
	}
});

app.get('/convert', (req, res) => {
	const highBitrateCommand = new Promise((resolve, reject) => FfmpegCommand('assets/tos-teaser.mp4').outputOptions(['-b:v 6000k', '-s 1280x720', '-hls_time 6', '-hls_list_size 0', '-f hls']).output('./assets/highBitstream.m3u8').run());
	const medHighBitrateCommand = new Promise((resolve, reject) => FfmpegCommand('assets/tos-teaser.mp4').outputOptions(['-b:v 4800k', '-s 1280x720', '-hls_time 6', '-hls_list_size 0', '-f hls']).output('./assets/medHighBitstream.m3u8').run());
	const medBitrateCommand = new Promise((resolve, reject) => FfmpegCommand('assets/tos-teaser.mp4').outputOptions(['-b:v 3600k', '-s 960x540', '-hls_time 6', '-hls_list_size 0', '-f hls']).output('./assets/medBitstream.m3u8').run());
	const medLowBitrateCommand = new Promise((resolve, reject) => FfmpegCommand('assets/tos-teaser.mp4').outputOptions(['-b:v 2400k', '-s 960x540', '-hls_time 6', '-hls_list_size 0', '-f hls']).output('./assets/medLowBitstream.m3u8').run());
	const lowBitrateCommand = new Promise((resolve, reject) => FfmpegCommand('assets/tos-teaser.mp4').outputOptions(['-b:v 1100k', '-s 640x360', '-hls_time 6', '-hls_list_size 0', '-f hls']).output('./assets/lowBitstream.m3u8').run());

	Promise.all([
		highBitrateCommand,
		medHighBitrateCommand,
		medBitrateCommand,
		medLowBitrateCommand,
		lowBitrateCommand
	]).then(result => {
		console.warn('slime result', result);
		res.json({
			message: 'video proccessing complete',
			result,
		});
	});
});

app.listen(5000, () => {
  console.log('Listening on port 5000!');
});