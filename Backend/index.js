const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('tracer').colorConsole();
const routes = require('./routes/routes');
const dotenv = require('dotenv');
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({ origin: process.env.REACT_URL, credentials: true }));

const connection = require('./db/connection');

async function initializeApplication() {
  try {
    app.get('/healthcheck', (request, response) => {
      logger.debug('Health Check');
      response.json({
        message: 'Application Running',
      });
    });

    app.use(routes);

    await connection.createConnection();
    app.listen(process.env.PORT || 8000, () => {
      logger.debug('App listening on port 8000');
    });
  } catch (error) {
    return Promise.reject(error.message);
  }
}

initializeApplication()
  .then((response) => logger.info("Server Running"))
  .catch(error => logger.error(`Error in Initalizing Application  : ${error}`));

module.exports = app;
