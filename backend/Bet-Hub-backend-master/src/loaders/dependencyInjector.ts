import { Container } from 'typedi';
import LoggerInstance from 'loaders/logger';

export default ({ server, models }: { server; models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });
    LoggerInstance.info('✌️ Models injected into container');

    Container.set('logger', LoggerInstance);
    LoggerInstance.info('✌️ LoggerInstance injected into container');
    return { agenda: null };
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
