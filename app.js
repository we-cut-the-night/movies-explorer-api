require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { allowedCors } = require('./utils/cors');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
