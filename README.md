# WebRTC Example
Basic audio-video comunicator example. ReactJS app is placed inside `public` folder and it's beeing served by a NodeJS server.

## Features
* basic notification mechanism
* two participants in the room
* unlimited rooms
* adding and removing rooms
* unrestricted room names

## Tech stack
* NodeJS with Express running the server
* Twilio establishing WebRTC connection
* ReactJS client's app
* Socket.io for handling WebSocket events
* Yarn - strongly recommended for running app

## Installation
1. Create your own self-signed SSL certificate and place it in `.ssl` folder. NodeJS for HTTPS connection require `server.cert` and `server.key`. While using MacOS ensure that you've added your generated certs to your keychain. You can use the following instruction:
```
 openssl req -nodes -new -x509 -keyout server.key -out server.cert
```
2. Copy `.env.template` file and rename it to `.env`. Replace values with the ones received from your [Twilio account](https://www.twilio.com/docs/iam/access-tokens).
3. Make sure you've installed all the packages both for server and client apps. To do this run `yarn install` in `/` and `/public` directories.
4. For local URL sharing HTTPS is required, so ensure that in `server.js` you've commented out line
```javascript
// const server = http.createServer(app);
```
simply leaving creating the HTTPS server
```javascript
const server = https.createServer({
  key: fs.readFileSync('./.ssl/server.key'),
  cert: fs.readFileSync('./.ssl/server.cert')
}, app);
```
5. To build and launch the server simply run `yarn start` in the root directory.

