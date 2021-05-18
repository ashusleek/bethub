import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import HttpStatus from 'http-status-codes';

import routes from 'api';
import config from 'config';
import logger from 'loaders/logger';
import { ERROR_NAMES } from 'helpers/constants';
import { formatError } from 'helpers/errorHelper';

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    res.status(HttpStatus.OK).end();
  });
  app.head('/status', (req, res) => {
    res.status(HttpStatus.OK).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Using cookie-parser to extract cookies from the request object
  // It saved much effort and makes it very simple for express server
  // users to play with cookies based requests
  app.use(require('cookie-parser')());

  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(require('method-override')());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
  //
  app.use(express.static('docs'));
  // Attach API prefix
  app.use((req, res, next) => {
    const urlChunks = req.url.split('/'),
      prefix = `/${urlChunks[1]}/${urlChunks[2]}`;

    res.locals.requestPrefix = prefix;
    next();
  });
  // Load API routes
  app.use(config.api.prefix, routes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Route Not Found');
    err['status'] = HttpStatus.NOT_FOUND;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === ERROR_NAMES.UNAUTHORIZE) {
      logger.error('🤡 error: %o', err);
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send(err.message)
        .end();
    } else if (err.name === ERROR_NAMES.FORBIDDEN) {
      logger.error('🤡 error: %o', err);
      return res
        .status(HttpStatus.FORBIDDEN)
        .send(err.message)
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    logger.error('🤡 error: %o', err);
    /**
     * handle apis catch errors and send them back to user
     */
    const { message, status } = formatError(err);
    res.status(status || HttpStatus.INTERNAL_SERVER_ERROR);
    res.send(message);
  });
};
