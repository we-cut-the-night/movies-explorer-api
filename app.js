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
const { rateLimiter } = require('./utils/rateLimiter');
const { MONGO_DEV } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, MONGO_PROD } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_PROD : MONGO_DEV);

const app = express();

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
app.use(rateLimiter);

app.listen(PORT);
