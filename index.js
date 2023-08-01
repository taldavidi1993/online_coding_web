const express = require('express');
// import router from( './server/routes/api');
const router = require('./server/routes/api');
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
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
