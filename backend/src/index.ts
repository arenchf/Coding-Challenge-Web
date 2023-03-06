import http from 'http';
import express from 'express';
import cors from 'cors';

var bodyParser = require('body-parser');
const app = express();
var jsonParser = bodyParser.json();
// const db = require('../data/gibberish-decoded.json');

const fs = require('fs');
const db = JSON.parse(
  Buffer.from(
    fs.readFileSync('./data/gibberish.enc', 'utf-8'),
    'base64'
  ).toString()
);

app.use(cors());

/**
 * /messages:
 *   get:
 *     summary: Retrieve a list of messages
 *     description: Retrieve a list of messages from the local database file.
 */
app.get('/messages', (_: express.Request, response: express.Response) => {
  response.status(200).json(db);
});

/**
 * /messages:
 *   post:
 *     summary: Save an incoming message
 *     description: Save an incoming message to the local database file.
 */
app.post(
  '/messages',
  jsonParser,
  (request: express.Request, response: express.Response) => {
    if (!request.headers['x-api-key']) {
      return response.sendStatus(403);
    }
    let newMsg = { sentAt: Math.floor(Date.now()), ...request.body };
    db.push(newMsg);
    response.status(201).send(newMsg);
  }
);

http.createServer(app);

const port = process.env.PORT || 1337;

app.listen(port);

console.log(`Running on port ${port}`);
