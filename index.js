const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const MONGO_URL =
  'mongodb+srv://taldavidi1993:LMfzlSzkDoUjETFS@cluster0.zbgtw51.mongodb.net/';
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
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
