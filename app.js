const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const app = express();
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log('App started and listen port', PORT);
});
