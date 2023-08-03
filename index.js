require('dotenv').config();

const express = require('express');

const router = require('./server/routes/api');

const app = express();

const port = 3000;

const mongoose = require('mongoose');

const errorHandlerMiddleware = require('./server/middleware/errorHandler');

const { Server, io } = require('socket.io');

const http = require('http');

const httpServer = http.createServer(app);

exports.io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

// io.on('connection', onConnection);

const MONGO_URL = process.env.MONGO_URL;

console.log(process.env.MONGO_URL);
if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL) // connect to mongodb
    .then(() => {
      console.log(`connected to MongoDB `);
    })
    .catch(error => {
      console.log('error connecting to MongoDB:', error.message);
    });
}
app.use(express.json());

app.use('/api', router);
app.use(errorHandlerMiddleware);

exports.server = httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`appp listening at http://localhost:${process.env.PORT}`);
});
