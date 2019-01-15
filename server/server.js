'use strict';

require('dotenv').load();

const http = require('http')
const https = require('https')
const fs = require('fs')
const path = require('path');
const cors = require('cors');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const express = require('express');

const app = express();

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../client/build')));

app.get('/token', (request, response) => {
  const identity = request.query.identity || 'Joe';

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  token.identity = identity;

  const grant = new VideoGrant();
  token.addGrant(grant);

  response.send({
    identity: identity,
    token: token.toJwt()
  });
});

const httpsOptions = {
  key: fs.readFileSync('./.ssl/server.key'),
  cert: fs.readFileSync('./.ssl/server.cert')
}

const server = https.createServer(httpsOptions, app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Express server running on *:' + port);
});
