// index.js (file 1)

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const router = require('./server/routes/api');
const errorHandlerMiddleware = require('./server/middleware/errorHandler');
const { onConnection } = require('./server/controller/socket');
const { findOneAndUpdate } = require('./server/controller/codeblock');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;
if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('Connected to MongoDB.');
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error.message);
    });
}

io.on('connection', socket => {
  console.log('connection');

  socket.on('update', async ({ content, id }) => {
    findOneAndUpdate(id, content);
    console.log(content);
    io.emit('updateBack', { content });
  });

  socket.on('disconnect', () => {});
});

app.use('/api', router);
app.use(errorHandlerMiddleware);

exports.io = io;

exports.server = httpServer.listen(process.env.PORT || 5000, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
