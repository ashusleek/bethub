import expressLoader from 'loaders/express';
import dependencyInjectorLoader from 'loaders/dependencyInjector';
import mongooseLoader from 'loaders/mongoose';
import Logger from 'loaders/logger';
//We have to import at least all the events once so they can be triggered
import 'loaders/events';

export default async ({ expressApp, server }) => {
  await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const models = [];
  var normalizedPath = require('path').join('src/models');
  require('fs')
    .readdirSync(normalizedPath)
    .forEach(function(file: string) {
      if (!file.includes('.map')) {
        const model = file.replace('.ts', '').replace('.js', '');
        models.push({
          name: `${model}Model`,
          model: require(`models/${model}`).default,
        });
      }
    });

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    server,
    models,
  });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
