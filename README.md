Please clone the repo and follow these steps

Move into project:
`cd RE-Streaming-challenge`

Install dependencies:
`npm install`

If FFmpeg is not already installed on your machine please run:
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` to install Homebrew, then: 
`brew install ffmpeg`

To run the server use:
`npm start`

Run this to create ts segments at 6000k/s bitrate as well as a m3u8
`npm run create-ts-segments`

Site will be available at 'localhost:5000/'

Visit route `/convert` to initiate conversion of video into multiple bitrates