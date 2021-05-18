require('module-alias/register');

import 'reflect-metadata'; // We need this in order to use @Decorators

import config from 'config';

import express from 'express';

import Logger from 'loaders/logger';

async function startServer() {
  const app: express.Application = express();
  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  const server = require('http').createServer(app);
  await require('loaders').default({ expressApp: app, server });

  server.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
